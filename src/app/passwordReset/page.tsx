'use client'

import React, { useState } from "react";
import { Box, Container, Typography, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import Header from "../../components/UI/molecules/Header";
import ButtonAtom from "@/components/UI/atoms/ButtonAtom";
import { FormTextField } from "@/components/UI/atoms/FormTextField";
import backgroundRoadImage from "../../../public/images/roadImg.jpeg";
import { AuthTemplate } from "@/components/templates/auth/AuthTemplate";
import Link from "next/link";

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
      setSuccess("");
      return;
    }

    try {
      const message = await simulateBackend({ password: formData.password });
      setSuccess(message as string);
      setError("");
      setFormData({ password: "", confirmPassword: "" });
      setTimeout(() => router.push("/"), 2000); // Redireciona após 2 segundos
    } catch {
      setError("Erro ao redefinir senha!");
      setSuccess("");
    }
  };

  return (
    <AuthTemplate backgroundImage={backgroundRoadImage.src}>
      <Header />

      <Container
        data-testid="password-reset-container"
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
          data-testid="password-reset-form-container"
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
            data-testid="page-title"
            variant="h5"
            color="primary" 
            gutterBottom 
            sx={{
              textShadow: "2px 2px 4px rgba(255, 255, 255, 1)", 
              color: "primary.main",
            }}>
            Redefinir Senha
          </Typography>

          {error && (
            <Alert 
              data-testid="error-alert"
              severity="error" 
              sx={{ width: "100%", mb: 2 }}
            >
              {error}
            </Alert>
          )}
          {success && (
            <Alert 
              data-testid="success-alert"
              severity="success" 
              sx={{ width: "100%", mb: 2 }}
            >
              {success}
            </Alert>
          )}

          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ width: "100%" }}
            data-testid="password-reset-form"
          >
            <FormTextField
              data-testid="password-input"
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
              data-testid="confirm-password-input"
              label="Confirmar Senha"
              variant="outlined"
              fullWidth
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <ButtonAtom
              data-testid="submit-button"
              type="submit"
              sx={{ 
                mt: 3, 
                mb: 2, 
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",  }}
            >
              Redefinir Senha
            </ButtonAtom>
          </Box>

          <Box sx={{ marginTop: 2 }}>
            <Link 
              href="/" 
              passHref
              data-testid="back-to-login-link"
            >
              <Typography variant="body2" sx={{ color: "primary.main" }}>
                Voltar para Login
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </AuthTemplate>
  );
};

export default PasswordReset;