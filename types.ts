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
}

export type CartItem = Product & { quantity: number; };