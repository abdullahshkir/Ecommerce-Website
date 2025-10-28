export interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice: number | null;
  category: string;
  imageUrl: string;
  imageUrl2: string;
  isSale?: boolean;
  isNew?: boolean;
  collection?: string;
  description?: string;
  longDescription?: string;
  availability?: string;
  categories?: string[];
  tags?: string[];
  images?: string[];
  reviewCount?: number;
  rating?: number;
  color?: string[];
  size?: string[];
  brand?: string;
  reviews?: Review[];
}

export type CartItem = Product & { quantity: number; };

export interface Address {
  id: string; // Changed to string for UUID
  user_id?: string;
  first_name: string;
  last_name: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  is_default: boolean;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  display_name: string;
  email: string;
}

export interface Order {
  id: string; // Changed to string for UUID
  user_id?: string;
  order_number: string;
  created_at: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: CartItem[];
  shipping_address: Omit<Address, 'id' | 'is_default' | 'user_id'>;
}