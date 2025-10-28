import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product } from '../types';
import { supabase } from '../lib/supabase';
import { useUser } from './UserContext';

interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isLoggedIn, user } = useUser();
  const [wishlistItems, setWishlistItems] = useState<Product[]>(() => {
    if (!isLoggedIn) {
      try {
        const items = window.localStorage.getItem('wishlist');
        return items ? JSON.parse(items) : [];
      } catch (error) {
        console.error('Error reading wishlist from localStorage', error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    if (isLoggedIn && user) {
      loadWishlistFromDatabase();
    } else {
      loadWishlistFromLocalStorage();
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    if (!isLoggedIn) {
      try {
        window.localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
      } catch (error) {
        console.error('Error saving wishlist to localStorage', error);
      }
    }
  }, [wishlistItems, isLoggedIn]);

  const loadWishlistFromDatabase = async () => {
    if (!user) return;

    try {
      const { data: wishlistData, error } = await supabase
        .from('wishlist_items')
        .select(`
          *,
          products:product_id (*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      const items: Product[] = wishlistData.map((item: any) => item.products);
      setWishlistItems(items);
    } catch (error) {
      console.error('Error loading wishlist from database:', error);
    }
  };

  const loadWishlistFromLocalStorage = () => {
    try {
      const items = window.localStorage.getItem('wishlist');
      if (items) {
        setWishlistItems(JSON.parse(items));
      }
    } catch (error) {
      console.error('Error reading wishlist from localStorage', error);
    }
  };

  const addToWishlist = (product: Product) => {
    setWishlistItems((prevItems) => {
      if (!prevItems.find((item) => item.id === product.id)) {
        const newItems = [...prevItems, product];

        if (isLoggedIn && user) {
          supabase
            .from('wishlist_items')
            .insert({
              user_id: user.id,
              product_id: product.id,
            })
            .then(({ error }) => {
              if (error) console.error('Error adding to wishlist:', error);
            });
        }

        return newItems;
      }
      return prevItems;
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlistItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== productId);

      if (isLoggedIn && user) {
        supabase
          .from('wishlist_items')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', productId)
          .then(({ error }) => {
            if (error) console.error('Error removing from wishlist:', error);
          });
      }

      return newItems;
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlistItems.some((item) => item.id === productId);
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
