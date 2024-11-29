import axios from "axios";
import { string } from "yup";
const api = axios.create({
  baseURL: "https://ecos-rev.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});
// Adiciona o token automaticamente em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers["access-token"] = token;
  }
  return config;
});

export { api };
