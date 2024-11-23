"use client";

import { useState } from "react";
import { login } from "./teste";
import { useRouter } from "next/navigation";
import { AuthForm } from "@/components/UI/molecules/AuthForm";
import { AuthTemplate } from "@/components/templates/auth/AuthTemplate";
import backgroundImage from "../../public/images/loginImg.jpg";
import Header from "@/components/UI/molecules/Header";
import { Button } from "@mui/material";

// import { useAuth } from "../../src/context/AuthContext";
// deixei o authprovider comentado enquanto aguarda a conexao com api

export default function Home() {
  login("sandman2871@gmail.com", "Mateus123#");
  const router = useRouter();
  // const { login } = useAuth(); // Acesso à função de login do contexto
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Função de handle para o login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    // Simulação de login (sem validação dos campos)
    router.push("/home");

    // Lógica de autenticação após conexão com API:
    //   if (email && password) {
    //     try {
    //       // Chama a função de login do contexto AuthProvider
    //       const success = await login(email, password);

    //       if (success) {
    //         router.push("/home"); // Redireciona após login bem-sucedido
    //       } else {
    //         alert("Credenciais inválidas!");
    //       }
    //     } catch (error) {
    //       console.error("Erro no login:", error);
    //       alert("Ocorreu um erro ao tentar realizar o login.");
    //     }
    //   } else {
    //     alert("Por favor, preencha os campos.");
    //   }
    // };

    //   console.log("Email:", email, "Senha:", password);
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
    </AuthTemplate>
  );
}
