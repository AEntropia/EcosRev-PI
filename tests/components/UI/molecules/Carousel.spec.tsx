import React from "react";
import { render, screen } from "@testing-library/react";
import Carousel from "@/components/UI/molecules/Carousel";
import "@testing-library/jest-dom";
import "jest-canvas-mock"; // Para evitar erros com o `react-slick`

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, alt } = props;
    return <img src={src} alt={alt} />;
  },
}));

describe("Carousel", () => {
  const mockSlides = [
    {
      imageSrc: "/image1.jpg",
      altText: "Slide 1",
      caption: "Caption for Slide 1",
    },
    {
      imageSrc: "/image2.jpg",
      altText: "Slide 2",
      caption: "Caption for Slide 2",
    },
    {
      imageSrc: "/image3.jpg",
      altText: "Slide 3",
      caption: "Caption for Slide 3",
    },
  ];

  it("deve renderizar corretamente o componente com os slides fornecidos", () => {
    render(<Carousel slides={mockSlides} />);

    // Verifica se todas as imagens estão renderizadas
    mockSlides.forEach((slide) => {
      const images = screen.getAllByAltText(slide.altText);
      expect(images.length).toBeGreaterThan(0); // Verifica se há pelo menos uma imagem com o alt correspondente
      images.forEach((image) => {
        expect(image).toHaveAttribute("src", slide.imageSrc);
      });
    });
 
  });

  it("deve exibir os pontos de navegação do slider", () => {
    render(<Carousel slides={mockSlides} />);

    const dots = screen.getAllByRole("button");
    expect(dots.length).toBe(5);
  });

});
