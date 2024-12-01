'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Card, CardContent, CardHeader, Avatar } from '@mui/material';
import '../../../../style/Perfil.css';
import ButtonAtom from '@/components/UI/atoms/ButtonAtom';

interface UserProfile {
  name: string;
  endereco: string;
  senha: string;
  imageUrl: string;
}

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    endereco: '',
    senha: 'senha123', // Placeholder
    imageUrl: '',
  });

  const router = useRouter();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        const user = data.results[0];
        setUserProfile({
          name: `${user.name.first} ${user.name.last}`,
          endereco: `${user.location.street.name}, ${user.location.street.number}`,
          senha: 'senha123', // Placeholder
          imageUrl: user.picture.large,
        });
      } catch (error) {
        console.error('Erro ao obter os dados do usuário:', error);
      }
    }

    fetchUserData();
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert('Alterações salvas com sucesso!');
  };

  return (
    <div className="profile-container" data-testid="profile-page">
      <Card className="profile-card" data-testid="profile-card">
        <CardHeader title="Perfil do Usuário" />
        <CardContent>
          <div className="avatar-container" data-testid="avatar-container">
            <Avatar 
              src={userProfile.imageUrl} 
              className="profile-avatar" 
              alt="Foto do Perfil"
              data-testid="profile-avatar"
            />
          </div>
          <form onSubmit={handleSubmit} className="profile-form" data-testid="profile-form">
            <TextField
              label="Nome"
              value={userProfile.name}
              fullWidth
              required
              margin="normal"
              data-testid="name-input"
              onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
            />
            <TextField
              label="Endereço"
              value={userProfile.endereco}
              fullWidth
              required
              margin="normal"
              data-testid="address-input"
              onChange={(e) => setUserProfile({ ...userProfile, endereco: e.target.value })}
            />
            <TextField
              label="Senha"
              type="password"
              value={userProfile.senha}
              fullWidth
              required
              margin="normal"
              data-testid="password-input"
              onChange={(e) => setUserProfile({ ...userProfile, senha: e.target.value })}
            />
            <ButtonAtom 
              variant="contained" 
              type="submit"
              data-testid="submit-button"
            >
              Salvar
            </ButtonAtom>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;