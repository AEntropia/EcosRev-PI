'use client'

import React, { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Header from "../../components/UI/molecules/Header";
import ButtonAtom from "@/components/UI/atoms/ButtonAtom";
import { FormTextField } from "@/components/UI/atoms/FormTextField";
import backgroundRoadImage from "../../../public/images/roadImg.jpeg";
import { AuthTemplate } from "@/components/templates/auth/AuthTemplate";

interface PasswordResetData {
  password: string;
  confirmPassword: string;
}

// Função que simula o backend
const simulateBackend = (data: { password: string }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Senha redefinida com sucesso!");
    }, 1000); // Simula um delay de 1 segundo
  });
};

const PasswordReset: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<PasswordResetData>({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

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
      const message = await simulateBackend({ password: formData.password });
      setSuccess(message as string);
      setFormData({ password: "", confirmPassword: "" });
      setTimeout(() => router.push("/"), 2000); // Redireciona após 2 segundos
    } catch {
      setError("Erro ao redefinir senha!");
    }
  };

  return (
    <AuthTemplate backgroundImage={backgroundRoadImage.src}>
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
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "10px",
            padding: 4,
          }}
        >
          <Typography variant="h5" color="primary" gutterBottom>
            Redefinir Senha
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <FormTextField
              label="Nova Senha"
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
              Redefinir Senha
            </ButtonAtom>
          </Box>
        </Box>
      </Container>
    </AuthTemplate>
  );
};

export default PasswordReset;
