import { CartItem } from '../types';

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: CartItem[];
}

const newImageUrl = 'https://darlingretail.com/cdn/shop/products/1_7b64958c-304b-43bd-b759-c5366bfa9914_600x.jpg?v=1661581431';


export const mockOrders: Order[] = [
  {
    id: 'MX75633',
    date: 'July 15, 2025',
    status: 'Delivered',
    total: 290.00,
    items: [
      { id: 1, name: 'Classic Leather Watch', price: 250.00, quantity: 1, imageUrl: newImageUrl, category: 'Watch', imageUrl2: newImageUrl, oldPrice: 300 },
      { id: 7, name: 'Wireless Mouse', price: 40.00, quantity: 1, imageUrl: newImageUrl, category: 'Accessories', imageUrl2: newImageUrl, oldPrice: null },
    ]
  },
  {
    id: 'MX88210',
    date: 'July 28, 2025',
    status: 'Shipped',
    total: 1200.00,
    items: [
      { id: 6, name: 'Ultra-thin Laptop 13"', price: 1200.00, quantity: 1, imageUrl: newImageUrl, category: 'Laptop', imageUrl2: newImageUrl, oldPrice: null },
    ]
  },
  {
    id: 'MX91542',
    date: 'July 29, 2025',
    status: 'Processing',
    total: 450.00,
    items: [
      { id: 4, name: 'X-Star Premium Drone with 4K', price: 450.00, quantity: 1, imageUrl: newImageUrl, category: 'Digital', imageUrl2: newImageUrl, oldPrice: null },
    ]
  },
  {
    id: 'MX65239',
    date: 'June 05, 2025',
    status: 'Cancelled',
    total: 180.00,
    items: [
      { id: 2, name: 'Noise-Cancelling Headphones', price: 180.00, quantity: 1, imageUrl: newImageUrl, category: 'Headphones', imageUrl2: newImageUrl, oldPrice: null },
    ]
  }
];
