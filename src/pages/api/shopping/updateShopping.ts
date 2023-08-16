import * as yup from "yup";
import prisma from "@services/prisma";
import handleError from "@helpers/handleError";
import { ShoppingType } from "@interfaces/*";
import { NextApiRequest, NextApiResponse } from "next";
import { shoppingSchema } from ".";
import updateInstitutionAndExpense from "./updateInstitutionAndExpense";

interface UpdateShoppingType {
  id?: string;
  description?: string;
  amount?: string;
  category?: string;
  paymentStatus?: string;
  shoppings?: ShoppingType[];
}

async function updateShopping(req: NextApiRequest, res: NextApiResponse) {
  const { id, description, amount, category, paymentStatus } =
    req.body as UpdateShoppingType;

  try {
    await shoppingSchema.validate(req.body, { abortEarly: false });

    const shoppingUpdate = await prisma.shopping.update({
      where: {
        id,
      },
      data: {
        description,
        amount,
        category,
        paymentStatus,
      },
      include: {
        institution: true,
      },
    });

    const institutionId = shoppingUpdate.institutionId;
    await updateInstitutionAndExpense(institutionId);

    return res.status(200).send(shoppingUpdate);
  } catch (err) {
    console.log("ERROR AXIOS REQUEST", err);
    return res.send(err);
  }
}

async function updateShoppings(req: NextApiRequest, res: NextApiResponse) {
  const { shoppings } = req.body as UpdateShoppingType;

  const shoppingsSchema = yup.object().shape({
    shoppings: yup.array().of(shoppingSchema).required(),
  });

  try {
    await shoppingsSchema.validate(req.body, { abortEarly: false });

    try {
      await prisma.$transaction(
        shoppings!!.map((shopping: ShoppingType) => {
          return prisma.shopping.update({
            where: {
              id: shopping.id,
            },
            data: {
              description: shopping.description,
              amount: shopping.amount,
              category: shopping.category,
              paymentStatus: shopping.paymentStatus,
            },
          });
        })
      );

      const institutionId = shoppings!![0].institutionId!!;
      await updateInstitutionAndExpense(institutionId);

      return res.status(200).send("ok");
    } catch (err) {
      return handleError(res, err);
    }
  } catch (err) {
    return handleError(res, err);
  }
}

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { shoppings, id } = req.body as UpdateShoppingType;

  if (shoppings) {
    return await updateShoppings(req, res);
  }

  if (id) {
    return await updateShopping(req, res);
  }

  return res.status(400).json({
    error: "Missing 'id' or 'shopping list' in the request query.",
  });
}

export default handle;
