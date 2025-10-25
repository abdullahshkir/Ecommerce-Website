import React, { useState } from 'react';
import { Product } from '../types';
import { products } from '../data/products';
import ProductCard from './ProductCard';

const FeaturedCollection: React.FC<{ onProductQuickView: (product: Product) => void, onProductClick: (id: number) => void }> = ({ onProductQuickView, onProductClick }) => {
    const categories = ['Accesories', 'Smart TV', 'Camera', 'Digital'];
    const [activeCategory, setActiveCategory] = useState('Accesories');

    const filteredProducts = products.filter(p => p.collection === activeCategory).slice(0, 4);

    return (
        <section className="py-16 sm:py-24 bg-white">
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