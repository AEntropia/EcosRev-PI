import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Beneficios from "../../../../src/app/beneficios/troca/page";
import { benefitsService } from "../../../../routes/benefitRoute";
import { userService } from "../../../../routes/userRoute";

jest.mock("../../../../routes/benefitRoute", () => ({
  benefitsService: {
    getAllBenefits: jest.fn(),
    updateBenefit: jest.fn(),
  },
}));

jest.mock("../../../../routes/userRoute", () => ({
  userService: {
    getLoggedUser: jest.fn(),
    updateUserPoints: jest.fn(),
  },
}));

jest.mock("@/components/HOCS/withAdminProtection", () => (Component: React.FC) =>
  jest.fn(() => <Component />)
);

describe("Beneficios", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockBenefits = [
    {
      _id: "1",
      nome: "Benefício A",
      data: "2023-01-01",
      endereco: "Endereço A",
      pontos: 100,
      quantidade: 10,
    },
    {
      _id: "2",
      nome: "Benefício B",
      data: "2023-01-02",
      endereco: "Endereço B",
      pontos: 200,
      quantidade: 5,
    },
  ];

  const mockUser = [
    {
      _id: "user1",
      pontos: 300,
    },
  ];

  it("deve renderizar a tabela com os benefícios e carregar dados do usuário", async () => {
    (benefitsService.getAllBenefits as jest.Mock).mockResolvedValue(mockBenefits);
    (userService.getLoggedUser as jest.Mock).mockResolvedValue(mockUser);

    render(<Beneficios />);

    expect(await screen.findByText("Benefício A")).toBeInTheDocument();
    expect(await screen.findByText("Benefício B")).toBeInTheDocument();
    expect(screen.getByText("Pontos Totais: 0")).toBeInTheDocument(); // Pontos totais inicial
  });

  it("deve calcular o total de pontos ao selecionar benefícios", async () => {
    (benefitsService.getAllBenefits as jest.Mock).mockResolvedValue(mockBenefits);
    (userService.getLoggedUser as jest.Mock).mockResolvedValue(mockUser);

    render(<Beneficios />);

    const rowA = await screen.findByText("Benefício A");
    const rowB = await screen.findByText("Benefício B");

    fireEvent.click(rowA); // Seleciona Benefício A
    fireEvent.click(rowB); // Seleciona Benefício B

    expect(await screen.findByText("Pontos Totais: 300")).toBeInTheDocument(); // 100 + 200
  });

  it("deve mostrar erro se pontos totais excederem os pontos do usuário", async () => {
    (benefitsService.getAllBenefits as jest.Mock).mockResolvedValue(mockBenefits);
    (userService.getLoggedUser as jest.Mock).mockResolvedValue(mockUser);

    render(<Beneficios />);

    const rowA = await screen.findByText("Benefício A");
    const rowB = await screen.findByText("Benefício B");

    fireEvent.click(rowA); // Seleciona Benefício A
    fireEvent.click(rowB); // Seleciona Benefício B

    const trocarButton = await screen.findByText("Trocar");
    fireEvent.click(trocarButton);

    await waitFor(() => {
      expect(screen.getByText("Você não tem pontos suficientes para realizar a troca.")).toBeInTheDocument();
    });
  });

  it("deve atualizar os pontos do usuário e o estoque dos benefícios ao realizar troca", async () => {
    (benefitsService.getAllBenefits as jest.Mock).mockResolvedValue(mockBenefits);
    (userService.getLoggedUser as jest.Mock).mockResolvedValue(mockUser);
    (userService.updateUserPoints as jest.Mock).mockResolvedValue({});
    (benefitsService.updateBenefit as jest.Mock).mockResolvedValue({});

    render(<Beneficios />);

    const rowA = await screen.findByText("Benefício A");
    fireEvent.click(rowA); // Seleciona Benefício A

    const trocarButton = await screen.findByText("Trocar");
    fireEvent.click(trocarButton);

    await waitFor(() => {
      expect(userService.updateUserPoints).toHaveBeenCalledWith({ pontos: "200" }); // 300 - 100
      expect(benefitsService.updateBenefit).toHaveBeenCalledWith({
        ...mockBenefits[0],
        quantidade: 9, // 10 - 1
      });
      expect(screen.getByText("Troca realizada com sucesso!")).toBeInTheDocument();
    });
  });

  it("deve exibir mensagem de erro caso a troca falhe", async () => {
    (benefitsService.getAllBenefits as jest.Mock).mockResolvedValue(mockBenefits);
    (userService.getLoggedUser as jest.Mock).mockResolvedValue(mockUser);
    (userService.updateUserPoints as jest.Mock).mockRejectedValue(new Error("Erro ao atualizar pontos"));

    render(<Beneficios />);

    const rowA = await screen.findByText("Benefício A");
    fireEvent.click(rowA); // Seleciona Benefício A

    const trocarButton = await screen.findByText("Trocar");
    fireEvent.click(trocarButton);

    await waitFor(() => {
      expect(screen.getByText("Erro ao realizar a troca. Tente novamente.")).toBeInTheDocument();
    });
  });
});
