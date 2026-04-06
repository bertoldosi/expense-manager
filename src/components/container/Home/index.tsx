import React, { useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";

import { Institution } from "@containers/Home/Institution";
import WithoutInstitution from "@containers/Home/Institution/WithoutInstitution";

import { Scontainer } from "./styles";
import { useSession } from "next-auth/react";
import { userContext, userContextType } from "@context/userContext";
import instances from "@lib/axios-instance-internal";
import { Loading } from "@commons/Loading";
import { ExpenseInterface, InstitutionInterface } from "@interfaces/*";

interface InstitutionType extends InstitutionInterface {}
interface GetUserResponseType {
  data: {
    email: string;
    expense: ExpenseInterface;
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
  const { expense, setExpense, setInstitution, getExpense } = useContext(
    userContext,
  ) as userContextType;

  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function findExpense(expenseId: string) {
    const cookieValues: CookieValuesType = cookies.get(keyCookies);
    const institutionCreateAt = cookieValues?.filter?.dateSelected;

    getExpense(expenseId, institutionCreateAt);
    setIsLoading(false);
  }

  async function createExpense(userEmail: string) {
    const cookieValues = cookies.get(keyCookies);

    const { data: expenseCreate } = await instances.post("api/expenses", {
      name: "default",
      userEmail: userEmail,
    });

    const newCookieValues = {
      ...cookieValues,
      filter: {
        ...cookieValues?.filter,
        expense: {
          id: expenseCreate.id,
          name: expenseCreate?.name,
        },
      },
    };
    cookies.set(keyCookies, newCookieValues);

    setExpense(expenseCreate);
    setInstitution(null);
    setIsLoading(false);
  }

  async function getUser(email: string) {
    const { data: user }: GetUserResponseType = await instances.get(
      "api/users",
      {
        params: {
          email: email,
        },
      },
    );

    // verificamos se o usuario ja tem um gasto cadastrado
    const isExpenseExist = user?.expense?.id;

    //pegamos o gasto, caso ela ja tenha
    if (isExpenseExist) return findExpense(user?.expense?.id);

    //criamos um gasto, caso ela não tenha
    return createExpense(user.email);
  }

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
      ) : expense?.institutions?.length ? (
        <Institution />
      ) : (
        <WithoutInstitution />
      )}
    </Scontainer>
  );
}

export default Home;
