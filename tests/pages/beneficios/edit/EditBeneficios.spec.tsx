import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@emotion/react";
import theme from "../../../../themes/userTheme";
import BeneficiosEdit from "../../../../src/app/beneficios/edit/[slug]/page"; // caminho do componente
import { withDataFetching } from "@/components/HOCS/withDataFetching";

// Tipagem do mock do HOC withDataFetching
jest.mock("@/components/HOCS/withDataFetching", () => ({
  withDataFetching: jest.fn(
    (url: string) =>
      <P extends {}>(Component: React.ComponentType<P>) => {
        const mockData = {
          id: 1,
          nome: "Benefício Teste",
          endereco: "Endereço Teste",
          pontos: 100,
          quantidade: 10,
        };

        // Cria um componente que envolve o componente original
        const WrappedComponent: React.FC<P & { data: typeof mockData }> = (
          props
        ) => <Component {...props} data={mockData} />;

        // Adiciona o displayName para facilitar a depuração
        WrappedComponent.displayName = `withDataFetching(${
          Component.displayName || Component.name
        })`;

        return WrappedComponent;
      }
  ),
}));

// Mock dos componentes usados no componente principal
jest.mock("@/components/UI/organisms/Layout", () => {
  const MockLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => <div>{children}</div>;

  // Define o displayName para o componente mockado
  MockLayout.displayName = "MockLayout";

  return MockLayout;
});

jest.mock("@mui/material", () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock("@/components/templates/beneficio/EditTemplate", () => {
  const MockEditTemplate: React.FC<{
    beneficio: {
      id: number;
      nome: string;
      endereco: string;
      pontos: number;
      quantidade: number;
    };
  }> = ({ beneficio }) => (
    <div data-testid="edit-template">{JSON.stringify(beneficio)}</div>
  );

  // Define o displayName para o componente mockado
  MockEditTemplate.displayName = "MockEditTemplate";

  return MockEditTemplate;
});
const mockData = {
  id: 1,
  nome: "Benefício Teste",
  endereco: "Endereço Teste",
  pontos: 100,
  quantidade: 10,
};

describe("BeneficiosEdit", () => {
  it("deve renderizar o EditTemplate com os dados corretos", () => {
    const params = { slug: "beneficio-teste" };

    render(
      <ThemeProvider theme={theme}>
        <BeneficiosEdit params={params} />
      </ThemeProvider>
    );

    // Verifica se o componente EditTemplate recebeu os dados corretamente
    const editTemplate = screen.getByTestId("edit-template");
    expect(editTemplate).toHaveTextContent(
      JSON.stringify({
        id: 1,
        name: "Benefício Teste",
        address: "Endereço Teste",
        points: 100,
        qtd: 10,
      })
    );
  });
});
