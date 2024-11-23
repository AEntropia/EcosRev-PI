"use client";

import React, { useState, useEffect, ReactNode } from "react";
import userTheme from "../../themes/userTheme";
import adminTheme from "../../themes/adminTheme";
import { ThemeProvider } from "@mui/material/styles";
// import { AuthProvider } from "../../src/context/AuthContext";
// deixei o authprovider comentado enquanto aguarda a conexao com api

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <AuthProvider> */}
      <ThemeSelector>
        <body>{children}</body>
      </ThemeSelector>
      {/* </AuthProvider> */}
    </html>
  );
}
//  Lógica para verificar se o usuário é admin
const ThemeSelector = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    /*const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASEURL}/user` //implementar o link da API aqui
        );

        if (!response.ok) {
          throw new Error("Falha ao buscar os dados do usuário");
        }

        const data = await response.json();
        setIsAdmin(data.role === "admin");
      } catch (error) {
        console.error("Erro ao obter dados do usuário:", error);
      }
    };

    fetchUserData()*/
  }, []);

  return (
    <ThemeProvider theme={isAdmin ? adminTheme : userTheme}>
      {children}
    </ThemeProvider>
  );
};
