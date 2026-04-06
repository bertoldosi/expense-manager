import handleError from "@helpers/handleError";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@services/prisma";

async function getShoppings(req: NextApiRequest) {
  const categoryParam = req.query.category;
  const monthParam = req.query.month;
  const yearParam = req.query.year;

  const category =
    typeof categoryParam === "string" && categoryParam.trim().length > 0
      ? categoryParam
      : undefined;

  const currentDate = new Date();
  const month =
    typeof monthParam === "string" &&
    Number(monthParam) >= 1 &&
    Number(monthParam) <= 12
      ? Number(monthParam)
      : undefined;
  const year =
    typeof yearParam === "string" && Number(yearParam) > 0
      ? Number(yearParam)
      : currentDate.getFullYear();

  const initialDate = month
    ? new Date(year, month - 1, 1, 0, 0, 0, 0)
    : new Date(year, 0, 1, 0, 0, 0, 0);
  const finalDate = month
    ? new Date(year, month, 0, 23, 59, 59, 999)
    : new Date(year, 11, 31, 23, 59, 59, 999);

  try {
    const shoppings = await prisma.shopping.findMany({
      where: {
        ...(category ? { category } : {}),
        createAt: {
          gte: initialDate,
          lte: finalDate,
        },
      },
    });

    return shoppings;
  } catch (err) {
    throw err;
  }
}

async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    const shoppings = await getShoppings(req);

    return res.status(200).send(shoppings);
  } catch (err) {
    handleError(res, err);
  }
}

export default handle;
