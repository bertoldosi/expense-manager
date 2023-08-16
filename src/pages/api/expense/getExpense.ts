import prisma from "@services/prisma";
import handleError from "@helpers/handleError";
import { NextApiRequest, NextApiResponse } from "next";

interface GetExpenseIdType {
  id: string;
  institutionsCreateAt: string;
  userId?: string;
}

async function getExpense(req: NextApiRequest, res: NextApiResponse) {
  const { id, institutionsCreateAt, userId } =
    req.query as unknown as GetExpenseIdType;

  if (userId) {
    try {
      const expense = await prisma.expense.findFirst({
        where: {
          userId,
        },
        include: {
          institutions: {
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

  if (id && institutionsCreateAt) {
    try {
      const institutions = await prisma.institution.findMany({
        where: {
          createAt: institutionsCreateAt,
          expenseId: id,
        },
        include: {
          shoppings: {
            orderBy: {
              createAt: "desc",
            },
          },
        },
      });

      const expense = await prisma.expense.findUnique({
        where: {
          id,
        },
      });

      const newExpense = {
        ...expense,
        institutions: institutions,
      };

      return res.status(200).send(newExpense);
    } catch (err) {
      return handleError(res, err);
    }
  }

  return res.status(400).json({
    error:
      "Missing 'id' and 'institutionsCreateAt' or 'userId' in the request query.",
  });
}

export default getExpense;
