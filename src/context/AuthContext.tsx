import React, { createContext, useState, useEffect } from "react";
import { getToken } from "../utils/auth";

interface AuthContextType {
  isAuth: boolean;
  setAuth: (val: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  setAuth: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
