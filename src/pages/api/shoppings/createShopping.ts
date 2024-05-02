import { ShoppingCreateType } from "@interfaces/*";
import prisma from "@services/prisma";

import { NextApiRequest, NextApiResponse } from "next";

async function createShopping(req: NextApiRequest, res: NextApiResponse) {
  const { id, amount, category, description, paymentStatus, position, cardId } =
    req.body as ShoppingCreateType;

  try {
    const shoppingCreated = await prisma.shopping.create({
      data: {
        id,
        amount,
        category,
        description,
        paymentStatus,
        position,
        cardId,
      },
    });

    return res.status(200).send(shoppingCreated);
  } catch (error) {
    return res.send(error);
  }
}

export default createShopping;
