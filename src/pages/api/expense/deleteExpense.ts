import prisma from "@services/prisma";
import handleError from "@helpers/handleError";
import { NextApiRequest, NextApiResponse } from "next";

interface DeleteExpenseType {
  id: string;
}

async function deleteExpense(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as unknown as DeleteExpenseType;

  try {
    const institutions = await prisma.institution.findMany({
      where: {
        expenseId: id,
      },
    });

    if (institutions.length > 0) {
      return res
        .status(405)
        .send(
          "Not Allowed. Before deleting this expense, please delete the cards linked to it!"
        );
    }

    await prisma.expense.delete({
      where: {
        id,
      },
    });

    return res.status(204).send("ok");
  } catch (err) {
    return handleError(res, err);
  }
}

export default deleteExpense;
