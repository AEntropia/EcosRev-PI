import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PasswordRecovery from "../../../src/app/passwordRecovery/page";
import { useRouter } from "next/navigation";

// Mock do componente Image do Next.js
jest.mock('next/image', () => {
  return {
    __esModule: true,
    default: ({ src, alt, width, height }: { src: string, alt: string, width: number, height: number }) => (
      <img src={src} alt={alt} width={width} height={height} />
    ),
  };
});

jest.mock("@/components/templates/auth/AuthTemplate", () => ({
  AuthTemplate: jest.fn(({ children }: any) => <div>{children}</div>),
}));


jest.mock("@/components/UI/molecules/Header", () => {
  return jest.fn(() => <div data-testid="header" />);
});

jest.mock("@/components/UI/atoms/FormTextField", () => {
  return jest.fn(({ label, ...props }: any) => (
    <input
      placeholder={label}
      {...props}
      data-testid="form-text-field"
      type="email"
    />
  ));
});

jest.mock("@/components/UI/atoms/ButtonAtom", () => {
  return jest.fn(({ children, ...props }: any) => (
    <button {...props} data-testid="button-atom">
      {children}
    </button>
  ));
});

jest.mock("../../../public/images/roadImg.jpeg", () => ({
  src: "mocked-road-image-url",
}));

describe("PasswordRecovery Page", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("deve renderizar corretamente todos os elementos", () => {
    render(<PasswordRecovery />);

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
    fireEvent.change(emailField, { target: { value: "test@example.com" } });

    expect(emailField).toHaveValue("test@example.com");
  });

  it("deve exibir mensagem de sucesso após o envio do formulário", async () => {
    render(<PasswordRecovery />);

    const emailField = screen.getByTestId("form-text-field");
    const submitButton = screen.getByTestId("button-atom");

    fireEvent.change(emailField, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Link de recuperação de senha enviado com sucesso!")
      ).toBeInTheDocument();
    });

    // O campo de e-mail deve ser limpo após o envio
    expect(emailField).toHaveValue("");
  });

  it("deve exibir mensagem de erro caso o envio falhe", async () => {
    jest.spyOn(global, "Promise").mockImplementationOnce(
      () => new Promise((_, reject) => reject("Simulated failure"))
    );

    render(<PasswordRecovery />);

    const emailField = screen.getByTestId("form-text-field");
    const submitButton = screen.getByTestId("button-atom");

    fireEvent.change(emailField, { target: { value: "test@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Erro ao enviar link de recuperação de senha!")
      ).toBeInTheDocument();
    });
  });

  it("deve navegar para a página de login ao clicar no link", () => {
    render(<PasswordRecovery />);

    const loginLink = screen.getByText("Voltar para Login");
    fireEvent.click(loginLink);

    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("deve exibir a imagem de fundo corretamente", () => {
    render(<PasswordRecovery />);

    const backgroundImage = screen.getByTestId("auth-template");
    expect(backgroundImage).toHaveStyle(`background-image: url(mocked-road-image-url)`);
  });
});
