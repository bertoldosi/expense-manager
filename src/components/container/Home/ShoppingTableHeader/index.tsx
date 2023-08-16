import React, { useContext, useMemo, useState } from "react";
import instances from "@lib/axios-instance-internal";
import Cookies from "universal-cookie";
import { useFormik } from "formik";
import { useRouter } from "next/router";

import { customToast } from "@commons/CustomToast";
import { Button } from "@commons/Button";
import { Modal } from "@commons/Modal";

import { InstitutionType, ShoppingType } from "@interfaces/*";
import { schemaFilter } from "./validations";
import { userContextData, userContextDataType } from "@context/userContextData";
import InputTable from "@commons/InputTable";
import { Filter } from "@icons/Filter";
import InputSelect from "@commons/InputSelect";

import {
  SbuttonsOptions,
  Sfilterform,
  Scontent,
  ScontentModal,
  Sfilter,
  SselectingAll,
} from "./styles";

const INITIAL_OPTIONS = {
  category: "all",
};

function ShoppingTableHeader() {
  const router = useRouter();

  const {
    getInstitution,
    institution,
    setInstitution,
    getExpense,
    categories,
  } = useContext(userContextData) as userContextDataType;

  const [isModalFilterVisible, setIsModalFilterVisible] =
    useState<boolean>(false);
  const [valueSelectingAllShoppings, setValueSelectingAllShoppings] =
    useState<boolean>(false);
  const [shoppingsSeleceted, setShoppingsSelected] = useState<ShoppingType[]>(
    []
  );

  useMemo(() => {
    const shoppings = institution?.shoppings?.filter(
      (shoppingFilter) => shoppingFilter.selected
    );

    setShoppingsSelected(shoppings || []);
  }, [institution?.shoppings]);

  function handleModalUpdate() {
    const items = JSON.stringify(shoppingsSeleceted);
    localStorage.setItem(
      "expense-manager-editing-shoppings",
      JSON.stringify(items)
    );

    router.push("/editar");
  }

  function openModalFilter() {
    setIsModalFilterVisible(!isModalFilterVisible);
  }

  function exitModalFilter() {
    setIsModalFilterVisible(!isModalFilterVisible);
  }

  function selectingAllShoppings(ev: React.ChangeEvent<HTMLInputElement>) {
    const { checked } = ev.target;
    setValueSelectingAllShoppings(checked);

    setInstitution((prevInstitution: InstitutionType) => ({
      ...prevInstitution,
      shoppings: prevInstitution.shoppings?.map((shoppingMap) => ({
        ...shoppingMap,
        selected: checked,
      })),
    }));
  }

  async function fethInstitutionAndExpense() {
    const cookies = new Cookies();
    const cookieValues = cookies.get("expense-manager");

    await getInstitution(cookieValues?.filter?.institution?.id);
    await getExpense(
      cookieValues?.filter.expense.id,
      cookieValues?.filter.institutions.createAt
    );
  }

  async function deleteShoppings() {
    async function requestDelete() {
      return await instances
        .delete("api/shopping", {
          data: {
            shoppings: shoppingsSeleceted,
          },
        })
        .then(async () => {
          await fethInstitutionAndExpense();
          setValueSelectingAllShoppings(false);
        });
    }

    await customToast(requestDelete);
  }

  async function filterShoppings(values: { category: string }) {
    const category = values.category === "all" ? "" : values.category;

    async function requestFilter() {
      return await instances
        .get("api/shopping", {
          params: {
            category: category,
            institutionId: institution?.id,
          },
        })
        .then((response) => {
          setInstitution((prevInstitution: ShoppingType) => ({
            ...prevInstitution,
            shoppings: response.data,
          }));
          setIsModalFilterVisible(false);
        });
    }

    await customToast(requestFilter);
  }

  const onSubmitFilterShopping = useFormik({
    initialValues: INITIAL_OPTIONS,
    onSubmit: async (values) => {
      await filterShoppings(values);
    },

    validationSchema: schemaFilter,
  });

  return (
    <>
      <Scontent>
        <SselectingAll>
          <InputTable
            id="selectingAll"
            type="checkbox"
            name="selectingAll"
            checked={valueSelectingAllShoppings}
            onChange={selectingAllShoppings}
          />
          <span>Todos</span>
        </SselectingAll>

        <SbuttonsOptions>
          <Sfilter onClick={openModalFilter}>
            <Filter width="2rem" height="2rem" />
            <span>{onSubmitFilterShopping.values.category}</span>
          </Sfilter>

          {shoppingsSeleceted.length ? (
            <>
              <Button
                text="Editar"
                width="30rem"
                height="2.5rem"
                onClick={handleModalUpdate}
              />
              <Button
                text="Excluir"
                width="30rem"
                height="2.5rem"
                typeButton="delete"
                onClick={deleteShoppings}
              />
            </>
          ) : (
            ""
          )}
        </SbuttonsOptions>
      </Scontent>

      <Modal
        title="Filtrando itens"
        isVisible={isModalFilterVisible}
        handlerIsVisible={exitModalFilter}
      >
        <ScontentModal>
          <Sfilterform onSubmit={onSubmitFilterShopping.handleSubmit}>
            <InputSelect
              name="category"
              id="category"
              value={onSubmitFilterShopping.values.category}
              onChange={onSubmitFilterShopping.handleChange}
              defaultOption={{ value: "all", label: "Todos" }}
              options={categories.map((option) => ({
                value: option.category,
                label: option.category,
              }))}
            />
            <Button text="Filtrar" type="submit" width="20rem" />
          </Sfilterform>
        </ScontentModal>
      </Modal>
    </>
  );
}

export default ShoppingTableHeader;
