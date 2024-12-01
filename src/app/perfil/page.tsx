'use client'

import React, { useEffect, useState } from 'react';
import { Container, TextField, Card, CardContent, CardHeader, Grid, Button, Alert, Snackbar } from '@mui/material';
import '../../style/Perfil.css';
import Image from 'next/image';
import userImage from "../../../public/images/userImg.png";
import Layout from "@/components/UI/organisms/Layout";
import ButtonAtom from '@/components/UI/atoms/ButtonAtom';
import { useRouter } from 'next/navigation';

const PerfilPage = () => {
  const [userData, setUserData] = useState({
    nome: '',
    endereco: '',
    profileImage: ''
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const preencherCamposPerfil = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        const user = data.results[0];

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

  const enviarFormulario = (event: React.FormEvent) => {
    event.preventDefault();
    setSnackbarOpen(true);
  };

  const alterarSenha = () => {
    router.push('/passwordReset');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Layout>
      <Container sx={{ paddingTop: 4 }} data-testid="perfil-page-container">
        {/* Mensagem fixa no topo */}
        <Alert 
          severity="info" 
          sx={{ marginBottom: 2 }} 
          data-testid="construction-alert"
        >
          Esta página está em construção. Funcionalidades serão implementadas em breve.
        </Alert>
        <Card 
          className="perfilCard" 
          variant="outlined" 
          sx={{ boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.45)" }}
          data-testid="perfil-card"
        >
          <CardHeader title="Perfil do Usuário" />
          <CardContent>
            <div className="imagemPerfil" data-testid="profile-image-container">
              <Image 
                className="userImage" 
                src={userImage} 
                alt="User Image Perfil" 
                width={120} 
                height={120}
                data-testid="profile-image"
              />
            </div>
            <form id="profileForm" onSubmit={enviarFormulario} data-testid="perfil-form">
              <TextField
                label="Nome"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userData.nome}
                onChange={(e) => setUserData({ ...userData, nome: e.target.value })}
                required
                data-testid="nome-input"
              />
              <TextField
                label="Endereço"
                variant="outlined"
                fullWidth
                margin="normal"
                value={userData.endereco}
                onChange={(e) => setUserData({ ...userData, endereco: e.target.value })}
                required
                data-testid="endereco-input"
              />

              <div style={{ marginBottom: '28px' }} /> 

              <Grid 
                container 
                spacing={{ xs: 2, sm: 2 }} 
                sx={{
                  flexDirection: { xs: 'column', sm: 'row' },
                  '& .MuiGrid-item': {
                    width: { xs: '100%', sm: '50%' },
                    paddingTop: { xs: '16px !important' }
                  }
                }}
                data-testid="button-grid"
              >
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    sx={{ 
                      boxShadow: 3,
                      height: '40px'
                    }}
                    onClick={alterarSenha}
                    data-testid="alterar-senha-button"
                  >
                    Alterar Senha
                  </Button>
                </Grid>
                <Grid item>
                  <ButtonAtom
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ height: '40px' }}
                    data-testid="salvar-button"
                  >
                    Salvar
                  </ButtonAtom>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
        {/* Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          data-testid="snackbar"
        >
          <Alert 
            onClose={handleSnackbarClose} 
            severity="info" 
            sx={{ width: '100%' }}
            data-testid="perfil-snackbar-alert"
          >
            Estamos trabalhando nessa funcionalidade.
          </Alert>
        </Snackbar>
      </Container>
    </Layout>
  );
};

export default PerfilPage;