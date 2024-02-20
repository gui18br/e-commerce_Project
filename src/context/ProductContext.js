import React, { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState("moveis");

  const updateProduct = (newData) => {
    setProduct(newData);
  };

  return (
    <ProductContext.Provider value={{ product, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  return useContext(ProductContext);
};
