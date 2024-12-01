import React from "react";
import { render, screen } from "@testing-library/react";
import { withAdminProtection } from "@/components/HOCS/withAdminProtection";
import { useRouter } from "next/navigation";
import { isAdmin } from "@/app/login_api";

// Mock do `useRouter`
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock do `isAdmin`
jest.mock("@/app/login_api", () => ({
  isAdmin: jest.fn(),
}));

// Componente Simulado
const MockComponent = () => <div data-testid="protected-component">Admin Content</div>;

describe("withAdminProtection HOC", () => {
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza o componente protegido se o usuário for admin", () => {
    (isAdmin as jest.Mock).mockReturnValue("admin");

    const ProtectedComponent = withAdminProtection(MockComponent);
    render(<ProtectedComponent />);

    expect(screen.getByTestId("protected-component")).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("redireciona se o usuário não for admin", () => {
    (isAdmin as jest.Mock).mockReturnValue("user");

    const ProtectedComponent = withAdminProtection(MockComponent, {
      redirectPath: "/login",
    });
    render(<ProtectedComponent />);

    expect(screen.queryByTestId("protected-component")).not.toBeInTheDocument();
    expect(mockPush).toHaveBeenCalledWith("/login");
  });

  it("usa o caminho de redirecionamento padrão se não for fornecido", () => {
    (isAdmin as jest.Mock).mockReturnValue("user");

    const ProtectedComponent = withAdminProtection(MockComponent);
    render(<ProtectedComponent />);

    expect(mockPush).toHaveBeenCalledWith("/home");
  });

  it("não renderiza nada enquanto a verificação de admin está pendente", () => {
    (isAdmin as jest.Mock).mockReturnValue(undefined);

    const ProtectedComponent = withAdminProtection(MockComponent);
    render(<ProtectedComponent />);

    expect(screen.queryByTestId("protected-component")).not.toBeInTheDocument();
    expect(mockPush).toHaveBeenCalled();
  });
});
