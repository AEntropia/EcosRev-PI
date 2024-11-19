"use client";

import React from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarouselProps {
  slides: Array<{ imageSrc: string; altText: string; caption: string }>;
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "500px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              width: "100%",
              height: "500px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <Image
              src={slide.imageSrc}
              alt={slide.altText}
              fill
              style={{ objectFit: "cover" }}
              priority={index === 0}
              onError={(e) =>
                console.error("Erro ao carregar imagem:", slide.imageSrc, e)
              }
            />
            <Typography
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: "10px 20px",
                borderRadius: "5px",
                textAlign: "center",
                zIndex: 2,
              }}
            >
              {slide.caption}
            </Typography>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
