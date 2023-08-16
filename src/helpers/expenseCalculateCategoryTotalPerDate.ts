interface CategoryTotalsType {
  category: string;
  total: number;
}

interface TotalPerDateType {
  date: string;
  total: number;
}

interface CategoryTotalPerDateType {
  date: string;
  categoryTotals: CategoryTotalsType[];
}

interface InstitutionType {
  createAt: string;
  totalAmount: number;
  categoryTotals: CategoryTotalsType[];
}

interface ExpenseType {
  totalPerDate: any;
  categoryTotalPerDate: any;
  institutions: any;
}

function expenseCalculateCategoryTotalPerDate(expense: ExpenseType) {
  const totalPerDate: any = [];
  const categoryTotalPerDate: any = [];

  const findOrCreateDateEntry = (date: string) => {
    let entry = totalPerDate.find((item) => item.date === date);

    if (!entry) {
      entry = { date, total: 0 };
      totalPerDate.push(entry);
    }

    return entry;
  };

  const findOrCreateCategoryEntry = (date: string, category: string) => {
    let entry = categoryTotalPerDate.find((item) => item.date === date);
    if (!entry) {
      entry = { date, categoryTotals: [] };
      categoryTotalPerDate.push(entry);
    }
    let categoryItem = entry.categoryTotals.find(
      (cat) => cat.category === category
    );
    if (!categoryItem) {
      categoryItem = { category, total: 0 };
      entry.categoryTotals.push(categoryItem);
    }
    return categoryItem;
  };

  expense?.institutions?.forEach((institution) => {
    const date = institution?.createAt;

    const totalAmountEntry = findOrCreateDateEntry(date);
    totalAmountEntry.total += institution?.totalAmount;

    institution?.categoryTotals?.forEach((category) => {
      const categoryItem = findOrCreateCategoryEntry(date, category.category);
      categoryItem.total += category.total;
    });
  });

  return {
    ...expense,
    totalPerDate,
    categoryTotalPerDate,
  };
}

export default expenseCalculateCategoryTotalPerDate;
