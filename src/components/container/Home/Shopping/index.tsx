import React, { useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useFormik } from "formik";

import Input from "@commons/Input";
import { Button } from "@commons/Button";
import ShoppingTable from "@containers/Home/ShoppingTable";

import { Scontent, Sheader } from "./styles";
import validationSchema from "@containers/Home/Shopping/validations";
import instances from "@lib/axios-instance-internal";
import { userContextData, userContextDataType } from "@context/userContextData";
import { customToast } from "@commons/CustomToast";
import { formatedInputValue } from "@helpers/formatedInputValue";
import { focusInput } from "@helpers/focusInput";
import useIsMobile from "@hooks/useIsMobile";

interface ShoppingCreateType {
  description: string;
  amount: string;
  category: string;
  paymentStatus: string;
  selected?: boolean;
  institutionId?: string;
}
interface FilterType {
  institution: {
    id: string;
  };
  expense: {
    id: string;
  };

  institutions: {
    createAt: string;
  };
}

const INITIAL_SHOPPING = {
  description: "",
  amount: "",
  category: "",
  paymentStatus: "open",
};

function Shopping() {
  const cookies = new Cookies();
  const { isMobile } = useIsMobile();

  const { getInstitution, getExpense } = useContext(
    userContextData
  ) as userContextDataType;

  async function createShopping(
    shopping: ShoppingCreateType,
    filter: FilterType
  ) {
    async function requestCreate() {
      return await instances
        .post("api/shopping", {
          shopping: {
            ...shopping,
            amount: shopping.amount.replace(/,/g, ""),
          },
          institutionId: filter.institution.id,
        })
        .then(() => {
          if (!isMobile) {
            focusInput("description");
          }
          getInstitution(filter.institution.id);
          getExpense(filter.expense.id, filter.institutions.createAt);
        });
    }

    await customToast(requestCreate);
  }

  const onSubmitShopping = useFormik({
    initialValues: INITIAL_SHOPPING,
    onSubmit: async (values) => {
      const { filter = {} } = cookies.get("expense-manager");

      const shopping = {
        ...values,
        category: values.category ? values.category : "sem",
      };

      await createShopping(shopping, filter);

      onSubmitShopping.resetForm();
    },

    validationSchema,
  });

  return (
    <Scontent>
      <Sheader onSubmit={onSubmitShopping.handleSubmit}>
        <Input
          name="description"
          id="description"
          autoFocus={!isMobile}
          autoComplete="off"
          placeholder="Descrição do item"
          value={onSubmitShopping.values.description}
          onChange={onSubmitShopping.handleChange}
          error={onSubmitShopping.errors.description}
        />
        <Input
          name="amount"
          id="amount"
          autoComplete="off"
          placeholder="R$ 00,00"
          value={formatedInputValue(onSubmitShopping.values.amount, "amount")}
          onChange={onSubmitShopping.handleChange}
          error={onSubmitShopping.errors.amount}
        />
        <Input
          name="category"
          id="category"
          autoComplete="off"
          value={onSubmitShopping.values.category}
          onChange={onSubmitShopping.handleChange}
          placeholder="Nome da categoria"
          error={onSubmitShopping.errors.category}
        />
        <Button text="Adicionar" type="submit" />
      </Sheader>

      <ShoppingTable />
    </Scontent>
  );
}

export default Shopping;
