import React, { createContext, useContext, useState, useEffect } from "react";
import { getItem, setItem } from "../services/LocalStorageFuncs";

interface AuthData {
  tokenData?: string;
  userEmail: string;
  userCpf: string;
}

interface AuthContextType {
  tokenData: string;
  updateTokenData: (newData: AuthData) => void;
  userEmail: string;
  updateUserEmail: (newData: AuthData) => void;
  userCpf: string;
  updateUserCpf: (newData: AuthData) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [tokenData, setTokenData] = useState<AuthData>(getItem("token") || "");
  const [userEmail, setUserEmail] = useState<AuthData>(
    getItem("userEmail") || ""
  );
  const [userCpf, setUserCpf] = useState<AuthData>(getItem("userCpf") || "");

  const updateUserCpf = (newData: AuthData) => {
    setUserCpf(newData);
  };

  const updateUserEmail = (newData: AuthData) => {
    setUserEmail(newData);
  };

  const updateTokenData = (newData: AuthData) => {
    setTokenData(newData);
  };

  useEffect(() => {
    if (tokenData) {
      setItem("token", tokenData.tokenData || "");
    }
    if (userEmail) {
      setItem("userEmail", userEmail.userEmail || "");
    }
    if (userCpf) {
      setItem("userCpf", userCpf.userCpf || "");
    }
  }, [tokenData, userEmail, userCpf]);

  return (
    <AuthContext.Provider
      value={{
        tokenData: tokenData?.tokenData || "",
        updateTokenData,
        userEmail: userEmail?.userEmail || "",
        updateUserEmail,
        userCpf: userCpf?.userCpf || "",
        updateUserCpf,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
