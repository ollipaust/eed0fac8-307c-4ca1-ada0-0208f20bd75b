// ShoppingCartContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface ShoppingCartContextProps {
  cart: any[];
  addToCart: (item: any) => void;
  removeFromCart: (item: any) => void;
}

const ShoppingCartContext = createContext<ShoppingCartContextProps | undefined>(undefined);

export const useShoppingCartContext = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error('useShoppingCartContext must be used within a ShoppingCartProvider');
  }
  return context;
};

export const ShoppingCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (item: any) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (item: any) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem !== item));
  };

  return (
    <ShoppingCartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
