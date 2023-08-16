import * as yup from "yup";

type TypeSchemaUpdate = {
  description?: string;
  amount?: string;
  category?: string | undefined;
};

export const schemaUpdate: yup.SchemaOf<TypeSchemaUpdate> = yup.object().shape({
  description: yup.string(),
  amount: yup.string(),
  category: yup
    .string()
    .matches(/[a-z]+/, "Somente letras minúsculas são permitidas"),
});
