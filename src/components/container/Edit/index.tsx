import React, { useContext, useEffect, useState } from "react";

import { Scontainer, Sform, Srepeat } from "./styles";
import { ShoppingType } from "@interfaces/*";
import { Card } from "@commons/Card";
import { formatMorney } from "@helpers/formatMorney";
import Input from "@commons/Input";
import InputSelect from "@commons/InputSelect";
import { Button } from "@commons/Button";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { schemaUpdate } from "./validations";
import instances from "@lib/axios-instance-internal";
import Cookies from "universal-cookie";
import { userContextData, userContextDataType } from "@context/userContextData";
import { customToast } from "@commons/CustomToast";
import { formatedInputValue } from "@helpers/formatedInputValue";
import { useRouter } from "next/router";
import Link from "next/link";

interface ShoppingUpdateType {
  description: string;
  amount: string;
  category: string;
  paymentStatus: string;
  repeat: string;
  selected?: boolean;
  institutionId?: string;
}

const INITIAL_SHOPPING = {
  description: "",
  amount: "",
  category: "",
  paymentStatus: "",
  repeat: "",
};

const INITIAL_OPTIONS_PAYMENT_STATUS = [
  { label: "Aberto", value: "open" },
  { label: "Pago", value: "closed" },
];

const INITIAL_OPTIONS_REPEAT = [
  { label: "Próximo(s) 1 mês", value: "1" },
  { label: "Próximo(s) 2 mês", value: "2" },
  { label: "Próximo(s) 3 mês", value: "3" },
  { label: "Próximo(s) 4 mês", value: "4" },
  { label: "Próximo(s) 5 mês", value: "5" },
  { label: "Próximo(s) 6 mês", value: "6" },
  { label: "Próximo(s) 7 mês", value: "7" },
  { label: "Próximo(s) 8 mês", value: "8" },
  { label: "Próximo(s) 9 mês", value: "9" },
  { label: "Próximo(s) 10 mês", value: "10" },
  { label: "Próximo(s) 11 mês", value: "11" },
  { label: "Próximo(s) 12 mês", value: "12" },
];

function Edit() {
  const router = useRouter();
  const { getInstitution, getExpense } = useContext(
    userContextData
  ) as userContextDataType;

  const [shoppingsEdit, setShoppingsEdit] = useState<ShoppingType[] | []>([]);

  const onSubmitShopping = useFormik({
    initialValues: INITIAL_SHOPPING,
    onSubmit: async (values) => {
      await updateAllShoppings(values);

      onSubmitShopping.resetForm();
    },

    validationSchema: schemaUpdate,
  });

  async function fethInstitutionAndExpense() {
    const cookies = new Cookies();
    const cookieValues = cookies.get("expense-manager");

    await getInstitution(cookieValues?.filter?.institution?.id);
    await getExpense(
      cookieValues?.filter.expense.id,
      cookieValues?.filter.institutions.createAt
    );
  }

  async function updateAllShoppings(values: ShoppingUpdateType) {
    const isNewInput =
      !!values.description ||
      !!values.amount ||
      !!values.category ||
      !!values.paymentStatus ||
      !!values.repeat;

    if (isNewInput) {
      const newShoppings = shoppingsEdit.map((shoppingMap) => {
        return {
          ...shoppingMap,
          description: values.description
            ? values.description
            : shoppingMap.description,
          amount: values.amount
            ? values.amount.replace(/,/g, "")
            : shoppingMap.amount.replace(/,/g, ""),
          category: values.category ? values.category : shoppingMap.category,
          paymentStatus: values.paymentStatus
            ? values.paymentStatus
            : shoppingMap.paymentStatus,
        };
      });

      const requestUpdate = async () => {
        return await instances
          .put("api/shopping", {
            shoppings: newShoppings,
          })
          .then(async () => {
            await fethInstitutionAndExpense();
          });
      };
      await customToast(requestUpdate);

      if (values.repeat) {
        await repeatShoppings(values.repeat, newShoppings);
      }

      router.push("/");
    } else {
      toast.info(<h3>Nenhum campo alterado!</h3>);
    }
  }

  async function repeatShoppings(
    numberRepeat: string,
    newShoppings: ShoppingType[]
  ) {
    const requestRepeat = async () => {
      return await instances
        .post("api/shopping/repeat", {
          repeat: Number(numberRepeat),
          shoppings: newShoppings,
        })
        .then(async () => {
          await fethInstitutionAndExpense();
        });
    };

    await customToast(
      requestRepeat,
      "Replicando compras",
      "Compras repetidas para o(s) próximo(o) meses"
    );
  }

  useEffect(() => {
    const keyStorage = "expense-manager-editing-shoppings";
    const shoppingsStoreString = localStorage.getItem(keyStorage);
    const shoppingsString = JSON.parse(shoppingsStoreString || "[]");
    const shoppings = JSON.parse(shoppingsString) || [];

    setShoppingsEdit(shoppings);
  }, []);

  return (
    <Scontainer>
      <Card title={`${shoppingsEdit.length} Item(s) selecionado(s):`}>
        <ul>
          {shoppingsEdit.map((shopping: ShoppingType) => {
            return (
              <li>
                {shopping.description}
                {" - "}
                {formatMorney(shopping.amount)}
              </li>
            );
          })}
        </ul>
      </Card>

      <Card title="Edição:">
        <Sform onSubmit={onSubmitShopping.handleSubmit}>
          <Input
            name="description"
            id="description"
            autoFocus
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

          <InputSelect
            name="paymentStatus"
            id="paymentStatus"
            value={onSubmitShopping.values.paymentStatus}
            onChange={onSubmitShopping.handleChange}
            defaultOption={{ label: "Selecione um status", value: "" }}
            options={INITIAL_OPTIONS_PAYMENT_STATUS}
          />

          <Srepeat>
            <h2>Repetindo item(s)</h2>
            <InputSelect
              name="repeat"
              id="repeat"
              value={onSubmitShopping.values.repeat}
              onChange={onSubmitShopping.handleChange}
              defaultOption={{ label: "Selecione um valor", value: "0" }}
              options={INITIAL_OPTIONS_REPEAT}
            />
          </Srepeat>

          <Button text="Salvar" type="submit" width="20rem" />
          <Link href="/">Voltar</Link>
        </Sform>
      </Card>
    </Scontainer>
  );
}

export default Edit;
