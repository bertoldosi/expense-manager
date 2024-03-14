import { NextApiRequest, NextApiResponse } from "next";

import getShoppings from "./getShoppings";
import googleAuthMiddleware from "@pages/api/middleware";

enum HttpMethod {
  GET = "GET",
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method as HttpMethod;

  switch (method) {
    case HttpMethod.GET:
      await getShoppings(req, res);
      break;

    default:
      return res.status(404).json({ error: "Not Found" });
  }
}

export default googleAuthMiddleware(handler);
