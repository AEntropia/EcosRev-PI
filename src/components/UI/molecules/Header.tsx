import { Box, Button } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import logoSvg from '/public/images/logo.svg';
import LeafButton from '../atoms/LeafButton';
import leafIcon from '../../../../public/images/icon_leaf.png';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Verifica se a página atual é de cadastro, redefinição de senha ou recuperação de senha
  const isSpecialPage = ["/", "/signup", "/reset-password", "/passwordRecovery"].includes(pathname);

  // Verifica se o usuário é admin (você pode substituir isso por uma lógica de autenticação real)
  const isAdmin = true; // Exemplo de verificação de admin. Troque conforme a lógica de autenticação.

  return (
    <Box
      display="flex"
      alignItems="center"
      p={2}
      sx={{
        backgroundColor: "white",
        height: "96px",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      {/* Exibe o logo */}
      <Image 
        src={logoSvg} 
        alt="EcosRev Logo" 
        width={200} 
        height={112} 
        priority />

      {/* Se não for uma página especial, exibe os links */}
      {!isSpecialPage && (
        <Box display="flex" ml={2}>
          {/* Para usuários comuns */}
          {!isAdmin && (
            <>
              <Button onClick={() => router.push('/home')} color="primary" sx={{ mx: 1 }}>
                Início
              </Button>
              <Button onClick={() => router.push('/perfil')} color="primary" sx={{ mx: 1 }}>
                Ver meu perfil
              </Button>
              <Button onClick={() => router.push('/beneficios')} color="primary" sx={{ mx: 1 }}>
                Benefícios
              </Button>
              <Button onClick={() => router.push('/beneficios/troca')} color="primary" sx={{ mx: 1 }}>
                Troca de pontos
              </Button>
            </>
          )}
          {/* Para admins */}
          {isAdmin && (
            <>
              <Button onClick={() => router.push('/home')} color="primary" sx={{ mx: 1 }}>
                Início
              </Button>
              <Button onClick={() => router.push('/perfil')} color="primary" sx={{ mx: 1 }}>
                Ver meu perfil
              </Button>
              <Button onClick={() => router.push('/beneficios')} color="primary" sx={{ mx: 1 }}>
                Benefícios
              </Button>
              <Button onClick={() => router.push('/usuarios')} color="primary" sx={{ mx: 1 }}>
                Usuários
              </Button>
              <Button onClick={() => router.push('/beneficios/cadastro')} color="primary" sx={{ mx: 1 }}>
                Cadastro de Benefícios
              </Button>
              <Button onClick={() => router.push('/beneficios/troca')} color="primary" sx={{ mx: 1 }}>
                Troca de pontos
              </Button>
            </>
          )}
        </Box>
      )}

      {/* Só exibe o botão de "Sair" se não for uma página especial */}
      {!isSpecialPage && (
        <Box display="flex" justifyContent="flex-end" flexGrow={1}>
          <LeafButton onClick={() => router.push('/')} iconSrc={leafIcon}>
            Sair
          </LeafButton>
        </Box>
      )}
    </Box>
  );
};

export default Header;
