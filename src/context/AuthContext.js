import React, { createContext, useContext, useState, useEffect } from "react";
import { getItem, setItem } from "../services/LocalStorageFuncs";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [tokenData, setTokenData] = useState(getItem("token") || "");
  const [userEmail, setUserEmail] = useState(getItem("userEmail") || "");

  const updateUserEmail = (newData) => {
    setUserEmail(newData);
  };

  const updateTokenData = (newData) => {
    setTokenData(newData);
  };

  useEffect(() => {
    setItem("token", tokenData);
    setItem("userEmail", userEmail);
  }, [tokenData, userEmail]);

  return (
    <AuthContext.Provider
      value={{ tokenData, updateTokenData, userEmail, updateUserEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
