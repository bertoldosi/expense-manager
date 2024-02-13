import React, { useContext } from "react";
import Cookies from "universal-cookie";
import { useFormik } from "formik";
import ObjectId from "mongo-objectid";

import Input from "@commons/Input";
import { Button } from "@commons/Button";
import ShoppingTable from "@containers/Home/ShoppingTable";

import { Scontent, Sheader } from "./styles";
import validationSchema from "@containers/Home/Shopping/validations";
import instances from "@lib/axios-instance-internal";
import { formatedInputValue } from "@helpers/formatedInputValue";
import { focusInput } from "@helpers/focusInput";
import useIsMobile from "@hooks/useIsMobile";
import { userContext, userContextType } from "@context/userContext";

import { InstitutionInterface } from "@interfaces/*";

interface InstitutionType extends InstitutionInterface {}

interface ShoppingCreateType {
  description: string;
  amount: string;
  category: string;
  paymentStatus: string;
  selected?: boolean;
  institutionId?: string;
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

  const { institution, expense, recalculate } = useContext(
    userContext
  ) as userContextType;

  async function createShopping(shopping: ShoppingCreateType) {
    const institutionOld = institution;
    const expenseOld = expense;
    const indexShopping = institution?.shoppings?.length
      ? institution?.shoppings?.length
      : 0;

    shopping.amount = shopping.amount.replace(",", "");
    const uuid = new ObjectId().hex;
    const shoppingId = uuid;

    const newShopping = { ...shopping, id: shoppingId, index: indexShopping };

    const newInstitution = {
      ...institution,
      shoppings: institution?.shoppings?.length
        ? [newShopping, ...institution.shoppings]
        : [newShopping],
    };
    const newExpense = {
      ...expense,
      institutions: expense?.institutions?.map((mapInstitution) => {
        if (mapInstitution.id == newInstitution?.id) {
          return newInstitution;
        }

        return mapInstitution;
      }),
    };

    recalculate(newExpense, newInstitution);

    await instances
      .post("api/shoppings", {
        institutionId: institution?.id,
        shopping: {
          ...shopping,
          id: shoppingId,
          index: indexShopping,
        },
      })
      .catch(() => {
        recalculate(expenseOld, institutionOld);
      });

    if (!isMobile) {
      focusInput("description");
    }
  }

  const onSubmitShopping = useFormik({
    initialValues: INITIAL_SHOPPING,
    onSubmit: async (values) => {
      const { filter = {} } = cookies.get("expense-manager");

      const shopping = {
        ...values,
        category: values.category ? values.category : "sem",
      };

      await createShopping(shopping);

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
