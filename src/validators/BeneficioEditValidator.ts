import { validatorMessage } from "@/constants/validatorMessage";
import * as Yup from "yup";

export const BeneficioEditValidator = () => {
  const { requiredField, numericField, minValue, minLength, maxLength } =
    validatorMessage;
  return Yup.object().shape({
    nome: Yup.string()
      .required(requiredField)
      .min(3, minLength)
      .max(100, maxLength),
    endereco: Yup.string().required(requiredField).max(200),
    pontos: Yup.number()
      .typeError(numericField)
      .min(0.01, minValue)
      .required(requiredField),
    quantidade: Yup.number().typeError(numericField).min(0.01, minValue),
  });
};
