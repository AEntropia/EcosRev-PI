"use client";

import { withDataFetching } from "@/components/HOCS/withDataFetching";
import EditTemplate from "@/components/templates/beneficio/EditTemplate";
import { env } from "@/config/env";
import { IBeneficios } from "@/interfaces/IBeneficios";
import { useEffect, useState } from "react";
import Layout from "@/components/UI/organisms/Layout";
import { Container } from "@mui/material";

interface BeneficioEditProps {
  params: { slug: string };
  data: any;
}

const BeneficiosEdit: React.FC<BeneficioEditProps> = ({ params, data }) => {
  const [beneficio, setBeneficio] = useState<IBeneficios>();

  useEffect(() => {
    if (!data) return;
    const {
      id,
      nome: name,
      endereco: address,
      pontos: points,
      quantidade: qtd,
    } = data;

    setBeneficio({
      id,
      name,
      address,
      points,
      qtd,
    });
  }, [data]);

  return (
    <Layout>
      <Container sx={{ paddingTop: 4 }}>
        <EditTemplate beneficio={beneficio} />
      </Container>
    </Layout>
  )
};

export default withDataFetching(`${env.apiBaseUrl}/beneficios`)(BeneficiosEdit);