import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signup from "@/app/signup/page";
import "@testing-library/jest-dom";
import { userService } from "../../../routes/userRoute";
import { useRouter } from "next/navigation";

// Mock do userService
jest.mock("../../../routes/userRoute", () => ({
  userService: {
    createUser: jest.fn(),
  },
}));

// Mock do componente Image do Next.js
jest.mock('next/image', () => {
  return {
    __esModule: true,
    default: ({ src, alt, width, height }: { src: string, alt: string, width: number, height: number }) => (
      <img src={src} alt={alt} width={width} height={height} />
    ),
  };
});

describe("Signup", () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    // Reseta os mocks antes de cada teste
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (userService.createUser as jest.Mock).mockResolvedValue(true); // Simula sucesso no cadastro
  });

  it("deve renderizar o formulário de cadastro corretamente", () => {
    render(<Signup />);

    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirmar Senha/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Criar Conta/i })).toBeInTheDocument();
  });
});