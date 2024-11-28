import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PasswordReset from "../../../src/app/passwordReset/page";
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

describe("PasswordReset Component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("deve renderizar todos os elementos corretamente", () => {
    render(<PasswordReset />);

    expect(screen.getByTestId("auth-template")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getAllByTestId("form-text-field")).toHaveLength(2);
    expect(screen.getByTestId("button-atom")).toBeInTheDocument();
    expect(screen.getByText("Redefinir Senha")).toBeInTheDocument();
  });

  it("deve permitir preencher os campos de senha e confirmação", () => {
    render(<PasswordReset />);

    const [passwordField, confirmPasswordField] = screen.getAllByTestId("form-text-field");

    fireEvent.change(passwordField, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordField, { target: { value: "password123" } });

    expect(passwordField).toHaveValue("password123");
    expect(confirmPasswordField).toHaveValue("password123");
  });

  it("deve exibir erro se as senhas não coincidirem", () => {
    render(<PasswordReset />);

    const [passwordField, confirmPasswordField] = screen.getAllByTestId("form-text-field");
    const submitButton = screen.getByTestId("button-atom");

    fireEvent.change(passwordField, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordField, { target: { value: "password456" } });
    fireEvent.click(submitButton);

    expect(screen.getByText("As senhas não coincidem!")).toBeInTheDocument();
  });

  it("deve redefinir a senha com sucesso e redirecionar", async () => {
    render(<PasswordReset />);

    const [passwordField, confirmPasswordField] = screen.getAllByTestId("form-text-field");
    const submitButton = screen.getByTestId("button-atom");

    fireEvent.change(passwordField, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordField, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Senha redefinida com sucesso!")).toBeInTheDocument();
    });

    // Verifica redirecionamento após sucesso
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });

  it("deve exibir erro em caso de falha no backend", async () => {
    jest.spyOn(global, "Promise").mockImplementation(() => {
      throw new Error("Simulated failure");
    });

    render(<PasswordReset />);

    const [passwordField, confirmPasswordField] = screen.getAllByTestId("form-text-field");
    const submitButton = screen.getByTestId("button-atom");

    fireEvent.change(passwordField, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordField, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Erro ao redefinir senha!")).toBeInTheDocument();
    });
  });
});
