import React, { useState, useEffect } from 'react';
import { CartIcon, StarIcon } from './icons';
import { useCurrency } from '../contexts/CurrencyContext';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types';
import { products } from '../data/products';


const localDealsData = [
    {
        id: 8,
        description: 'Capture your adventures in stunning 4K. Waterproof, durable, and ready for anything.',
        dealEndDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    },
    { id: 5 },
    { id: 2 },
    { id: 3 },
    { id: 7 },
];

const dealsData = localDealsData.map(dealInfo => {
    const productInfo = products.find(p => p.id === dealInfo.id);
    if (!productInfo) return null;
    return {
        ...productInfo,
        ...dealInfo,
    };
}).filter((p): p is Product & typeof localDealsData[0] => p !== null);


const CountdownTimer: React.FC<{ endDate: string }> = ({ endDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(endDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents = Object.entries(timeLeft).map(([interval, value]) => (
        <div key={interval} className="text-center">
            <span className="text-2xl font-bold">{String(value as number).padStart(2, '0')}</span>
            <span className="text-xs uppercase text-gray-500 block">{interval}</span>
        </div>
    ));

    return (
        <div className="flex space-x-4">
            {timerComponents.length ? timerComponents : <span>Deal has ended!</span>}
        </div>
    );
};

const SmallProductCard: React.FC<Omit<typeof dealsData[0], 'description' | 'dealEndDate' | 'rating'> & { onProductClick: (id: number) => void }> = ({ id, name, imageUrl, price, oldPrice, onProductClick }) => {
    const { formatPrice } = useCurrency();
    return (
        <div onClick={() => onProductClick(id)} className="group relative flex items-center space-x-4 bg-gray-50 p-4 rounded-lg overflow-hidden cursor-pointer">
            <div className="w-1/3">
                <img src={imageUrl} alt={name} className="w-full h-auto object-cover rounded transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="w-2/3">
                <h4 className="text-sm font-semibold text-gray-800 mb-1">
                    <span className="group-hover:text-black transition-colors">{name}</span>
                </h4>
                <div className="flex items-baseline space-x-2">
                    <span className="text-base font-bold text-black">{formatPrice(price)}</span>
                    {oldPrice && <span className="text-xs text-gray-400 line-through">{formatPrice(oldPrice)}</span>}
                </div>
            </div>
        </div>
    );
};


const DealsOfTheDay: React.FC<{ onProductClick: (id: number) => void }> = ({ onProductClick }) => {
    const mainDeal = dealsData[0];
    const otherDeals = dealsData.slice(1);
    const { formatPrice } = useCurrency();
    const { addToCart, openCart } = useCart();
    const [isLoaded, setIsLoaded] = useState(false);

    const isOutOfStock = mainDeal.availability === 'Out of Stock';

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart(mainDeal, 1);
        openCart();
    };

    return (
        <section className={`py-16 sm:py-24 bg-gray-100 transition-opacity duration-1000 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Deals Of The Day</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    {/* Main Deal Card */}
                    <div className="group relative bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-6">
                        <div className="md:w-1/2 w-full cursor-pointer" onClick={() => onProductClick(mainDeal.id)}>
                            <img src={mainDeal.imageUrl} alt={mainDeal.name} className="w-full h-auto object-cover rounded-md transition-transform duration-300 group-hover:scale-105" />
                        </div>
                        <div className="md:w-1/2 w-full text-center md:text-left">
                            <div className="flex justify-center md:justify-start mb-2">
                                {[...Array(mainDeal.rating)].map((_, i) => (
                                    <StarIcon key={i} filled className="w-5 h-5 text-yellow-400" />
                                ))}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                <span onClick={() => onProductClick(mainDeal.id)} className="hover:text-blue-600 cursor-pointer">{mainDeal.name}</span>
                            </h3>
                            <p className="text-gray-600 mb-4 text-sm">{mainDeal.description}</p>
                            <div className="flex justify-center md:justify-start items-baseline space-x-2 mb-4">
                                <span className="text-3xl font-bold text-blue-600">{formatPrice(mainDeal.price)}</span>
                                {mainDeal.oldPrice && <span className="text-lg text-gray-400 line-through">{formatPrice(mainDeal.oldPrice)}</span>}
                            </div>
                            <div className="mb-6 flex justify-center md:justify-start">
                                {mainDeal.dealEndDate && <CountdownTimer endDate={mainDeal.dealEndDate} />}
                            </div>
                             <button 
                                onClick={handleAddToCart} 
                                disabled={isOutOfStock}
                                className="inline-flex items-center justify-center bg-black text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {isOutOfStock ? 'Out of Stock' : (
                                    <>
                                        <CartIcon className="w-5 h-5 mr-2" />
                                        Add to Cart
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Other Deals Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {otherDeals.map(deal => (
                            <SmallProductCard key={deal.id} {...deal} onProductClick={onProductClick} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DealsOfTheDay;