import { NextApiRequest, NextApiResponse } from "next";

import createExpense from "./createExpense";
import getExpense from "./getExpense";

enum HttpMethod {
  GET = "GET",
  POST = "POST",
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method as HttpMethod;

  switch (method) {
    case HttpMethod.POST:
      await createExpense(req, res);
      break;

    case HttpMethod.GET:
      await getExpense(req, res);
      break;

    default:
      return res.status(404).json({ error: "Not Found" });
  }
}
