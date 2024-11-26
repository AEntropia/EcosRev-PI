"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isAdmin } from "@/app/login_api";

// Tipo para opções de proteção
interface AdminProtectionOptions {
  redirectPath?: string;
}

// HOC de proteção para rotas de admin no Next.js
export function withAdminProtection<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: AdminProtectionOptions = {}
) {
  // Componente de proteção
  return function AdminProtectedComponent(props: P) {
    const router = useRouter();
    const { redirectPath = "/home" } = options;

    useEffect(() => {
      // Verifica se é admin
      const userType = isAdmin();

      // Redireciona se não for admin
      if (userType !== "admin") {
        router.push(redirectPath);
      }
    }, [router, redirectPath]);

    // Renderiza o componente apenas se for admin
    return isAdmin() === "admin" ? <WrappedComponent {...props} /> : null;
  };
}
