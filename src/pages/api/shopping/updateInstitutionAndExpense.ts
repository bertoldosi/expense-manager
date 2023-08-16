import prisma from "@services/prisma";
import updateExpenseTotals from "../expense/updateExpenseTotals";
import updateInstitutionTotals from "../institution/updateInstitutionTotals";

async function updateInstitutionAndExpense(institutionId: string) {
  const institution = await prisma.institution.findUnique({
    where: {
      id: institutionId,
    },
    include: {
      expense: true,
    },
  });

  if (!institution) {
    throw new Error("Institution not found");
  }

  await updateInstitutionTotals(institutionId);
  await updateExpenseTotals(institution.expenseId!!);
}

export default updateInstitutionAndExpense;
