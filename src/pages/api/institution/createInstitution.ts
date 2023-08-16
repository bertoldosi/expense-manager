import * as yup from "yup";
import prisma from "@services/prisma";
import handleError from "@helpers/handleError";
import { NextApiRequest, NextApiResponse } from "next";

interface CreateInstitutionType {
  expenseId: string;
  name: string;
  createAt: string;
}

async function createInstitution(req: NextApiRequest, res: NextApiResponse) {
  const { expenseId, name, createAt } = req.body as CreateInstitutionType;

  const nameUPCASE = name.toUpperCase();

  const schema = yup.object().shape({
    expenseId: yup.string().required(),
    name: yup.string().required(),
    createAt: yup
      .string()
      .required("Date of create is required")
      .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Invalid date format. Use DD/MM/YYYY."),
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

    const institution = await prisma.institution.create({
      data: {
        name: nameUPCASE,
        expenseId,
        createAt,
      },
    });

    return res.status(200).json(institution);
  } catch (err) {
    return handleError(res, err);
  }
}

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { expenseId, name, createAt } = req.body as CreateInstitutionType;

  if (expenseId && name && createAt) {
    return await createInstitution(req, res);
  }
}

export default handle;
