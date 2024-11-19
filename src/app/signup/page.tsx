'use client'

import React, { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import axios from "axios";
import Header from "../../components/UI/molecules/Header";
import ButtonAtom from "@/components/UI/atoms/ButtonAtom";
import { FormTextField } from "@/components/UI/atoms/FormTextField";
import backgroundRoadImage from "../../../public/images/roadImg.jpeg";
import { AuthTemplate } from "@/components/templates/auth/AuthTemplate";

interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
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

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/signup", formData);
      setSuccess("Cadastro realizado com sucesso!");
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      router.push("/login");
    } catch (error) {
      setError("Erro ao cadastrar usuário!");
    }
  };

  return (
    <AuthTemplate backgroundImage={backgroundRoadImage.src}>
      {/* O Header */}
      <Header/> 

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
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "10px",
            padding: 4,
          }}
        >
          <Typography variant="h5" color="primary" gutterBottom>
            Cadastro
          </Typography>

          {/* Formulário de Cadastro */}
          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <FormTextField
              label="Nome"
              variant="outlined"
              fullWidth
              name="name"
              value={formData.name}
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
              name="password"
              type="password"
              value={formData.password}
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
