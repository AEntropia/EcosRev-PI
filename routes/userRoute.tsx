import { api } from "./middleware";

// Interfaces
interface User {
  _id: string;
  nome: string;
  email: string;
  senha: string;
  tipo: string;
  pontos: string;
  ativo: boolean;
  // outros campos...
}

interface CreateUserData {
  _id: string;
  nome: string;
  email: string;
  senha: string;
  tipo: string;
  pontos: string;
  ativo: boolean;
}

interface UpdateUserData {
  _id: string;
  pontos: string;
  // outros campos que podem ser atualizados...
}

// Serviço de usuários
export const userService = {
  // GET - Buscar todos os usuários
  async getAllUsers(): Promise<User[]> {
    try {
      const response = await api.get<User[]>("/usuario");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      throw error;
    }
  },

  // GET - Buscar um usuário específico
  async getUserById(id: string): Promise<User> {
    try {
      const response = await api.get<User>(`/usuario/id${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar usuário ${id}:`, error);
      throw error;
    }
  },

  // POST - Criar um novo usuário
  async createUser(userData: CreateUserData): Promise<User> {
    try {
      const response = await api.post<User>("/usuario", userData);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw error;
    }
  },

  // PUT - Atualizar um usuário
  async updateUser(userData: UpdateUserData): Promise<User> {
    try {
      const response = await api.put<User>(`/usuario/pontos`, userData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar usuário:`, error);
      throw error;
    }
  },

  // DELETE - Remover um usuário
  async deleteUser(id: number): Promise<void> {
    try {
      await api.delete(`/usuario/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar usuário ${id}:`, error);
      throw error;
    }
  },
};
