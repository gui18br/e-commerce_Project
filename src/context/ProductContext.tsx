import React, { createContext, useContext, useState } from "react";

interface ProductsData {
  product: string;
}

interface ProductContextType {
  product: string;
  updateProduct: (newData: ProductsData) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: React.ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [product, setProduct] = useState<ProductsData>({ product: "moveis" });

  const updateProduct = (newData: ProductsData) => {
    setProduct(newData);
  };

  return (
    <ProductContext.Provider
      value={{ product: product?.product, updateProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a AuthProvider");
  }
  return context;
};
