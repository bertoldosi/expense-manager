import React, { useContext } from "react";
import { useFormik } from "formik";
import Cookies from "universal-cookie";

import instances from "@lib/axios-instance-internal";
import validationSchema from "./validations";

import { Button } from "@commons/Button";
import Input from "@commons/Input";

import { Sform } from "./styles";
import { userContextData, userContextDataType } from "@context/userContextData";
import { customToast } from "@commons/CustomToast";
import { ExpenseType, InstitutionType } from "@interfaces/*";

const INITIAL_INSTITUTION = {
  name: "",
};

interface DataFormType {
  name: string;
}

interface FilterType {
  expense: ExpenseType;
  institutions: {
    createAt: string;
  };
}

interface InstitutionFormProps {
  exitModal?: Function;
  institution?: InstitutionType | null;
}

function InstitutionForm({ exitModal, institution }: InstitutionFormProps) {
  const cookies = new Cookies();

  const { toggleSelectedInstitution, getExpense } = useContext(
    userContextData
  ) as userContextDataType;

  async function updateInstitution(
    dataForm: DataFormType,
    filter: FilterType,
    institution: InstitutionType
  ) {
    async function requestUpdate() {
      return await instances
        .put("api/institution", {
          id: institution.id,
          name: dataForm.name,
          expenseId: filter.expense.id,
          createAt: filter.institutions.createAt,
        })
        .then(async (response) => {
          await getExpense(filter.expense.id, filter.institutions.createAt);
          toggleSelectedInstitution(response.data);

          if (exitModal) exitModal();
        })
        .catch((error) => {
          if (error.response.status === 405) {
            throw new Error("Não permitido. Nome já cadastrado nesse periodo!");
          }

          throw error;
        });
    }

    await customToast(requestUpdate);
  }

  async function createInstitution(dataForm: DataFormType, filter: FilterType) {
    async function requestCreate() {
      return await instances
        .post("api/institution", {
          name: dataForm.name,
          expenseId: filter.expense.id,
          createAt: filter.institutions.createAt,
        })
        .then(async (response) => {
          await getExpense(filter.expense.id, filter.institutions.createAt);
          toggleSelectedInstitution(response.data);
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
        await updateInstitution(values, filter, institution);
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
