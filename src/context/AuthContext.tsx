"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext({
  bearerToken: "",
  login: (username: string, password: string) => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [bearerToken, setBearerToken] = useState<string>("teste");

  useEffect(() => {
    setBearerToken(Cookies.get("token") || "");
  }, []);

  const login = (username: string, password: string) => {
    // ...
    const token = "bearer token";
    setBearerToken(token);
    Cookies.set("token", token);
  };

  const logout = () => {
    Cookies.remove("token");
    setBearerToken("");
  };

  return (
    <AuthContext.Provider value={{ bearerToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
