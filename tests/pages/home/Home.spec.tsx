import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../../../src/app/home/page"; // Atualize o caminho conforme necessário
import { ReactNode } from "react";

// Mock do componente Image do Next.js
jest.mock('next/image', () => {
  return {
    __esModule: true,
    default: ({ src, alt, width, height }: { src: string, alt: string, width: number, height: number }) => (
      <img src={src} alt={alt} width={width} height={height} />
    ),
  };
});

// Mock do componente Layout
jest.mock("@/components/UI/organisms/Layout", () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => (
    <div data-testid="layout-mock">{children}</div>
  ),
}));

// Mock do componente Carousel
jest.mock("@/components/UI/molecules/Carousel", () => ({
  __esModule: true,
  default: ({
    slides,
  }: {
    slides: Array<{ imageSrc: string; altText: string; caption: string }>;
  }) => (
    <div data-testid="carousel-mock">
      {slides.map((slide, index) => (
        <div key={index} data-testid="carousel-slide">
          <img src={slide.imageSrc} alt={slide.altText} />
          <p>{slide.caption}</p>
        </div>
      ))}
    </div>
  ),
}));

// Mock do hook useRouter usando jest.mock
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    route: "/",
    pathname: "/",
    query: {},
    asPath: "/",
  }),
}));

describe("Home Page", () => {
  it("renders the layout", () => {
    render(<Home />);
    expect(screen.getByTestId("layout-mock")).toBeInTheDocument();
  });

  it("renders the carousel with correct slides", () => {
    render(<Home />);
    const slides = screen.getAllByTestId("carousel-slide");
    expect(slides).toHaveLength(6); // Deve ter 6 slides no carousel
    expect(screen.getByAltText("Imagem 1")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Descubra como reciclar eletrônicos de forma sustentável!"
      )
    ).toBeInTheDocument();
  });

  it("renders the Introduction section", () => {
    render(<Home />);
    expect(screen.getByText("Bem-vindo ao EcosRev")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Uma plataforma inovadora para reciclagem de resíduo eletrônico e troca de pontos por recompensas. Junte-se a nós e faça parte da mudança!"
      )
    ).toBeInTheDocument();
  });

  it("renders the Services section", () => {
    render(<Home />);
    expect(screen.getByText("O que oferecemos")).toBeInTheDocument();
    expect(screen.getByText("Reciclagem de Eletrônicos")).toBeInTheDocument();
    expect(screen.getByText("Acúmulo de Pontos")).toBeInTheDocument();
    expect(screen.getByText("Recompensas Exclusivas")).toBeInTheDocument();
  });

  it("renders the Testimonials section", () => {
    render(<Home />);
    const testimonialsSection = screen.getByTestId("testimonials-section");
    expect(testimonialsSection).toBeInTheDocument();
    expect(
      screen.getByText(
        /O EcosRev facilitou a reciclagem de eletrônicos na minha casa/i
      )
    ).toBeInTheDocument();
  });
});
