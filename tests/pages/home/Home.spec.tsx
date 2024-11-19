import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../../../src/app/home/page";
import { ThemeProvider } from "@emotion/react";
import theme from "../../../themes/userTheme";
import { useRouter } from "next/navigation";

// Mock do useRouter do Next.js
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Tipagem correta para `useRouter` como uma função mockada
const mockUseRouter = useRouter as jest.Mock;

jest.mock(
  "@/components/UI/organisms/Layout",
  () =>
    ({ children }: { children: React.ReactNode }) =>
      <div data-testid="layout">{children}</div>
);

jest.mock("next/image", () => (props: any) => (
  <img {...props} alt="Mocked Image" />
));

describe("Home Page", () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
    });
  });

  it("deve renderizar o Layout e componentes principais", () => {
    render(
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    );

    // Verificar se o Layout e cada seção são renderizados corretamente
    expect(screen.getByTestId("layout")).toBeInTheDocument();
    expect(
      screen.getByText(/Descarte seus resíduos eletrônicos corretamente/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Bem-vindo ao EcosRev/i)).toBeInTheDocument();
    expect(screen.getByText(/O que oferecemos/i)).toBeInTheDocument();
    expect(screen.getByText(/Depoimentos/i)).toBeInTheDocument();
  });
});
