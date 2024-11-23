// import axios from "axios";
// import { headers } from "next/headers";

// const baseURL = "https://ecos-rev.vercel.app";

// export async function login(): Promise<string | null> {
//   try {
//     const response = await axios(`${baseURL}/api/usuario/login`, {
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Headers": "Authorization",
//         "Access-Control-Allow-Methods":
//           "GET, POST, OPTIONS, PUT, PATCH, DELETE",
//         "Content-Type": "application/json;charset=UTF-8",
//       },
//       data: { email: "sandman2871@gmail.com", senha: "Mateus123#" },
//     });

//     if (response.status === 200) {
//       const accessToken = response;
//       console.log(response);
//       if (accessToken) {
//         console.log("Access Token:", accessToken);
//         return accessToken as any;
//       } else {
//         console.error("Access Token não encontrado no cabeçalho.");
//         return null;
//       }
//     } else {
//       console.error("Erro no login:", response.data);
//       return null;
//     }
//   } catch (error) {
//     console.error("Erro ao fazer login:", error);
//     return null;
//   }
// }

// export async function fetchUsuarios(accessToken: string) {
//   try {
//     const response = await axios.get(`${baseURL}/api/usuarios`, {
//       headers: {
//         Authorization: `access_token: ${accessToken}`,
//       },
//     });

//     if (response.status === 200) {
//       console.log("Usuários:", response.data);
//       return response.data;
//     } else {
//       console.error("Erro ao buscar usuários:", response.data);
//     }
//   } catch (error) {
//     console.error("Erro ao acessar a API de usuários:", error);
//   }
// }
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
      console.log(token);
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
