import * as yup from "yup";

type TypeSchemaUpdate = {
  description?: string;
  amount?: string;
  category?: string | undefined;
  subcategory?: string | undefined;
};

export const schemaUpdate: yup.SchemaOf<TypeSchemaUpdate> = yup.object().shape({
  description: yup.string(),
  amount: yup.string(),
  category: yup
    .string()
    .matches(/[a-z]+/, "Somente letras minúsculas são permitidas"),
  subcategory: yup
    .string()
    .matches(/[a-z]+/, "Somente letras minúsculas são permitidas"),
});
