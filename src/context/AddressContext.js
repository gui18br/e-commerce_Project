import React, { createContext, useContext, useState } from "react";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [endereco, setEndereco] = useState();

  const updateAddressData = (newData) => {
    setEndereco(newData);
  };

  return (
    <AddressContext.Provider value={{ endereco, updateAddressData }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  return useContext(AddressContext);
};
