import * as yup from "yup";
import { NextApiRequest, NextApiResponse } from "next";
import getShopping from "./getShopping";
import createShopping from "./createShopping";
import updateShopping from "./updateShopping";
import deleteShopping from "./deleteShopping";

enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
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
    case HttpMethod.GET:
      await getShopping(req, res);
      break;

    case HttpMethod.POST:
      await createShopping(req, res);
      break;

    case HttpMethod.PUT:
      await updateShopping(req, res);
      break;

    case HttpMethod.DELETE:
      await deleteShopping(req, res);
      break;

    default:
      return res.status(404).json({ error: "Not Found" });
  }
}
