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

interface DashFiltersType {
  createAt: string;
  category: string;
}

const keyCookies = "expense-manager";

function Dash() {
  const cookies = new Cookies();

  const [shoppingGroups, setShoppingGroups] = React.useState<
    ShoppingGroupInterface[]
  >([]);
  const [categories, setCategories] = React.useState<string[]>([]);
  const [filters, setFilters] = React.useState<DashFiltersType>(() => {
    const cookieValues: CookieValuesType = cookies.get(keyCookies);

    return {
      createAt: cookieValues?.filter?.dateSelected || "",
      category: "all",
    };
  });

  async function fetchShoppings() {
    const categoryQueryString =
      filters.category === "all" ? "" : `category=${filters.category}&`;

    try {
      const response = await fetch(
        `/api/filter-all-shoppings?${categoryQueryString}createAt=${filters.createAt}`,
      );
      const data: FilterAllShoppingsResponse = await response.json();

      setShoppingGroups(data?.shoppings || []);
      setCategories(data?.filters?.optionsSelect || []);
    } catch (error) {
      console.error("Error fetching shoppings:", error);
    }
  }

  React.useEffect(() => {
    fetchShoppings();
  }, [filters]);

  return (
    <Scontainer>
      <SfilterWrapper>
        <InputSelect
          id="category"
          name="category"
          value={filters.category}
          onChange={(event) =>
            setFilters((prev) => ({
              ...prev,
              category: event.target.value,
            }))
          }
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
