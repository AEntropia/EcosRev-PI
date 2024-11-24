"use client";

import { IBeneficios } from "@/interfaces/IBeneficios";
import { BeneficioEditValidator } from "@/validators/BeneficioEditValidator";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../../themes/userTheme";
import { benefitsService } from "../../../../routes/benefitRoute";
import { useRouter } from "next/navigation";

interface EditTemplateProps {
  beneficio?: IBeneficios;
}

const EditTemplate: React.FC<EditTemplateProps> = ({ beneficio }) => {
  const router = useRouter();
  const formik = useFormik<IBeneficios>({
    initialValues: {
      _id: "",
      data: "",
      nome: "",
      endereco: "",
      pontos: 0,
      quantidade: 0,
    },
    validationSchema: BeneficioEditValidator,
    onSubmit: (values) => {
      benefitsService.updateBenefit(values)
      router.push("/beneficios");
    },
  });

  const { handleSubmit, values, handleChange, errors, setValues } = formik;

  useEffect(() => {
    if (!beneficio) return;

    const { _id, ...prod } = beneficio;
    setValues(beneficio);
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
                name="nome"
                label="Nome"
                fullWidth
                margin="normal"
                value={values.nome}
                onChange={handleChange}
                error={!!errors.nome}
                helperText={errors.nome}
              />
              <TextField
                name="data"
                label="Data"
                fullWidth
                margin="normal"
                type="date" // Define o tipo como "date"
                value={values.data}
                onChange={handleChange}
                error={!!errors.data}
                helperText={errors.data}
                InputLabelProps={{
                  shrink: true, // Garante que o label não sobreponha o valor
              }}
            />
              <TextField
                name="endereco"
                label="Endereço"
                fullWidth
                margin="normal"
                value={values.endereco}
                onChange={handleChange}
                error={!!errors.endereco}
                helperText={errors.endereco}
              />
              <TextField
                name="pontos"
                label="Pontos"
                fullWidth
                margin="normal"
                type="number"
                value={values.pontos}
                onChange={handleChange}
                error={!!errors.pontos}
                helperText={errors.pontos}
              />
              <TextField
                name="qtd"
                label="Quantidade"
                fullWidth
                margin="normal"
                type="number"
                value={values.quantidade}
                onChange={handleChange}
                error={!!errors.quantidade}
                helperText={errors.quantidade}
              />
              
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
              <Button variant="outlined" color="secondary" onClick={() => router.push("/beneficios")}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Atualizar
            </Button>
            <Button variant="contained" color="primary" onClick={() => {
              benefitsService.deleteBenefit(beneficio?._id)
              router.push("/beneficios")}}>
            Remover
            </Button>
              </Box>
            </Box>
          </Box>
        {/* </Container> */}
    </ThemeProvider>
  );
};

export default EditTemplate;
