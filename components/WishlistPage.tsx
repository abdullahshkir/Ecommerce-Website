import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrashIcon, GridListIcon, Grid2Icon, Grid3Icon, Grid4Icon, ChevronUpIcon, HeartIcon } from './icons';
import { useCurrency } from '../contexts/CurrencyContext';
import { useWishlist } from '../contexts/WishlistContext';
import { Product } from '../types';

const WishlistProductCard: React.FC<{ product: Product; onRemove: (id: number) => void; onProductClick: (id: number) => void; }> = ({ product, onRemove, onProductClick }) => {
    const salePercentage = product.oldPrice && product.price < product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
    const { formatPrice } = useCurrency();

    const handleRemoveClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onRemove(product.id);
    };

    return (
        <div 
            className="group relative border border-gray-200 rounded-md overflow-hidden transition-shadow hover:shadow-xl cursor-pointer"
            onClick={() => onProductClick(product.id)}
        >
            <div className="relative">
                <img src={product.imageUrl} alt={product.name} className="w-full h-auto aspect-square object-cover" />
                <button
                    onClick={handleRemoveClick}
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
                    <span className="hover:text-black">{product.name}</span>
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
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const [gridCols, setGridCols] = useState(4);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleRemoveItem = (id: number) => {
        removeFromWishlist(id);
    };

    const handleProductClick = (id: number) => {
        navigate(`/product/${id}`);
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

            <div className={`container mx-auto px-4 py-8 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
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
                            <WishlistProductCard key={product.id} product={product} onRemove={handleRemoveItem} onProductClick={handleProductClick} />
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