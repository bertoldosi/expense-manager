import { NextApiRequest, NextApiResponse } from "next";

import getUser from "./getUser";
import googleAuthMiddleware from "../googleAuthMiddleware";

enum HttpMethod {
  GET = "GET",
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method as HttpMethod;

  switch (method) {
    case HttpMethod.GET:
      await getUser(req, res);
      break;

    default:
      return res.status(404).json({ error: "Not Found" });
  }
}

export default googleAuthMiddleware(handler);
