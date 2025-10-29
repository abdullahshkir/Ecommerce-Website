import { supabase } from './client';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { User, Address, Order, Product, Review } from '../../types';

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

// --- Order Management (User) ---

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

// --- Product Management (Admin) ---

// Fetch all products (for frontend and admin)
export const fetchAllProducts = async (): Promise<Product[]> => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
    
    // Map Supabase data to our Product type
    return data.map((p: any) => ({
        id: p.id, // ID is now a string (UUID)
        name: p.name,
        price: p.price,
        oldPrice: p.old_price,
        category: p.category,
        imageUrl: p.image_url,
        imageUrl2: p.image_url2,
        isSale: p.is_sale,
        isNew: p.is_new,
        collection: p.collection,
        description: p.description,
        longDescription: p.long_description,
        availability: p.availability,
        categories: p.categories,
        tags: p.tags,
        images: p.images,
        color: p.color,
        size: p.size,
        brand: p.brand,
        rating: p.rating ? Number(p.rating) : 0,
        reviewCount: p.review_count ? Number(p.review_count) : 0,
        // reviews will be handled separately if needed
    }));
};

// Create a new product (admin only)
export const createProduct = async (productData: Omit<Product, 'id'>): Promise<Product | null> => {
    // Map our Product type to Supabase table structure
    const supabaseProductData = {
        name: productData.name,
        price: productData.price,
        old_price: productData.oldPrice,
        category: productData.category,
        image_url: productData.imageUrl,
        image_url2: productData.imageUrl2,
        is_sale: productData.isSale,
        is_new: productData.isNew,
        collection: productData.collection,
        description: productData.description,
        long_description: productData.longDescription,
        availability: productData.availability,
        categories: productData.categories,
        tags: productData.tags,
        images: productData.images,
        color: productData.color,
        size: productData.size,
        brand: productData.brand,
        rating: productData.rating,
        review_count: productData.reviewCount,
    };

    const { data, error } = await supabase
        .from('products')
        .insert(supabaseProductData)
        .select()
        .single();

    if (error) {
        console.error('Error creating product:', error);
        throw error;
    }
    
    // Map back to our Product type
    const newProduct: Product = {
        id: data.id, // ID is now a string (UUID)
        name: data.name,
        price: data.price,
        oldPrice: data.old_price,
        category: data.category,
        imageUrl: data.image_url,
        imageUrl2: data.image_url2,
        isSale: data.is_sale,
        isNew: data.is_new,
        collection: data.collection,
        description: data.description,
        longDescription: data.long_description,
        availability: data.availability,
        categories: data.categories,
        tags: data.tags,
        images: data.images,
        color: data.color,
        size: data.size,
        brand: data.brand,
        rating: data.rating ? Number(data.rating) : 0,
        reviewCount: data.review_count ? Number(data.review_count) : 0,
    };
    
    return newProduct;
};

// Update an existing product (admin only)
export const updateProduct = async (productId: string, productData: Partial<Product>): Promise<Product | null> => {
    // Map our Product type to Supabase table structure for update
    const supabaseProductData: any = {};
    if (productData.name !== undefined) supabaseProductData.name = productData.name;
    if (productData.price !== undefined) supabaseProductData.price = productData.price;
    if (productData.oldPrice !== undefined) supabaseProductData.old_price = productData.oldPrice;
    if (productData.category !== undefined) supabaseProductData.category = productData.category;
    if (productData.imageUrl !== undefined) supabaseProductData.image_url = productData.imageUrl;
    if (productData.imageUrl2 !== undefined) supabaseProductData.image_url2 = productData.imageUrl2;
    if (productData.isSale !== undefined) supabaseProductData.is_sale = productData.isSale;
    if (productData.isNew !== undefined) supabaseProductData.is_new = productData.isNew;
    if (productData.collection !== undefined) supabaseProductData.collection = productData.collection;
    if (productData.description !== undefined) supabaseProductData.description = productData.description;
    if (productData.longDescription !== undefined) supabaseProductData.long_description = productData.longDescription;
    if (productData.availability !== undefined) supabaseProductData.availability = productData.availability;
    if (productData.categories !== undefined) supabaseProductData.categories = productData.categories;
    if (productData.tags !== undefined) supabaseProductData.tags = productData.tags;
    if (productData.images !== undefined) supabaseProductData.images = productData.images;
    if (productData.color !== undefined) supabaseProductData.color = productData.color;
    if (productData.size !== undefined) supabaseProductData.size = productData.size;
    if (productData.brand !== undefined) supabaseProductData.brand = productData.brand;
    if (productData.rating !== undefined) supabaseProductData.rating = productData.rating;
    if (productData.reviewCount !== undefined) supabaseProductData.review_count = productData.reviewCount;

    const { data, error } = await supabase
        .from('products')
        .update(supabaseProductData)
        .eq('id', productId)
        .select()
        .single();

    if (error) {
        console.error('Error updating product:', error);
        throw error;
    }
    
    // Map back to our Product type
    const updatedProduct: Product = {
        id: data.id, // ID is now a string (UUID)
        name: data.name,
        price: data.price,
        oldPrice: data.old_price,
        category: data.category,
        imageUrl: data.image_url,
        imageUrl2: data.image_url2,
        isSale: data.is_sale,
        isNew: data.is_new,
        collection: data.collection,
        description: data.description,
        longDescription: data.long_description,
        availability: data.availability,
        categories: data.categories,
        tags: data.tags,
        images: data.images,
        color: data.color,
        size: data.size,
        brand: data.brand,
        rating: data.rating ? Number(data.rating) : 0,
        reviewCount: data.review_count ? Number(data.review_count) : 0,
    };
    
    return updatedProduct;
};

// Delete a product (admin only)
export const deleteProduct = async (productId: string) => {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

    if (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

// --- Admin Management ---

export const fetchAllOrders = async (): Promise<Order[]> => {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching all orders:', error);
        throw error;
    }
    return data as Order[];
};

export const fetchAllUsers = async (): Promise<User[]> => {
    // Note: Supabase RLS usually prevents fetching all users from 'auth.users'.
    // We fetch from 'profiles' and join with 'auth.users' data if needed, 
    // but for simplicity, we fetch profiles and assume email is available via auth.
    const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, role, auth_user:auth.users(email, created_at)');

    if (profilesError) {
        console.error('Error fetching all users:', profilesError);
        throw profilesError;
    }
    
    return profilesData.map((profile: any) => ({
        id: profile.id,
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        display_name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim(),
        email: profile.auth_user?.email || 'N/A',
        role: profile.role || 'user',
        created_at: profile.auth_user?.created_at, // Adding created_at for AdminUsersPage
    })) as User[];
};

// --- Review Management ---

interface ReviewData {
    product_id: string;
    user_id: string;
    rating: number;
    text: string;
}

export const createReview = async (reviewData: ReviewData) => {
    const { error } = await supabase
        .from('reviews')
        .insert(reviewData);

    if (error) {
        console.error('Error creating review:', error);
        throw error;
    }
};

export const fetchProductReviews = async (productId: string): Promise<Review[]> => {
    // Fetch approved reviews and join with profile data for author name
    const { data, error } = await supabase
        .from('reviews')
        .select(`
            id,
            rating,
            text,
            created_at,
            user_id,
            profiles (first_name, last_name)
        `)
        .eq('product_id', productId)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching product reviews:', error);
        return [];
    }

    return data.map((r: any) => {
        const authorName = `${r.profiles?.first_name || ''} ${r.profiles?.last_name || ''}`.trim() || 'Anonymous';
        return {
            id: r.id,
            author: authorName,
            rating: r.rating,
            date: new Date(r.created_at).toLocaleDateString(),
            text: r.text,
        };
    });
};

export const fetchAllReviews = async (): Promise<any[]> => {
    // Fetch all reviews (pending and approved) for admin panel
    const { data, error } = await supabase
        .from('reviews')
        .select(`
            id,
            rating,
            text,
            is_approved,
            created_at,
            product_id,
            user_id,
            profiles (first_name, last_name),
            products (name)
        `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching all reviews:', error);
        throw error;
    }
    return data;
};

export const updateReviewStatus = async (reviewId: string, isApproved: boolean) => {
    const { error } = await supabase
        .from('reviews')
        .update({ is_approved: isApproved })
        .eq('id', reviewId);

    if (error) {
        console.error('Error updating review status:', error);
        throw error;
    }
};

export const deleteReview = async (reviewId: string) => {
    const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId);

    if (error) {
        console.error('Error deleting review:', error);
        throw error;
    }
};