import React, { useContext, useState } from "react";
import Cookies from "universal-cookie";

import ShoppingTableHeader from "@containers/Home/ShoppingTableHeader";
import InputTable from "@commons/InputTable";

import { NoResult, Scontent, SrowTable } from "./styles";
import { userContextData, userContextDataType } from "@context/userContextData";
import { InstitutionType, ShoppingType } from "@interfaces/*";
import instances from "@lib/axios-instance-internal";
import { customToast } from "@commons/CustomToast";
import { formatedInputValue } from "@helpers/formatedInputValue";
import InputSelectTable from "@commons/InputSelectTable ";
import { Button } from "@commons/Button";

const options = [
  { label: "Aberto", value: "open" },
  { label: "Pago", value: "closed" },
];

function ShoppingTable() {
  const cookies = new Cookies();

  const [idShoppingUpdate, setIdShoppingUpdate] = useState<string>("");
  const { institution, getInstitution, setInstitution, getExpense } =
    useContext(userContextData) as userContextDataType;

  async function fethInstitutionAndExpense() {
    const cookieValues = cookies.get("expense-manager");

    getInstitution(cookieValues?.filter?.institution?.id);
    getExpense(
      cookieValues?.filter.expense.id,
      cookieValues?.filter.institutions.createAt
    );
  }

  function onChangeShopping(ev: React.ChangeEvent<HTMLInputElement>) {
    const { id, name, value, checked } = ev.target;
    if (name != "selected") {
      setIdShoppingUpdate(id);
    }

    setInstitution((prevInstitution: InstitutionType) => {
      return {
        ...prevInstitution,
        shoppings: prevInstitution.shoppings?.map((shoppingMap) => {
          if (shoppingMap.id === id) {
            return {
              ...shoppingMap,
              [name]:
                name != "selected" ? formatedInputValue(value, name) : checked,
            };
          }

          return shoppingMap;
        }),
      };
    });
  }

  async function onChangeStatus(
    ev: React.ChangeEvent<HTMLInputElement>,
    shopping: ShoppingType
  ) {
    const { value } = ev.target;

    onChangeShopping(ev);
    await updateShopping({ ...shopping, paymentStatus: value });
  }

  async function updateShopping(shopping: ShoppingType) {
    setIdShoppingUpdate("");

    async function requestUpdate() {
      return await instances
        .put("api/shopping", {
          ...shopping,
          amount: shopping.amount.replace(/,/g, ""),
        })
        .then(async () => {
          await fethInstitutionAndExpense();
        });
    }

    await customToast(requestUpdate);
  }

  return (
    <>
      <ShoppingTableHeader />
      <Scontent>
        {institution?.shoppings?.length ? (
          institution?.shoppings.map((shoppingMap, index) => (
            <SrowTable
              selected={shoppingMap.selected || false}
              key={index}
              paymentStatus={shoppingMap.paymentStatus as "closed" | "open"}
            >
              <strong>
                <InputTable
                  id={shoppingMap.id}
                  type="checkbox"
                  name="selected"
                  checked={shoppingMap.selected}
                  onChange={onChangeShopping}
                />
                <InputTable
                  id={shoppingMap.id}
                  name="description"
                  handleEnter={() => {
                    updateShopping(shoppingMap);
                  }}
                  value={shoppingMap.description || ""}
                  onChange={onChangeShopping}
                />
              </strong>
              <strong>
                <InputTable
                  id={shoppingMap.id}
                  name="amount"
                  handleEnter={() => {
                    updateShopping(shoppingMap);
                  }}
                  value={formatedInputValue(shoppingMap.amount, "amount") || ""}
                  onChange={onChangeShopping}
                />
              </strong>
              <strong>
                <InputTable
                  id={shoppingMap.id}
                  name="category"
                  handleEnter={() => {
                    updateShopping(shoppingMap);
                  }}
                  value={shoppingMap.category || ""}
                  onChange={onChangeShopping}
                />
              </strong>
              <strong>
                <InputSelectTable
                  options={options}
                  id={shoppingMap.id}
                  name="paymentStatus"
                  value={shoppingMap.paymentStatus}
                  onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                    onChangeStatus(ev, shoppingMap);
                  }}
                />

                {idShoppingUpdate === shoppingMap.id && (
                  <Button
                    text="Salvar"
                    width="10rem"
                    height="2rem"
                    onClick={() => {
                      updateShopping(shoppingMap);
                    }}
                  />
                )}
              </strong>
            </SrowTable>
          ))
        ) : (
          <NoResult>
            <span>Nenhum resultado encontrado!</span>
          </NoResult>
        )}
      </Scontent>
    </>
  );
}

export default ShoppingTable;
