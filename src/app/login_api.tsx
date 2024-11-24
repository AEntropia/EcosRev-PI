import axios from "axios";

const api = axios.create({
  baseURL: "https://ecos-rev.vercel.app/", // Substitua pela URL da sua API
  headers: {
    "Content-Type": "application/json",
  },
});

interface LoginResponse {
  access_token: string;
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
      // Configura o token para futuras requisições
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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

// Função para verificar se o usuário está autenticado
export function isAuthenticated(): boolean {
  return localStorage.getItem("authToken") !== null;
}

// Função para obter o token
export function getToken(): string | null {
  return localStorage.getItem("authToken");
}

// Função para fazer logout
export function logout(): void {
  localStorage.removeItem("authToken");
  delete api.defaults.headers.common["Authorization"];
}
