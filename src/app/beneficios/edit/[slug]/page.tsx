"use client";

import { withDataFetchingBenefit } from "@/components/HOCS/withDataFetchingBenefit";
import EditTemplate from "@/components/templates/beneficio/EditTemplate";
import { env } from "@/config/env";
import { IBeneficios } from "@/interfaces/IBeneficios";
import { useEffect, useState } from "react";
import Layout from "@/components/UI/organisms/Layout";
import { Container } from "@mui/material";
import { withAdminProtection } from "@/components/HOCS/withAdminProtection";

interface BeneficioEditProps {
  params: { slug: string };
  dados: any;
}

const BeneficiosEdit: React.FC<BeneficioEditProps> = ({ params, dados }) => {
  const [beneficio, setBeneficio] = useState<IBeneficios>();

  useEffect(() => {
    if (!dados) return;
    const {
      _id,
      nome: nome,
      data: data,
      endereco: endereco,
      pontos: pontos,
      quantidade: quantidade,
    } = dados[0];

    setBeneficio({
      _id,
      data,
      nome,
      endereco,
      pontos,
      quantidade,
    });
  }, [dados]);

  return (
    <Layout>
      <Container sx={{ paddingTop: 4 }}>
        <EditTemplate beneficio={beneficio} />
      </Container>
    </Layout>
  );
};

export default withAdminProtection(withDataFetchingBenefit()(BeneficiosEdit));
