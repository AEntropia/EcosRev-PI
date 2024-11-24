import { validatorMessage } from "@/constants/validatorMessage";
import * as Yup from "yup";

export const UsuarioEditValidator = () => {
  const { requiredField, numericField, minValue, minLength, maxLength } =
    validatorMessage;
  return Yup.object().shape({
    pontos: Yup.number()
      .typeError(numericField)
      .min(0, minValue)
      .required(requiredField),
  });
};
