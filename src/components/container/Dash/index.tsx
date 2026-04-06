import React, { useContext } from "react";
import { BsChevronDown } from "@icons/BsChevronDown";
import { Modal } from "@commons/Modal";
import { SelectDate } from "@commons/SelectDate";
import {
  UserContextConfig,
  UserContextConfigType,
} from "@context/userContextConfig";

interface GetShoppingType {
  id: string;
  description: string;
  createAt: string;
  category: string;
  amount: number;
  institutionId: string;
}

const dates = [
  { name: "JAN", number: "01" },
  { name: "FEV", number: "02" },
  { name: "MAR", number: "03" },
  { name: "ABR", number: "04" },
  { name: "MAI", number: "05" },
  { name: "JUN", number: "06" },
  { name: "JUL", number: "07" },
  { name: "AGO", number: "08" },
  { name: "SET", number: "09" },
  { name: "OUT", number: "10" },
  { name: "NOV", number: "11" },
  { name: "DEZ", number: "12" },
];

function Edit() {
  const { theme } = useContext(UserContextConfig) as UserContextConfigType;

  const currentDate = new Date();
  const [shoppings, setShoppings] = React.useState<GetShoppingType[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [categories, setCategories] = React.useState<string[]>([]);
  const [valueYear, setValueYear] = React.useState<number>(
    currentDate.getFullYear(),
  );
  const [valueMonth, setValueMonth] = React.useState<string>(
    String(currentDate.getMonth() + 1).padStart(2, "0"),
  );
  const [isOptionsModalVisible, setOptionsModalVisible] =
    React.useState<boolean>(false);

  function handlerIsVisibleModal() {
    setOptionsModalVisible((prev) => !prev);
  }

  function selectDate(numberMonth: string, numberYear: number) {
    setValueMonth(numberMonth);
    setValueYear(numberYear);
    setOptionsModalVisible(false);
  }

  function renderNameMonth(number: string): string {
    const nameMonth = dates.find((date) => date.number === number);
    return nameMonth?.name || "";
  }

  function formatSelectedMonthYear(month: string, year: number): string {
    const monthNumber = Number(month);

    if (!Number.isInteger(monthNumber) || monthNumber < 1 || monthNumber > 12) {
      return `${renderNameMonth(month)} de ${year}`;
    }

    const date = new Date(year, monthNumber - 1, 1);
    const formatted = new Intl.DateTimeFormat("pt-BR", {
      month: "short",
      year: "numeric",
    }).format(date);

    return formatted.replace(".", "");
  }

  function formatDatePtBr(dateValue: string): string {
    const parsedDate = new Date(dateValue);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return new Intl.DateTimeFormat("pt-BR").format(parsedDate);
  }

  async function fetchShoppings(category: string, month: string, year: number) {
    try {
      const query = new URLSearchParams({
        month,
        year: String(year),
      });

      if (category !== "all") {
        query.append("category", category);
      }

      const response = await fetch(
        `/api/filter-all-shoppings?${query.toString()}`,
      );
      const data: GetShoppingType[] = await response.json();
      console.log("Fetched shoppings:", data);
      setShoppings(data);

      if (category === "all") {
        const uniqueCategories = new Set(
          data.map((shopping) => shopping.category),
        );
        setCategories(Array.from(uniqueCategories));
      }
    } catch (error) {
      console.error("Error fetching shoppings:", error);
    }
  }

  React.useEffect(() => {
    fetchShoppings(selectedCategory, valueMonth, valueYear);
  }, [selectedCategory, valueMonth, valueYear]);

  return (
    <div>
      <h1>Lista de Compras</h1>

      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
          }}
          onClick={handlerIsVisibleModal}
        >
          <strong>{formatSelectedMonthYear(valueMonth, valueYear)}</strong>

          <BsChevronDown
            width="2rem"
            height="2rem"
            fill={theme.values.textSecondary}
            stroke={theme.values.textSecondary}
          />
        </div>
      </div>

      <label htmlFor="category-filter">Filtrar por categoria: </label>
      <select
        id="category-filter"
        value={selectedCategory}
        onChange={(event) => setSelectedCategory(event.target.value)}
      >
        <option value="all">Todas</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {shoppings.map((shopping) => (
            <tr key={shopping.id}>
              <td>{formatDatePtBr(shopping.createAt)}</td>
              <td>{shopping.description}</td>
              <td>{shopping.category}</td>
              <td>{shopping.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isVisible={isOptionsModalVisible}
        handlerIsVisible={handlerIsVisibleModal}
        title="Escolhe o mês que deseja visualizar"
      >
        <SelectDate
          valueYear={valueYear}
          handlerYear={setValueYear}
          valueMonth={valueMonth}
          selectDate={selectDate}
          dates={dates}
        />
      </Modal>
    </div>
  );
}

export default Edit;
