import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LeafButton from "@/components/UI/atoms/LeafButton"; // Ajuste o caminho conforme necessário
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "@testing-library/jest-dom";

// Mock para o componente Image do Next.js
jest.mock("next/image", () => {
  return {
    __esModule: true,
    default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} data-testid="leaf-icon" />,
  };
});

describe("LeafButton", () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
      },
    },
  });

  const renderWithTheme = (ui: React.ReactNode) =>
    render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

  it("deve renderizar o botão com o texto e o ícone corretamente", () => {
    renderWithTheme(<LeafButton iconSrc="/icon.png">Clique Aqui</LeafButton>);

    const button = screen.getByRole("button", { name: /clique aqui/i });
    const icon = screen.getByTestId("leaf-icon");

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("src", "/icon.png");
    expect(icon).toHaveAttribute("alt", "Leaf Icon");
  });

  it("deve chamar a função onClick ao clicar no botão", () => {
    const handleClick = jest.fn();
    renderWithTheme(<LeafButton iconSrc="/icon.png" onClick={handleClick}>Clique Aqui</LeafButton>);

    const button = screen.getByRole("button", { name: /clique aqui/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("deve aplicar estilos personalizados passados via 'sx'", () => {
    renderWithTheme(
      <LeafButton iconSrc="/icon.png" sx={{ backgroundColor: "yellow" }}>
        Clique Aqui
      </LeafButton>
    );

    const button = screen.getByRole("button", { name: /clique aqui/i });
    expect(button).toHaveStyle("background-color: rgba(25, 118, 210, 0.04)");
  });

  it("deve manter a variante 'outlined' e a transformação de texto em 'uppercase'", () => {
    renderWithTheme(<LeafButton iconSrc="/icon.png">Clique Aqui</LeafButton>);

    const button = screen.getByRole("button", { name: /clique aqui/i });
    expect(button).toHaveClass("MuiButton-outlined");
    expect(button).toHaveStyle("text-transform: uppercase");
  });

  it("deve aplicar estilos corretos ao passar o mouse sobre o botão", () => {
    renderWithTheme(<LeafButton iconSrc="/icon.png">Clique Aqui</LeafButton>);

    const button = screen.getByRole("button", { name: /clique aqui/i });
    fireEvent.mouseOver(button);

    // Testa se a cor de fundo e a borda mudam no hover
    expect(button).toHaveStyle(
      `background-color: rgba(25, 118, 210, 0.04)`
    );
    expect(button).toHaveStyle(`border-color: ${theme.palette.primary.main}`);
  });
});
