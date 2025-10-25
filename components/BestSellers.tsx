import React from 'react';
import { HeartIcon, EyeIcon, CartIcon, StarIcon } from './icons';
import { useCurrency } from '../contexts/CurrencyContext';
import { Product } from '../types';
import { useWishlist } from '../contexts/WishlistContext';

const productData: Product[] = [
    {
        id: 1,
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405072/p1_oklq8n.jpg',
        imageUrl2: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405072/p1-2_xfl63h.jpg',
        category: 'Watch',
        name: 'Classic Leather Watch',
        price: 250.00,
        oldPrice: 300.00,
        isSale: true,
    },
    {
        id: 2,
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405073/p2_y4qcca.jpg',
        imageUrl2: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405073/p2-2_y2fgrc.jpg',
        category: 'Headphones',
        name: 'Noise-Cancelling Headphones',
        price: 180.00,
        oldPrice: null,
    },
    {
        id: 3,
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761464405/s2_zxf25n.jpg',
        imageUrl2: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405074/p3-2_oeb94j.jpg',
        category: 'Digital',
        name: 'X-Star Premium Drone with 4K',
        price: 450.00,
        oldPrice: null,
        isSale: false,
        rating: 5,
        reviewCount: 1,
        description: 'Go kalles this summer with this vintage navy and white striped v-neck t-shirt from the Nike. Perfect for pairing with denim and white kicks for a stylish kalles vibe.',
        availability: 'In Stock',
        categories: ['Digital'],
        tags: ['digital'],
        images: [
            'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761464405/s2_zxf25n.jpg',
            'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405073/p3_chb27s.jpg',
        ],
    },
    {
        id: 4,
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405075/p4_iz2fxi.jpg',
        imageUrl2: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405075/p4-2_p7xbnq.jpg',
        category: 'Smartphone',
        name: 'Latest Model Smartphone',
        price: 999.00,
        oldPrice: null,
        isNew: true,
    },
    {
        id: 5,
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405076/p5_rbfncl.jpg',
        imageUrl2: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405077/p5-2_fr4vbl.jpg',
        category: 'Speaker',
        name: 'Bluetooth Portable Speaker',
        price: 85.00,
        oldPrice: 100.00,
        isSale: true,
    },
    {
        id: 6,
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405077/p6_q8m3go.jpg',
        imageUrl2: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405078/p6-2_y80q1u.jpg',
        category: 'Laptop',
        name: 'Ultra-thin Laptop 13"',
        price: 1200.00,
        oldPrice: null,
    },
    {
        id: 7,
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405079/p7_nd7kfh.jpg',
        imageUrl2: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405079/p7-2_u8f5g6.jpg',
        category: 'Accessories',
        name: 'Wireless Mouse',
        price: 40.00,
        oldPrice: null,
    },
    {
        id: 8,
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405080/p8_kcmw3s.jpg',
        imageUrl2: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405081/p8-2_kgy9af.jpg',
        category: 'Gaming',
        name: 'Ergonomic Gaming Chair',
        price: 350.00,
        oldPrice: 420.00,
        isSale: true,
        isNew: true,
    },
];

const ProductCard: React.FC<{ product: Product, onQuickView: (product: Product) => void }> = ({ product, onQuickView }) => {
    const { imageUrl, imageUrl2, category, name, price, oldPrice, isSale, isNew } = product;
    const { formatPrice } = useCurrency();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product.id);

    const handleWishlistClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isWishlisted) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };
    
    return (
        <div className="group relative text-center">
            <div className="relative overflow-hidden">
                {/* Image Container */}
                <div className="relative h-[300px] sm:h-[350px]">
                    <img src={imageUrl} alt={name} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0" />
                    <img src={imageUrl2} alt={`${name} hover`} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100" />
                </div>

                {/* Action Buttons */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center items-center space-x-2 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={handleWishlistClick} className={`p-2.5 rounded-full shadow-md transition-colors ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white hover:bg-black hover:text-white'}`}>
                        <HeartIcon filled={isWishlisted} className="w-5 h-5" />
                    </button>
                    <button onClick={() => onQuickView(product)} className="bg-white p-2.5 rounded-full shadow-md hover:bg-black hover:text-white transition-colors"><EyeIcon className="w-5 h-5" /></button>
                    <button className="bg-white p-2.5 rounded-full shadow-md hover:bg-black hover:text-white transition-colors"><CartIcon className="w-5 h-5" /></button>
                </div>

                {/* Labels */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {isSale && <span className="bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">SALE</span>}
                    {isNew && <span className="bg-cyan-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">NEW</span>}
                </div>
            </div>

            {/* Product Info */}
            <div className="pt-4">
                <a href="#" className="text-xs text-gray-500 uppercase tracking-wider hover:text-black">{category}</a>
                <h3 className="text-base font-semibold text-gray-800 mt-1 mb-2">
                    <a href="#" className="hover:text-black">{name}</a>
                </h3>
                <div className="flex justify-center items-center space-x-2">
                    <span className="text-lg font-bold text-black">{formatPrice(price)}</span>
                    {oldPrice && <span className="text-sm text-gray-400 line-through">{formatPrice(oldPrice)}</span>}
                </div>
                <div className="flex justify-center mt-2">
                    {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} filled={i < 4} className="w-4 h-4 text-yellow-400" />
                    ))}
                </div>
            </div>
        </div>
    );
}


const BestSellers: React.FC<{ onProductQuickView: (product: Product) => void }> = ({ onProductQuickView }) => {
    return (
        <section className="py-16 sm:py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Best Selling Products</h2>
                    <p className="mt-4 text-lg leading-8 text-gray-600">Discover our most popular products</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                    {productData.map((product) => (
                        <ProductCard key={product.id} product={product} onQuickView={onProductQuickView} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BestSellers;