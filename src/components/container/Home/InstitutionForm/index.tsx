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

  const {
    setExpense,
    setInstitution,
    expense,
    toggleSelectedInstitution,
    getFirstInstitution,
  } = useContext(userContext) as userContextType;

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

      const { data: expenseGet } = await instances.get("api/v2/expense", {
        params: {
          id: cookieValues?.filter?.expense?.id,
          institutionCreateAt: cookieValues?.filter?.dateSelected,
        },
      });

      setExpense(expenseGet);
      getFirstInstitution(expenseGet.institutions);

      if (exitModal) exitModal();

      return;
    }

    await customToast(requestUpdate);
  }

  async function createInstitution(dataForm: DataFormType, filter: FilterType) {
    async function requestCreate() {
      return await instances
        .post("api/v2/institution", {
          name: dataForm.name,
          expenseId: filter?.expense?.id,
          createAt: filter?.dateSelected,
        })
        .then(async ({ data: institutionCreate }) => {
          setInstitution(institutionCreate);
          setExpense({
            ...expense,
            institutions: expense?.institutions?.length
              ? [...expense?.institutions, institutionCreate]
              : [institutionCreate],
          });
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
