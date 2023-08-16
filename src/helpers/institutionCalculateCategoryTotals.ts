import { CategoryType } from "@interfaces/*";

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
function institutionCalculateCategoryTotals(
  institution: InstitutionType
): CategoryType[] {
  if (institution.shoppings?.length) {
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

export default institutionCalculateCategoryTotals;
