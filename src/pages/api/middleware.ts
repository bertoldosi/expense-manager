import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "universal-cookie";

const googleAuthMiddleware = (
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const cookies = new Cookies(req.cookies);

    const nextAuthSessionToken = cookies.get("next-auth.session-token");

    if (!nextAuthSessionToken) {
      return res.status(401).json({ error: "Não autorizado" });
    }

    return handler(req, res);
  };
};

export default googleAuthMiddleware;
