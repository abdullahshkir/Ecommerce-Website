import React, { useState } from 'react';
import { HeartIcon, EyeIcon, CartIcon, StarIcon } from './icons';
import { useCurrency } from '../contexts/CurrencyContext';
import { Product } from '../types';
import { useWishlist } from '../contexts/WishlistContext';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';

const ProductCard: React.FC<{ product: Product, onQuickView: (product: Product) => void, onProductClick: (id: number) => void }> = ({ product, onQuickView, onProductClick }) => {
    const { imageUrl, imageUrl2, category, name, price, oldPrice, isSale, isNew, rating = 0 } = product;
    const { formatPrice } = useCurrency();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const { addToCart, openCart } = useCart();
    const isWishlisted = isInWishlist(product.id);

    const handleWishlistClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isWishlisted) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };
    
    const handleCardClick = () => {
        onProductClick(product.id);
    };

    const handleAddToCartClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart(product, 1);
        openCart();
    };

    return (
        <div className="group relative text-center cursor-pointer" onClick={handleCardClick}>
            <div className="relative overflow-hidden">
                {/* Image Container */}
                <div className="relative h-[220px] sm:h-[350px]">
                    <img src={imageUrl} alt={name} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0" />
                    <img src={imageUrl2} alt={`${name} hover`} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100" />
                </div>

                {/* Action Buttons */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center items-center space-x-2 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={handleWishlistClick} className={`p-2.5 rounded-full shadow-md transition-colors ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white hover:bg-black hover:text-white'}`}>
                        <HeartIcon filled={isWishlisted} className="w-5 h-5" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); onQuickView(product); }} className="bg-white p-2.5 rounded-full shadow-md hover:bg-black hover:text-white transition-colors"><EyeIcon className="w-5 h-5" /></button>
                    <button onClick={handleAddToCartClick} className="bg-white p-2.5 rounded-full shadow-md hover:bg-black hover:text-white transition-colors"><CartIcon className="w-5 h-5" /></button>
                </div>

                {/* Labels */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {isSale && <span className="bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">SALE</span>}
                    {isNew && <span className="bg-cyan-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">NEW</span>}
                </div>
            </div>

            {/* Product Info */}
            <div className="pt-4">
                <span className="text-xs text-gray-500 uppercase tracking-wider hover:text-black">{category}</span>
                <h3 className="text-base font-semibold text-gray-800 mt-1 mb-2">
                    <span className="hover:text-black">{name}</span>
                </h3>
                <div className="flex justify-center items-center space-x-2">
                    <span className="text-lg font-bold text-black">{formatPrice(price)}</span>
                    {oldPrice && <span className="text-sm text-gray-400 line-through">{formatPrice(oldPrice)}</span>}
                </div>
                <div className="flex justify-center mt-2">
                    {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} filled={i < rating} className="w-4 h-4 text-yellow-400" />
                    ))}
                </div>
            </div>
        </div>
    );
};


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