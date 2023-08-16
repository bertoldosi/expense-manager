import React, { useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";

import { Institution } from "@containers/Home/Institution";
import WithoutInstitution from "@containers/Home/Institution/WithoutInstitution";
import { userContextData, userContextDataType } from "@context/userContextData";

import { Scontainer } from "./styles";
import InstitutionMenuFilter from "./InstitutionMenuFilter";
import instances from "@lib/axios-instance-internal";
import { ExpenseType } from "@interfaces/*";
import { useSession } from "next-auth/react";
import moment from "moment";

function Home() {
  const cookies = new Cookies();
  const { data: session } = useSession();

  const { expense, setExpense, setSelectedInstitution, getInstitution } =
    useContext(userContextData) as userContextDataType;

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

  async function persistData(expense: ExpenseType) {
    const cookieValues = cookies.get("expense-manager");
    setExpense(expense);

    const firstInstitution = expense.institutions?.length
      ? expense.institutions[0]
      : null;

    const cookiesData = {
      filter: {
        expense: {
          id: expense.id,
          name: expense.name,
        },
        institution: firstInstitution && {
          id: firstInstitution.id,
          name: firstInstitution.name,
        },
        institutions: {
          createAt: cookieValues.filter.institutions.createAt,
        },
      },
    };

    if (firstInstitution) {
      setSelectedInstitution(firstInstitution);
      await getInstitution(firstInstitution.id);
    }

    cookies.set("expense-manager", cookiesData);
  }

  async function fethExpense(userEmail: string) {
    const cookieValues = cookies.get("expense-manager");

    const { data: user } = await instances.get("api/user", {
      params: {
        email: userEmail,
      },
    });

    if (user?.expense) {
      const { data: expense } = await instances.get("api/expense", {
        params: {
          id: user.expense.id,
          institutionsCreateAt: cookieValues.filter.institutions.createAt,
        },
      });
      await persistData(expense);
    } else {
      const { data: expense } = await instances.post("api/expense", {
        name: "default",
        userEmail,
      });

      await persistData(expense);
    }
  }

  async function setDateFilter() {
    const cookieValues = cookies.get("expense-manager");

    if (cookieValues?.filter?.institutions?.createAt) {
      const fullDateCookies = cookieValues?.filter?.institutions?.createAt;

      const [_day, month, year] = fullDateCookies.split("/");

      setValueYear(Number(year));
      setValueMonth(month);
    } else {
      const date = moment().format("DD/MM/YYYY");
      const [_day, month, year] = date.split("/");

      const newCookies = {
        ...cookieValues,
        filter: {
          ...cookieValues?.filter,
          institutions: {
            createAt: `01/${month}/${year}`,
          },
        },
      };

      cookies.set("expense-manager", newCookies);

      setValueYear(Number(year));
      setValueMonth(month);
    }
  }

  useEffect(() => {
    setDateFilter();
  }, []);

  useEffect(() => {
    if (session?.user?.email) {
      fethExpense(session.user.email);
    }
  }, [session?.user]);

  if (expense?.institutions?.length) {
    return (
      <Scontainer>
        <InstitutionMenuFilter
          valueMonth={valueMonth}
          valueYear={valueYear}
          setValueMonth={setValueMonth}
          setValueYear={setValueYear}
        />
        <Institution />
      </Scontainer>
    );
  }

  return (
    <Scontainer>
      <InstitutionMenuFilter
        valueMonth={valueMonth}
        valueYear={valueYear}
        setValueMonth={setValueMonth}
        setValueYear={setValueYear}
      />
      <WithoutInstitution />
    </Scontainer>
  );
}

export default Home;
