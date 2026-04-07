export type ShoppingInterface = {
  id: string;
  description: string;
  amount: string;
  category: string;
  subcategory?: string | null;
  paymentStatus: string;
  createAt?: string;
  institutionId?: string;
  index?: number;
};

export type ShoppingGroupInterface = {
  subcategory: string;
  total: string;
  items: ShoppingInterface[];
};

export type InstitutionInterface = {
  id: string;
  name: string;
  createAt: string;
  shoppings?: ShoppingInterface[];
};

export type ExpenseInterface = {
  id: string;
  name: string;
  institutions?: InstitutionInterface[];
};

export type UserInterface = {
  email: string;
  name: string;
  expense?: ExpenseInterface | undefined;
};
