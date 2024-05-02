import prisma from "@services/prisma";
import { NextApiRequest, NextApiResponse } from "next";

async function getShoppings(req: NextApiRequest, res: NextApiResponse) {
  const userEmail = req.headers["x-user-email"] as string;

  try {
    const cards = await prisma.card.findMany({
      where: {
        user: {
          email: userEmail,
        },
      },
    });

    return res.status(200).send(cards);
  } catch (error) {
    return res.send(error);
  }
}

export default getShoppings;
