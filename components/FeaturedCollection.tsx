import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { useProducts } from '../contexts/ProductContext';

const FeaturedCollection: React.FC<{ onProductQuickView: (product: Product) => void, onProductClick: (id: string) => void }> = ({ onProductQuickView, onProductClick }) => {
    const { products, isLoading, error } = useProducts();
    const categories = [...new Set(products.map(p => p.collection).filter(Boolean))] as string[];
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Set the first available category as active on initial load
        if (categories.length > 0 && activeCategory === null) {
            setActiveCategory(categories[0]);
        }
    }, [categories, activeCategory]);

    const filteredProducts = activeCategory 
        ? products.filter(p => p.collection === activeCategory).slice(0, 4)
        : products.slice(0, 4);

    if (isLoading) {
        return <section className="py-16 sm:py-24 bg-white"><div className="container mx-auto px-4 text-center">Loading featured collection...</div></section>;
    }
    
    if (error) {
        return <section className="py-16 sm:py-24 bg-white"><div className="container mx-auto px-4 text-center text-red-600">{error}</div></section>;
    }
    
    if (products.length === 0) {
        return <section className="py-16 sm:py-24 bg-white"><div className="container mx-auto px-4 text-center text-gray-600">No products available to feature.</div></section>;
    }

    return (
        <section className={`py-16 sm:py-24 bg-white transition-opacity duration-1000 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Featured Collection</h2>
                </div>

                <div className="flex items-center space-x-4 sm:space-x-8 mb-12 overflow-x-auto sm:overflow-visible pb-4 pt-2 sm:pb-0 justify-start sm:justify-center flex-nowrap no-scrollbar">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`text-base font-medium transition-all duration-300 flex-shrink-0 ${activeCategory === category ? 'text-black' : 'text-gray-500 hover:text-black'}`}
                        >
                            <span className={`px-5 py-2 rounded-full ${activeCategory === category ? 'border-2 border-dotted border-gray-800' : 'border-2 border-transparent'}`}>
                                {category}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                     {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} onQuickView={onProductQuickView} onProductClick={onProductClick} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollection;