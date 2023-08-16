import handleError from "@helpers/handleError";
import prisma from "@services/prisma";
import { ShoppingType } from "@interfaces/*";
import { NextApiRequest, NextApiResponse } from "next";
import updateInstitutionAndExpense from "./updateInstitutionAndExpense";

interface DeleteShoppingType {
  id: string;
  shoppings: ShoppingType[];
}

interface DeleteShoppingsType {
  shoppings: ShoppingType[];
}

async function deleteShopping(req: NextApiRequest, res: NextApiResponse) {
  const { shoppings } = req.body as unknown as DeleteShoppingsType;

  try {
    await prisma.$transaction(async (prisma) => {
      if (shoppings) {
        const shoppingIds = shoppings.map((shopping) => shopping.id);
        await prisma.shopping.deleteMany({
          where: {
            id: {
              in: shoppingIds,
            },
          },
        });
      }
    });

    const institutionId = shoppings[0].institutionId!!;
    await updateInstitutionAndExpense(institutionId);

    return res.status(200).send("ok");
  } catch (err) {
    handleError(res, err);
  }
}

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { shoppings } = req.body as unknown as DeleteShoppingsType;

  if (shoppings) {
    return await deleteShopping(req, res);
  }

  return res.status(400).json({
    error: "Missing 'shopping list' in the request query.",
  });
}

export default handle;
