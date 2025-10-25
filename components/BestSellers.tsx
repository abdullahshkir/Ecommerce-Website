import React from 'react';
import { Product } from '../types';
import { products } from '../data/products';
import ProductCard from './ProductCard';

const BestSellers: React.FC<{ onProductQuickView: (product: Product) => void, onProductClick: (id: number) => void }> = ({ onProductQuickView, onProductClick }) => {
    // Filter for products that are best sellers, or take a slice as an example
    const bestSellerProducts = products.slice(0, 8);

    return (
        <section className="py-16 sm:py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Best Selling Products</h2>
                    <p className="mt-4 text-lg leading-8 text-gray-600">Discover our most popular products</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                    {bestSellerProducts.map((product) => (
                        <ProductCard key={product.id} product={product} onQuickView={onProductQuickView} onProductClick={onProductClick} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BestSellers;