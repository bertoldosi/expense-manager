import prisma from "@services/prisma";
import institutionCalculateCategoryTotals from "@helpers/institutionCalculateCategoryTotals";
import institutionCalculateTotalAmountInstitution from "@helpers/institutionCalculateTotalAmountInstitution";

async function updateInstitutionTotals(institutionId: string) {
  const institution = await prisma.institution.findUnique({
    where: {
      id: institutionId,
    },
    include: {
      shoppings: true,
    },
  });

  if (!institution) {
    throw new Error("Institution not found");
  }

  const totalAmount = institutionCalculateTotalAmountInstitution(institution);
  const categoryTotals = institutionCalculateCategoryTotals(institution);

  try {
    await prisma.institution.update({
      where: {
        id: institutionId,
      },
      data: {
        totalAmount,
        categoryTotals: categoryTotals,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export default updateInstitutionTotals;
