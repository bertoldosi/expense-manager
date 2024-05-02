import prisma from "@services/prisma";
import { NextApiRequest, NextApiResponse } from "next";

async function getUser(req: NextApiRequest, res: NextApiResponse) {
  const userEmail = req.headers["x-user-email"] as string;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    return res.status(200).send(user);
  } catch (error) {
    return res.send(error);
  }
}

export default getUser;
