import React from "react";
import Table from "@containers/Dash/ChartPie";
import { ShoppingGroupInterface } from "@interfaces/*";
import InputSelect from "@commons/InputSelect";
import { Button } from "@commons/Button";
import Cookies from "universal-cookie";
import { userContext, userContextType } from "@context/userContext";
import { useRouter } from "next/router";
import { Sactions, Scontainer, SfilterWrapper } from "./styles";

interface CookieValuesType {
  filter: {
    dateSelected: string;
  };
}

interface FilterAllShoppingsResponse {
  filters: {
    optionsSelect: string[];
  };
  shoppings: ShoppingGroupInterface[];
}

const keyCookies = "expense-manager";

function Dash() {
  const router = useRouter();
  const cookies = new Cookies();
  const requestIdRef = React.useRef(0);
  const userData = React.useContext(userContext) as userContextType | null;

  function getCookieCreateAt() {
    const cookieValues: CookieValuesType = cookies.get(keyCookies);

    return cookieValues?.filter?.dateSelected || "";
  }

  const [shoppingGroups, setShoppingGroups] = React.useState<
    ShoppingGroupInterface[]
  >([]);
  const [categories, setCategories] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [createAt, setCreateAt] = React.useState<string>(() =>
    getCookieCreateAt(),
  );

  const institutionCreateAt = userData?.institution?.createAt || "";
  const cookieCreateAt = getCookieCreateAt();

  React.useEffect(() => {
    if (!institutionCreateAt || institutionCreateAt === createAt) {
      return;
    }

    setCreateAt(institutionCreateAt);
    setSelectedCategory("all");
  }, [institutionCreateAt, createAt]);

  React.useEffect(() => {
    if (!cookieCreateAt || cookieCreateAt === createAt) {
      return;
    }

    setCreateAt(cookieCreateAt);
    setSelectedCategory("all");
  }, [cookieCreateAt, createAt]);

  async function fetchShoppings(
    currentCategory: string,
    currentCreateAt: string,
  ) {
    if (!currentCreateAt) {
      return;
    }

    const categoryQueryString =
      currentCategory === "all"
        ? ""
        : `category=${encodeURIComponent(currentCategory)}&`;

    try {
      const response = await fetch(
        `/api/filter-all-shoppings?${categoryQueryString}createAt=${encodeURIComponent(currentCreateAt)}`,
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data: FilterAllShoppingsResponse = await response.json();

      return data;
    } catch (error) {
      console.error("Error fetching shoppings:", error);
    }
  }

  React.useEffect(() => {
    const requestId = ++requestIdRef.current;
    setIsLoading(true);

    fetchShoppings(selectedCategory, createAt).then((data) => {
      if (!data || requestId !== requestIdRef.current) {
        if (requestId === requestIdRef.current) {
          setIsLoading(false);
        }
        return;
      }

      setShoppingGroups(data.shoppings || []);
      setCategories(data.filters?.optionsSelect || []);
      setIsLoading(false);
    });
  }, [selectedCategory, createAt]);

  return (
    <Scontainer>
      <Sactions>
        <SfilterWrapper>
          <InputSelect
            id="category"
            name="category"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            defaultOption={{ value: "all", label: "Todas" }}
            withOutPadding
            options={categories.map((category) => ({
              value: category,
              label: category,
            }))}
          />
        </SfilterWrapper>

        <Button
          text="Voltar para inicio"
          width="16rem"
          height="3.4rem"
          onClick={() => router.push("/")}
        />
      </Sactions>
      <Table shoppingGroups={shoppingGroups} isLoading={isLoading} />
    </Scontainer>
  );
}

export default Dash;
