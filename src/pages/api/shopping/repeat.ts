import { NextApiRequest, NextApiResponse } from "next";
import repeatShoppings from "./repeatShoppings";

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
    case HttpMethod.POST:
      await repeatShoppings(req, res);
      break;

    default:
      return res
        .status(404)
        .json({ error: "Not Found! Sorry, 'post' method request only" });
  }
}
