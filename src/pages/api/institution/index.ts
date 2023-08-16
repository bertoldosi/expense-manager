import { NextApiRequest, NextApiResponse } from "next";

import getInstitution from "./getInstitution";
import createInstitution from "./createInstitution";
import deleteInstitution from "./deleteInstitution";
import updateInstitution from "./updateInstitution";

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
      await getInstitution(req, res);
      break;

    case HttpMethod.POST:
      await createInstitution(req, res);
      break;

    case HttpMethod.PUT:
      await updateInstitution(req, res);
      break;

    case HttpMethod.DELETE:
      await deleteInstitution(req, res);
      break;

    default:
      return res.status(404).json({ error: "Not Found" });
  }
}
