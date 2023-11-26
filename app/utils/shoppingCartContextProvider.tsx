import React, { createContext, useContext, useEffect, useState } from 'react';

interface ShoppingCartContextProps {
  cart: any[];
  addToCart: (item: any) => void;
  removeFromCart: (item: any) => void;
}

const ShoppingCartContext = createContext<ShoppingCartContextProps | undefined>(undefined);

export const useShoppingCartContext = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error('useShoppingCartContext must be used within ShoppingCartProvider');
  }
  return context;
};

export const ShoppingCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const { data, timestamp } = JSON.parse(storedCart);
      const expirationTime = 24 * 60 * 60 * 1000; // 24h in ms
      if (Date.now() - timestamp <= expirationTime) {
        setCart(data);
      }
    }
  }, []);

  useEffect(() => {
    const timestamp = Date.now();
    localStorage.setItem('cart', JSON.stringify({ data: cart, timestamp }));
  }, [cart]);

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
