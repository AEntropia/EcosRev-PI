import { Box, Button } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react"; // Adicione estes imports
import logoSvg from "/public/images/logo.svg";
import LeafButton from "../atoms/LeafButton";
import leafIcon from "../../../../public/images/icon_leaf.png";
import { isAdmin } from "../../../app/login_api"; // Importe a função isAdmin

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
    "/reset-password",
    "/passwordRecovery",
  ].includes(pathname);

  // Verifica se o usuário é admin baseado no userType
  const isAdminUser = userType === "admin";

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
        priority
      />

      {/* Se não for uma página especial, exibe os links */}
      {!isSpecialPage && (
        <Box display="flex" ml={2}>
          {/* Links comuns para todos os usuários */}
          <Button
            onClick={() => router.push("/home")}
            color="primary"
            sx={{ mx: 1 }}
          >
            Início
          </Button>
          <Button
            onClick={() => router.push("/perfil")}
            color="primary"
            sx={{ mx: 1 }}
          >
            Ver meu perfil
          </Button>

          <Button
            onClick={() => router.push("/beneficios/troca")}
            color="primary"
            sx={{ mx: 1 }}
          >
            Troca de pontos
          </Button>

          {/* Links exclusivos para admin */}
          {isAdminUser && (
            <>
              <Button
                onClick={() => router.push("/beneficios")}
                color="primary"
                sx={{ mx: 1 }}
              >
                Benefícios
              </Button>
              <Button
                onClick={() => router.push("/usuarios")}
                color="primary"
                sx={{ mx: 1 }}
              >
                Usuários
              </Button>
              <Button
                onClick={() => router.push("/beneficios/cadastro")}
                color="primary"
                sx={{ mx: 1 }}
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
          <LeafButton onClick={() => router.push("/")} iconSrc={leafIcon}>
            Sair
          </LeafButton>
        </Box>
      )}
    </Box>
  );
};

export default Header;
