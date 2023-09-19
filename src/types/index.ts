export type ShoppingType = {
  id: string;
  description: string;
  amount: string;
  category: string;
  paymentStatus: string;
};

export type InstitutionType = {
  id: string;
  name: string;
  createAt: string;
  shoppings: ShoppingType[] | null;
};

export type ExpenseType = {
  id: string;
  name: string;
  institutions: InstitutionType[] | null;
};

export type UserType = {
  email: string;
  name: string;
  expense: ExpenseType;
};
