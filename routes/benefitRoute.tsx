import { api } from "./middleware";
import { IBeneficios } from "@/interfaces/IBeneficios";

export const benefitsService = {
  async getAllBenefits(): Promise<IBeneficios[]> {
    try {
      const response = await api.get<IBeneficios[]>("/beneficio");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar benefícios:", error);
      throw error;
    }
  },

  async getBenefitsById(id: string): Promise<IBeneficios> {
    try {
      const response = await api.get<IBeneficios>(`/beneficio/id${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar benefício ${id}:`, error);
      throw error;
    }
  },

  async createBenefit(benefitData: IBeneficios): Promise<IBeneficios> {
    try {
      const response = await api.post<IBeneficios>("/beneficio", benefitData);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar benefício:", error);
      throw error;
    }
  },

  async updateBenefit(benefitData: IBeneficios): Promise<IBeneficios> {
    try {
      const response = await api.put<IBeneficios>(`/beneficio`, benefitData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar benefício:`, error);
      throw error;
    }
  },

  async deleteBenefit(id?: string): Promise<void> {
    try {
      await api.delete(`/beneficio/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar benefício ${id}:`, error);
      throw error;
    }
  },
};
