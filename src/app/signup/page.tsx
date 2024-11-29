'use client'

import React, { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "../../components/UI/molecules/Header";
import ButtonAtom from "@/components/UI/atoms/ButtonAtom";
import { FormTextField } from "@/components/UI/atoms/FormTextField";
import backgroundRoadImage from "../../../public/images/roadImg.jpeg";
import { AuthTemplate } from "@/components/templates/auth/AuthTemplate";
import { userService } from "../../../routes/userRoute";

interface SignupData {
  nome: string;
  email: string;
  senha: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<SignupData>({
    nome: "",
    email: "",
    senha: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    const { confirmPassword, ...dataToSend } = formData;

    try {
      await userService.createUser(dataToSend);
      setSuccess("Cadastro realizado com sucesso!");
      setError("");
      setFormData({ nome: "", email: "", senha: "", confirmPassword: "" });

      // Adiciona um delay de 2 segundos antes do redirecionamento
      setTimeout(() => {
        router.push("/"); 
      }, 2000);
    } catch (err) {
      setError("Erro ao cadastrar usuário!");
      setSuccess("");
    }
  };

  return (
    <AuthTemplate backgroundImage={backgroundRoadImage.src}>
      {/* O Header */}
      <Header />

      <Container
        component="main"
        maxWidth="xs"
        sx={{
          position: "relative",
          zIndex: 1,
          paddingTop: "120px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "10px",
            padding: 4,
          }}
        >
          <Typography
            variant="h5"
            color="primary"
            gutterBottom
            sx={{
              textShadow: "2px 2px 4px rgba(255, 255, 255, 1)",
              color: "primary.main",
            }}
          >
            Cadastro
          </Typography>

          {/* Formulário de Cadastro */}
          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <FormTextField
              label="Nome"
              variant="outlined"
              fullWidth
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
            <FormTextField
              label="E-mail"
              variant="outlined"
              fullWidth
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <FormTextField
              label="Senha"
              variant="outlined"
              fullWidth
              name="senha"
              type="password"
              value={formData.senha}
              onChange={handleChange}
              required
            />
            <FormTextField
              label="Confirmar Senha"
              variant="outlined"
              fullWidth
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="success">{success}</Typography>}

            <ButtonAtom
              type="submit"
              fullWidth
              sx={{ marginTop: 3, marginBottom: 2 }}
            >
              Criar Conta
            </ButtonAtom>
          </Box>

          <Box sx={{ marginTop: 2 }}>
            <Link href="/" passHref>
              <Typography variant="body2" sx={{ color: "primary.main" }}>
                Já tem uma conta? Faça login
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </AuthTemplate>
  );
};

export default Signup;
