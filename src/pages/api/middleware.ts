import { NextApiRequest, NextApiResponse } from "next";
import restricted from "../../utils/restricted";

export default async function middleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  await restricted(req, res);
  next();
}
