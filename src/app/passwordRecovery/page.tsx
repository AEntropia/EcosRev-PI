'use client'

import React, { FormEvent, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Header from "../../components/UI/molecules/Header";
import ButtonAtom from "@/components/UI/atoms/ButtonAtom";
import { FormTextField } from "@/components/UI/atoms/FormTextField";
import backgroundRoadImage from "../../../public/images/roadImg.jpeg";
import { AuthTemplate } from "@/components/templates/auth/AuthTemplate";

interface PasswordRecoveryData {
  email: string;
}

const PasswordRecovery: React.FC = () => {
  const [formData, setFormData] = useState<PasswordRecoveryData>({ email: "" });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const simulatedDelay = 1000;
    try {
      await new Promise((resolve) => setTimeout(resolve, simulatedDelay));
      setSuccess("Link de recuperação de senha enviado com sucesso!");
      setFormData({ email: "" });
    } catch (error) {
      setError("Erro ao enviar link de recuperação de senha!");
    }
  };

  return (
    <AuthTemplate backgroundImage={backgroundRoadImage.src}>
      <Box
        sx={{
          // Oculta o Header no modo landscape
          display: { xs: "block", sm: "block", orientation: "portrait" },
        }}
      >
        <Header />
      </Box>

      <Container
        component="main"
        sx={{
          position: "relative",
          zIndex: 1,
          paddingTop: { xs: "80px", sm: "120px" },
          paddingBottom: { xs: "40px", sm: "80px" },
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh", // Garante que o container ocupe a altura total da tela
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "90%", // Adapta a largura proporcionalmente
            maxWidth: "400px", // Limita a largura máxima em telas maiores
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "10px",
            padding: { xs: 2, sm: 4 }, // Padding adaptativo
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h5"
            color="primary"
            gutterBottom
            sx={{
              textAlign: "center",
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
            }}
          >
            Recuperação de Senha
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <FormTextField
              label="E-mail"
              variant="outlined"
              fullWidth
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{ marginBottom: 2 }}
            />

            {error && (
              <Typography color="error" sx={{ marginBottom: 2 }}>
                {error}
              </Typography>
            )}
            {success && (
              <Typography color="success" sx={{ marginBottom: 2 }}>
                {success}
              </Typography>
            )}

            <ButtonAtom
              type="submit"
              sx={{
                mt: 3,
                mb: 2,
                width: "100%", // Botão se adapta à largura do formulário
              }}
            >
              Enviar Link de Recuperação
            </ButtonAtom>
          </Box>

          <Box sx={{ marginTop: 2 }}>
            <Link href="/" passHref>
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

export default PasswordRecovery;