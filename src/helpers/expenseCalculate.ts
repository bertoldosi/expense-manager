import { ExpenseInterface, InstitutionInterface } from "@interfaces/*";
import Cookies from "universal-cookie";
import institutionCalculate from "./institutionCalculate";

interface CategoryTotalsType {
  category: string;
  total: string;
}
const keyCookies = "expense-manager";

function calculateTotalPerMonth(expense: ExpenseInterface) {
  /* 
      Dado que ao buscar por um gasto(expense) sempre virá as instituições de um determinado mês, não se faz necessário somar os totais de cada mês.
    */

  const cookies = new Cookies();
  const cookieValues = cookies.get(keyCookies);

  let date = cookieValues?.filter?.dateSelected;
  let total = 0;

  if (expense.institutions?.length) {
    // Percorre as instituições
    expense?.institutions?.map((institution) => {
      // Percorre os shoppings em cada instituição
      if (institution.shoppings?.length) {
        institution?.shoppings?.map((shopping) => {
          if (shopping.paymentStatus !== "closed") {
            // Converte o valor de string para número e adiciona à soma total
            total += parseFloat(shopping.amount);
          }
        });
      }
    });
  }

  const totalPerMonth = {
    date,
    total,
  };

  return totalPerMonth;
}

function calculateTotalPerCategory(expense: ExpenseInterface) {
  const categoryTotals: CategoryTotalsType[] = [];
  // Crie um objeto temporário para armazenar os totais por categoria
  const tempCategoryTotals = {};

  if (expense?.institutions?.length) {
    // Percorre as instituições
    expense?.institutions?.map((institution) => {
      if (institution?.shoppings?.length) {
        // Percorre os shoppings em cada instituição
        institution?.shoppings?.map((shopping) => {
          if (shopping.paymentStatus !== "closed") {
            // Converte o valor de string para número
            const amount = parseFloat(shopping.amount);

            // Verifica se a categoria já existe nos totais temporários
            if (tempCategoryTotals[shopping.category]) {
              tempCategoryTotals[shopping.category] += amount;
            } else {
              tempCategoryTotals[shopping.category] = amount;
            }
          }
        });
      }
    });
  }

  // Converte os totais temporários em objetos no formato desejado
  for (const category in tempCategoryTotals) {
    categoryTotals.push({
      category,
      total: tempCategoryTotals[category].toString(),
    });
  }

  return categoryTotals;
}

function calculateTotalPerCategoryInInstitutions(
  institutions: InstitutionInterface[]
) {
  if (institutions?.length) {
    const institutionsCalculeted = institutions.map((mapInstitution) => {
      const institutionCalculeted = institutionCalculate(mapInstitution);

      return institutionCalculeted;
    });

    return institutionsCalculeted;
  }

  return institutions;
}

function expenseCalculate(expense) {
  return {
    ...expense,
    institutions: calculateTotalPerCategoryInInstitutions(expense.institutions),
    totalPerMonth: calculateTotalPerMonth(expense),
    categoryTotals: calculateTotalPerCategory(expense),
  };
}

export default expenseCalculate;
