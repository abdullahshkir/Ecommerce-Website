import React, { useState, useEffect } from 'react';
import { TrashIcon, GridListIcon, Grid2Icon, Grid3Icon, Grid4Icon, ChevronUpIcon, HeartIcon } from './icons';
import { useCurrency } from '../contexts/CurrencyContext';

type Product = {
    id: number;
    name: string;
    price: number;
    oldPrice: number | null;
    imageUrl: string;
};

const initialWishlistData: Product[] = [
    {
        id: 1,
        name: 'Digital 20.1 4K Video',
        price: 400.00,
        oldPrice: 440.00,
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761464405/s3_q9x9wl.jpg',
    },
    {
        id: 2,
        name: 'X-Star Premium Drone with 4K',
        price: 450.00,
        oldPrice: null,
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761464405/s2_zxf25n.jpg',
    },
    {
        id: 3,
        name: 'Video & Air Quality Monitor',
        price: 239.00,
        oldPrice: 312.00,
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761464405/s1_kvtkrx.jpg',
    },
    {
        id: 4,
        name: 'On-ear Wireless NXTG',
        price: 225.00,
        oldPrice: 312.00,
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761483864/p_5_b0exf3.jpg',
    },
     {
        id: 5,
        name: 'Classic Leather Watch',
        price: 250.00,
        oldPrice: 300.00,
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405072/p1_oklq8n.jpg',
    },
    {
        id: 6,
        name: 'Noise-Cancelling Headphones',
        price: 180.00,
        oldPrice: 200.00,
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761405073/p2_y4qcca.jpg',
    },
];

const WishlistProductCard: React.FC<{ product: Product; onRemove: (id: number) => void; }> = ({ product, onRemove }) => {
    const salePercentage = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
    const { formatPrice } = useCurrency();

    return (
        <div className="group relative border border-gray-200 rounded-md overflow-hidden transition-shadow hover:shadow-xl">
            <div className="relative">
                <img src={product.imageUrl} alt={product.name} className="w-full h-auto aspect-square object-cover" />
                <button
                    onClick={() => onRemove(product.id)}
                    className="absolute top-3 left-3 bg-gray-800 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
                    aria-label={`Remove ${product.name} from wishlist`}
                >
                    <TrashIcon className="w-4 h-4" />
                </button>
                {salePercentage > 0 && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold w-10 h-10 rounded-full flex items-center justify-center">
                        -{salePercentage}%
                    </div>
                )}
            </div>
            <div className="p-4 text-center">
                <h3 className="text-base font-medium text-gray-800 mb-1">
                    <a href="#" className="hover:text-black">{product.name}</a>
                </h3>
                <div className="flex justify-center items-baseline space-x-2">
                     <span className={`text-lg font-bold ${product.oldPrice ? 'text-red-600' : 'text-black'}`}>
                        {formatPrice(product.price)}
                    </span>
                    {product.oldPrice && (
                        <span className="text-sm text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

const WishlistPage: React.FC = () => {
    const [wishlistItems, setWishlistItems] = useState(initialWishlistData);
    const [gridCols, setGridCols] = useState(4);
    const [showScrollTop, setShowScrollTop] = useState(false);

    const handleRemoveItem = (id: number) => {
        setWishlistItems(currentItems => currentItems.filter(item => item.id !== id));
    };
    
    useEffect(() => {
        const checkScrollTop = () => {
            if (!showScrollTop && window.pageYOffset > 400) {
                setShowScrollTop(true);
            } else if (showScrollTop && window.pageYOffset <= 400) {
                setShowScrollTop(false);
            }
        };
        window.addEventListener('scroll', checkScrollTop);
        return () => window.removeEventListener('scroll', checkScrollTop);
    }, [showScrollTop]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const gridOptions = [
        { cols: 1, icon: <GridListIcon className="w-5 h-5" /> },
        { cols: 2, icon: <Grid2Icon className="w-5 h-5" /> },
        { cols: 3, icon: <Grid3Icon className="w-5 h-5" /> },
        { cols: 4, icon: <Grid4Icon className="w-5 h-5" /> },
    ];
    
    const gridClasses: { [key: number]: string } = {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-3',
        4: 'grid-cols-2 md:grid-cols-4',
    };

    return (
        <div className="bg-white">
            <div className="bg-gray-700 text-white py-4">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-semibold text-center">Wishlist</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-end items-center mb-6 border-b pb-4">
                    <div className="flex items-center space-x-2">
                        {gridOptions.map(option => (
                             <button
                                key={option.cols}
                                onClick={() => setGridCols(option.cols)}
                                className={`p-2 rounded-md transition-colors ${gridCols === option.cols ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                aria-label={`Set grid to ${option.cols} columns`}
                            >
                                {option.icon}
                            </button>
                        ))}
                    </div>
                </div>

                {wishlistItems.length > 0 ? (
                    <div className={`grid ${gridClasses[gridCols]} gap-6`}>
                        {wishlistItems.map(product => (
                            <WishlistProductCard key={product.id} product={product} onRemove={handleRemoveItem} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <HeartIcon className="mx-auto w-16 h-16 text-gray-300" />
                        <h2 className="mt-4 text-2xl font-semibold text-gray-800">Your wishlist is empty</h2>
                        <p className="mt-2 text-gray-500">Looks like you haven’t added anything to your wishlist yet.</p>
                        <a href="/" className="mt-6 inline-block bg-black text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition-colors">
                            Continue Shopping
                        </a>
                    </div>
                )}
            </div>
            
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 bg-black text-white w-12 h-12 rounded-md flex items-center justify-center shadow-lg hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1"
                    aria-label="Scroll to top"
                >
                    <ChevronUpIcon className="w-6 h-6" />
                </button>
            )}
        </div>
    );
};

export default WishlistPage;