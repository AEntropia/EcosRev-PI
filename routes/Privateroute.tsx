import React from "react";
import { Navigate } from "react-router-dom";
import { isAdmin } from "../src/app/login_api";

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles: string[]; // Quais tipos de usuário podem acessar
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const userRole = isAdmin(); // Obtém o tipo de usuário

  if (!allowedRoles.includes(userRole || "")) {
    return <Navigate to="/home" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
