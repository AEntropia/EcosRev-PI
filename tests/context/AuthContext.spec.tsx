import React from "react";
import { render, screen, fireEvent, waitFor, renderHook } from "@testing-library/react";
import { AuthProvider, useAuth } from "@/context/AuthContext"; // Ajuste o caminho conforme necessário
import Cookies from "js-cookie";

// Mock do Cookies para poder testar sem afetar os cookies reais
jest.mock("js-cookie");

const TestComponent = () => {
  const { bearerToken, login, logout } = useAuth();

  return (
    <div>
      <p data-testid="bearer-token">{bearerToken}</p>
      <button onClick={() => login("username", "password")}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe("AuthProvider", () => {
  beforeEach(() => {
    // Limpar cookies e estado antes de cada teste
    (Cookies.get as jest.Mock).mockClear();
    (Cookies.set as jest.Mock).mockClear();
    (Cookies.remove as jest.Mock).mockClear();
  });

  it("deve inicializar o bearerToken com o valor correto de Cookies", () => {
    // Simulando que o cookie "token" já está presente
    (Cookies.get as jest.Mock).mockReturnValue("fake-bearer-token");

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Verifica se o bearerToken inicial é o valor do cookie
    expect(screen.getByTestId("bearer-token").textContent).toBe("fake-bearer-token");
  });

  it("deve atualizar o bearerToken e armazenar no cookie ao fazer login", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Simula o clique no botão de login
    fireEvent.click(screen.getByText(/Login/i));

    // Verifica se o bearerToken foi atualizado
    await waitFor(() => {
      expect(screen.getByTestId("bearer-token").textContent).toBe("bearer token");
    });

    // Verifica se o token foi salvo nos cookies
    expect(Cookies.set).toHaveBeenCalledWith("token", "bearer token");
  });

  it("deve limpar o bearerToken e remover o cookie ao fazer logout", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Simula o login para estabelecer um token
    fireEvent.click(screen.getByText(/Login/i));

    // Verifica se o token foi atualizado após o login
    await waitFor(() => {
      expect(screen.getByTestId("bearer-token").textContent).toBe("bearer token");
    });

    // Simula o clique no botão de logout
    fireEvent.click(screen.getByText(/Logout/i));

    // Verifica se o bearerToken foi limpo
    expect(screen.getByTestId("bearer-token").textContent).toBe("");

    // Verifica se o cookie foi removido
    expect(Cookies.remove).toHaveBeenCalledWith("token");
  });

});
