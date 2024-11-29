'use client'

import React, { useEffect, useState } from 'react';
import { Container, TextField, Card, CardContent, CardHeader, Grid, Button } from '@mui/material';
import '../../style/Perfil.css';
import Image from 'next/image';
import userImage from "../../../public/images/userImg.png";
import Layout from "@/components/UI/organisms/Layout";
import ButtonAtom from '@/components/UI/atoms/ButtonAtom';
import { useRouter } from 'next/navigation'; // Para redirecionar

const PerfilPage = () => {
  const [userData, setUserData] = useState({
    nome: '',
    endereco: '',
    profileImage: ''
  });
  const router = useRouter(); // Hook para navegação

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

  // Função para redirecionar à página de redefinição de senha
  const alterarSenha = () => {
    router.push('/passwordReset');
  };

  return (
    <Layout>
      <Container sx={{ paddingTop: 4 }}>
        <Card className="perfilCard" variant="outlined" sx={{ boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.45)", }}>
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
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {/* Botão Alterar Senha */}
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    sx={{ 
                      boxShadow: 3,
                    }}
                    onClick={alterarSenha}
                  >
                    Alterar Senha
                  </Button>
                </Grid>
                {/* Botão Salvar */}
                <Grid item xs={6}>
                  <ButtonAtom
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Salvar
                  </ButtonAtom>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
};

export default PerfilPage;
