import { NextApiRequest, NextApiResponse } from "next";

import googleAuthMiddleware from "@pages/api/middleware";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    return res.status(200).send({});
  } catch (err) {
    console.log(err);
  }
}

export default googleAuthMiddleware(handler);
