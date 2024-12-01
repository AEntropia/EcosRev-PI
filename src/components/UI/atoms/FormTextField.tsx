import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/system";

export const FormTextField = styled(TextField)<TextFieldProps>(() => ({
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '4px',
  marginBottom: '16px',
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: 'primary.main',
    },
  },
  '@media (max-width: 600px)': {
    width: '100%',  // Garantindo que o campo ocupe 100% da largura
  },
}));
