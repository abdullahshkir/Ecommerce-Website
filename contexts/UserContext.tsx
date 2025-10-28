import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, Address, Order } from '../types';
import { supabase } from '../lib/supabase';
import { authService } from '../lib/auth';

interface UserContextType {
  isLoggedIn: boolean;
  user: User | null;
  addresses: Address[];
  orders: Order[];
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserDetails: (newDetails: Partial<User>) => Promise<void>;
  addAddress: (newAddress: Omit<Address, 'id'>) => Promise<void>;
  updateAddress: (updatedAddress: Address) => Promise<void>;
  removeAddress: (addressId: string) => Promise<void>;
  setDefaultAddress: (addressId: string) => Promise<void>;
  addOrder: (newOrder: Omit<Order, 'id' | 'order_number' | 'created_at' | 'status'>) => Promise<void>;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();

    const { data: authListener } = authService.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        await loadUserData(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
        setUser(null);
        setAddresses([]);
        setOrders([]);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    try {
      const session = await authService.getSession();
      if (session?.user) {
        await loadUserData(session.user.id);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserData = async (userId: string) => {
    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (profileError) throw profileError;

      if (profile) {
        setUser({
          id: profile.id,
          first_name: profile.first_name || '',
          last_name: profile.last_name || '',
          display_name: profile.display_name || '',
          email: profile.email,
        });
        setIsLoggedIn(true);

        await loadAddresses(userId);
        await loadOrders(userId);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const loadAddresses = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setAddresses(data || []);
    } catch (error) {
      console.error('Error loading addresses:', error);
    }
  };

  const loadOrders = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setOrders(data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const authData = await authService.signIn({ email, password });
      if (authData.user) {
        await loadUserData(authData.user.id);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Login failed');
    }
  };

  const signup = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    displayName: string
  ) => {
    try {
      const authData = await authService.signUp({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        display_name: displayName,
      });

      if (authData.user) {
        await loadUserData(authData.user.id);
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      throw new Error(error.message || 'Signup failed');
    }
  };

  const logout = async () => {
    try {
      await authService.signOut();
      setIsLoggedIn(false);
      setUser(null);
      setAddresses([]);
      setOrders([]);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const updateUserDetails = async (newDetails: Partial<User>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: newDetails.first_name,
          last_name: newDetails.last_name,
          display_name: newDetails.display_name,
        })
        .eq('id', user.id);

      if (error) throw error;

      setUser({ ...user, ...newDetails });
    } catch (error) {
      console.error('Error updating user details:', error);
      throw error;
    }
  };

  const addAddress = async (newAddressData: Omit<Address, 'id'>) => {
    if (!user) return;

    try {
      if (newAddressData.is_default) {
        await supabase
          .from('addresses')
          .update({ is_default: false })
          .eq('user_id', user.id);
      }

      const { data, error } = await supabase
        .from('addresses')
        .insert({
          user_id: user.id,
          ...newAddressData,
        })
        .select()
        .single();

      if (error) throw error;

      setAddresses((prev) => [...prev, data]);
    } catch (error) {
      console.error('Error adding address:', error);
      throw error;
    }
  };

  const updateAddress = async (updatedAddress: Address) => {
    if (!user) return;

    try {
      if (updatedAddress.is_default) {
        await supabase
          .from('addresses')
          .update({ is_default: false })
          .eq('user_id', user.id)
          .neq('id', updatedAddress.id);
      }

      const { error } = await supabase
        .from('addresses')
        .update(updatedAddress)
        .eq('id', updatedAddress.id);

      if (error) throw error;

      setAddresses((prev) =>
        prev.map((a) => (a.id === updatedAddress.id ? updatedAddress : a))
      );
    } catch (error) {
      console.error('Error updating address:', error);
      throw error;
    }
  };

  const removeAddress = async (addressId: string) => {
    try {
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', addressId);

      if (error) throw error;

      setAddresses((prev) => prev.filter((a) => a.id !== addressId));
    } catch (error) {
      console.error('Error removing address:', error);
      throw error;
    }
  };

  const setDefaultAddress = async (addressId: string) => {
    if (!user) return;

    try {
      await supabase
        .from('addresses')
        .update({ is_default: false })
        .eq('user_id', user.id);

      const { error } = await supabase
        .from('addresses')
        .update({ is_default: true })
        .eq('id', addressId);

      if (error) throw error;

      setAddresses((prev) =>
        prev.map((a) => ({ ...a, is_default: a.id === addressId }))
      );
    } catch (error) {
      console.error('Error setting default address:', error);
      throw error;
    }
  };

  const addOrder = async (
    newOrderData: Omit<Order, 'id' | 'order_number' | 'created_at' | 'status'>
  ) => {
    if (!user) return;

    try {
      const orderNumber = `MX${Math.floor(Math.random() * 90000) + 10000}`;

      const { data, error } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          order_number: orderNumber,
          total: newOrderData.total,
          items: newOrderData.items,
          shipping_address: newOrderData.shipping_address,
          status: 'Processing',
        })
        .select()
        .single();

      if (error) throw error;

      setOrders((prev) => [data, ...prev]);
    } catch (error) {
      console.error('Error adding order:', error);
      throw error;
    }
  };

  const value = {
    isLoggedIn,
    user,
    addresses,
    orders,
    login,
    signup,
    logout,
    updateUserDetails,
    addAddress,
    updateAddress,
    removeAddress,
    setDefaultAddress,
    addOrder,
    loading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
