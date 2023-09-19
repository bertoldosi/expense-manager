import prisma from "@services/prisma";
import handleError from "@helpers/handleError";
import { NextApiRequest, NextApiResponse } from "next";
import ObjectId from "mongo-objectid";

enum HttpMethod {
  POST = "POST",
}

interface RepeatShoppingType {
  repeat: number;
  shoppings: ShoppingType[];
  institution: InstitutionType;
}

interface CategoryTotal {
  category: string;
  total: number;
}

interface ShoppingType {
  id: string;
  description: string;
  amount: string;
  category: string;
  paymentStatus: string;
  institutionId?: string;
}

interface InstitutionType {
  name: string;
  createAt: string;
  totalAmount: number;
  categoryTotals: CategoryTotal[];
  expenseId: string;
  shoppings: ShoppingType[];
}

function generateRepeatedData(
  initialInstitution: InstitutionType,
  initialShoppings: ShoppingType[],
  repeat: number
): InstitutionType[] {
  const shoppings = initialShoppings.map((shopping) => {
    const uuid = new ObjectId().hex;

    return {
      id: uuid,
      description: shopping.description,
      amount: shopping.amount,
      category: shopping.category,
      paymentStatus: shopping.paymentStatus,
    };
  });

  const institution = {
    name: initialInstitution.name,
    createAt: initialInstitution.createAt,
    totalAmount: initialInstitution.totalAmount,
    categoryTotals: initialInstitution.categoryTotals,
    expenseId: initialInstitution.expenseId,
    shoppings: shoppings,
  };

  const institutionsRepeat: InstitutionType[] = [];
  const initialDateParts = institution.createAt.split("/");
  const initialMonth = parseInt(initialDateParts[1]);
  const initialYear = parseInt(initialDateParts[2]);

  let currentMonth = initialMonth + 1;
  let currentYear = initialYear;

  for (let i = 0; i < repeat; i++) {
    if (currentMonth > 12) {
      currentMonth = 1;
      currentYear++;
    }

    const newData: InstitutionType = {
      ...institution,
    };
    newData.createAt = `01/${currentMonth
      .toString()
      .padStart(2, "0")}/${currentYear}`;
    institutionsRepeat.push(newData);

    currentMonth++;
  }

  return institutionsRepeat;
}

async function repeatShoppings(req: NextApiRequest, res: NextApiResponse) {
  const {
    repeat,
    shoppings,
    institution: institutionRepeat,
  } = req.body as unknown as RepeatShoppingType;

  const institutionsRepeat = generateRepeatedData(
    institutionRepeat,
    shoppings,
    repeat
  );

  try {
    const transactionRepeat = institutionsRepeat.map(
      async (institution: InstitutionType) => {
        const isInstitutionExist = await prisma.institution.findFirst({
          where: {
            name: institution.name,
            createAt: institution.createAt,
          },
        });

        if (isInstitutionExist) {
          const institutionId = isInstitutionExist.id;

          const institutionUpdate = await prisma.institution.update({
            where: {
              id: institutionId,
            },
            data: {
              shoppings: {
                createMany: {
                  data: institution.shoppings,
                },
              },
            },
          });

          return institutionUpdate;
        } else {
          const institutionCreate = await prisma.institution.create({
            data: {
              name: institution.name,
              createAt: institution.createAt,
              totalAmount: institution.totalAmount,
              expenseId: institution.expenseId,
              shoppings: {
                createMany: {
                  data: institution.shoppings,
                },
              },
            },
          });

          return institutionCreate;
        }
      }
    );

    await prisma.$transaction(async (prisma) => {
      for (const transitionPromise of transactionRepeat) {
        const transition = await transitionPromise;
        await prisma.institution.findUnique({
          where: {
            id: transition!!.id,
          },
        });
      }
    });

    return res.status(200).send("ok");
  } catch (err) {
    return handleError(res, err);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method as HttpMethod;

  switch (method) {
    case HttpMethod.POST:
      await repeatShoppings(req, res);
      break;

    default:
      return res
        .status(404)
        .json({ error: "Not Found! Sorry, 'post' method request only" });
  }
}
