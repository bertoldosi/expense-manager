import * as yup from "yup";

type TypeSchema = {
  name: string;
};

const REQUIRED_FIELD = "O campo não pode ser vazio";

export const validationSchema: yup.SchemaOf<TypeSchema> = yup.object().shape({
  name: yup.string().required(REQUIRED_FIELD),
});

export default validationSchema;
