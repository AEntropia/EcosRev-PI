"use client";

import CustomTable from "@/components/UI/organisms/CustomTable";
import Layout from "@/components/UI/organisms/Layout";
import { env } from "@/config/env";
import { Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const Usuarios = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const response = await axios.get(`${env.apiBaseUrl}/usuarios`);
      console.log(response)

      const usuarios = response.data.map((usuario: any) => ({
        id: usuario.id,
        name: usuario.nome,
        email: usuario.email,
        pass: usuario.senha,
        points: usuario.pontos,
        type: usuario.tipo,
      }));

      setRows(usuarios);
    };

    fetchUsuarios();
  }, []);

  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Nome",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: false,
      label: "Email",
    },
    {
      id: "points",
      numeric: true,
      disablePadding: false,
      label: "Pontos",
    }
  ];

  return (
    <Layout>
      <Container sx={{ paddingTop: 4 }}>          
        <CustomTable
          rows={rows}
          headCells={headCells}
          editPath="/usuarios/edit"
        />
      </Container>
    </Layout>
  );
};

export default Usuarios;
