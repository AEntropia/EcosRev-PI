import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { withDataFetchingBenefit } from "@/components/HOCS/withDataFetchingBenefit";
import { benefitsService } from "../../../routes/benefitRoute";
import { Alert } from "@mui/material";

// Mock do serviço `benefitsService`
jest.mock("../../../routes/benefitRoute", () => ({
  benefitsService: {
    getBenefitsById: jest.fn(),
  },
}));

// Componente Simulado
const MockComponent = ({ dados }: { dados: any }) => (
  <div data-testid="benefit-component">
    {dados ? `Benefit Name: ${dados.name}` : "No Data"}
  </div>
);

describe("withDataFetchingBenefit HOC", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza o componente envolvido com dados quando a requisição é bem-sucedida", async () => {
    const mockResponse = { name: "Benefit Example" };
    (benefitsService.getBenefitsById as jest.Mock).mockResolvedValue(mockResponse);

    const WrappedComponent = withDataFetchingBenefit()(MockComponent);
    render(<WrappedComponent params={{ slug: "123" }} />);

    // Aguarda a renderização com os dados
    await waitFor(() =>
      expect(screen.getByTestId("benefit-component")).toHaveTextContent(
        "Benefit Name: Benefit Example"
      )
    );

    expect(benefitsService.getBenefitsById).toHaveBeenCalledWith("/123");
  });

  it("exibe um erro quando a requisição falha", async () => {
    (benefitsService.getBenefitsById as jest.Mock).mockRejectedValue(new Error("API Error"));

    const WrappedComponent = withDataFetchingBenefit()(MockComponent);
    render(<WrappedComponent params={{ slug: "123" }} />);

    // Aguarda a renderização do erro
    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
    expect(screen.getByText("Erro ao tentar realizar a consulta")).toBeInTheDocument();

    expect(benefitsService.getBenefitsById).toHaveBeenCalledWith("/123");
  });

  it("exibe o indicador de carregamento enquanto os dados estão sendo buscados", async () => {
    const mockPromise = new Promise(() => {});
    (benefitsService.getBenefitsById as jest.Mock).mockReturnValue(mockPromise);

    const WrappedComponent = withDataFetchingBenefit()(MockComponent);
    render(<WrappedComponent params={{ slug: "123" }} />);

    // Verifica se o carregamento está presente
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("não renderiza o indicador de carregamento após a conclusão", async () => {
    const mockResponse = { name: "Benefit Example" };
    (benefitsService.getBenefitsById as jest.Mock).mockResolvedValue(mockResponse);

    const WrappedComponent = withDataFetchingBenefit()(MockComponent);
    render(<WrappedComponent params={{ slug: "123" }} />);

    // Aguarda o fim do carregamento
    await waitFor(() =>
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
    );
  });
});
