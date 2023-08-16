import { Prisma } from "@prisma/client";
import { NextApiResponse } from "next";

function handleError(res: NextApiResponse, error: any) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.log(error.meta);
    return res.json(error.message);
  }

  console.error("ERROR AXIOS REQUEST", error);
  return res.status(500).json({ error: "Internal Server Error" });
}

export default handleError;
