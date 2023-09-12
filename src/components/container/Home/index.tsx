import React, { useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import moment from "moment";

import { Institution } from "@containers/Home/Institution";
import WithoutInstitution from "@containers/Home/Institution/WithoutInstitution";

import { Scontainer } from "./styles";
import InstitutionMenuFilter from "./InstitutionMenuFilter";
import { useSession } from "next-auth/react";
import { userContext, userContextType } from "@context/userContext";

const keyCookies = "expense-manager";

function Home() {
  const cookies = new Cookies();

  const { data: session } = useSession();
  const { expense } = useContext(userContext) as userContextType;

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

  function getUser(email: string) {
    console.log(email);
  }

  // function persistCookies(expense: ExpenseType) {
  //   const cookieValues = cookies.get(keyCookies);
  //   setExpense(expense);

  //   /* sempre persistir o expense do user*/
  //   cookies.set(keyCookies, {
  //     ...cookieValues,
  //     filter: {
  //       ...cookieValues.filter,
  //       expense: {
  //         id: expense.id,
  //         name: expense.name,
  //       },
  //     },
  //   });

  //   const institutionCookies = cookieValues?.filter?.institution;
  //   const firstInstitutionExpense = expense?.institutions?.length
  //     ? expense.institutions[0]
  //     : null;

  //   /* se existir institution no cookies*/
  //   if (institutionCookies) {
  //     //verificar se dentro da instituições, existe essa salva no cookies

  //     const existInstitutionInInstitutions = expense?.institutions?.length
  //       ? expense.institutions.find(
  //           (findInstitution) =>
  //             findInstitution.name === institutionCookies.name
  //         )
  //       : null;

  //     if (existInstitutionInInstitutions) {
  //       setSelectedInstitution(existInstitutionInInstitutions);
  //       setInstitution(existInstitutionInInstitutions);
  //     } else {
  //       setSelectedInstitution(null);
  //       setInstitution(null);

  //       cookies.set(keyCookies, {
  //         ...cookieValues,
  //         filter: {
  //           ...cookieValues.filter,
  //           institution: null,
  //         },
  //       });
  //     }
  //   } else {
  //     setSelectedInstitution(firstInstitutionExpense);
  //     setInstitution(firstInstitutionExpense);

  //     cookies.set(keyCookies, {
  //       ...cookieValues,
  //       filter: {
  //         ...cookieValues.filter,
  //         institution: firstInstitutionExpense
  //           ? {
  //               id: firstInstitutionExpense?.id,
  //               name: firstInstitutionExpense?.name,
  //             }
  //           : null,
  //       },
  //     });
  //   }
  // }

  // async function createExpense(user: UserType) {
  //   await instances
  //     .post("api/expense", {
  //       name: "default",
  //       userEmail: user.email,
  //     })
  //     .then(({ data: expense }) => {
  //       return persistCookies(expense);
  //     })
  //     .catch((error) => {
  //       console.log("error ao criar expense", error);
  //     });
  // }

  // async function fecthUser(email: string) {
  //   const cookieValues = cookies.get(keyCookies);

  //   await instances
  //     .get("api/user", {
  //       params: {
  //         email,
  //       },
  //     })
  //     .then(async ({ data: user }) => {
  //       //criar novo gasto caso o usuario não possua
  //       if (!user?.expense) {
  //         return await createExpense(user);
  //       }

  //       await instances
  //         .get("api/institution", {
  //           params: {
  //             createAt: cookieValues?.filter?.institutions?.createAt,
  //             expenseId: user?.expense?.id,
  //           },
  //         })
  //         .then(({ data: institutions }) => {
  //           const expenseGet = {
  //             ...user.expense,
  //             institutions,
  //           };

  //           setUser({ ...user, expense: expenseGet });
  //           setExpense(expenseGet);
  //           persistCookies(expenseGet);
  //         });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //   setIsLoading(false);
  // }

  useEffect(() => {
    initializationDate();
  }, []);

  useEffect(() => {
    const userEmail = session?.user?.email;
    if (userEmail) {
      getUser(userEmail);
    }
  }, [session]);

  // useEffect(() => {
  //   if (session?.user?.email) {
  //     fecthUser(session.user.email);
  //   }
  // }, [session]);

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
