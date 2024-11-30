import axios from "axios";
import { useRouter } from "next/navigation";

const api = axios.create({
  baseURL: "https://ecos-rev.vercel.app/", // Substitua pela URL da sua API
  headers: {
    "Content-Type": "application/json",
  },
});
interface LoginResponse {
  access_token: string;
  redirect_url: string;
}

export async function login(
  email: string,
  senha: string
): Promise<string | null> {
  try {
    const response = await api.post<LoginResponse>("/api/usuario/login", {
      email,
      senha,
    });

    // Verifica se a resposta foi bem-sucedida e contém o token
    if (response.data && response.data.access_token) {
      const token = response.data.access_token;
      // Salva o token no localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("isAdmin", response.data.redirect_url);
      return token;
    }

    console.error("Token não encontrado na resposta");
    return null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro na requisição:", error.response?.data);
    } else {
      console.error("Erro inesperado:", error);
    }
    return null;
  }
}
export function isAdmin(): string | null {
  if (typeof window !== "undefined") {
    const adm = localStorage.getItem("isAdmin");
    return adm == "menu.html" ? "admin" : "cliente";
  } else {
    return "erro";
  }
}
// Função para verificar se o usuário está autenticado
export function isAuthenticated(): boolean {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken") !== null;
  } else {
    return false;
  }
}

// Função para obter o token
export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  } else {
    return "erro";
  }
}

// Função para fazer logout
export function logout(): void {
  if (typeof window !== "undefined") {
    const adm = localStorage.getItem("isAdmin");
    localStorage.removeItem("authToken");
    localStorage.removeItem("isAdmin");
  } else {
    console.log("erro");
  }
}
