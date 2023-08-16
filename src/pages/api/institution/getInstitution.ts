import prisma from "@services/prisma";
import handleError from "@helpers/handleError";
import { NextApiRequest, NextApiResponse } from "next";

interface GetInstitutionType {
  expenseId: string;
  createAt: string;
  institutionName?: string;
  id?: string;
}

async function getInstitutionId(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as unknown as GetInstitutionType;

  try {
    const institution = await prisma.institution.findUnique({
      where: {
        id,
      },
      include: {
        shoppings: {
          orderBy: {
            createAt: "desc",
          },
        },
      },
    });

    return res.status(200).send(institution);
  } catch (err) {
    return handleError(res, err);
  }

  return res.status(400).json({
    error: "Missing 'createAt' or 'expenseId' or 'id' in the request query.",
  });
}

async function getInstitutionName(req: NextApiRequest, res: NextApiResponse) {
  const { expenseId, institutionName, createAt } =
    req.query as unknown as GetInstitutionType;

  try {
    const institution = await prisma.institution.findFirst({
      where: {
        name: institutionName,
        createAt,
        expenseId,
      },
      include: {
        shoppings: {
          orderBy: {
            createAt: "desc",
          },
        },
      },
    });

    return res.status(200).send(institution);
  } catch (err) {
    handleError(res, err);
  }

  return res.status(400).json({
    error: "Missing 'createAt' or 'expenseId' or 'id' in the request query.",
  });
}

async function getInstitutions(req: NextApiRequest, res: NextApiResponse) {
  const { expenseId, createAt } = req.query as unknown as GetInstitutionType;

  try {
    const institutions = await prisma.institution.findMany({
      where: {
        createAt,
        expenseId,
      },
      include: {
        shoppings: {
          orderBy: {
            createAt: "desc",
          },
        },
      },
    });
    return res.status(200).send(institutions);
  } catch (err) {
    handleError(res, err);
  }

  return res.status(400).json({
    error: "Missing 'createAt' or 'expenseId' or 'id' in the request query.",
  });
}

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { expenseId, institutionName, id, createAt } =
    req.query as unknown as GetInstitutionType;

  if (institutionName && createAt && expenseId) {
    return await getInstitutionName(req, res);
  }

  if (createAt && expenseId) {
    return await getInstitutions(req, res);
  }

  if (id) {
    return await getInstitutionId(req, res);
  }

  return res.status(400).json({
    error:
      "Missing 'id' or 'institutionName' and 'createAt' and 'expenseId' or 'createAt' and 'expenseId' in the request query.",
  });
}

export default handle;
