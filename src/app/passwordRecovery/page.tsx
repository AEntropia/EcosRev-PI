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
  const [formData, setFormData] = useState<PasswordRecoveryData>({
    email: "",
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Logica do backend simulada
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
            }}>
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
            />

            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="success">{success}</Typography>}

            <ButtonAtom
              type="submit"
              fullWidth
              sx={{ marginTop: 3, marginBottom: 2 }}
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