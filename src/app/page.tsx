"use client";

import { useState } from "react";
import { login, isAdmin } from "./login_api";
import { useRouter } from "next/navigation";
import { AuthForm } from "@/components/UI/molecules/AuthForm";
import { AuthTemplate } from "@/components/templates/auth/AuthTemplate";
import backgroundImage from "../../public/images/loginImg.jpg";
import Header from "@/components/UI/molecules/Header";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = MuiAlert;

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info" as "info" | "success" | "error" | "warning",
  });

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      try {
        const success = await login(email, password);

        if (success) {
          setSnackbar({
            open: true,
            message: "Login realizado com sucesso!",
            severity: "success",
          });
          router.push("/home");
        } else {
          setSnackbar({
            open: true,
            message: "Credenciais inválidas!",
            severity: "error",
          });
        }
      } catch (error) {
        console.error("Erro no login:", error);
        setSnackbar({
          open: true,
          message: "Ocorreu um erro ao tentar realizar o login.",
          severity: "error",
        });
      }
    } else {
      setSnackbar({
        open: true,
        message: "Por favor, preencha os campos.",
        severity: "warning",
      });
    }
  };

  return (
    <AuthTemplate backgroundImage={backgroundImage.src}>
      <Header />
      <AuthForm
        formType="login"
        email={email}
        password={password}
        onEmailChange={(e) => setEmail(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSubmit={handleLogin}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AuthTemplate>
  );
}
