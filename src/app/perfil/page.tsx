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
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Estado para controlar o Snackbar
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
    setSnackbarOpen(true); // Abre o Snackbar
  };

  const alterarSenha = () => {
    router.push('/passwordReset');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Fecha o Snackbar
  };

  return (
    <Layout>
      <Container sx={{ paddingTop: 4 }}>
        {/* Mensagem fixa no topo */}
        <Alert severity="info" sx={{ marginBottom: 2 }}>
          Esta página está em construção. Funcionalidades serão implementadas em breve.
        </Alert>
        <Card className="perfilCard" variant="outlined" sx={{ boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.45)" }}>
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
          autoHideDuration={3000} // Fecha automaticamente após 3 segundos
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: '100%' }}>
            Estamos trabalhando nessa funcionalidade.
          </Alert>
        </Snackbar>
      </Container>
    </Layout>
  );
};

export default PerfilPage;
