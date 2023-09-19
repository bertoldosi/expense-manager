export type ShoppingInterface = {
  id: string;
  description: string;
  amount: string;
  category: string;
  paymentStatus: string;
};

export type InstitutionInterface = {
  id: string;
  name: string;
  createAt: string;
  shoppings: ShoppingInterface[] | null;
};

export type ExpenseInterface = {
  id: string;
  name: string;
  institutions: InstitutionInterface[] | null;
};

export type UserInterface = {
  email: string;
  name: string;
  expense: ExpenseInterface;
};
