import { getServerSession } from "next-auth";
import { authOptions } from "@pages/api/auth/[...nextauth]";

const redirect = (res, path) => {
  res.writeHead(302, {
    Location: path,
  });

  res.end();
  return { props: {} };
};

export const withAuth = (callback) => {
  return async (context) => {
    const { req, res } = context;

    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return redirect(res, "/login");
    }

    return await callback(context);
  };
};
