import prisma from "@services/prisma";
import expenseCalculateCategoryTotalPerDate from "@helpers/expenseCalculateCategoryTotalPerDate";

async function updateExpenseTotals(expenseId: string) {
  const expense = await prisma.expense.findUnique({
    where: {
      id: expenseId,
    },
    include: {
      institutions: {
        include: {
          shoppings: true,
        },
      },
    },
  });

  if (!expense) {
    throw new Error("Expense not found");
  }

  const expenseUpdate = expenseCalculateCategoryTotalPerDate(expense);

  try {
    await prisma.expense.update({
      where: {
        id: expenseId,
      },
      data: {
        totalPerDate: expenseUpdate.totalPerDate,
        categoryTotalPerDate: expenseUpdate.categoryTotalPerDate,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export default updateExpenseTotals;
