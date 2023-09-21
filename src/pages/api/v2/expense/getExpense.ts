import prisma from "@services/prisma";
import handleError from "@helpers/handleError";
import { NextApiRequest, NextApiResponse } from "next";

interface GetExpenseIdType {
  id: string;
  institutionCreateAt: string;
}

async function getExpense(req: NextApiRequest, res: NextApiResponse) {
  const { id, institutionCreateAt } = req.query as unknown as GetExpenseIdType;

  if (id && institutionCreateAt) {
    try {
      const expense = await prisma.expense.findUnique({
        where: {
          id,
        },
        include: {
          institutions: {
            where: {
              createAt: institutionCreateAt,
            },
            include: {
              shoppings: {
                orderBy: {
                  createAt: "desc",
                },
              },
            },
          },
        },
      });

      return res.status(200).send(expense);
    } catch (err) {
      return handleError(res, err);
    }
  }

  return res.status(400).json({
    error: "Missing 'id' and 'institutionCreateAt'  in the request query.",
  });
}

export default getExpense;
