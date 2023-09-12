import { NextApiRequest, NextApiResponse } from "next";

import createInstitution from "./createInstitution";

enum HttpMethod {
  POST = "POST",
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method as HttpMethod;

  switch (method) {
    case HttpMethod.POST:
      await createInstitution(req, res);
      break;

    default:
      return res.status(404).json({ error: "Not Found" });
  }
}
