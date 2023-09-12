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

interface InstitutionType {
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

interface CookiesValuesType {
  filter: {
    dateSelected: string;
  };
}

const keyCookies = "expense-manager";

function Home() {
  const cookies = new Cookies();

  const { data: session } = useSession();
  const { expense, setExpense } = useContext(userContext) as userContextType;

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

  function persistDate(date: string) {
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
      return persistDate(createAt);
    }

    // caso não exista uma data já selecionada, pegamos a data atual e salvamos localmente
    getDateNow();
  }

  async function getExpense(expenseId: string) {
    const cookiesValues: CookiesValuesType = cookies.get(keyCookies);

    const { data: expenseGet } = await instances.get("api/v2/expense", {
      params: {
        id: expenseId,
        institutionCreateAt: cookiesValues?.filter?.dateSelected,
      },
    });

    setExpense(expenseGet);
    setIsLoading(false);
  }

  async function createExpense(userEmail: string) {
    const expenseCreate = await instances.post("api/v2/expense", {
      name: "default",
      userEmail: userEmail,
    });

    setIsLoading(false);
    setExpense(expenseCreate);
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
        <h1>Carregando...</h1>
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
