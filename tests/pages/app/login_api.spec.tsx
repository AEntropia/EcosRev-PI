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

    it("deve retornar null se a resposta não contém o token", async () => {
      mockedAxios.post.mockResolvedValue({ data: {} });

      const token = await login("test@example.com", "password123");

      expect(token).toBeNull();
      expect(localStorage.getItem("authToken")).toBeNull();
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
  });

  describe("logout", () => {
    it("deve remover authToken e isAdmin do localStorage", () => {
      localStorage.setItem("authToken", "mockToken123");
      localStorage.setItem("isAdmin", "menu.html");

      logout();

      expect(localStorage.getItem("authToken")).toBeNull();
      expect(localStorage.getItem("isAdmin")).toBeNull();
    });

  });
});
