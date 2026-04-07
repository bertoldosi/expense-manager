import React from "react";
import Table from "@containers/Dash/ChartPie";
import { ShoppingGroupInterface } from "@interfaces/*";
import InputSelect from "@commons/InputSelect";
import Cookies from "universal-cookie";
import { Scontainer, SfilterWrapper } from "./styles";

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
  const cookies = new Cookies();
  const requestIdRef = React.useRef(0);

  function getCookieCreateAt() {
    const cookieValues: CookieValuesType = cookies.get(keyCookies);

    return cookieValues?.filter?.dateSelected || "";
  }

  const [shoppingGroups, setShoppingGroups] = React.useState<
    ShoppingGroupInterface[]
  >([]);
  const [categories, setCategories] = React.useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [createAt, setCreateAt] = React.useState<string>(() =>
    getCookieCreateAt(),
  );

  const cookieCreateAt = getCookieCreateAt();

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

    fetchShoppings(selectedCategory, createAt).then((data) => {
      if (!data || requestId !== requestIdRef.current) {
        return;
      }

      setShoppingGroups(data.shoppings || []);
      setCategories(data.filters?.optionsSelect || []);
    });
  }, [selectedCategory, createAt]);

  return (
    <Scontainer>
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
      <Table shoppingGroups={shoppingGroups} />
    </Scontainer>
  );
}

export default Dash;
