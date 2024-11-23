"use client";

import Layout from "@/components/UI/organisms/Layout";

import { Box, Container, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import "../../style/MenuUser.css";
import RecyclingIcon from "@mui/icons-material/Recycling";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import Carousel from "@/components/UI/molecules/Carousel";

export default function Home() {
  const router = useRouter();

  const carouselSlides = [
    {
      imageSrc: "/images/imagem1.jpg",
      altText: "Imagem 1",
      caption: "Descubra como reciclar eletrônicos de forma sustentável!",
    },
    {
      imageSrc: "/images/backgroundImg.jpeg",
      altText: "Imagem 2",
      caption: "Transforme resíduos em pontos e conquiste prêmios!",
    },
    {
      imageSrc: "/images/macawImg.jpeg",
      altText: "Imagem 3",
      caption: "Junte-se à mudança por um planeta mais limpo.",
    },
    {
      imageSrc: "/images/toucanImg.jpeg",
      altText: "Imagem 4",
      caption:
        "Converta resíduos em oportunidades e ajude a preservar o meio ambiente.",
    },
    {
      imageSrc: "/images/beeImg.jpeg",
      altText: "Imagem 5",
      caption:
        "Dê o primeiro passo para um futuro mais sustentável com a reciclagem responsável.",
    },
    {
      imageSrc: "/images/imagem3.jpg",
      altText: "Imagem 5",
      caption:
        "Recicle hoje para transformar o amanhã em um lugar melhor para todos.",
    },
  ];

  return (
    <Layout>
      <Carousel slides={carouselSlides} />
      <Introduction />
      <Services />
      <Testimonials />
    </Layout>
  );
}

function Introduction() {
  return (
    <Box
      sx={{ backgroundColor: "#f9f9f9", padding: "60px 0" }}
      textAlign="center"
    >
      <Container>
        <Typography variant="h2" sx={{ fontSize: "32px" }} gutterBottom>
          Bem-vindo ao EcosRev
        </Typography>
        <Typography variant="body1">
          Uma plataforma inovadora para reciclagem de resíduo eletrônico e troca
          de pontos por recompensas. Junte-se a nós e faça parte da mudança!
        </Typography>
      </Container>
    </Box>
  );
}

function Services() {
  return (
    <Box
      sx={{ backgroundColor: "#e9ecef", padding: "60px 0" }}
      textAlign="center"
    >
      <Container>
        <Typography
          variant="h2"
          sx={{ fontSize: "32px", marginBottom: "40px" }}
        >
          O que oferecemos
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <RecyclingIcon sx={{ fontSize: 60, color: "primary.main" }} />
            <Typography variant="h4" sx={{ fontSize: "24px" }}>
              Reciclagem de Eletrônicos
            </Typography>
            <Typography>
              Recicle seus aparelhos eletrônicos de forma segura e responsável.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <MonetizationOnIcon sx={{ fontSize: 60, color: "primary.main" }} />
            <Typography variant="h4" sx={{ fontSize: "24px" }}>
              Acúmulo de Pontos
            </Typography>
            <Typography>
              Ganhe pontos a cada item reciclado e troque por prêmios.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <CardGiftcardIcon sx={{ fontSize: 60, color: "primary.main" }} />
            <Typography variant="h4" sx={{ fontSize: "24px" }}>
              Recompensas Exclusivas
            </Typography>
            <Typography>
              Troque seus pontos por descontos, produtos, serviços e muito mais.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function Testimonials() {
  return (
    <Box
      sx={{ backgroundColor: "#f9f9f9", padding: "60px 0" }}
      textAlign="center"
      data-testid="testimonials-section" // Adicionando um test ID aqui
    >
      <Container>
        <Typography
          variant="h2"
          sx={{ fontSize: "32px", marginBottom: "40px" }}
        >
          Depoimentos
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <blockquote>
              <Typography sx={{ fontSize: "20px" }}>
                &quot;O EcosRev facilitou a reciclagem de eletrônicos na minha
                casa. Além de ajudar o meio ambiente, ainda ganho
                recompensas!&quot;
              </Typography>
              <footer>— Maria Silva</footer>
            </blockquote>
          </Grid>
          <Grid item xs={12} md={4}>
            <blockquote>
              <Typography sx={{ fontSize: "20px" }}>
                &quot;Uma excelente iniciativa! Agora meus filhos entendem a
                importância de reciclar e ainda se divertem trocando pontos por
                prêmios.&quot;
              </Typography>
              <footer>— Carlos Santos</footer>
            </blockquote>
          </Grid>
          <Grid item xs={12} md={4}>
            <blockquote>
              <Typography sx={{ fontSize: "20px" }}>
                &quot;Simplesmente adoro! O sistema de pontos é muito
                gratificante e o suporte ao cliente é fantástico.&quot;
              </Typography>
              <footer>— Ana Souza</footer>
            </blockquote>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
