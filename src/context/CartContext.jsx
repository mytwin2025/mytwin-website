import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Initialize cart from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from local storage", error);
      return [];
    }
  });

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    // Check if item already exists by some unique ID (like planId + patientName)
    // For now we'll just check if an item with the same id exists
    const exists = cartItems.find((cartItem) => cartItem.id === item.id);
    
    if (exists) {
      toast.info('Item is already in your cart');
      return;
    }

    setCartItems((prev) => [...prev, item]);
    toast.success('Added to cart');
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateCartItem = (itemId, updatedItem) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, ...updatedItem } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
