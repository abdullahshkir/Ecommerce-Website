import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, Address, Order } from '../types';

interface UserContextType {
  isLoggedIn: boolean;
  user: User | null;
  addresses: Address[];
  orders: Order[];
  login: (userData: User) => void;
  logout: () => void;
  updateUserDetails: (newDetails: Partial<User>) => void;
  addAddress: (newAddress: Omit<Address, 'id'>) => void;
  updateAddress: (updatedAddress: Address) => void;
  removeAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;
  addOrder: (newOrder: Pick<Order, 'items' | 'total' | 'shipping_address'>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const getInitialState = <T,>(key: string, defaultValue: T): T => {
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Error reading ${key} from localStorage`, error);
        return defaultValue;
    }
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => getInitialState('isLoggedIn', false));
    const [user, setUser] = useState<User | null>(() => getInitialState('user', null));
    const [addresses, setAddresses] = useState<Address[]>(() => getInitialState('addresses', []));
    const [orders, setOrders] = useState<Order[]>(() => getInitialState('orders', []));

    useEffect(() => {
        try {
            window.localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
            window.localStorage.setItem('user', JSON.stringify(user));
            window.localStorage.setItem('addresses', JSON.stringify(addresses));
            window.localStorage.setItem('orders', JSON.stringify(orders));
        } catch (error) {
            console.error('Error saving to localStorage', error);
        }
    }, [isLoggedIn, user, addresses, orders]);
    
    const login = (userData: User) => {
        // FIX: Use snake_case for address properties to match the type definition.
        const defaultAddress: Address = {
            id: Date.now().toString(),
            first_name: userData.first_name,
            last_name: userData.last_name,
            address: 'D Ground',
            apartment: 'Apt 123',
            city: 'Faisalabad',
            state: 'Punjab',
            zip: '38000',
            country: 'Pakistan',
            is_default: true,
        };
        setUser(userData);
        setAddresses([defaultAddress]);
        setOrders([]);
        setIsLoggedIn(true);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        setAddresses([]);
        setOrders([]);
        window.localStorage.removeItem('isLoggedIn');
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('addresses');
        window.localStorage.removeItem('orders');
    };

    const updateUserDetails = (newDetails: Partial<User>) => {
        setUser(prevUser => prevUser ? { ...prevUser, ...newDetails } : null);
    };
    
    const addAddress = (newAddressData: Omit<Address, 'id'>) => {
        setAddresses(prev => {
            // FIX: Property 'isDefault' does not exist on type 'Omit<Address, "id">'. Did you mean 'is_default'?
            const newAddresses = newAddressData.is_default ? prev.map(a => ({...a, is_default: false})) : [...prev];
            const newAddress: Address = { ...newAddressData, id: Date.now().toString() };
            return [...newAddresses, newAddress];
        });
    };

    const updateAddress = (updatedAddress: Address) => {
        setAddresses(prev => {
            const newAddresses = prev.map(a => (a.id === updatedAddress.id ? updatedAddress : a));
            // FIX: Property 'isDefault' does not exist on type 'Address'. Did you mean 'is_default'?
            if (updatedAddress.is_default) {
                return newAddresses.map(a => a.id === updatedAddress.id ? a : {...a, is_default: false});
            }
            return newAddresses;
        });
    };

    const removeAddress = (addressId: string) => {
        setAddresses(prev => prev.filter(a => a.id !== addressId));
    };

    const setDefaultAddress = (addressId: string) => {
        setAddresses(prev => prev.map(a => ({...a, is_default: a.id === addressId})));
    };

    const addOrder = (newOrderData: Pick<Order, 'items' | 'total' | 'shipping_address'>) => {
        // FIX: 'date' property does not exist on type 'Order'. Use 'created_at'.
        const newOrder: Order = {
            ...newOrderData,
            id: `ORD-${Date.now()}`,
            user_id: user?.id,
            order_number: `MX${Math.floor(Math.random() * 90000) + 10000}`,
            created_at: new Date().toISOString(),
            status: 'Processing',
        };
        setOrders(prev => [newOrder, ...prev]);
    };

    const value = {
        isLoggedIn, user, addresses, orders,
        login, logout, updateUserDetails,
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
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
