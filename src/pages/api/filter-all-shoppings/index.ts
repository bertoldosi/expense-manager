import * as yup from "yup";
import { NextApiRequest, NextApiResponse } from "next";

import getShopping from "./getShopping";
import googleAuthMiddleware from "@pages/api/middleware";

enum HttpMethod {
  GET = "GET",
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

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method as HttpMethod;

  switch (method) {
    case HttpMethod.GET:
      await getShopping(req, res);
      break;

    default:
      return res.status(404).json({ error: "Not Found" });
  }
}

export default googleAuthMiddleware(handler);
