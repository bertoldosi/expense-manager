import Cookies from "universal-cookie";
import React, { ReactNode, createContext, useMemo, useState } from "react";
import institutionCalculateTotalAmountInstitution from "@helpers/institutionCalculateTotalAmountInstitution";
import getTotalInstitutionPerCategory from "@helpers/getTotalInstitutionPerCategory";
import expenseCalculateCategoryTotalPerDate from "@helpers/expenseCalculateCategoryTotalPerDate";
import extractUniqueCategoriesWithSum from "@helpers/extractUniqueCategoriesWithSum";
import calculateInstitution from "@helpers/calculateInstitution";
import instances from "@lib/axios-instance-internal";

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
  shoppings: ShoppingType[];
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

  function getUser() {}

  function getExpense() {}

  function getInstitution() {}

  async function recalculate(
    expense: ExpenseType,
    institution: InstitutionType
  ) {
    const expenseCalculated = expenseCalculateCategoryTotalPerDate(expense);
    const institutionCalculeted = calculateInstitution(institution);

    const newExpense = {
      ...expenseCalculated,
      institutions: expenseCalculated.institutions.map((mapInstitution) => {
        if (mapInstitution.id === institution?.id) {
          return institutionCalculeted;
        }

        return mapInstitution;
      }),
    };

    setInstitution(institutionCalculeted);
    setExpense(newExpense);
  }

  function toggleSelectedInstitution(institution?: InstitutionType) {
    const cookieValues = cookies.get(keyCookie);

    setInstitution(institution || null);

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

        return toggleSelectedInstitution(firstInstitution);
      }

      return toggleSelectedInstitution(institutionCookie);
    } else {
      const firstInstitution = institutions[0];
      toggleSelectedInstitution(firstInstitution);
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
        getUser,

        expense,
        setExpense,
        getExpense,

        institution,
        setInstitution,
        getInstitution,

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
