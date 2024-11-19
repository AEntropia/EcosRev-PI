"use client";

import { IBeneficios } from "@/interfaces/IBeneficios";
import { BeneficioEditValidator } from "@/validators/BeneficioEditValidator";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import Layout from "@/components/UI/organisms/Layout";
import router, { useRouter } from "next/navigation";

const CadastroTemplate: React.FC = () => {
  const formik = useFormik<IBeneficios>({
    initialValues: {
      name: "",
      address: "",
      points: 0,
      qtd: 0,
    },
    validationSchema: BeneficioEditValidator,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/api/beneficios", values); // Altere a URL conforme necessário
        console.log("Cadastro realizado com sucesso:", response.data);
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

export default CadastroTemplate;
