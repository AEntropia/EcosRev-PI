import { api } from "./middleware";

// Interfaces

interface iPontos{
  pontos: string;
}
interface User {
  _id?: string;
  nome: string;
  email: string;
  senha: string;
  tipo: string;
  pontos: string;
  ativo?: boolean;
  // outros campos...
}

interface CreateUserData {
  nome: string;
  email: string;
  senha: string;
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
  async updateUser(userData: User): Promise<User> {
    try {
      const response = await api.put<User>(`/usuario/pontosPut`, userData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar usuário:`, error);
      throw error;
    }
  },

  // DELETE - Remover um usuário
  async deleteUser(id?: string): Promise<void> {
    try {
      await api.delete(`/usuario/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar usuário ${id}:`, error);
      throw error;
    }
  },
  async getLoggedUser(): Promise<User[]> {
    try {
      const response = await api.get<User[]>("/usuario/pontos");
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      throw error;
    }
  },
  async updateUserPoints(pontos : iPontos): Promise<User> {
    try {
      const response = await api.put<User>(`/usuario/pontos`, pontos);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar usuário:`, error);
      throw error;
    }
  },
};



