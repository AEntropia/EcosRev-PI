"use client";

import CustomTable from "@/components/UI/organisms/CustomTable";
import Layout from "@/components/UI/organisms/Layout";
import { env } from "@/config/env";
import { Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { benefitsService } from "../../../routes/benefitRoute";
import { IBeneficios } from "@/interfaces/IBeneficios";
import { withAdminProtection } from "@/components/HOCS/withAdminProtection";

const Beneficios = () => {
  const [rows, setRows] = useState<IBeneficios[]>([]);

  useEffect(() => {
    const fetchBeneficios = async () => {
      const response = await benefitsService.getAllBenefits();

      const beneficios = response.map((beneficio: any) => ({
        id: beneficio._id,
        data: beneficio.data,
        nome: beneficio.nome,
        endereco: beneficio.endereco,
        pontos: beneficio.pontos,
        quantidade: beneficio.quantidade,
      }));

      setRows(beneficios);
    };

    fetchBeneficios();
  }, []);

  const headCells = [
    {
      id: "nome",
      numeric: false,
      disablePadding: false,
      label: "Nome",
    },
    {
      id: "data",
      numeric: false,
      disablePadding: false,
      label: "Data",
    },
    {
      id: "endereco",
      numeric: false,
      disablePadding: false,
      label: "Endereço",
    },
    {
      id: "pontos",
      numeric: true,
      disablePadding: false,
      label: "Pontos",
    },
    {
      id: "quantidade",
      numeric: true,
      disablePadding: false,
      label: "Quantidade",
    },
  ];

  return (
    <Layout>
      <Container sx={{ paddingTop: 4 }}>
        <CustomTable
          rows={rows}
          headCells={headCells}
          editPath="/beneficios/edit" title={""}        />
      </Container>
    </Layout>
  );
};

export default withAdminProtection(Beneficios);
