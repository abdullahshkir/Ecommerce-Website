import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product } from '../types';

interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>(() => {
    try {
      const items = window.localStorage.getItem('wishlist');
      return items ? JSON.parse(items) : [];
    } catch (error) {
      console.error('Error reading wishlist from localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    } catch (error) {
      console.error('Error saving wishlist to localStorage', error);
    }
  }, [wishlistItems]);

  const addToWishlist = (product: Product) => {
    setWishlistItems((prevItems) => {
      if (!prevItems.find(item => item.id === product.id)) {
        return [...prevItems, product];
      }
      return prevItems;
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistItems((prevItems) => prevItems.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const value = { wishlistItems, addToWishlist, removeFromWishlist, isInWishlist };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};