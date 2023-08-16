import prisma from "@services/prisma";
import handleError from "@helpers/handleError";
import { NextApiRequest, NextApiResponse } from "next";

interface CreateShoppingType {
  name: string;
  userEmail: string;
}

async function createExpense(req: NextApiRequest, res: NextApiResponse) {
  const { name, userEmail } = req.body as CreateShoppingType;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      include: {
        expense: true,
      },
    });

    if (!user) {
      return res.status(405).send("User not exist!");
    }

    if (user?.expense) {
      return res.status(405).send("User already has expense!");
    }

    const expense = await prisma.expense.create({
      data: {
        name,
        userId: user.id,
      },
      include: {
        user: true,
      },
    });

    return res.status(200).send(expense);
  } catch (err) {
    console.log(err);
    return handleError(res, err);
  }
}

export default createExpense;
