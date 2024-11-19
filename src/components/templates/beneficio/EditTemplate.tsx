"use client";

import { IBeneficios } from "@/interfaces/IBeneficios";
import { BeneficioEditValidator } from "@/validators/BeneficioEditValidator";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../../themes/userTheme";

interface EditTemplateProps {
  beneficio?: IBeneficios;
}

const EditTemplate: React.FC<EditTemplateProps> = ({ beneficio }) => {
  const formik = useFormik<IBeneficios>({
    initialValues: {
      name: "",
      address: "",
      points: 0,
      qtd: 0,
    },
    validationSchema: BeneficioEditValidator,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { handleSubmit, values, handleChange, errors, setValues } = formik;

  useEffect(() => {
    if (!beneficio) return;

    const { id, ...prod } = beneficio;
    setValues(prod);
  }, [beneficio, setValues]);

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
              Editar Benefício
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
              />
              <TextField
                name="address"
                label="Endereço"
                fullWidth
                margin="normal"
                value={values.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
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
              <TextField
                name="qtd"
                label="Quantidade"
                fullWidth
                margin="normal"
                type="number"
                value={values.qtd}
                onChange={handleChange}
                error={!!errors.qtd}
                helperText={errors.qtd}
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
