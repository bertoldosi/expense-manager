import prisma from "@services/prisma";
import { NextApiRequest, NextApiResponse } from "next";

async function getShoppings(req: NextApiRequest, res: NextApiResponse) {
  const userEmail = req.headers["x-user-email"] as string;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      include: {
        card: true,
      },
    });

    const shoppings = await prisma.card.findMany({
      where: {
        userId: user?.id,
      },
    });

    return res.status(200).send(shoppings);
  } catch (err) {
    return res.send(err);
  }

  return res.send("Email is not defined or is invalid");
}

export default getShoppings;
