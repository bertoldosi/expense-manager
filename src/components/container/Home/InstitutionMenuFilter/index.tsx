import React, { useContext, useState } from "react";
import Cookies from "universal-cookie";

import { BsChevronDown } from "@icons/BsChevronDown";
import { Modal } from "@commons/Modal";

import instances from "@lib/axios-instance-internal";
import { ExpenseType } from "@interfaces/*";

import { Scontainer, Sdate } from "./styles";
import { SelectDate } from "@commons/SelectDate";
import {
  UserContextConfig,
  UserContextConfigType,
} from "@context/userContextConfig";
import { userContext, userContextType } from "@context/userContext";

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

interface InstitutionMenuFilterType {
  valueMonth: string;
  valueYear: number;
  setValueMonth: Function;
  setValueYear: Function;
  setIsLoading: Function;
}

const keyCookies = "expense-manager";

function InstitutionMenuFilter({
  valueMonth,
  valueYear,
  setValueMonth,
  setValueYear,
  setIsLoading,
}: InstitutionMenuFilterType) {
  const cookies = new Cookies();

  const { setInstitution, setExpense, setSelectedInstitution } = useContext(
    userContext
  ) as userContextType;

  const { theme } = useContext(UserContextConfig) as UserContextConfigType;

  const [isOptionsModalVisible, setOptionsModalVisible] = useState(false);

  function handlerIsVisibleModal() {
    setOptionsModalVisible((prev) => !prev);
  }

  async function filter(numberMonth: string, numberYear: number) {
    const cookieValues = cookies.get("expense-manager");
    const dateSelected = `01/${numberMonth}/${numberYear}`;

    const newCookieValues = {
      ...cookieValues,
      filter: {
        ...cookieValues?.filter,
        dateSelected,
      },
    };

    const { data: expenseGet } = await instances.get("api/v2/expense", {
      params: {
        id: cookieValues?.filter?.expense?.id,
        institutionCreateAt: cookieValues?.filter?.dateSelected,
      },
    });

    setExpense(expenseGet);
    setInstitution(null);
    setSelectedInstitution();
    setOptionsModalVisible(false);
    cookies.set(keyCookies, newCookieValues);

    setIsLoading(false);
  }

  function selectDate(numberMonth: string, numberYear: number) {
    setIsLoading(true);
    setValueMonth(numberMonth);
    setValueYear(numberYear);

    filter(numberMonth, numberYear);
    setOptionsModalVisible(false);
  }

  function renderNameMonth(number: string): string {
    const nameMonth = dates.find((date) => date.number == number);

    return nameMonth?.name || "";
  }

  return (
    <>
      <Scontainer>
        <Sdate onClick={handlerIsVisibleModal}>
          <div>
            <strong>{renderNameMonth(valueMonth || "")}</strong>
            <span>de</span>
            <strong>{valueYear}</strong>
          </div>

          <BsChevronDown
            width="2rem"
            height="2rem"
            fill={theme.values.textSecondary}
            stroke={theme.values.textSecondary}
          />
        </Sdate>
      </Scontainer>

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
    </>
  );
}

export default InstitutionMenuFilter;
