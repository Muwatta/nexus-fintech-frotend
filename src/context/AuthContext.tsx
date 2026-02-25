// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { getToken } from "../utils/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  setAuth: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setAuth: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check token in localStorage on initial load
    const token = getToken();
    if (token) setIsAuthenticated(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuth: setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
