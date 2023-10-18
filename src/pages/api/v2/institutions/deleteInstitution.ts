import prisma from "@services/prisma";
import handleError from "@helpers/handleError";
import { NextApiRequest, NextApiResponse } from "next";

interface DeleteInstitutionType {
  id: string;
}

async function deleteInstitution(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as unknown as DeleteInstitutionType;

  try {
    const deleteShoppings = prisma.shopping.deleteMany({
      where: {
        institutionId: id,
      },
    });

    const deleteInstitution = prisma.institution.delete({
      where: {
        id: id,
      },
    });

    const transaction = await prisma.$transaction([
      deleteShoppings,
      deleteInstitution,
    ]);

    return res.send(transaction);
  } catch (err) {
    return handleError(res, err);
  }
}

async function handle(req: NextApiRequest, res: NextApiResponse) {
  return await deleteInstitution(req, res);
}

export default handle;
