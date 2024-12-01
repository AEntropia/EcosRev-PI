import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { withDataFetching } from "@/components/HOCS/withDataFetching";
import { userService } from "../../../routes/userRoute";
import { Alert } from "@mui/material";

// Mock do userService
jest.mock("../../../routes/userRoute", () => ({
  userService: {
    getUserById: jest.fn(),
  },
}));

// Componente Simulado
const MockComponent = ({ data }: any) => (
  <div data-testid="mock-component">
    {data ? (
      <p data-testid="user-name">{data.nome}</p>
    ) : (
      "No data available"
    )}
  </div>
);

// HOC com Componente Envolvido
const MockComponentWithDataFetching = withDataFetching()(MockComponent);

describe("withDataFetching HOC", () => {
  it("exibe um spinner enquanto os dados estão sendo carregados", async () => {
    (userService.getUserById as jest.Mock).mockImplementation(() =>
      new Promise(() => {})
    );

    render(<MockComponentWithDataFetching params={{ slug: "123" }} />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("exibe os dados após o carregamento bem-sucedido", async () => {
    const mockUser = {
      _id: "123",
      nome: "Jane Doe",
      email: "jane.doe@example.com",
      senha: "password",
      tipo: "user",
      pontos: "100",
    };

    (userService.getUserById as jest.Mock).mockResolvedValue(mockUser);

    render(<MockComponentWithDataFetching params={{ slug: "123" }} />);

    await waitFor(() => {
      expect(screen.getByTestId("user-name")).toHaveTextContent("Jane Doe");
    });
  });

  it("exibe uma mensagem de erro se a chamada da API falhar", async () => {
    (userService.getUserById as jest.Mock).mockRejectedValue(
      new Error("Erro ao tentar realizar a consulta")
    );

    render(<MockComponentWithDataFetching params={{ slug: "123" }} />);

    await waitFor(() => {
      expect(screen.getByText("Erro ao tentar realizar a consulta")).toBeInTheDocument();
    });

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("não exibe o spinner após o carregamento", async () => {
    (userService.getUserById as jest.Mock).mockResolvedValue({
      nome: "John Doe",
    });

    render(<MockComponentWithDataFetching params={{ slug: "123" }} />);

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });
  });
});
