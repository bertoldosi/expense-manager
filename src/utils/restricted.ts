import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";

const restricted = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
      return res.status(401).json({
        error: "Unauthorized",
        message:
          "You must be signed in to view the protected content on this page.",
      });
    }

    req.headers["x-user-email"] = session.user.email;
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An error occurred while processing your request.",
    });
  }
};

export default restricted;
