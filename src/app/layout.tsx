"use client";

import React, { useState, useEffect, ReactNode } from "react";
import userTheme from "../../themes/userTheme";
import adminTheme from "../../themes/adminTheme";
import { ThemeProvider } from "@mui/material/styles";
// import { AuthProvider } from "../../src/context/AuthContext";

// Adiciona a declaração global para garantir que hj seja tratado corretamente
declare global {
  interface Window {
    hj?: {
      (...args: any[]): void;
      q?: any[]; // Propriedade 'q' é um array que será preenchido antes de o Hotjar ser carregado
    };
    _hjSettings?: {
      hjid: number;
      hjsv: number;
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // Adicionando o script do Hotjar via useEffect
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      (function (
        h: Window,
        o: Document,
        t: string,
        j: string,
        a?: HTMLElement,
        r?: HTMLScriptElement
      ) {
        h.hj =
          h.hj ||
          function (...args: any[]) {
            (h.hj!.q = h.hj!.q || []).push(args); // Usando o operador de não-nulo "!" para garantir que hj.q seja acessível
          };
        h._hjSettings = { hjid: 5234024, hjsv: 6 }; // Substitua 5234024 pelo seu ID do Hotjar
        a = o.getElementsByTagName("head")[0];
        r = o.createElement("script");
        r.async = true;
        r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
        a.appendChild(r);
      })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
    }
  }, []);

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

// Lógica para verificar se o usuário é admin
const ThemeSelector = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    /*const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASEURL}/user` // Implemente o link da API aqui
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

    fetchUserData();*/
  }, []);

  return (
    <ThemeProvider theme={isAdmin ? adminTheme : userTheme}>
      {children}
    </ThemeProvider>
  );
};
