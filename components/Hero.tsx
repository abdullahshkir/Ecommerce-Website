import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
    const mobileImageUrl = 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761379165/Hero_Image_mbl_guepkf.jpg';
    const desktopImageUrl = 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761378383/Hero_image_tyy9x9.jpg';

    // The text content is now defined as React elements
    const TextContent = () => {
        const [isLoaded, setIsLoaded] = useState(false);

        useEffect(() => {
            const timer = setTimeout(() => setIsLoaded(true), 100);
            return () => clearTimeout(timer);
        }, []);

        return (
            <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-start md:justify-center items-center md:items-start text-center md:text-left">
                <div className={`pt-24 md:pt-0 md:w-1/2 lg:w-2/5 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <p className="text-sm font-semibold text-gray-600 tracking-wider uppercase mb-2 md:mb-4">SUMMER 2022</p>
                    <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-3 md:mb-4">
                        Meet Galaxy S20, S20+
                    </h1>
                    <p className="text-lg text-gray-800 mb-6 md:mb-8">
                        This is the phone that will change photography
                    </p>
                    <Link
                        to="/shop"
                        className="inline-block bg-black text-white text-sm font-bold py-4 px-10 rounded-full hover:bg-gray-800 transition-colors"
                        aria-label="Explore our shop"
                    >
                        Explore Now
                    </Link>
                </div>
            </div>
        );
    };

    return (
        <section 
            className="relative w-full h-[733px] md:h-[420px]"
            aria-label="Meet the new Galaxy S20 and S20+"
        >
            {/* Mobile background image */}
            <div
                className="block md:hidden absolute inset-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${mobileImageUrl})` }}
                role="img"
                aria-hidden="true"
            />
            
            {/* Desktop background image */}
            <div
                className="hidden md:block absolute inset-0 bg-cover bg-center w-full h-full"
                style={{ backgroundImage: `url(${desktopImageUrl})` }}
                role="img"
                aria-hidden="true"
            />

            {/* Overlayed Text Content */}
            <TextContent />
        </section>
    );
};

export default Hero;