import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

const googleAuthMiddleware = (
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
      res.send({
        content:
          "You must be signed in to view the protected content on this page.",
      });
    } else {
      req.headers["x-user-email"] = session.user.email;

      return handler(req, res);
    }
  };
};

export default googleAuthMiddleware;
