"use client";

import { IBeneficios } from "@/interfaces/IBeneficios";
import { BeneficioEditValidator } from "@/validators/BeneficioEditValidator";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import Layout from "@/components/UI/organisms/Layout";
import router, { useRouter } from "next/navigation";
import { benefitsService } from "../../../../routes/benefitRoute";
import { withAdminProtection } from "@/components/HOCS/withAdminProtection";

const CadastroTemplate: React.FC = () => {
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
      console.log(values);
      try {
        const response = benefitsService.createBenefit(values); // Altere a URL conforme necessário
        console.log("Cadastro realizado com sucesso:", response);
        // Aqui você pode redirecionar ou exibir uma mensagem de sucesso
      } catch (error) {
        console.error("Erro ao cadastrar benefício:", error);
        // Exibir uma mensagem de erro, se necessário
      }
    },
  });

  const { handleSubmit, values, handleChange, errors } = formik;

  const router = useRouter();

  const handleCancel = () => {
    router.push("/home"); // Redireciona para a página principal
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

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Cadastrar
            </Button>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default withAdminProtection(CadastroTemplate);
