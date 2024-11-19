import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@emotion/react";
import theme from "../../../../themes/userTheme";
import BeneficiosEdit from "../../../../src/app/beneficios/edit/[slug]/page"; // caminho do componente
import { withDataFetching } from "@/components/HOCS/withDataFetching";

// Mock do HOC withDataFetching
jest.mock("@/components/HOCS/withDataFetching", () => ({
  withDataFetching: jest.fn((url) => (Component) => (props) => (
    <Component {...props} data={mockData} />
  )),
}));

// Mock dos componentes usados no componente principal
jest.mock("@/components/UI/organisms/Layout", () => ({ children }) => (
  <div>{children}</div>
));
jest.mock("@mui/material", () => ({
  Container: ({ children }) => <div>{children}</div>,
}));
jest.mock(
  "@/components/templates/beneficio/EditTemplate",
  () =>
    ({ beneficio }) =>
      <div data-testid="edit-template">{JSON.stringify(beneficio)}</div>
);

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
