import Cookies from "universal-cookie";
import React, { ReactNode, createContext, useMemo, useState } from "react";
import instances from "@lib/axios-instance-internal";
import institutionCalculateTotalAmountInstitution from "@helpers/institutionCalculateTotalAmountInstitution";
import institutionCalculateCategoryTotals from "@helpers/institutionCalculateCategoryTotals";
import expenseCalculateCategoryTotalPerDate from "@helpers/expenseCalculateCategoryTotalPerDate";
import extractUniqueCategoriesWithSum from "@helpers/extractUniqueCategoriesWithSum";

interface CategoryType {
  category: string;
  total: number;
}

interface TotalPerDateType {
  date: string;
  total: number;
}

interface CategoryTotalPerDateType {
  date: string;
  categoryTotals: CategoryType[];
}

interface ShoppingType {
  id: string;
  description: string;
  amount: string;
  category: string;
  paymentStatus: string;
  selected?: boolean;
  institutionId?: string;
}

interface InstitutionType {
  id: string;
  name: string;
  amount?: string | null;
  totalAmount?: number;
  categoryTotals?: CategoryType[];
  shoppings?: ShoppingType[] | null;
  createAt: string;
}

interface ExpenseType {
  id: string;
  name: string;
  totalPerDate: TotalPerDateType[];
  categoryTotalPerDate: CategoryTotalPerDateType[];
  institutions?: InstitutionType[];
}

interface CategorieType {
  category: string;
  total: string;
}

interface UserType {
  id?: string;
  email: string;
  name: string;
  expense: ExpenseType[];
}

interface SelectedInstitutionType {
  id: string;
  name: string;
}

export interface userContextType {
  user: UserType | null;
  setUser: Function;
  getUser: Function;

  expense: ExpenseType | null;
  setExpense: Function;
  getExpense: Function;

  institution: InstitutionType | null;
  setInstitution: Function;
  getInstitution: Function;

  toggleSelectedInstitution: Function;
  setSelectedInstitution: Function;
  selectedInstitution: SelectedInstitutionType | null;

  recalculate: Function;

  categories: CategorieType[];
}

interface UserAppContextProviderType {
  children: ReactNode;
}

export const userContext = createContext<userContextType | null>(null);

const UserAppContextProvider = ({ children }: UserAppContextProviderType) => {
  const cookies = new Cookies();

  const [user, setUser] = useState<UserType | null>(null);
  const [expense, setExpense] = useState<ExpenseType | null>(null);
  const [institution, setInstitution] = useState<InstitutionType | null>(null);
  const [categories, setCategories] = useState<CategorieType[]>([]);

  const [selectedInstitution, setSelectedInstitution] =
    useState<SelectedInstitutionType | null>(() => {
      const cookieValues = cookies.get("expense-manager");

      return cookieValues?.filter?.institution;
    });

  function getUser() {}

  function getExpense() {}

  function getInstitution() {}

  function recalculate(expense, newInstitution: InstitutionType) {
    const totalAmount =
      institutionCalculateTotalAmountInstitution(newInstitution);
    const categoryTotals = institutionCalculateCategoryTotals(newInstitution);
    const expenseTotals = expenseCalculateCategoryTotalPerDate(expense);

    console.log(expense);
    console.log(categoryTotals);

    setExpense(expenseTotals);
  }

  function toggleSelectedInstitution(institution: InstitutionType) {
    const cookieValues = cookies.get("expense-manager");

    setInstitution(institution);
    setSelectedInstitution(institution);

    cookies.set("expense-manager", {
      ...cookieValues,
      filter: {
        ...cookieValues.filter,
        institution: {
          id: institution?.id,
          name: institution?.name,
        },
      },
    });
  }

  useMemo(() => {
    if (institution) {
      const options = extractUniqueCategoriesWithSum(institution);

      setCategories(options);
    }
  }, [institution]);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        getUser,

        expense,
        setExpense,
        getExpense,

        institution,
        setInstitution,
        getInstitution,

        toggleSelectedInstitution,
        setSelectedInstitution,
        selectedInstitution,

        recalculate,

        categories,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserAppContextProvider;
