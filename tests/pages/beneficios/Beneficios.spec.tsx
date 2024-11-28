import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Beneficios from "../../../src/app/beneficios/page";
import { benefitsService } from "../../../routes/benefitRoute";

jest.mock("../../../routes/benefitRoute", () => ({
  benefitsService: {
    getAllBenefits: jest.fn(),
  },
}));

jest.mock("@/components/UI/organisms/CustomTable", () => {
  return jest.fn(({ rows }: any) => (
    <div data-testid="custom-table">
      {rows.map((row: any) => (
        <div key={row.id}>
          <span>{row.nome}</span>
          <span>{row.data}</span>
          <span>{row.endereco}</span>
          <span>{row.pontos}</span>
          <span>{row.quantidade}</span>
        </div>
      ))}
    </div>
  ));
});

jest.mock("@/components/HOCS/withAdminProtection", () => (Component: React.FC) =>
  jest.fn(() => <Component />)
);

describe("Beneficios Page", () => {
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

  it("deve renderizar o componente CustomTable e carregar os dados dos benefícios", async () => {
    (benefitsService.getAllBenefits as jest.Mock).mockResolvedValue(mockBenefits);

    render(<Beneficios />);

    // Verifica se o CustomTable foi renderizado
    expect(screen.getByTestId("custom-table")).toBeInTheDocument();

    // Espera os dados serem carregados e verifica se foram exibidos corretamente
    await waitFor(() => {
      expect(screen.getByText("Benefício A")).toBeInTheDocument();
      expect(screen.getByText("2023-01-01")).toBeInTheDocument();
      expect(screen.getByText("Endereço A")).toBeInTheDocument();
      expect(screen.getByText("100")).toBeInTheDocument();
      expect(screen.getByText("10")).toBeInTheDocument();

      expect(screen.getByText("Benefício B")).toBeInTheDocument();
      expect(screen.getByText("2023-01-02")).toBeInTheDocument();
      expect(screen.getByText("Endereço B")).toBeInTheDocument();
      expect(screen.getByText("200")).toBeInTheDocument();
      expect(screen.getByText("5")).toBeInTheDocument();
    });
  });

  it("deve exibir a tabela vazia se não houver benefícios", async () => {
    (benefitsService.getAllBenefits as jest.Mock).mockResolvedValue([]);

    render(<Beneficios />);

    await waitFor(() => {
      expect(screen.getByTestId("custom-table")).toBeInTheDocument();
      expect(screen.queryByText("Benefício A")).not.toBeInTheDocument();
    });
  });

  it("deve lidar com erros ao carregar os benefícios", async () => {
    (benefitsService.getAllBenefits as jest.Mock).mockRejectedValue(new Error("Erro ao buscar benefícios"));

    render(<Beneficios />);

    await waitFor(() => {
      expect(screen.getByTestId("custom-table")).toBeInTheDocument();
      // Espera que a tabela esteja vazia, já que ocorreu um erro ao buscar dados
      expect(screen.queryByText("Benefício A")).not.toBeInTheDocument();
    });
  });
});
