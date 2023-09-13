import React, { useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import moment from "moment";

import { Institution } from "@containers/Home/Institution";
import WithoutInstitution from "@containers/Home/Institution/WithoutInstitution";

import { Scontainer } from "./styles";
import InstitutionMenuFilter from "./InstitutionMenuFilter";
import { useSession } from "next-auth/react";
import { userContext, userContextType } from "@context/userContext";
import instances from "@lib/axios-instance-internal";
import { Loading } from "@commons/Loading";

interface InstitutionType {
  id: string;
  name: string;
}
interface ExpenseType {
  id: string;
  name: string;
  institutions: InstitutionType[];
}
interface getUserResponseType {
  data: {
    email: string;
    expense: ExpenseType;
  };
}

interface CookieValuesType {
  filter: {
    dateSelected: string;
    institution: InstitutionType;
  };
}

const keyCookies = "expense-manager";

function Home() {
  const cookies = new Cookies();

  const { data: session } = useSession();
  const { expense, setExpense, setInstitution, getFirstInstitution } =
    useContext(userContext) as userContextType;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [valueYear, setValueYear] = useState<number>(() => {
    const date = moment().format("DD/MM/YYYY");
    const [_day, _month, year] = date.split("/");

    return Number(year);
  });
  const [valueMonth, setValueMonth] = useState<string>(() => {
    const date = moment().format("DD/MM/YYYY");
    const [_day, month, _year] = date.split("/");

    return month;
  });

  function addDateState(date: string) {
    const [_day, month, year] = date.split("/");

    setValueYear(Number(year));
    setValueMonth(month);
  }

  function getDateNow() {
    const cookieValues = cookies.get(keyCookies);
    const date = moment().format("DD/MM/YYYY");
    const [_day, month, year] = date.split("/");
    const dateSelected = `01/${month}/${year}`;

    const newCookieValues = {
      ...cookieValues,
      filter: {
        ...cookieValues?.filter,
        dateSelected,
      },
    };

    setValueYear(Number(year));
    setValueMonth(month);
    cookies.set(keyCookies, newCookieValues);
  }

  function initializationDate() {
    const cookieValues = cookies.get(keyCookies);
    const createAt = cookieValues?.filter?.dateSelected;

    // caso exista uma data já selecionada, salvamos localmente
    if (createAt) {
      return addDateState(createAt);
    }

    // caso não exista uma data já selecionada, pegamos a data atual e salvamos localmente
    getDateNow();
  }

  function persistExpenseCookie(expense: ExpenseType) {
    const cookieValues: CookieValuesType = cookies.get(keyCookies);

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
    cookies.set(keyCookies, newCookieValues);
  }

  async function getExpense(expenseId: string) {
    const cookieValues: CookieValuesType = cookies.get(keyCookies);

    const { data: expenseGet } = await instances.get("api/v2/expense", {
      params: {
        id: expenseId,
        institutionCreateAt: cookieValues?.filter?.dateSelected,
      },
    });

    persistExpenseCookie(expenseGet);
    getFirstInstitution(expenseGet.institutions);
    setExpense(expenseGet);
    setIsLoading(false);
  }

  async function createExpense(userEmail: string) {
    const { data: expenseCreate } = await instances.post("api/v2/expense", {
      name: "default",
      userEmail: userEmail,
    });

    persistExpenseCookie(expenseCreate);

    setExpense(expenseCreate);
    setInstitution(null);
    setIsLoading(false);
  }

  async function getUser(email: string) {
    const { data: user }: getUserResponseType = await instances.get(
      "/api/v2/user",
      {
        params: {
          email: email,
        },
      }
    );

    // verificamos se o usuario ja tem um gasto cadastrado
    const isExpenseExist = user?.expense?.name;

    //pegamos o gasto, caso ela ja tenha
    if (isExpenseExist) return getExpense(user.expense.id);

    //criamos um gasto, caso ela não tenha
    return createExpense(user.email);
  }

  useEffect(() => {
    initializationDate();
  }, []);

  useEffect(() => {
    const userEmail = session?.user?.email;
    if (userEmail) {
      getUser(userEmail);
    }
  }, [session]);

  return (
    <Scontainer>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <InstitutionMenuFilter
            valueMonth={valueMonth}
            valueYear={valueYear}
            setValueMonth={setValueMonth}
            setValueYear={setValueYear}
            setIsLoading={setIsLoading}
          />
          {expense?.institutions?.length ? (
            <Institution />
          ) : (
            <WithoutInstitution />
          )}
        </>
      )}
    </Scontainer>
  );
}

export default Home;
