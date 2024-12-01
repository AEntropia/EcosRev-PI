import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import EditTemplate from "@/components/templates/beneficio/EditTemplate";
import "@testing-library/jest-dom";
import { benefitsService } from "../../../../routes/benefitRoute";
import { IBeneficios } from "@/interfaces/IBeneficios";
import { useRouter } from "next/navigation";

// Mock dos serviços e hooks
jest.mock("../../../../routes/benefitRoute", () => ({
  benefitsService: {
    updateBenefit: jest.fn(),
    deleteBenefit: jest.fn(),
  },
}));


describe("EditTemplate", () => {
  const mockRouterPush = jest.fn();
  const mockBenefit: IBeneficios = {
    _id: "1",
    nome: "Benefício Teste",
    data: "2024-12-01",
    endereco: "Endereço Teste",
    pontos: 100,
    quantidade: 5,
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
  });

  it("deve renderizar o formulário com os valores do benefício", async () => {
    await act(async () => {
      render(<EditTemplate beneficio={mockBenefit} />);
    });

    expect(screen.getByLabelText(/Nome/)).toHaveValue(mockBenefit.nome);
    expect(screen.getByLabelText(/Data/)).toHaveValue(mockBenefit.data);
    expect(screen.getByLabelText(/Endereço/)).toHaveValue(mockBenefit.endereco);
    expect(screen.getByLabelText(/Pontos/)).toHaveValue(mockBenefit.pontos);
    expect(screen.getByLabelText(/Quantidade/)).toHaveValue(mockBenefit.quantidade);
  });


  it("deve navegar para a página de benefícios ao clicar no botão Cancelar", async () => {
    await act(async () => {
      render(<EditTemplate beneficio={mockBenefit} />);
    });

    const cancelButton = screen.getByRole("button", { name: /Cancelar/i });
    await act(async () => {
      fireEvent.click(cancelButton);
    });

    expect(mockRouterPush).toHaveBeenCalledWith("/beneficios");
  });
});
