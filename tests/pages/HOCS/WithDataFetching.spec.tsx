import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { withDataFetching } from "../../../src/components/HOCS/withDataFetching"; // caminho do HOC
import { CircularProgress, Alert } from "@mui/material";

jest.mock("axios");
jest.mock("@mui/material", () => ({
  Alert: ({ children }) => <div data-testid="alert">{children}</div>,
  AlertTitle: ({ children }) => <div>{children}</div>,
  CircularProgress: () => <div data-testid="circular-progress" />,
}));

const MockComponent = ({ data }) => (
  <div data-testid="wrapped-component">{JSON.stringify(data)}</div>
);

const mockUrl = "https://api.mock.com/resource";
const mockData = { id: 1, name: "Item Teste" };

describe("withDataFetching HOC", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve exibir o CircularProgress durante o carregamento", async () => {
    (axios.get as jest.Mock).mockReturnValue(new Promise(() => {})); // promessa pendente

    const WrappedComponent = withDataFetching()(MockComponent);
    render(<WrappedComponent params={{ slug: "1" }} />);

    expect(screen.getByTestId("circular-progress")).toBeInTheDocument();
  });

  it("deve exibir o componente wrapped com os dados ao finalizar o carregamento com sucesso", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

    const WrappedComponent = withDataFetching()(MockComponent);
    render(<WrappedComponent params={{ slug: "1" }} />);

    await waitFor(() =>
      expect(screen.queryByTestId("circular-progress")).not.toBeInTheDocument()
    );
    expect(screen.getByTestId("wrapped-component")).toHaveTextContent(
      JSON.stringify(mockData)
    );
  });

  it("deve exibir um Alert de erro se a requisição falhar", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("Erro na requisição"));

    const WrappedComponent = withDataFetching()(MockComponent);
    render(<WrappedComponent params={{ slug: "1" }} />);

    await waitFor(() =>
      expect(screen.queryByTestId("circular-progress")).not.toBeInTheDocument()
    );
    expect(screen.getByTestId("alert")).toHaveTextContent(
      "Erro ao tentar realizar a consulta"
    );
  });
});
