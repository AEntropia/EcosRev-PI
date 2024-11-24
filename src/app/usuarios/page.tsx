"use client";

import CustomTable from "@/components/UI/organisms/CustomTable";
import Layout from "@/components/UI/organisms/Layout";
import { env } from "@/config/env";
import { Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { userService } from "../../../routes/userRoute";

interface User {
  id: string;
  name: string;
  email: string;
  pass: string;
  points: number;
  type: string;
  // outros campos...
}

const Usuarios = () => {
  const [rows, setRows] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const response = await userService.getAllUsers();

      const usuarios = response.map((usuario: any) => ({
        id: usuario._id,
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
    },
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
