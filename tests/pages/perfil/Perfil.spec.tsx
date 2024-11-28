import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PerfilPage from "../../../src/app/perfil/page";
import userEvent from "@testing-library/user-event";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => <img alt={alt} data-testid="next-image" />,
}));

jest.mock("@/components/UI/organisms/Layout", () => {
  return ({ children }: { children: React.ReactNode }) => <div data-testid="layout">{children}</div>;
});

describe("PerfilPage Component", () => {
  const mockUserData = {
    name: { first: "John", last: "Doe" },
    location: { street: { name: "Main St", number: 123 } },
    picture: { large: "https://via.placeholder.com/150" },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ results: [mockUserData] }),
    });
  });

  it("deve renderizar todos os elementos corretamente", async () => {
    render(<PerfilPage />);

    // Aguarda que o nome seja carregado a partir do mock da API
    await waitFor(() => {
      expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
    });

    expect(screen.getByTestId("layout")).toBeInTheDocument();
    expect(screen.getByTestId("next-image")).toBeInTheDocument();
    expect(screen.getByText("Perfil do Usuário")).toBeInTheDocument();
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Endereço")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Salvar" })).toBeInTheDocument();
  });

  it("deve preencher os campos com os dados carregados da API", async () => {
    render(<PerfilPage />);

    await waitFor(() => {
      expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Main St, 123")).toBeInTheDocument();
      expect(screen.getByDisplayValue("senha123")).toBeInTheDocument();
    });
  });

  it("deve permitir editar os campos e salvar", async () => {
    render(<PerfilPage />);

    const nomeInput = await screen.findByLabelText("Nome");
    const enderecoInput = screen.getByLabelText("Endereço");
    const senhaInput = screen.getByLabelText("Senha");
    const salvarButton = screen.getByRole("button", { name: "Salvar" });

    // Edita os campos
    fireEvent.change(nomeInput, { target: { value: "Jane Doe" } });
    fireEvent.change(enderecoInput, { target: { value: "Elm St, 456" } });
    fireEvent.change(senhaInput, { target: { value: "novaSenha" } });

    expect(nomeInput).toHaveValue("Jane Doe");
    expect(enderecoInput).toHaveValue("Elm St, 456");
    expect(senhaInput).toHaveValue("novaSenha");

    // Simula o envio do formulário
    fireEvent.click(salvarButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Alterações salvas com sucesso!");
    });
  });

  it("deve exibir erro caso a API falhe ao carregar os dados", async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("API Error"));

    render(<PerfilPage />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        "Erro ao obter os dados do usuário:",
        expect.any(Error)
      );
    });
  });
});
