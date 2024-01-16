import React, { createContext, useContext, useState, useEffect } from "react";
import { getItem, setItem } from "../services/LocalStorageFuncs";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [tokenData, setTokenData] = useState(getItem("token") || "");

  const updateTokenData = (newData) => {
    setTokenData(newData);
  };

  useEffect(() => {
    setItem("token", tokenData);
  }, [tokenData]);

  return (
    <TokenContext.Provider value={{ tokenData, updateTokenData }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  return useContext(TokenContext);
};
