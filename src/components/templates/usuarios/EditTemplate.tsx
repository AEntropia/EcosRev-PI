"use client";

import { IUsuarios } from "@/interfaces/IUsuarios";
import { UsuarioEditValidator } from "@/validators/UsuarioEditValidator";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../../themes/userTheme";

interface EditTemplateProps {
  usuario?: IUsuarios;
}

const EditTemplate: React.FC<EditTemplateProps> = ({ usuario }) => {
  console.log("uuuu: ", usuario);
  const formik = useFormik<IUsuarios>({
    initialValues: {
      name: "",
      email: "",
      pass: "",
      points: 0,
      type: "",
    },
    validationSchema: UsuarioEditValidator,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { handleSubmit, values, handleChange, errors, setValues } = formik;

  useEffect(() => {
    if (!usuario) return;

    const { id, ...prod } = usuario;
    setValues(prod);
  }, [usuario, setValues]);

  return (
    <ThemeProvider theme={theme}>
      {/* <Container component="main" maxWidth="sm" sx={{ mt: 5 }}> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
          Atualizar pontos
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <TextField
            name="name"
            label="Nome"
            fullWidth
            margin="normal"
            value={values.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            disabled
          />
          <TextField
            name="points"
            label="Pontos"
            fullWidth
            margin="normal"
            type="number"
            value={values.points}
            onChange={handleChange}
            error={!!errors.points}
            helperText={errors.points}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button variant="outlined" color="secondary">
              Cancelar
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Atualizar
            </Button>
          </Box>
        </Box>
      </Box>
      {/* </Container> */}
    </ThemeProvider>
  );
};

export default EditTemplate;
