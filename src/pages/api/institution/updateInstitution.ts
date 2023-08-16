import * as yup from "yup";
import prisma from "@services/prisma";
import handleError from "@helpers/handleError";
import { NextApiRequest, NextApiResponse } from "next";

interface UpdateInstitutionType {
  id: string;
  name: string;
  expenseId: string;
  createAt: string;
}

async function updateInstitution(req: NextApiRequest, res: NextApiResponse) {
  const { id, name, expenseId, createAt } = req.body as UpdateInstitutionType;

  const nameUPCASE = name.toUpperCase();

  const schema = yup.object().shape({
    name: yup.string().required(),
  });

  try {
    await schema.validate(req.body, { abortEarly: false });

    const institutionExists = await prisma.$transaction(async (prisma) => {
      const existingInstitution = await prisma.institution.findFirst({
        where: {
          expenseId,
          name: nameUPCASE,
          createAt,
        },
      });

      return existingInstitution;
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
  const { id, name, expenseId, createAt } = req.body as UpdateInstitutionType;

  if (id && name && expenseId && createAt) {
    return await updateInstitution(req, res);
  }

  return res.status(400).json({
    error:
      "Missing 'id' and 'oldName' and 'newName' and 'expenseId' and 'createAt' in the request query.",
  });
}

export default handle;
