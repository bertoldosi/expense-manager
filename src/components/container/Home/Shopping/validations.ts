import * as yup from "yup";

type TypeSchema = {
  description: string;
  amount: string;
  category: string | undefined;
};

const REQUIRED_FIELD = "O campo não pode ser vazio";

const schema: yup.SchemaOf<TypeSchema> = yup.object().shape({
  description: yup.string().required(REQUIRED_FIELD),
  amount: yup.string().required(REQUIRED_FIELD),
  category: yup
    .string()
    .matches(/[a-z]+/, "Somente letras minúsculas são permitidas"),
});

export default schema;
