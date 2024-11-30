import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CadastroTemplate from "../../../../src/app/beneficios/cadastro/page";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { benefitsService } from "../../../../routes/benefitRoute";

jest.mock("formik", () => ({
  useFormik: jest.fn(),
}));

jest.mock("../../../../routes/benefitRoute", () => ({
  benefitsService: {
    createBenefit: jest.fn(),
  },
}));

jest.mock("@/components/HOCS/withAdminProtection", () => ({
  withAdminProtection: jest.fn((Component) => Component), // Mock que retorna o componente diretamente
}));

describe("CadastroTemplate", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
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

  afterEach(() => {
    jest.clearAllMocks();
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

  it("deve chamar a função onSubmit com os valores do formulário ao enviar", async () => {
    const mockCreateBenefit = jest.fn().mockResolvedValue("success");

    (benefitsService.createBenefit as jest.Mock).mockImplementation(
      mockCreateBenefit
    );

    render(<CadastroTemplate />);

    fireEvent.click(screen.getByText("Cadastrar"));

    await waitFor(() => {
      expect(mockCreateBenefit).toHaveBeenCalledWith({
        data: "",
        nome: "",
        endereco: "",
        pontos: 0,
        quantidade: 0,
      });
    });
  });

  it("deve exibir um erro no console em caso de falha na criação do benefício", async () => {
    // Cria um espião para monitorar o console.error
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Mock para a função que rejeita a promessa com erro
    const mockCreateBenefit = jest
      .fn()
      .mockRejectedValue(new Error("Erro ao cadastrar"));

    // Substitui a implementação do serviço com o mock
    (benefitsService.createBenefit as jest.Mock).mockImplementation(
      mockCreateBenefit
    );

    // Renderiza o componente
    render(<CadastroTemplate />);

    // Aciona o envio do formulário
    fireEvent.click(screen.getByText("Cadastrar"));

    // Aguarda até que o erro seja capturado
    await waitFor(() => {
      // Verifica se o erro foi registrado no console
      expect(consoleSpy).toHaveBeenCalledWith(
        "Erro ao cadastrar benefício:",
        expect.any(Error)
      );
    });

    // Restaura o espião
    consoleSpy.mockRestore();
  });
});
