interface ShoppingTypeReport {
  description: string;
  amount: string;
  category: string;
}

function orderByCategory(value: ShoppingTypeReport, prev: ShoppingTypeReport) {
  return value.category < prev.category
    ? -1
    : value.category > prev.category
    ? 1
    : 0;
}

export default orderByCategory;
