import prisma from "@services/prisma";
import handleError from "@helpers/handleError";
import { NextApiRequest, NextApiResponse } from "next";

interface DeleteInstitutionType {
  institutionId: string;
}

async function deleteInstitution(req: NextApiRequest, res: NextApiResponse) {
  const { institutionId } = req.query as unknown as DeleteInstitutionType;

  try {
    const deleteShoppings = prisma.shopping.deleteMany({
      where: {
        institutionId,
      },
    });

    const deleteInstitution = prisma.institution.delete({
      where: {
        id: institutionId,
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
  const { institutionId } = req.query as unknown as DeleteInstitutionType;

  if (institutionId) {
    return await deleteInstitution(req, res);
  }

  return res.status(400).json({
    error: "Missing 'institutionId' or 'shopping list' in the request query.",
  });
}

export default handle;
