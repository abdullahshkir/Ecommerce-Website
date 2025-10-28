import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { authService } from '../lib/auth';

interface AdminContextType {
  isAdminLoggedIn: boolean;
  adminEmail: string | null;
  adminLogin: (email: string, password: string) => Promise<void>;
  adminLogout: () => Promise<void>;
  loading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminUser();

    const { data: authListener } = authService.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        await verifyAdminRole(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        setIsAdminLoggedIn(false);
        setAdminEmail(null);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const checkAdminUser = async () => {
    try {
      const session = await authService.getSession();
      if (session?.user) {
        await verifyAdminRole(session.user.id);
      }
    } catch (error) {
      console.error('Error checking admin user:', error);
    } finally {
      setLoading(false);
    }
  };

  const verifyAdminRole = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role, email')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;

      if (profile && profile.role === 'admin') {
        setIsAdminLoggedIn(true);
        setAdminEmail(profile.email);
      } else {
        setIsAdminLoggedIn(false);
        setAdminEmail(null);
      }
    } catch (error) {
      console.error('Error verifying admin role:', error);
      setIsAdminLoggedIn(false);
      setAdminEmail(null);
    }
  };

  const adminLogin = async (email: string, password: string) => {
    try {
      const authData = await authService.signIn({ email, password });
      if (authData.user) {
        await verifyAdminRole(authData.user.id);

        if (!isAdminLoggedIn) {
          await authService.signOut();
          throw new Error('Access denied. Admin privileges required.');
        }
      }
    } catch (error: any) {
      console.error('Admin login error:', error);
      throw new Error(error.message || 'Admin login failed');
    }
  };

  const adminLogout = async () => {
    try {
      await authService.signOut();
      setIsAdminLoggedIn(false);
      setAdminEmail(null);
    } catch (error) {
      console.error('Admin logout error:', error);
      throw error;
    }
  };

  const value = {
    isAdminLoggedIn,
    adminEmail,
    adminLogin,
    adminLogout,
    loading,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
