import Cookies from "universal-cookie";

import React, { ReactNode, createContext, useMemo, useState } from "react";
import extractUniqueCategoriesWithSum from "@helpers/extractUniqueCategoriesWithSum";
import institutionCalculate from "@helpers/institutionCalculate";
import instances from "@lib/axios-instance-internal";
import expenseCalculate from "@helpers/expenseCalculate";

interface CategoryType {
  category: string;
  total: number;
}

interface TotalPerDateType {
  date: string;
  total: number;
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
  total?: number;
  categoryTotals?: CategoryType[];
  shoppings?: ShoppingType[] | null;
  createAt: string;
}

interface ExpenseType {
  id: string;
  name: string;
  totalPerMonth: TotalPerDateType;
  categoryTotals: CategoryType[];
  institutions?: InstitutionType[];
}

interface CategorieType {
  category: string;
  total: string;
}

interface UserType {
  id: string;
  email: string;
  name: string;
  expense: ExpenseType[] | null;
}

export interface userContextType {
  user: UserType | null;
  setUser: Function;

  expense: ExpenseType | null;
  setExpense: Function;
  getExpense: (expenseId: string, institutionCreateAt: string) => void;

  institution: InstitutionType | null;
  setInstitution: Function;

  toggleSelectedInstitution: Function;

  getFirstInstitution: Function;

  recalculate: Function;

  categories: CategorieType[];
}

interface UserAppContextProviderType {
  children: ReactNode;
}

const keyCookie = "expense-manager";

export const userContext = createContext<userContextType | null>(null);

const UserAppContextProvider = ({ children }: UserAppContextProviderType) => {
  const cookies = new Cookies();

  const [user, setUser] = useState<UserType | null>(null);
  const [expense, setExpense] = useState<ExpenseType | null>(null);
  const [institution, setInstitution] = useState<InstitutionType | null>(null);
  const [categories, setCategories] = useState<CategorieType[]>([]);

  async function recalculate(
    expense: ExpenseType | null,
    institution: InstitutionType | null
  ) {
    const institutionCalculeted = await institutionCalculate(institution);

    const newExpense = {
      ...expense,
      institutions: expense?.institutions?.map((mapInstitution) => {
        if (mapInstitution.id === institution?.id) {
          return institutionCalculeted;
        }

        return mapInstitution;
      }),
    };

    const expenseCalculatedResult = await expenseCalculate(newExpense);

    setInstitution(institutionCalculeted);
    setExpense(expenseCalculatedResult);
  }

  function persistExpenseCookie(expense: ExpenseType) {
    const cookieValues = cookies.get(keyCookie);

    const newCookieValues = {
      ...cookieValues,
      filter: {
        ...cookieValues?.filter,
        expense: {
          id: expense.id,
          name: expense?.name,
        },
      },
    };
    cookies.set(keyCookie, newCookieValues);
  }

  async function getExpense(expenseId: string, institutionCreateAt: string) {
    const { data: expenseGet } = await instances.get("api/v2/expenses", {
      params: {
        id: expenseId,
        institutionCreateAt,
      },
    });

    persistExpenseCookie(expenseGet);
    const firstInstitution = getFirstInstitution(expenseGet.institutions);

    await recalculate(expenseGet, firstInstitution);
  }

  function toggleSelectedInstitution(institution: InstitutionType | null) {
    const cookieValues = cookies.get(keyCookie);

    recalculate(expense, institution);

    const newCookieValues = {
      ...cookieValues,
      filter: {
        ...cookieValues.filter,
        institution: {
          id: institution?.id,
          name: institution?.name,
        },
      },
    };

    cookies.set(keyCookie, newCookieValues);
  }

  function getFirstInstitution(institutions: InstitutionType[]) {
    const cookieValues = cookies.get(keyCookie);

    const hasInstitutionInCookie = cookieValues?.filter?.institution;

    // Verificamos se existe uma instituição já salva
    if (hasInstitutionInCookie) {
      const institutionNameCookie = cookieValues.filter.institution.name;

      const institutionCookie = institutions.find(
        (findInstitution) => findInstitution.name === institutionNameCookie
      );

      if (!institutionCookie) {
        const firstInstitution = institutions[0];

        toggleSelectedInstitution(firstInstitution);

        return firstInstitution;
      }

      toggleSelectedInstitution(institutionCookie);

      return institutionCookie;
    } else {
      const firstInstitution = institutions[0];
      toggleSelectedInstitution(firstInstitution);

      return firstInstitution;
    }
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

        expense,
        setExpense,
        getExpense,

        institution,
        setInstitution,

        toggleSelectedInstitution,

        getFirstInstitution,

        recalculate,

        categories,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserAppContextProvider;
