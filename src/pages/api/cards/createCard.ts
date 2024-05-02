import { CardCreateType } from "@interfaces/*";
import prisma from "@services/prisma";

import { NextApiRequest, NextApiResponse } from "next";

async function createCard(req: NextApiRequest, res: NextApiResponse) {
  const userEmail = req.headers["x-user-email"] as string;

  const { name } = req.body as CardCreateType;

  try {
    const cardCreated = await prisma.card.create({
      data: {
        name,
        user: {
          connect: {
            email: userEmail,
          },
        },
      },
    });

    return res.status(200).send(cardCreated);
  } catch (error) {
    return res.send(error);
  }
}

export default createCard;
