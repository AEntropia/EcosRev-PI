import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import CustomListItem from "@/components/UI/molecules/CustomListItem"; // Ajuste o caminho conforme necessário
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

// Mock do useRouter para testar a navegação
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("CustomListItem", () => {
  const mockPush = jest.fn();
  const mockIcon = <span data-testid="mock-icon">Icon</span>;

  beforeEach(() => {
    // Resetar o mock antes de cada teste
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("deve renderizar corretamente o texto e o ícone", () => {
    render(
      <CustomListItem text="Home" path="/home" icon={mockIcon} />
    );

    // Verifica se o texto e o ícone estão no documento
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
  });

  it("deve chamar router.push com o caminho correto quando clicado", () => {
    render(
      <CustomListItem text="Home" path="/home" icon={mockIcon} />
    );

    // Simula um clique no botão do ListItem
    fireEvent.click(screen.getByRole("button"));

    // Verifica se a função push foi chamada com o caminho correto
    expect(mockPush).toHaveBeenCalledWith("/home");
  });

  it("não deve chamar router.push se o botão não for clicado", () => {
    render(
      <CustomListItem text="Home" path="/home" icon={mockIcon} />
    );

    // Verifica se o router.push não foi chamado antes do clique
    expect(mockPush).toHaveBeenCalled();
  });
});
