import React, { useState } from 'react';
import { HeartIcon, EyeIcon, CartIcon, StarIcon } from './icons';

const collectionProducts = [
    {
        id: 1,
        collection: 'Accesories',
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
        collection: 'Accesories',
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405073/p2_y4qcca.jpg',
        imageUrl2: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405073/p2-2_y2fgrc.jpg',
        category: 'Headphones',
        name: 'Noise-Cancelling Headphones',
        price: 180.00,
        oldPrice: null,
    },
    {
        id: 3,
        collection: 'Camera',
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405073/p3_chb27s.jpg',
        imageUrl2: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405074/p3-2_oeb94j.jpg',
        category: 'Camera',
        name: 'Compact Digital Camera',
        price: 450.00,
        oldPrice: 500.00,
        isSale: true,
    },
    {
        id: 4,
        collection: 'Digital',
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
        collection: 'Smart TV',
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405076/p5_rbfncl.jpg',
        imageUrl2: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405077/p5-2_fr4vbl.jpg',
        category: 'Speaker',
        name: 'Smart TV Soundbar',
        price: 285.00,
        oldPrice: 350.00,
        isSale: true,
    },
    {
        id: 6,
        collection: 'Digital',
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405077/p6_q8m3go.jpg',
        imageUrl2: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405078/p6-2_y80q1u.jpg',
        category: 'Laptop',
        name: 'Ultra-thin Laptop 13"',
        price: 1200.00,
        oldPrice: null,
    },
    {
        id: 7,
        collection: 'Accesories',
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405079/p7_nd7kfh.jpg',
        imageUrl2: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405079/p7-2_u8f5g6.jpg',
        category: 'Accessories',
        name: 'Wireless Mouse',
        price: 40.00,
        oldPrice: null,
    },
    {
        id: 8,
        collection: 'Camera',
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761408097/deal1_x6z8gq.jpg',
        imageUrl2: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405073/p3_chb27s.jpg',
        category: 'Camera',
        name: '4K Action Camera',
        price: 350.00,
        oldPrice: 420.00,
        isSale: true,
        isNew: true,
    },
];


const ProductCard: React.FC<typeof collectionProducts[0]> = ({ imageUrl, imageUrl2, category, name, price, oldPrice, isSale, isNew }) => (
    <div className="group relative text-center">
        <div className="relative overflow-hidden">
            {/* Image Container */}
            <div className="relative h-[300px] sm:h-[350px]">
                <img src={imageUrl} alt={name} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0" />
                <img src={imageUrl2} alt={`${name} hover`} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100" />
            </div>

            {/* Action Buttons */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center items-center space-x-2 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a href="#" className="bg-white p-2.5 rounded-full shadow-md hover:bg-black hover:text-white transition-colors"><HeartIcon className="w-5 h-5" /></a>
                <a href="#" className="bg-white p-2.5 rounded-full shadow-md hover:bg-black hover:text-white transition-colors"><EyeIcon className="w-5 h-5" /></a>
                <a href="#" className="bg-white p-2.5 rounded-full shadow-md hover:bg-black hover:text-white transition-colors"><CartIcon className="w-5 h-5" /></a>
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
                <span className="text-lg font-bold text-black">${price.toFixed(2)}</span>
                {oldPrice && <span className="text-sm text-gray-400 line-through">${oldPrice.toFixed(2)}</span>}
            </div>
            <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} filled={i < 4} className="w-4 h-4 text-yellow-400" />
                ))}
            </div>
        </div>
    </div>
);


const FeaturedCollection: React.FC = () => {
    const categories = ['Accesories', 'Smart TV', 'Camera', 'Digital'];
    const [activeCategory, setActiveCategory] = useState('Accesories');

    const filteredProducts = collectionProducts.filter(p => p.collection === activeCategory).slice(0, 4);

    return (
        <section className="py-16 sm:py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Featured Collection</h2>
                </div>

                <div className="flex items-center space-x-4 sm:space-x-8 mb-12 overflow-x-auto pb-4 sm:pb-0 sm:justify-center flex-nowrap">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                     {filteredProducts.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollection;