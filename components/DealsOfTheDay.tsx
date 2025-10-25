import React, { useState, useEffect } from 'react';
import { CartIcon, StarIcon } from './icons';

const dealsData = [
    {
        id: 1,
        name: '4K Action Camera',
        description: 'Capture your adventures in stunning 4K. Waterproof, durable, and ready for anything.',
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761408097/deal1_x6z8gq.jpg',
        price: 350.00,
        oldPrice: 450.00,
        dealEndDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
        rating: 5,
    },
    {
        id: 2,
        name: 'Smart Home Hub',
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761408098/deal2_d5b9kc.jpg',
        price: 120.00,
        oldPrice: 150.00,
    },
    {
        id: 3,
        name: 'Fitness Tracker Band',
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761408098/deal3_d9h5qr.jpg',
        price: 60.00,
        oldPrice: 80.00,
    },
    {
        id: 4,
        name: 'VR Headset',
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761408099/deal4_f8jb1a.jpg',
        price: 299.00,
        oldPrice: 350.00,
    },
    {
        id: 5,
        name: 'Portable Power Bank',
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761408099/deal5_z3gtnu.jpg',
        price: 45.00,
        oldPrice: 60.00,
    },
];

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


const SmallProductCard: React.FC<Omit<typeof dealsData[0], 'description' | 'dealEndDate' | 'rating'>> = ({ name, imageUrl, price, oldPrice }) => (
    <div className="group relative flex items-center space-x-4 bg-gray-50 p-4 rounded-lg overflow-hidden">
        <div className="w-1/3">
            <img src={imageUrl} alt={name} className="w-full h-auto object-cover rounded transition-transform duration-300 group-hover:scale-110" />
        </div>
        <div className="w-2/3">
            <h4 className="text-sm font-semibold text-gray-800 mb-1">
                <a href="#" className="hover:text-black">{name}</a>
            </h4>
            <div className="flex items-baseline space-x-2">
                <span className="text-base font-bold text-black">${price.toFixed(2)}</span>
                {oldPrice && <span className="text-xs text-gray-400 line-through">${oldPrice.toFixed(2)}</span>}
            </div>
        </div>
    </div>
);


const DealsOfTheDay: React.FC = () => {
    const mainDeal = dealsData[0];
    const otherDeals = dealsData.slice(1);

    return (
        <section className="py-16 sm:py-24 bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Deals Of The Day</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    {/* Main Deal Card */}
                    <div className="group relative bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-6">
                        <div className="md:w-1/2 w-full">
                            <img src={mainDeal.imageUrl} alt={mainDeal.name} className="w-full h-auto object-cover rounded-md transition-transform duration-300 group-hover:scale-105" />
                        </div>
                        <div className="md:w-1/2 w-full text-center md:text-left">
                            <div className="flex justify-center md:justify-start mb-2">
                                {[...Array(mainDeal.rating)].map((_, i) => (
                                    <StarIcon key={i} filled className="w-5 h-5 text-yellow-400" />
                                ))}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                <a href="#" className="hover:text-blue-600">{mainDeal.name}</a>
                            </h3>
                            <p className="text-gray-600 mb-4 text-sm">{mainDeal.description}</p>
                            <div className="flex justify-center md:justify-start items-baseline space-x-2 mb-4">
                                <span className="text-3xl font-bold text-blue-600">${mainDeal.price.toFixed(2)}</span>
                                <span className="text-lg text-gray-400 line-through">${mainDeal.oldPrice.toFixed(2)}</span>
                            </div>
                            <div className="mb-6 flex justify-center md:justify-start">
                                <CountdownTimer endDate={mainDeal.dealEndDate} />
                            </div>
                            <a href="#" className="inline-flex items-center justify-center bg-black text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition-colors duration-300">
                                <CartIcon className="w-5 h-5 mr-2" />
                                Add to Cart
                            </a>
                        </div>
                    </div>

                    {/* Other Deals Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {otherDeals.map(deal => (
                            <SmallProductCard key={deal.id} {...deal} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DealsOfTheDay;