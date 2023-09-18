import React, { useContext } from "react";
import { useFormik } from "formik";
import Cookies from "universal-cookie";

import instances from "@lib/axios-instance-internal";
import validationSchema from "./validations";

import { Button } from "@commons/Button";
import Input from "@commons/Input";

import { Sform } from "./styles";
import { customToast } from "@commons/CustomToast";
import { ExpenseType, InstitutionType } from "@interfaces/*";
import { userContext, userContextType } from "@context/userContext";

const INITIAL_INSTITUTION = {
  name: "",
};
interface DataFormType {
  name: string;
}
interface FilterType {
  expense: ExpenseType;
  dateSelected: string;
}
interface InstitutionFormProps {
  exitModal?: Function;
  institution?: InstitutionType | null;
}

const keyCookies = "expense-manager";

function InstitutionForm({ exitModal, institution }: InstitutionFormProps) {
  const cookies = new Cookies();

  const { getExpense, toggleSelectedInstitution } = useContext(
    userContext
  ) as userContextType;

  async function updateInstitution(
    dataForm: DataFormType,
    institution: InstitutionType
  ) {
    const cookieValues = cookies.get(keyCookies);

    async function requestUpdate() {
      await instances
        .put("api/v2/institution", {
          id: institution.id,
          name: dataForm.name,
        })
        .then(({ data: institutionUpdate }) => {
          toggleSelectedInstitution(institutionUpdate);

          return institutionUpdate;
        })
        .catch((error) => {
          if (error.response.status === 405) {
            throw new Error("Não permitido. Nome já cadastrado nesse periodo!");
          }
          throw error;
        });

      const expenseId = cookieValues?.filter?.expense?.id;
      const institutionCreateAt = cookieValues?.filter?.dateSelected;

      getExpense(expenseId, institutionCreateAt);

      if (exitModal) exitModal();

      return;
    }

    await customToast(requestUpdate);
  }

  async function createInstitution(dataForm: DataFormType, filter: FilterType) {
    const cookieValues = cookies.get(keyCookies);

    async function requestCreate() {
      return await instances
        .post("api/v2/institution", {
          name: dataForm.name,
          expenseId: filter?.expense?.id,
          createAt: filter?.dateSelected,
        })
        .then(async ({ data: institutionCreate }) => {
          const expenseId = cookieValues?.filter?.expense?.id;
          const institutionCreateAt = cookieValues?.filter?.dateSelected;

          getExpense(expenseId, institutionCreateAt);
          toggleSelectedInstitution(institutionCreate);
          if (exitModal) exitModal();
        })
        .catch((error) => {
          if (error.response.status === 405) {
            throw new Error("Não permitido. Nome já cadastrado nesse periodo!");
          }

          throw error;
        });
    }

    await customToast(requestCreate);
  }

  const onSubmitInstitution = useFormik({
    initialValues: institution ? institution : INITIAL_INSTITUTION,
    onSubmit: async (values) => {
      const { filter = {} } = cookies.get("expense-manager");

      if (institution) {
        await updateInstitution(values, institution);
      } else {
        await createInstitution(values, filter);
      }
      onSubmitInstitution.resetForm();
    },

    validationSchema,
  });

  return (
    <Sform onSubmit={onSubmitInstitution.handleSubmit}>
      <Input
        name="name"
        onChange={onSubmitInstitution.handleChange}
        value={onSubmitInstitution.values.name}
        placeholder="Nome do cartão"
        autoFocus
        error={onSubmitInstitution.errors.name}
      />

      <Button text="Salvar" type="submit" width="20rem" />
    </Sform>
  );
}

export default InstitutionForm;
