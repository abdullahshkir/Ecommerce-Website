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
}

export type CartItem = Product & { quantity: number; };

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface User {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: CartItem[];
  shippingAddress: Omit<Address, 'id' | 'isDefault'>;
}