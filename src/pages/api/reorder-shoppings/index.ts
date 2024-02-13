import * as yup from "yup";
import { NextApiRequest, NextApiResponse } from "next";

import googleAuthMiddleware from "@pages/api/middleware";

import prisma from "@services/prisma";
import handleError from "@helpers/handleError";

import { ShoppingInterface } from "@interfaces/*";

interface ShoppingType extends ShoppingInterface {
  index: number;
}
interface UpdateShoppingType {
  shoppings?: ShoppingType[];
}

async function updateShoppings(req: NextApiRequest, res: NextApiResponse) {
  const { shoppings } = req.body as UpdateShoppingType;

  const shoppingReverse = shoppings?.reverse();

  try {
    await prisma.$transaction(
      shoppingReverse!!.map((shopping: ShoppingType, index) => {
        return prisma.shopping.update({
          where: {
            id: shopping.id,
          },
          data: {
            index,
          },
        });
      })
    );

    return res.status(200).send("ok");
  } catch (err) {
    return handleError(res, err);
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await updateShoppings(req, res);
}

export default googleAuthMiddleware(handler);
