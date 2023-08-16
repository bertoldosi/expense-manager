import { InstitutionType } from "@interfaces/*";

function extractUniqueCategoriesWithSum(
  institution: InstitutionType
): { category: string; total: string }[] {
  const categories: { [category: string]: number } = {};

  if (institution.shoppings) {
    institution.shoppings.forEach((shopping) => {
      const { category, amount } = shopping;
      if (categories[category]) {
        categories[category] += Number(amount);
      } else {
        categories[category] = Number(amount);
      }
    });
  }

  const uniqueCategories = Object.keys(categories).map((category) => ({
    category,
    total: categories[category].toString(),
  }));

  return uniqueCategories;
}

export default extractUniqueCategoriesWithSum;
