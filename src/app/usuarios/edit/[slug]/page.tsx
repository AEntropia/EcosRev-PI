"use client";

import { withDataFetching } from "@/components/HOCS/withDataFetching";
import EditTemplate from "@/components/templates/usuarios/EditTemplate";
import { env } from "@/config/env";
import { IUsuarios } from "@/interfaces/IUsuarios";
import { useEffect, useState } from "react";
import Layout from "@/components/UI/organisms/Layout";
import { Container } from "@mui/material";
import { withAdminProtection } from "@/components/HOCS/withAdminProtection";

interface UsuarioEditProps {
  params: { slug: string };
  data: any;
}

const UsuariosEdit: React.FC<UsuarioEditProps> = ({ params, data }) => {
  const [usuario, setUsuario] = useState<IUsuarios>();

  useEffect(() => {
    if (!data) return;

    const {
      _id: _id,
      nome: nome,
      email: email,
      senha: senha,
      pontos: pontos,
      tipo: tipo,
      ativo: ativo,
    } = data[0];

    setUsuario({
      _id,
      nome,
      email,
      senha,
      pontos,
      tipo,
      ativo,
    });
  }, [data]);

  return (
    <Layout>
      <Container sx={{ paddingTop: 4 }}>
        <EditTemplate usuario={usuario} />
      </Container>
    </Layout>
  );
};

export default withAdminProtection(withDataFetching()(UsuariosEdit));
