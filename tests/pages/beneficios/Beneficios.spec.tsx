import Beneficios from "@/app/beneficios/page";
import { render, screen, waitFor } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { env } from "@/config/env";
import { validatorMessage } from "../../../src/constants/validatorMessage";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn().mockReturnValue("/beneficios"), // Mocking usePathname to return the desired pathname
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    // Add other router methods if needed
  }),
}));

mockRouter.setCurrentUrl("/beneficios");

const server = setupServer(
  rest.get(`${env.apiBaseUrl}/beneficios`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          nome: "Show do Matue",
          data: "2024-12-12",
          endereco: "Av 31 de março",
          pontos: 200,
          quantidade: 23,
        },
        {
          id: 2,
          nome: "Show da Demi Lovato",
          data: "2024-06-27",
          endereco: "Av. 31 de Março",
          pontos: 100,
          quantidade: 6,
        },
        {
          id: 3,
          nome: "Desconto no Õnibus",
          data: "2024-10-23",
          endereco: "Terminal São João",
          pontos: 50,
          quantidade: 79,
        },
        {
          id: 4,
          nome: "Show do Ciano",
          data: "2024-06-21",
          endereco: "Av. Itavuvu, 11.777",
          pontos: 10,
          quantidade: 1,
        },
      ])
    );
  }),
  rest.get(`${env.apiBaseUrl}/beneficios/1`, (req, res, ctx) => {
    return res(
      ctx.json({
        id: 1,
        nome: "Show do Matue",
        data: "2024-12-12",
        endereco: "Av 31 de março",
        pontos: 200,
        quantidade: 23,
      })
    );
  })
);

describe("Beneficios List Page", () => {
  beforeAll(() => {
    mockRouter.setCurrentUrl("/beneficios");
    server.listen();
  });
  afterAll(() => {
    server.close();
  });
  it("should render beneficios list", async () => {
    render(<Beneficios />);

    await screen.findByRole("cell", {
      name: "Show do Matue",
    });

    screen.logTestingPlaygroundURL();
  });
});

describe("Validator Message", () => {
  it("should return required field message", () => {
    expect(validatorMessage.requiredField).toBe("Campo obrigatório");
  });

  it("should return numeric field message", () => {
    expect(validatorMessage.numericField).toBe("Campo é numérico");
  });

  it("should return minLength message with min variable", () => {
    const min = 5;
    const message = validatorMessage.minLength.replace(
      "${min}",
      min.toString()
    );
    expect(message).toBe(`Campo deve ter pelo menos ${min} caracteres`);
  });

  it("should return maxLength message with max variable", () => {
    const max = 10;
    const message = validatorMessage.maxLength.replace(
      "${max}",
      max.toString()
    );
    expect(message).toBe(`Campo deve ter no máximo ${max} caracteres`);
  });

  it("should return length message with length variable", () => {
    const length = 8;
    const message = validatorMessage.length.replace(
      "${length}",
      length.toString()
    );
    expect(message).toBe(`Campo deve ter ${length} caracteres`);
  });

  it("should return minValue message with min variable", () => {
    const min = 1;
    const message = validatorMessage.minValue.replace("${min}", min.toString());
    expect(message).toBe(`Valor mínimo ${min}`);
  });

  it("should return maxValue message with max variable", () => {
    const max = 100;
    const message = validatorMessage.maxValue.replace("${max}", max.toString());
    expect(message).toBe(`Valor máximo ${max}`);
  });
});
