import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { supabase } from '../lib/supabase';
import { useUser } from './UserContext';

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  cartCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isLoggedIn, user } = useUser();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (!isLoggedIn) {
      try {
        const items = window.localStorage.getItem('cart');
        return items ? JSON.parse(items) : [];
      } catch (error) {
        console.error('Error reading cart from localStorage', error);
        return [];
      }
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (isLoggedIn && user) {
      loadCartFromDatabase();
    } else {
      loadCartFromLocalStorage();
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    if (!isLoggedIn) {
      try {
        window.localStorage.setItem('cart', JSON.stringify(cartItems));
      } catch (error) {
        console.error('Error saving cart to localStorage', error);
      }
    }
  }, [cartItems, isLoggedIn]);

  const loadCartFromDatabase = async () => {
    if (!user) return;

    try {
      const { data: cartData, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          products:product_id (*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      const items: CartItem[] = cartData.map((item: any) => ({
        ...item.products,
        quantity: item.quantity,
      }));

      setCartItems(items);
    } catch (error) {
      console.error('Error loading cart from database:', error);
    }
  };

  const loadCartFromLocalStorage = () => {
    try {
      const items = window.localStorage.getItem('cart');
      if (items) {
        setCartItems(JSON.parse(items));
      }
    } catch (error) {
      console.error('Error reading cart from localStorage', error);
    }
  };

  const syncCartToDatabase = async (items: CartItem[]) => {
    if (!user) return;

    try {
      await supabase.from('cart_items').delete().eq('user_id', user.id);

      if (items.length > 0) {
        const cartData = items.map((item) => ({
          user_id: user.id,
          product_id: item.id,
          quantity: item.quantity,
        }));

        const { error } = await supabase.from('cart_items').insert(cartData);
        if (error) throw error;
      }
    } catch (error) {
      console.error('Error syncing cart to database:', error);
    }
  };

  const addToCart = (product: Product, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      let newItems: CartItem[];

      if (existingItem) {
        newItems = prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...prevItems, { ...product, quantity }];
      }

      if (isLoggedIn) {
        syncCartToDatabase(newItems);
      }

      return newItems;
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== productId);

      if (isLoggedIn) {
        syncCartToDatabase(newItems);
      }

      return newItems;
    });
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      return;
    }

    setCartItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );

      if (isLoggedIn) {
        syncCartToDatabase(newItems);
      }

      return newItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);

    if (isLoggedIn && user) {
      supabase.from('cart_items').delete().eq('user_id', user.id);
    }
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const value = {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    cartCount,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
