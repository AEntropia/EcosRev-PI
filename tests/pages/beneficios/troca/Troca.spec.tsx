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

describe("Benefícios", () => {
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
      pontos: 200,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar a tabela de benefícios", async () => {
    (benefitsService.getAllBenefits as jest.Mock).mockResolvedValue(
      mockBenefits
    );
    (userService.getLoggedUser as jest.Mock).mockResolvedValue(mockUser);

    render(<Beneficios />);

    await waitFor(() => {
      expect(screen.getByText("Benefício A")).toBeInTheDocument();
      expect(screen.getByText("Benefício B")).toBeInTheDocument();
    });
  });

  it("deve calcular o total de pontos ao selecionar benefícios", async () => {
    (benefitsService.getAllBenefits as jest.Mock).mockResolvedValue(
      mockBenefits
    );
    (userService.getLoggedUser as jest.Mock).mockResolvedValue(mockUser);

    render(<Beneficios />);

    const rowA = await screen.findByText("Benefício A");
    const rowB = await screen.findByText("Benefício B");

    fireEvent.click(rowA); // Seleciona Benefício A
    fireEvent.click(rowB); // Seleciona Benefício B

    await waitFor(() => {
      expect(screen.getByText("Pontos Totais: 300")).toBeInTheDocument(); // 100 + 200
    });
  });

  it("deve abrir modal de troca ao selecionar benefícios", async () => {
    (benefitsService.getAllBenefits as jest.Mock).mockResolvedValue(
      mockBenefits
    );
    (userService.getLoggedUser as jest.Mock).mockResolvedValue(mockUser);

    render(<Beneficios />);

    const rowA = await screen.findByText("Benefício A");
    fireEvent.click(rowA);

    const trocarButton = await screen.findByText("Trocar");
    expect(trocarButton).toBeInTheDocument(); // Verifica se o botão Trocar está visível

    fireEvent.click(trocarButton);

    await waitFor(() => {
      expect(
        screen.getByText("Total de Pontos Selecionados")
      ).toBeInTheDocument();
    });
  });

  it("deve exibir erro se pontos totais excederem os pontos do usuário", async () => {
    (benefitsService.getAllBenefits as jest.Mock).mockResolvedValue(
      mockBenefits
    );
    (userService.getLoggedUser as jest.Mock).mockResolvedValue(mockUser);

    // Mock do alert
    const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {});

    render(<Beneficios />);

    // Seleciona os benefícios
    const rowA = await screen.findByText("Benefício A");
    const rowB = await screen.findByText("Benefício B");

    // Firing click events to select the rows
    fireEvent.click(rowA);
    fireEvent.click(rowB);

    // Espera até que a troca seja tentada
    const trocarButton = await screen.findByText("Trocar");
    fireEvent.click(trocarButton);

    // Espera o alerta ser chamado
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith(
        "Você não tem pontos suficientes para realizar a troca."
      );
    });

    mockAlert.mockRestore(); // Restaura o mock após o teste
  });

  it("deve realizar a troca com sucesso e atualizar pontos", async () => {
    (benefitsService.getAllBenefits as jest.Mock).mockResolvedValue(
      mockBenefits
    );
    (userService.getLoggedUser as jest.Mock).mockResolvedValue(mockUser);
    (userService.updateUserPoints as jest.Mock).mockResolvedValue({});
    (benefitsService.updateBenefit as jest.Mock).mockResolvedValue({});

    // Mock do alert
    const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {});

    render(<Beneficios />);

    const rowA = await screen.findByText("Benefício A");
    fireEvent.click(rowA);

    const trocarButton = await screen.findByText("Trocar");
    fireEvent.click(trocarButton);

    await waitFor(() => {
      // Verifica se o alert foi chamado com a mensagem de sucesso
      expect(mockAlert).toHaveBeenCalledWith("Troca realizada com sucesso!");
    });

    mockAlert.mockRestore(); // Restaura o mock após o teste
  });

  it("deve exibir erro caso a troca falhe", async () => {
    (benefitsService.getAllBenefits as jest.Mock).mockResolvedValue(
      mockBenefits
    );
    (userService.getLoggedUser as jest.Mock).mockResolvedValue(mockUser);
    (userService.updateUserPoints as jest.Mock).mockRejectedValue(
      new Error("Erro ao atualizar pontos")
    );

    // Mock do alert
    const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {});

    render(<Beneficios />);

    const rowA = await screen.findByText("Benefício A");
    fireEvent.click(rowA);

    const trocarButton = await screen.findByText("Trocar");
    fireEvent.click(trocarButton);

    await waitFor(() => {
      // Verifica se o alert foi chamado com a mensagem de erro
      expect(mockAlert).toHaveBeenCalledWith(
        "Erro ao realizar a troca. Tente novamente."
      );
    });

    mockAlert.mockRestore(); // Restaura o mock após o teste
  });
});
