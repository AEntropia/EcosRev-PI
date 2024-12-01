'use client'

import { useState } from "react";
import { IBeneficios } from "@/interfaces/IBeneficios";
import { BeneficioEditValidator } from "@/validators/BeneficioEditValidator";
import { Box, Button, TextField, Typography, Snackbar, Alert } from "@mui/material";
import { useFormik } from "formik";
import Layout from "@/components/UI/organisms/Layout";
import { useRouter } from "next/navigation";
import { benefitsService } from "../../../../routes/benefitRoute";
import { withAdminProtection } from "@/components/HOCS/withAdminProtection";
import ButtonAtom from "@/components/UI/atoms/ButtonAtom";

const CadastroTemplate: React.FC = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const formik = useFormik<IBeneficios>({
    initialValues: {
      data: "",
      nome: "",
      endereco: "",
      pontos: 0,
      quantidade: 0,
    },
    validationSchema: BeneficioEditValidator,
    onSubmit: async (values) => {
      try {
        const response = await benefitsService.createBenefit(values);
        console.log("Cadastro realizado com sucesso:", response);
        
        // Show success message in Snackbar
        setSnackbarMessage("Cadastro realizado com sucesso!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);

        // Wait for 2 seconds before redirecting
        setTimeout(() => {
          router.push("/beneficios");
        }, 2000); // 2000 milliseconds = 2 seconds
      } catch (error) {
        console.error("Erro ao cadastrar benefício:", error);
        
        // Show error message in Snackbar
        setSnackbarMessage("Erro ao cadastrar benefício, verifique com o suporte");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    },
  });

  const { handleSubmit, values, handleChange, errors } = formik;

  const router = useRouter();

  const handleCancel = () => {
    router.push("/home");
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          mt: 4,
        }}
      >
        <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
          Cadastrar Benefício
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
            type="date"
            value={values.data}
            onChange={handleChange}
            error={!!errors.data}
            helperText={errors.data}
            InputLabelProps={{
              shrink: true,
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
            name="quantidade"
            label="Quantidade"
            fullWidth
            margin="normal"
            type="number"
            value={values.quantidade}
            onChange={handleChange}
            error={!!errors.quantidade}
            helperText={errors.quantidade}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 3, gap: 2 }}>
            <Button variant="outlined" color="primary" onClick={handleCancel} sx={{ boxShadow: 3 }}>
              Cancelar
            </Button>
            <ButtonAtom variant="contained" type="submit">
              Cadastrar
            </ButtonAtom>
          </Box>
        </Box>
      </Box>

      {/* Snackbar for success or error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default withAdminProtection(CadastroTemplate);
