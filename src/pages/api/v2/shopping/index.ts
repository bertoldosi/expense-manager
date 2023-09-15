import * as yup from "yup";
import { NextApiRequest, NextApiResponse } from "next";

import createShopping from "./createShopping";

enum HttpMethod {
  POST = "POST",
}

export const shoppingSchema = yup.object().shape({
  description: yup.string().required(),
  amount: yup.string().required(),
  category: yup.string().required(),
  paymentStatus: yup
    .string()
    .required()
    .oneOf(["open", "closed"], "Payment status must be 'open' or 'closed'"),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method as HttpMethod;

  switch (method) {
    case HttpMethod.POST:
      await createShopping(req, res);
      break;

    default:
      return res.status(404).json({ error: "Not Found" });
  }
}
