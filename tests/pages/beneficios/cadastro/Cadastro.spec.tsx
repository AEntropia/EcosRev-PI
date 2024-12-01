import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CadastroTemplate from "../../../../src/app/beneficios/cadastro/page";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { benefitsService } from "../../../../routes/benefitRoute";
import "@testing-library/jest-dom";
import { Snackbar, Alert } from "@mui/material";

// Mock do componente Image do Next.js
jest.mock("next/image", () => {
  return {
    __esModule: true,
    default: ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => (
      <img src={src} alt={alt} width={width} height={height} />
    ),
  };
});

jest.mock("formik", () => ({
  useFormik: jest.fn(),
}));

jest.mock("../../../../routes/benefitRoute", () => ({
  benefitsService: {
    createBenefit: jest.fn(),
  },
}));

jest.mock("@/components/HOCS/withAdminProtection", () => ({
  withAdminProtection: jest.fn((Component) => Component),
}));

describe("CadastroTemplate", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (useFormik as jest.Mock).mockImplementation((config) => ({
      handleSubmit: jest.fn((e) => {
        e.preventDefault();
        config.onSubmit(config.initialValues);
      }),
      values: config.initialValues,
      handleChange: jest.fn(),
      errors: {},
    }));
  });

  it("deve renderizar o formulário com os campos corretamente", () => {
    render(<CadastroTemplate />);

    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Data")).toBeInTheDocument();
    expect(screen.getByLabelText("Endereço")).toBeInTheDocument();
    expect(screen.getByLabelText("Pontos")).toBeInTheDocument();
    expect(screen.getByLabelText("Quantidade")).toBeInTheDocument();
    expect(screen.getByText("Cadastrar")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
  });

  it("deve redirecionar para /home ao clicar em Cancelar", () => {
    render(<CadastroTemplate />);
    fireEvent.click(screen.getByText("Cancelar"));
    expect(mockPush).toHaveBeenCalledWith("/home");
  });

  it("deve exibir o Snackbar de sucesso após cadastro bem-sucedido", async () => {
    const mockCreateBenefit = jest.fn().mockResolvedValue("success");
    (benefitsService.createBenefit as jest.Mock).mockImplementation(mockCreateBenefit);

    render(<CadastroTemplate />);

    fireEvent.click(screen.getByText("Cadastrar"));

    await waitFor(() => {
      expect(screen.getByText("Cadastro realizado com sucesso!")).toBeInTheDocument();
    });

  });

  it("deve exibir o Snackbar de erro em caso de falha no cadastro", async () => {
    const mockCreateBenefit = jest.fn().mockRejectedValue(new Error("Erro ao cadastrar benefício"));
    (benefitsService.createBenefit as jest.Mock).mockImplementation(mockCreateBenefit);

    render(<CadastroTemplate />);

    fireEvent.click(screen.getByText("Cadastrar"));

    await waitFor(() => {
      expect(screen.getByText("Erro ao cadastrar benefício, verifique com o suporte")).toBeInTheDocument();
    });
  });

  it("deve fechar o Snackbar ao clicar no botão de fechar", async () => {
    render(<CadastroTemplate />);

    // Simula a abertura do Snackbar
    fireEvent.click(screen.getByText("Cadastrar"));

    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: /close/i }));
    });

    await waitFor(() => {
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  it("deve exibir mensagens de erro de validação nos campos obrigatórios", async () => {
    (useFormik as jest.Mock).mockImplementation((config) => ({
      handleSubmit: jest.fn(),
      values: config.initialValues,
      handleChange: jest.fn(),
      errors: {
        nome: "O nome é obrigatório",
        data: "A data é obrigatória",
      },
    }));

    render(<CadastroTemplate />);

    expect(screen.getByText("O nome é obrigatório")).toBeInTheDocument();
    expect(screen.getByText("A data é obrigatória")).toBeInTheDocument();
  });
});
