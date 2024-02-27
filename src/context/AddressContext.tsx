import React, { createContext, useContext, useState } from "react";

interface AddresData {
  cidade: string;
  bairro: string;
  endereco: string;
  uf: string;
}

interface AddressContextType {
  endereco: AddresData | undefined;
  updateAddressData: (newData: AddresData) => void;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

interface AddressProviderProps {
  children: React.ReactNode;
}

export const AddressProvider: React.FC<AddressProviderProps> = ({
  children,
}) => {
  const [endereco, setEndereco] = useState<AddresData | undefined>();

  const updateAddressData = (newData: AddresData) => {
    setEndereco(newData);
  };

  return (
    <AddressContext.Provider value={{ endereco, updateAddressData }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useAddress must be used within a AddressProvider");
  }
  return context;
};
