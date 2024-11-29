import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9FC131", // Define a cor principal (verde)
      contrastText: "#506266", // Define a cor do texto sobre a cor principal (cinza azulado)
    },
    secondary: {
      main: "#FF5722", // Define a cor secundária (lima)
    },
    background: {
      default: "#f0f2f5", // Cor de fundo padrão (azul gelo)
      paper: "#ffffff", // Cor de fundo para elementos como cards (branco)
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif", // Define a fonte padrão
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&.MuiButton-outlined:hover": {
            backgroundColor: "#E9F7C7 ", // Hover mais forte para todos os botões
          },
        },
      },
    },
  },
});

export default theme;