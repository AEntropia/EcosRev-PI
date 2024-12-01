import axios from "axios";
import {
  login,
  isAdmin,
  isAuthenticated,
  getToken,
  logout,
} from "@/app/login_api";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("login_api", () => {
  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("deve salvar o token e o redirect_url no localStorage e retornar o token", async () => {
      const mockResponse = {
        data: {
          access_token: "mockToken123",
          redirect_url: "menu.html",
        },
      };
      mockedAxios.post.mockResolvedValue(mockResponse);

      const token = await login("test@example.com", "password123");

      expect(token).toBe("mockToken123");
      expect(localStorage.getItem("authToken")).toBe("mockToken123");
      expect(localStorage.getItem("isAdmin")).toBe("menu.html");
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "/api/usuario/login",
        expect.objectContaining({
          email: "test@example.com",
          senha: "password123",
        })
      );
    });

    it("deve retornar null se a resposta não contém o token", async () => {
      mockedAxios.post.mockResolvedValue({ data: {} });

      const token = await login("test@example.com", "password123");

      expect(token).toBeNull();
      expect(localStorage.getItem("authToken")).toBeNull();
    });

    it("deve retornar null e logar o erro se a requisição falhar", async () => {
      mockedAxios.post.mockRejectedValue({
        response: { data: { message: "Invalid credentials" } },
      });

      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      const token = await login("test@example.com", "password123");

      expect(token).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        "Erro na requisição:",
        { message: "Invalid credentials" }
      );

      consoleSpy.mockRestore();
    });
  });

  describe("isAdmin", () => {
    it("deve retornar 'admin' se o isAdmin for 'menu.html'", () => {
      localStorage.setItem("isAdmin", "menu.html");

      const result = isAdmin();

      expect(result).toBe("admin");
    });

    it("deve retornar 'cliente' se o isAdmin não for 'menu.html'", () => {
      localStorage.setItem("isAdmin", "dashboard.html");

      const result = isAdmin();

      expect(result).toBe("cliente");
    });

    it("deve retornar 'erro' se o window não estiver disponível", () => {
      const result = isAdmin();

      expect(result).toBe("erro");
    });
  });

  describe("isAuthenticated", () => {
    it("deve retornar true se authToken estiver presente", () => {
      localStorage.setItem("authToken", "mockToken123");

      const result = isAuthenticated();

      expect(result).toBe(true);
    });

    it("deve retornar false se authToken não estiver presente", () => {
      const result = isAuthenticated();

      expect(result).toBe(false);
    });
  });

  describe("getToken", () => {
    it("deve retornar o token armazenado no localStorage", () => {
      localStorage.setItem("authToken", "mockToken123");

      const token = getToken();

      expect(token).toBe("mockToken123");
    });

    it("deve retornar 'erro' se o window não estiver disponível", () => {
      const token = getToken();

      expect(token).toBe("erro");
    });
  });

  describe("logout", () => {
    it("deve remover authToken e isAdmin do localStorage", () => {
      localStorage.setItem("authToken", "mockToken123");
      localStorage.setItem("isAdmin", "menu.html");

      logout();

      expect(localStorage.getItem("authToken")).toBeNull();
      expect(localStorage.getItem("isAdmin")).toBeNull();
    });

    it("deve exibir 'erro' no console se o window não estiver disponível", () => {
      const consoleSpy = jest.spyOn(console, "log").mockImplementation();

      logout();

      expect(consoleSpy).toHaveBeenCalledWith("erro");

      consoleSpy.mockRestore();
    });
  });
});
