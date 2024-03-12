import React, { createContext, useContext, useState } from "react";

interface CartContextType {
  cartQuantity: number;
  updateCartQuantity: (newData: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartQuantity, setCartQuantity] = useState<number>(0);

  const updateCartQuantity = (newData: number) => {
    setCartQuantity(newData);
  };

  return (
    <CartContext.Provider
      value={{ cartQuantity: cartQuantity, updateCartQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a AuthProvider");
  }
  return context;
};
