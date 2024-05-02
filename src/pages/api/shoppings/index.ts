import { NextApiRequest, NextApiResponse } from "next";

import getShoppings from "./getShoppings";
import createShopping from "./createShopping";

enum HttpMethod {
  GET = "GET",
  POST = "POST",
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method as HttpMethod;

  switch (method) {
    case HttpMethod.GET:
      await getShoppings(req, res);
      break;

    case HttpMethod.POST:
      await createShopping(req, res);
      break;

    default:
      return res.status(404).json({ error: "Not Found" });
  }
}

export default handler;
