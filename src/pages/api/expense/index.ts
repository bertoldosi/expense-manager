import { NextApiRequest, NextApiResponse } from "next";

import getExpense from "./getExpense";
import createExpense from "./createExpense";
import updateExpense from "./updateExpense";
import deleteExpense from "./deleteExpense";

enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method as HttpMethod;

  switch (method) {
    case HttpMethod.GET:
      await getExpense(req, res);
      break;

    case HttpMethod.POST:
      await createExpense(req, res);
      break;

    case HttpMethod.PUT:
      await updateExpense(req, res);
      break;

    case HttpMethod.DELETE:
      await deleteExpense(req, res);
      break;

    default:
      return res.status(404).json({ error: "Not Found" });
  }
}
