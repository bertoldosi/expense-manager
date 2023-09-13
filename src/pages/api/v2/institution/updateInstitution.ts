import * as yup from "yup";
import prisma from "@services/prisma";
import handleError from "@helpers/handleError";
import { NextApiRequest, NextApiResponse } from "next";

interface UpdateInstitutionType {
  id: string;
  name: string;
}

const schema = yup.object().shape({
  name: yup.string().required(),
});

async function updateInstitution(req: NextApiRequest, res: NextApiResponse) {
  const { id, name } = req.body as UpdateInstitutionType;

  const nameUPCASE = name.toUpperCase();

  try {
    await schema.validate(req.body, { abortEarly: false });

    const institutionGet = await prisma.institution.findUnique({
      where: {
        id,
      },
    });

    const institutionExists = await prisma.institution.findFirst({
      where: {
        expenseId: institutionGet?.expenseId,
        name: nameUPCASE,
        createAt: institutionGet?.createAt,
      },
    });

    if (institutionExists) {
      return res
        .status(405)
        .send("Not allowed. Name already registered in this period!");
    }

    const institution = await prisma.institution.update({
      where: {
        id,
      },
      data: {
        name: nameUPCASE,
      },
    });

    return res.status(200).json(institution);
  } catch (err) {
    return handleError(res, err);
  }
}

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { id, name } = req.body as UpdateInstitutionType;

  if (id && name) {
    return await updateInstitution(req, res);
  }

  return res.status(400).json({
    error: "Missing 'id' and 'oldName' and 'newName' in the request query.",
  });
}

export default handle;
