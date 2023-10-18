import handleError from "@helpers/handleError";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@services/prisma";

interface GetShoppingType {
  category: string;
  institutionId: string;
}

async function getShoppingsCategory(req: NextApiRequest, res: NextApiResponse) {
  const { category, institutionId } = req.query as any as GetShoppingType;

  try {
    const shoppings = await prisma.shopping.findMany({
      where: {
        category,
        institutionId,
      },
    });

    return res.status(200).send(shoppings);
  } catch (err) {
    return handleError(res, err);
  }
}

async function getShoppings(req: NextApiRequest, res: NextApiResponse) {
  const { institutionId } = req.query as any as GetShoppingType;

  try {
    const shoppings = await prisma.shopping.findMany({
      where: {
        institutionId,
      },
    });

    return res.status(200).send(shoppings);
  } catch (err) {
    handleError(res, err);
  }
}

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { category, institutionId } = req.query as any as GetShoppingType;

  if (category && institutionId) {
    return await getShoppingsCategory(req, res);
  }

  if (institutionId) {
    return await getShoppings(req, res);
  } else {
    return res.status(400).json({
      error:
        "Missing 'institutionId' and 'category' or only 'institutionId' in the request query.",
    });
  }
}

export default handle;
