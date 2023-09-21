export type CategoryType = {
  category: string;
  total: number;
};

export type ShoppingType = {
  id: string;
  description: string;
  amount: string;
  category: string;
  paymentStatus: string;
  selected?: boolean;
  institutionId?: string;
};

interface InstitutionType {
  shoppings: ShoppingType[];
}

function getTotalInstitutionPerCategory(
  institution: InstitutionType
): CategoryType[] {
  if (institution?.shoppings?.length) {
    const categoryTotals: { [category: string]: number } =
      institution.shoppings.reduce((totals, shopping) => {
        const category = shopping.category;
        const amount = parseFloat(shopping.amount);

        // calculando apenas compras em aberto
        if (shopping.paymentStatus === "open") {
          if (totals[category]) {
            totals[category] += amount;
          } else {
            totals[category] = amount;
          }
        }

        return totals;
      }, {});

    // Converte o objeto categoryTotals em um array de objetos
    const categoryTotalsArray: CategoryType[] = Object.keys(categoryTotals).map(
      (category) => ({
        category,
        total: categoryTotals[category],
      })
    );

    return categoryTotalsArray;
  }

  return [];
}

function getTotalInstitution(institution: InstitutionType): number {
  if (institution?.shoppings?.length) {
    const totalAmount = institution.shoppings.reduce((sum, shopping) => {
      //somando apenas as compras em aberto
      if (shopping.paymentStatus === "open") {
        return sum + parseFloat(shopping.amount);
      } else {
        return sum;
      }
    }, 0);

    return totalAmount;
  }

  return 0;
}

function institutionCalculate(institution: any) {
  const total = getTotalInstitution(institution);
  const categoryTotals = getTotalInstitutionPerCategory(institution);

  const newInstitution = {
    ...institution,
    categoryTotals,
    total,
  };

  return newInstitution;
}

export default institutionCalculate;
