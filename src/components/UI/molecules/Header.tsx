import { Box, Button } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react"; 
import logoSvg from "../../../../public/images/logo.svg";
import LeafButton from "../atoms/LeafButton";
import leafIcon from "../../../../public/images/icon_leaf.png";
import { isAdmin, logout } from "../../../app/login_api";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Estado para armazenar o tipo de usuário
  const [userType, setUserType] = useState<string | null>(null);

  // Efeito para buscar o tipo de usuário quando o componente monta
  useEffect(() => {
    const type = isAdmin();
    setUserType(type);
    console.log("TESTANDO TIPO: ", type);
  }, []);

  // Verifica se a página atual é de cadastro, redefinição de senha ou recuperação de senha
  const isSpecialPage = [
    "/",
    "/signup",
    "/passwordReset",
    "/passwordRecovery",
  ].includes(pathname);

  // Verifica se o usuário é admin baseado no userType
  const isAdminUser = userType === "admin";

  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        backgroundColor: "white",
        height: "96px", // Altura fixa para o Header
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.5)",
      }}
    >
      {/* Conteúdo do Header com padding */}
      <Box display="flex" alignItems="center" p={3} width="100%">
        {/* Exibe o logo */}
        <Image
          src={logoSvg}
          alt="EcosRev Logo"
          width={200}
          height={112}
          priority
        />

        {/* Se não for uma página especial, exibe os links */}
        {!isSpecialPage && (
          <Box display="flex" ml={2}>
            {/* Links comuns para todos os usuários */}
            <Button
              onClick={() => router.push("/home")}
              color="primary"
              sx={{
                mx: 1,
                "&:hover": {
                  backgroundColor: "#E9F7C7", // Cor de hover
                },
              }}
            >
              Início
            </Button>
            <Button
              onClick={() => router.push("/perfil")}
              color="primary"
              sx={{
                mx: 1,
                "&:hover": {
                  backgroundColor: "#E9F7C7", // Cor de hover
                },
              }}
            >
              Ver meu perfil
            </Button>

            <Button
              onClick={() => router.push("/beneficios/troca")}
              color="primary"
              sx={{
                mx: 1,
                "&:hover": {
                  backgroundColor: "#E9F7C7", // Cor de hover
                },
              }}
            >
              Troca de pontos
            </Button>

            {/* Links exclusivos para admin */}
            {isAdminUser && (
              <>
                <Button
                  onClick={() => router.push("/beneficios")}
                  color="primary"
                  sx={{
                    mx: 1,
                    "&:hover": {
                      backgroundColor: "#E9F7C7", // Cor de hover
                    },
                  }}
                >
                  Benefícios
                </Button>
                <Button
                  onClick={() => router.push("/usuarios")}
                  color="primary"
                  sx={{
                    mx: 1,
                    "&:hover": {
                      backgroundColor: "#E9F7C7", // Cor de hover
                    },
                  }}
                >
                  Usuários
                </Button>
                <Button
                  onClick={() => router.push("/beneficios/cadastro")}
                  color="primary"
                  sx={{
                    mx: 1,
                    "&:hover": {
                      backgroundColor: "#E9F7C7", // Cor de hover
                    },
                  }}
                >
                  Cadastro de Benefícios
                </Button>
              </>
            )}
          </Box>
        )}

        {/* Só exibe o botão de "Sair" se não for uma página especial */}
        {!isSpecialPage && (
          <Box display="flex" justifyContent="flex-end" flexGrow={1}>
            <LeafButton
              onClick={() => {
                logout();
                router.push("/");
              }}
              iconSrc={leafIcon}
            >
              Sair
            </LeafButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Header;
