import handleError from "@helpers/handleError";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@services/prisma";
import getCreateAtRange from "@helpers/getCreateAtRange";

type ShoppingItem = {
  id: string;
  description: string;
  amount: string;
  category: string;
  subcategory: string | null;
  paymentStatus: string;
  createAt: Date | null;
  institutionId: string;
};

type GroupedShopping = {
  subcategory: string;
  total: string;
  items: ShoppingItem[];
};

type FilterAllShoppingsResponse = {
  filters: {
    optionsSelect: string[];
  };
  shoppings: GroupedShopping[];
};

function parseAmountInCents(amount: string) {
  const normalizedAmount = amount.replace(/\D/g, "");

  return Number(normalizedAmount) || 0;
}

function groupShoppingsBySubcategory(shoppings: ShoppingItem[]) {
  const groups: Record<
    string,
    {
      subcategory: string;
      total: string;
      items: ShoppingItem[];
    }
  > = {};

  shoppings.forEach((shopping) => {
    const subcategory = shopping.subcategory?.trim() || "sem subcategoria";

    if (!groups[subcategory]) {
      groups[subcategory] = {
        subcategory,
        total: "0",
        items: [],
      };
    }

    groups[subcategory].total = String(
      parseAmountInCents(groups[subcategory].total) +
        parseAmountInCents(shopping.amount),
    );
    groups[subcategory].items.push(shopping);
  });

  return Object.values(groups);
}

async function getUniqueCategories(createAt: string) {
  const createAtRange = getCreateAtRange(createAt);

  try {
    const shoppings = await prisma.shopping.findMany({
      where: {
        ...(createAtRange && { createAt: createAtRange }),
      },
    });

    return Array.from(
      new Set(
        shoppings
          .map((shopping) => shopping.category?.trim())
          .filter((category): category is string => Boolean(category)),
      ),
    );
  } catch (err) {
    throw err;
  }
}

async function getShoppings(req: NextApiRequest) {
  const category = req.query.category as string;
  const createAt = req.query.createAt as string;
  const createAtRange = getCreateAtRange(createAt);

  try {
    const shoppings = await prisma.shopping.findMany({
      where: {
        ...(category && { category }),
        ...(createAtRange && { createAt: createAtRange }),
      },
    });

    const groupedShoppings = groupShoppingsBySubcategory(
      shoppings as ShoppingItem[],
    );
    const optionsSelect = await getUniqueCategories(createAt);

    const result: FilterAllShoppingsResponse = {
      filters: {
        optionsSelect,
      },
      shoppings: groupedShoppings,
    };

    return result;
  } catch (err) {
    throw err;
  }
}

async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    const payload = await getShoppings(req);

    return res.status(200).send(payload);
  } catch (err) {
    handleError(res, err);
  }
}

export default handle;
