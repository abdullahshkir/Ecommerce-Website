import { supabase } from './client';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { User, Address, Order } from '../../types';

// --- Profile Management ---

export const getProfile = async (supabaseUser: SupabaseUser): Promise<User | null> => {
    const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name, avatar_url, role')
        .eq('id', supabaseUser.id)
        .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found (new user)
        console.error('Error fetching profile:', error);
        return null;
    }
    
    // Combine auth user data with profile data
    const profileData = data || {};

    return {
        id: supabaseUser.id,
        first_name: profileData.first_name || supabaseUser.email?.split('@')[0] || 'Guest',
        last_name: profileData.last_name || '',
        display_name: `${profileData.first_name || supabaseUser.email?.split('@')[0] || 'Guest'} ${profileData.last_name || ''}`.trim(),
        email: supabaseUser.email || '',
        role: profileData.role || 'user', // Fetch role, default to 'user'
        // avatar_url: profileData.avatar_url, // Not used yet, but good practice
    };
};

export const updateProfile = async (userId: string, updates: Partial<Omit<User, 'id' | 'email' | 'display_name' | 'role'>>) => {
    const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId);

    if (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};

// --- Address Management ---

export const fetchAddresses = async (userId: string): Promise<Address[]> => {
    const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', userId)
        .order('is_default', { ascending: false });

    if (error) {
        console.error('Error fetching addresses:', error);
        return [];
    }
    return data as Address[];
};

export const saveAddress = async (userId: string, address: Omit<Address, 'id' | 'user_id'>, addressId?: string): Promise<Address | null> => {
    const addressData = { ...address, user_id: userId };
    
    if (address.is_default) {
        // Clear existing defaults
        await supabase.from('addresses').update({ is_default: false }).eq('user_id', userId);
    }

    if (addressId) {
        // Update existing address
        const { data, error } = await supabase
            .from('addresses')
            .update(addressData)
            .eq('id', addressId)
            .select()
            .single();
        
        if (error) {
            console.error('Error updating address:', error);
            throw error;
        }
        return data as Address;
    } else {
        // Insert new address
        const { data, error } = await supabase
            .from('addresses')
            .insert(addressData)
            .select()
            .single();
        
        if (error) {
            console.error('Error adding address:', error);
            throw error;
        }
        return data as Address;
    }
};

export const deleteAddress = async (addressId: string) => {
    const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', addressId);

    if (error) {
        console.error('Error deleting address:', error);
        throw error;
    }
};

export const setDefaultAddressDB = async (userId: string, addressId: string) => {
    // Clear existing defaults
    await supabase.from('addresses').update({ is_default: false }).eq('user_id', userId);
    
    // Set new default
    const { error } = await supabase
        .from('addresses')
        .update({ is_default: true })
        .eq('id', addressId);

    if (error) {
        console.error('Error setting default address:', error);
        throw error;
    }
};

// --- Order Management ---

export const fetchOrders = async (userId: string): Promise<Order[]> => {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
    return data as Order[];
};

export const createOrder = async (orderData: Pick<Order, 'items' | 'total' | 'shipping_address'> & { user_id: string }): Promise<Order | null> => {
    const newOrder: Omit<Order, 'id' | 'order_number' | 'created_at' | 'status'> & { order_number: string } = {
        ...orderData,
        order_number: `MX${Math.floor(Math.random() * 90000) + 10000}`,
    };

    const { data, error } = await supabase
        .from('orders')
        .insert(newOrder)
        .select()
        .single();

    if (error) {
        console.error('Error creating order:', error);
        throw error;
    }
    return data as Order;
};