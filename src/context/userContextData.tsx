import Cookies from "universal-cookie";
import React, { ReactNode, createContext, useEffect, useState } from "react";

import {
  ExpenseType,
  InstitutionType,
  ShoppingType,
  UserType,
} from "@interfaces/*";
import instances from "@lib/axios-instance-internal";
import extractUniqueCategoriesWithSum from "@helpers/extractUniqueCategoriesWithSum";

interface SelectedInstitutionType {
  id: string;
  name: string;
}

type PropsType = {
  children: ReactNode;
};

export type userContextDataType = {
  user: UserType | null;
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

  categories: CategorieType[];
};

interface CategorieType {
  category: string;
  total: string;
}

export const userContextData = createContext<userContextDataType | null>(null);

const UserAppContextProviderData = ({ children }: PropsType) => {
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

  useEffect(() => {
    if (institution) {
      const options = extractUniqueCategoriesWithSum(institution);

      setCategories(options);
    }
  }, [institution]);

  function toggleSelectedInstitution(institution: SelectedInstitutionType) {
    const cookieValues = cookies.get("expense-manager");

    instances
      .get("api/institution", {
        params: {
          id: institution.id,
        },
      })
      .then((response) => {
        setInstitution(response.data);
        setSelectedInstitution(response.data);

        cookies.set("expense-manager", {
          ...cookieValues,
          filter: {
            ...cookieValues.filter,
            institution: {
              id: response.data?.id,
              name: response.data?.name,
            },
          },
        });
      });
  }

  async function getUser(email: string) {
    instances
      .get("/api/user", {
        params: {
          email: email,
        },
      })
      .then((response) => {
        return setUser(response.data);
      })
      .catch((error) => error);
  }

  function getExpense(expenseId: string, institutionsCreateAt: string) {
    instances
      .get("api/expense", {
        params: {
          id: expenseId,
          institutionsCreateAt: institutionsCreateAt,
        },
      })
      .then((response) => {
        return setExpense(response.data);
      });
  }

  function getInstitution(id: string) {
    instances
      .get("api/institution", {
        params: {
          id: id,
        },
      })
      .then((response) => {
        return setInstitution({
          ...response.data,
          shoppings: response.data.shoppings.map(
            (shoppingMap: ShoppingType) => {
              return {
                ...shoppingMap,
                selected: false,
              };
            }
          ),
        });
      });
  }

  return (
    <userContextData.Provider
      value={{
        user,
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

        categories,
      }}
    >
      {children}
    </userContextData.Provider>
  );
};

export default UserAppContextProviderData;
