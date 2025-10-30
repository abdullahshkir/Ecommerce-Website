import React, { createContext, useState, useContext, ReactNode, useEffect, useRef } from 'react';
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

// Define SupabaseUser type locally for convenience
type SupabaseUser = Awaited<ReturnType<typeof supabase.auth.getUser>>['data']['user'];

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
    
    // Use a ref to track the last loaded user ID to prevent redundant reloads on token refresh
    const lastLoadedUserId = useRef<string | null>(null);

    const isLoggedIn = !!user;

    useEffect(() => {
        let isMounted = true;
        
        if (isLoadingSession) {
            if (isMounted) setIsLoadingUser(true);
            return;
        }

        if (!supabaseUser) {
            // Logged out state
            if (isMounted) {
                setUser(null);
                setAddresses([]);
                setOrders([]);
                lastLoadedUserId.current = null;
                setIsLoadingUser(false);
            }
            return;
        }
        
        // User is present. Check if we already loaded this user.
        if (lastLoadedUserId.current === supabaseUser.id) {
            if (isMounted) setIsLoadingUser(false);
            return;
        }

        // Start loading new user data
        if (isMounted) setIsLoadingUser(true);

        const loadUserData = async () => {
            try {
                // 1. Fetch the latest profile data from the database
                const profile = await getProfile(supabaseUser);
                
                // 2. Fetch addresses (only if profile exists, though RLS should handle this)
                const userAddresses = profile ? await fetchAddresses(supabaseUser.id) : [];
                
                // 3. Fetch orders (only if profile exists)
                const userOrders = profile ? await fetchOrders(supabaseUser.id) : [];
                
                if (isMounted) {
                    setUser(profile);
                    setAddresses(userAddresses);
                    setOrders(userOrders);
                    lastLoadedUserId.current = supabaseUser.id;
                }
            } catch (error) {
                console.error('Failed to load user data:', error);
                if (isMounted) {
                    // If fetching fails, set user to a basic object to prevent infinite loading/logout loop
                    setUser({
                        id: supabaseUser.id,
                        first_name: supabaseUser.email?.split('@')[0] || 'Guest',
                        last_name: '',
                        display_name: supabaseUser.email?.split('@')[0] || 'Guest',
                        email: supabaseUser.email || '',
                        role: 'user', // Default to 'user' on failure
                    });
                    setAddresses([]);
                    setOrders([]);
                }
            } finally {
                if (isMounted) {
                    setIsLoadingUser(false);
                }
            }
        };

        loadUserData();

        return () => {
            isMounted = false;
        };
    }, [supabaseUser, isLoadingSession]);

    
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
            first_name: newDetails.first_name || user.first_name,
            last_name: newDetails.last_name || user.last_name,
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