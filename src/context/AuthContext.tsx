import React, { createContext, useContext, useState } from "react";
import { getItem } from "../services/LocalStorageFuncs";

interface UserData {
  userName?: string;
  userEmail: string;
  userCPF?: string;
}

interface TokenData {
  tokenData?: string;
}

interface AuthContextType {
  tokenData: string;
  updateTokenData: (newData: TokenData) => void;
  userData: UserData;
  updateUserData: (newData: UserData) => void;
  updateUserName: (newData: string) => void;
  updateUserEmail: (newData: string) => void;
  updateuserCPF: (newData: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [tokenData, setTokenData] = useState<TokenData>(getItem("token") || {});
  const [userData, setUserData] = useState<UserData>(
    getItem("userData") || { userEmail: "" }
  );

  console.log(userData.userName);

  const updateUserData = (newData: UserData) => {
    setUserData(newData);
  };

  const updateUserName = (newData: string) => {
    setUserData((prevUserData) => ({ ...prevUserData, userName: newData }));
  };

  const updateuserCPF = (newData: string) => {
    setUserData((prevUserData) => ({ ...prevUserData, userCPF: newData }));
  };

  const updateUserEmail = (newData: string) => {
    setUserData((prevUserData) => ({ ...prevUserData, userEmail: newData }));
  };

  const updateTokenData = (newData: TokenData) => {
    setTokenData(newData);
  };

  return (
    <AuthContext.Provider
      value={{
        userData: userData || getItem("userData") || { userEmail: "" },
        tokenData: tokenData?.tokenData || getItem("token"),
        updateUserData,
        updateTokenData,
        updateUserName,
        updateUserEmail,
        updateuserCPF,
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
