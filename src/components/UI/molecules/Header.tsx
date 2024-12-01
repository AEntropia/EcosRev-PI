import { Box, Button, Drawer, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
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

  const [userType, setUserType] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const type = isAdmin();
    setUserType(type);
    console.log("TESTANDO TIPO: ", type);

    // Verificar orientação da tela
    const updateOrientation = () => {
      setIsLandscape(window.matchMedia("(orientation: landscape)").matches);
    };
    updateOrientation();

    window.addEventListener("resize", updateOrientation);
    return () => window.removeEventListener("resize", updateOrientation);
  }, []);

  const isSpecialPage = [
    "/",
    "/signup",
    "/passwordReset",
    "/passwordRecovery",
  ].includes(pathname);

  const isAdminUser = userType === "admin";

  const menuItems = [
    { label: "Início", path: "/home" },
    { label: "Ver meu perfil", path: "/perfil" },
    { label: "Troca de pontos", path: "/beneficios/troca" },
    ...(isAdminUser
      ? [
          { label: "Benefícios", path: "/beneficios" },
          { label: "Usuários", path: "/usuarios" },
          { label: "Cadastro de Benefícios", path: "/beneficios/cadastro" },
        ]
      : []),
  ];

  const handleMenuClick = (path: string) => {
    router.push(path);
    setIsDrawerOpen(false);
  };

  // Esconder Header em páginas especiais no modo paisagem
  if (isSpecialPage && isLandscape) return null;

  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        backgroundColor: "white",
        height: "96px",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.5)",
      }}
    >
      {/* Menu Hamburguer - à esquerda */}
      {!isSpecialPage && (
        <IconButton
          sx={{
            color: "primary.main",
            mr: 2, // Espaço entre o ícone e o logo
          }}
          onClick={() => setIsDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Logo - no centro */}
      <Box display="flex" alignItems="center" flexShrink={0}>
        <Image src={logoSvg} alt="EcosRev Logo" width={200} height={112} priority />
      </Box>

      {/* Links da Navegação - ocultar em telas pequenas */}
      {!isSpecialPage && (
        <Box
          sx={{
            display: { xs: "none", md: "flex" }, // Mostrar links apenas em telas maiores
            flexGrow: 1,
            ml: 2,
          }}
        >
          {menuItems.map((item) => (
            <Button
              key={item.label}
              onClick={() => handleMenuClick(item.path)}
              sx={{
                mx: 1,
                color: "primary.main",
                "&:hover": {
                  backgroundColor: "#E9F7C7",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      )}

      {/* Botão Sair - à direita */}
      {!isSpecialPage && (
        <Box display="flex" justifyContent="flex-end" flexShrink={0} ml="auto" mr={3}>
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

      {/* Drawer no lado esquerdo (para dispositivos móveis) */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Box sx={{ width: 250 }}>
          <IconButton
            onClick={() => setIsDrawerOpen(false)}
            sx={{ color: "primary.main" }}
          >
            <CloseIcon />
          </IconButton>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.label}
                onClick={() => handleMenuClick(item.path)}
                sx={{
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: "#E9F7C7",
                  },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Header;
