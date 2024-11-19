'use client'

import React, { useEffect, useState } from 'react';
import { Container, Button, TextField, Card, CardContent, CardHeader } from '@mui/material';
import '../../style/Perfil.css';
import Image from 'next/image';
import userImage from "../../../public/images/userImg.png";
import Layout from "@/components/UI/organisms/Layout";
import { ThemeProvider } from "@emotion/react";

const PerfilPage = () => {
  const [userData, setUserData] = useState({
    nome: '',
    endereco: '',
    senha: '',
    profileImage: ''
  });

   useEffect(() => {
    const preencherCamposPerfil = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        const user = data.results[0];

        // Preenchendo os dados do perfil
        setUserData({
          nome: `${user.name.first} ${user.name.last}`,
          endereco: `${user.location.street.name}, ${user.location.street.number}`,
          senha: 'senha123', // Placeholder
          profileImage: user.picture.large
        });
      } catch (error) {
        console.error('Erro ao obter os dados do usuário:', error);
      }
    };

    preencherCamposPerfil();
  }, []);

  // Função que simula o envio do formulário
  const enviarFormulario = (event: React.FormEvent) => {
    event.preventDefault();
    alert("Alterações salvas com sucesso!");
    // Aqui você pode adicionar lógica para enviar os dados atualizados do perfil
  };

  return (
    <Layout>
      <Container sx={{ paddingTop: 4 }}>          <Card className="perfilCard" variant="outlined">
          <CardHeader title="Perfil do Usuário" />
          <CardContent>
            <div className="imagemPerfil">
              <Image className="userImage" src={userImage} alt="User Image Perfil" width={120} height={120} />
            </div>
            <form id="profileForm" onSubmit={enviarFormulario}>
              <TextField
                label="Nome"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userData.nome}
                onChange={(e) => setUserData({ ...userData, nome: e.target.value })}
                required
              />
              <TextField
                label="Endereço"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userData.endereco}
                onChange={(e) => setUserData({ ...userData, endereco: e.target.value })}
                required
              />
              <TextField
                label="Senha"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userData.senha}
                onChange={(e) => setUserData({ ...userData, senha: e.target.value })}
                required
              />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Salvar
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
};

export default PerfilPage;
