import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { User, Address, Order } from '../types';
import { useSession } from './SessionContext';
import { 
    getProfile, 
    updateProfile, 
    fetchAddresses, 
    saveAddress, 
    deleteAddress, 
    setDefaultAddressDB,
    fetchOrders,
    createOrder
} from '../src/integrations/supabase/api';
import { supabase } from '../src/integrations/supabase/client';

interface UserContextType {
  isLoggedIn: boolean;
  user: User | null;
  addresses: Address[];
  orders: Order[];
  isLoadingUser: boolean;
  logout: () => Promise<void>;
  updateUserDetails: (newDetails: Partial<Omit<User, 'id' | 'email' | 'display_name'>>) => Promise<void>;
  addAddress: (newAddress: Omit<Address, 'id' | 'user_id'>) => Promise<void>;
  updateAddress: (updatedAddress: Address) => Promise<void>;
  removeAddress: (addressId: string) => Promise<void>;
  setDefaultAddress: (addressId: string) => Promise<void>;
  addOrder: (newOrder: Pick<Order, 'items' | 'total' | 'shipping_address'>) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user: supabaseUser, isLoading: isLoadingSession } = useSession();
    const [user, setUser] = useState<User | null>(null);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoadingUser, setIsLoadingUser] = useState(true);

    const isLoggedIn = !!user;

    const loadUserData = useCallback(async (sUser: SupabaseUser) => {
        setIsLoadingUser(true);
        try {
            const profile = await getProfile(sUser);
            setUser(profile);
            
            const userAddresses = await fetchAddresses(sUser.id);
            setAddresses(userAddresses);
            
            const userOrders = await fetchOrders(sUser.id);
            setOrders(userOrders);
        } catch (error) {
            console.error('Failed to load user data:', error);
            setUser(null);
            setAddresses([]);
            setOrders([]);
        } finally {
            setIsLoadingUser(false);
        }
    }, []);

    useEffect(() => {
        if (isLoadingSession) {
            setIsLoadingUser(true);
            return;
        }

        if (supabaseUser) {
            loadUserData(supabaseUser);
        } else {
            // Logged out state
            setUser(null);
            setAddresses([]);
            setOrders([]);
            setIsLoadingUser(false);
        }
    }, [supabaseUser, isLoadingSession, loadUserData]);
    
    const logout = async () => {
        await supabase.auth.signOut();
        // State cleanup handled by useEffect listening to supabaseUser change
    };

    const updateUserDetails = async (newDetails: Partial<Omit<User, 'id' | 'email' | 'display_name'>>) => {
        if (!user) return;
        await updateProfile(user.id, newDetails);
        
        // Recalculate display name locally for immediate feedback
        const updatedUser: User = {
            ...user,
            ...newDetails,
            display_name: `${newDetails.first_name || user.first_name} ${newDetails.last_name || user.last_name}`.trim()
        };
        setUser(updatedUser);
    };
    
    const addAddress = async (newAddressData: Omit<Address, 'id' | 'user_id'>) => {
        if (!user) return;
        const savedAddress = await saveAddress(user.id, newAddressData);
        if (savedAddress) {
            // Reload all addresses to ensure default status is correct
            const updatedAddresses = await fetchAddresses(user.id);
            setAddresses(updatedAddresses);
        }
    };

    const updateAddress = async (updatedAddress: Address) => {
        if (!user) return;
        const savedAddress = await saveAddress(user.id, updatedAddress, updatedAddress.id);
        if (savedAddress) {
            // Reload all addresses to ensure default status is correct
            const updatedAddresses = await fetchAddresses(user.id);
            setAddresses(updatedAddresses);
        }
    };

    const removeAddress = async (addressId: string) => {
        if (!user) return;
        await deleteAddress(addressId);
        setAddresses(prev => prev.filter(a => a.id !== addressId));
    };

    const setDefaultAddress = async (addressId: string) => {
        if (!user) return;
        await setDefaultAddressDB(user.id, addressId);
        // Reload all addresses to ensure default status is correct
        const updatedAddresses = await fetchAddresses(user.id);
        setAddresses(updatedAddresses);
    };

    const addOrder = async (newOrderData: Pick<Order, 'items' | 'total' | 'shipping_address'>) => {
        if (!user) return;
        const newOrder = await createOrder({ ...newOrderData, user_id: user.id });
        if (newOrder) {
            setOrders(prev => [newOrder, ...prev]);
        }
    };

    const value = {
        isLoggedIn, user, addresses, orders,
        isLoadingUser,
        logout, updateUserDetails,
        addAddress, updateAddress, removeAddress, setDefaultAddress,
        addOrder
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider or SessionProvider');
    }
    return context;
};