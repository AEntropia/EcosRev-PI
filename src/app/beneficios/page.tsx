"use client";

import CustomTable from "@/components/UI/organisms/CustomTable";
import Layout from "@/components/UI/organisms/Layout";
import { env } from "@/config/env";
import { Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const Beneficios = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchBeneficios = async () => {
      const response = await axios.get(`${env.apiBaseUrl}/beneficios`);
      console.log(response)

      const beneficios = response.data.map((beneficio: any) => ({
        id: beneficio.id,
        name: beneficio.nome,
        address: beneficio.endereco,
        points: beneficio.pontos,
        qtd: beneficio.quantidade,
      }));

      setRows(beneficios);
    };

    fetchBeneficios();
  }, []);

  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Nome",
    },
    {
      id: "address",
      numeric: false,
      disablePadding: false,
      label: "Endereço",
    },
    {
      id: "points",
      numeric: true,
      disablePadding: false,
      label: "Pontos",
    },
    {
      id: "qtd",
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
          editPath="/beneficios/edit"
        />
      </Container>
    </Layout>
  );
};

export default Beneficios;
