import React, { useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";

import { Institution } from "@containers/Home/Institution";
import WithoutInstitution from "@containers/Home/Institution/WithoutInstitution";

import { Scontainer } from "./styles";
import InstitutionMenuFilter from "./InstitutionMenuFilter";
import instances from "@lib/axios-instance-internal";
import { ExpenseType } from "@interfaces/*";
import { useSession } from "next-auth/react";
import moment from "moment";
import { userContext, userContextType } from "@context/userContext";

const keyCookies = "expense-manager";

function Home() {
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

  const cookies = new Cookies();

  const { data: session } = useSession();
  const { setUser, setExpense, setInstitution, expense } = useContext(
    userContext
  ) as userContextType;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function persistCookies(expense: ExpenseType) {
    const cookieValues = cookies.get(keyCookies);

    const institutionCookies = cookieValues?.filter?.institution;
    const firstInstitutionExpense = expense?.institutions?.length
      ? expense.institutions[0]
      : null;

    /* se existir institution no cookies*/
    if (institutionCookies) {
      const institution = expense?.institutions?.find(
        (institution) => institution.name === institutionCookies.name
      );

      setInstitution(institution);
    } else {
      /* se não existir institution no cookies */

      if (firstInstitutionExpense) {
        setInstitution(firstInstitutionExpense);

        cookies.set(keyCookies, {
          ...cookieValues,
          filter: {
            institution: {
              id: firstInstitutionExpense?.id,
              name: firstInstitutionExpense?.name,
            },
          },
        });
      } else {
        cookies.set(keyCookies, {
          ...cookieValues,
          filter: {
            institution: null,
          },
        });
      }
    }
  }

  async function fecthUser(email: string) {
    await instances
      .get("api/user", {
        params: {
          email,
        },
      })
      .then(({ data: user }) => {
        setUser(user);
        setExpense(user.expense);
        persistCookies(user.expense);
      })
      .catch((error) => {
        console.log(error);
      });

    setIsLoading(false);
  }

  useEffect(() => {
    if (session?.user?.email) {
      fecthUser(session.user.email);
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
