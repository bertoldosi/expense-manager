import { NextApiRequest, NextApiResponse } from "next";

import createInstitution from "./createInstitution";
import deleteInstitution from "./deleteInstitution";
import updateInstitution from "./updateInstitution";
import googleAuthMiddleware from "@pages/api/middleware";

enum HttpMethod {
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method as HttpMethod;

  switch (method) {
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

export default googleAuthMiddleware(handler);
