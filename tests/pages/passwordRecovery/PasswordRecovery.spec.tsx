import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PasswordRecovery from "../../../src/app/passwordRecovery/page";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/components/templates/auth/AuthTemplate", () => {
  return ({ children }: any) => <div data-testid="auth-template">{children}</div>;
});

jest.mock("@/components/UI/molecules/Header", () => {
  return jest.fn(() => <div data-testid="header" />);
});

jest.mock("@/components/UI/atoms/FormTextField", () => {
  return jest.fn(({ label, ...props }: any) => (
    <input placeholder={label} {...props} data-testid="form-text-field" />
  ));
});

jest.mock("@/components/UI/atoms/ButtonAtom", () => {
  return jest.fn(({ children, ...props }: any) => (
    <button {...props} data-testid="button-atom">
      {children}
    </button>
  ));
});

describe("PasswordRecovery Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar corretamente todos os elementos", () => {
    render(<PasswordRecovery />);

    // Verifica se os componentes principais foram renderizados
    expect(screen.getByTestId("auth-template")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("form-text-field")).toBeInTheDocument();
    expect(screen.getByTestId("button-atom")).toBeInTheDocument();
    expect(screen.getByText("Recuperação de Senha")).toBeInTheDocument();
    expect(screen.getByText("Voltar para Login")).toBeInTheDocument();
  });

  it("deve permitir preencher o campo de e-mail", () => {
    render(<PasswordRecovery />);

    const emailField = screen.getByTestId("form-text-field");
    fireEvent.change(emailField, { target: { value: "user@example.com" } });

    expect(emailField).toHaveValue("user@example.com");
  });

  it("deve exibir mensagem de sucesso após enviar o formulário", async () => {
    render(<PasswordRecovery />);

    const emailField = screen.getByTestId("form-text-field");
    const submitButton = screen.getByTestId("button-atom");

    fireEvent.change(emailField, { target: { value: "user@example.com" } });
    fireEvent.click(submitButton);

    // Verifica se a mensagem de sucesso é exibida após o envio
    await waitFor(() => {
      expect(
        screen.getByText("Link de recuperação de senha enviado com sucesso!")
      ).toBeInTheDocument();
    });

    // Verifica se o campo de e-mail é limpo após o sucesso
    expect(emailField).toHaveValue("");
  });

  it("deve lidar com falha no envio do formulário", async () => {
    jest.spyOn(global, "Promise").mockImplementation(() => {
      throw new Error("Simulated failure");
    });

    render(<PasswordRecovery />);

    const emailField = screen.getByTestId("form-text-field");
    const submitButton = screen.getByTestId("button-atom");

    fireEvent.change(emailField, { target: { value: "user@example.com" } });
    fireEvent.click(submitButton);

    // Verifica se a mensagem de erro é exibida após falha
    await waitFor(() => {
      expect(screen.getByText("Erro ao enviar link de recuperação de senha!")).toBeInTheDocument();
    });
  });
});
