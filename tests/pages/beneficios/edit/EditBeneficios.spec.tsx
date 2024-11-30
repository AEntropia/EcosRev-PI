import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@emotion/react";
import { Container } from "@mui/material";
import BeneficiosEdit from "@/app/beneficios/edit/[slug]/page";
import { withDataFetchingBenefit } from "@/components/HOCS/withDataFetchingBenefit";
import { withAdminProtection } from "@/components/HOCS/withAdminProtection";
import theme from "../../../../themes/userTheme";
import Layout from "@/components/UI/organisms/Layout";
import EditTemplate from "@/components/templates/beneficio/EditTemplate";

// Mock dos HOCs
jest.mock("@/components/HOCS/withDataFetchingBenefit", () => ({
  withDataFetchingBenefit: jest.fn(
    () => (Component: React.ComponentType) => (props: any) =>
      (
        <Component
          {...props}
          dados={[
            {
              _id: "1",
              nome: "Benefício Teste",
              data: "2024-11-29",
              endereco: "Endereço Teste",
              pontos: 100,
              quantidade: 10,
            },
          ]}
        />
      )
  ),
}));

jest.mock("@/components/HOCS/withAdminProtection", () => ({
  withAdminProtection: jest.fn(
    (Component: React.ComponentType) => (props: any) => <Component {...props} />
  ),
}));

// Mock dos componentes
jest.mock("@/components/UI/organisms/Layout", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="layout">{children}</div>
  ),
}));

jest.mock("@/components/templates/beneficio/EditTemplate", () => ({
  __esModule: true,
  default: ({ beneficio }: { beneficio: any }) => (
    <div data-testid="edit-template">{JSON.stringify(beneficio)}</div>
  ),
}));

jest.mock("@mui/material", () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="container">{children}</div>
  ),
}));

describe("BeneficiosEdit", () => {
  it("deve renderizar corretamente o layout", () => {
    render(
      <ThemeProvider theme={theme}>
        <BeneficiosEdit params={{ slug: "beneficio-teste" }} />
      </ThemeProvider>
    );

    const layout = screen.getByTestId("layout");
    expect(layout).toBeInTheDocument();
  });

  it("deve renderizar o container com padding", () => {
    render(
      <ThemeProvider theme={theme}>
        <BeneficiosEdit params={{ slug: "beneficio-teste" }} />
      </ThemeProvider>
    );

    const container = screen.getByTestId("container");
    expect(container).toBeInTheDocument();
  });

  it("deve renderizar o EditTemplate com os dados corretos", () => {
    render(
      <ThemeProvider theme={theme}>
        <BeneficiosEdit params={{ slug: "beneficio-teste" }} />
      </ThemeProvider>
    );

    const editTemplate = screen.getByTestId("edit-template");
    expect(editTemplate).toHaveTextContent(
      JSON.stringify({
        _id: "1",
        data: "2024-11-29",
        nome: "Benefício Teste",
        endereco: "Endereço Teste",
        pontos: 100,
        quantidade: 10,
      })
    );
  });

  it("deve atualizar o estado corretamente no useEffect", () => {
    render(
      <ThemeProvider theme={theme}>
        <BeneficiosEdit params={{ slug: "beneficio-teste" }} />
      </ThemeProvider>
    );

    const editTemplate = screen.getByTestId("edit-template");
    expect(editTemplate).toHaveTextContent(
      JSON.stringify({
        _id: "1",
        data: "2024-11-29",
        nome: "Benefício Teste",
        endereco: "Endereço Teste",
        pontos: 100,
        quantidade: 10,
      })
    );
  });
});
