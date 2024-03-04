import * as yup from "yup";

type TypeSchemaFilter = {
  description?: string;
  category?: string | undefined;
};

export const schemaFilter: yup.SchemaOf<TypeSchemaFilter> = yup.object().shape({
  description: yup.string(),
  category: yup
    .string()
    .matches(/[a-z]+/, "Somente letras minúsculas são permitidas"),
});
