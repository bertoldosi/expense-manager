import { NextApiRequest, NextApiResponse } from "next";

import googleAuthMiddleware from "../googleAuthMiddleware";

import createCard from "./createCard";

enum HttpMethod {
  GET = "GET",
  POST = "POST",
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method as HttpMethod;

  switch (method) {
    case HttpMethod.POST:
      await createCard(req, res);
      break;

    default:
      return res.status(404).json({ error: "Not Found" });
  }
}

export default googleAuthMiddleware(handler);
