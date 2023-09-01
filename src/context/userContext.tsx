import Cookies from "universal-cookie";
import React, { ReactNode, createContext, useMemo, useState } from "react";

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

interface UserType {
  id?: string;
  email: string;
  name: string;
  expenses: ExpenseType[];
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

  const [selectedInstitution, setSelectedInstitution] =
    useState<SelectedInstitutionType | null>(() => {
      const cookieValues = cookies.get("expense-manager");

      return cookieValues?.filter?.institution;
    });

  function getUser() {}

  function getExpense() {}

  function getInstitution() {}
  function updateInstitution() {}
  function deleteInstitution() {}

  function getShopping() {}
  function updateShopping() {}
  function deleteShopping() {}

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

  //control of
  useMemo(() => {}, [user]);
  useMemo(() => {}, [expense]);
  useMemo(() => {}, [institution]);

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
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserAppContextProvider;
