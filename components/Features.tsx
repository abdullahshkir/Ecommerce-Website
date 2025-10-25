
import React from 'react';
import { TruckIcon, SupportIcon, ReturnIcon } from './icons';

const featuresData = [
    {
        icon: <TruckIcon className="h-9 w-9 text-gray-800 transition-colors duration-300 ease-in-out group-hover:text-blue-600" />,
        title: 'FREE SHIPPING',
        description: 'Free shipping on all US order or order above $100'
    },
    {
        icon: <SupportIcon className="h-9 w-9 text-gray-800 transition-colors duration-300 ease-in-out group-hover:text-blue-600" />,
        title: 'SUPPORT 24/7',
        description: 'Contact us 24 hours a day, 7 days a week'
    },
    {
        icon: <ReturnIcon className="h-9 w-9 text-gray-800 transition-colors duration-300 ease-in-out group-hover:text-blue-600" />,
        title: '30 DAYS RETURN',
        description: 'Simply return it within 30 days for an exchange.'
    }
];

const FeatureItem: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
    <div className="group flex flex-col items-center text-center p-4 cursor-pointer" role="button" tabIndex={0} aria-label={`${title}: ${description}`}>
        <div className="mb-4 transition-transform duration-300 ease-in-out group-hover:-translate-y-2">
            {icon}
        </div>
        <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase mb-2 transition-colors duration-300 ease-in-out group-hover:text-blue-600">{title}</h3>
        <p className="text-sm text-gray-500 max-w-[220px]">{description}</p>
    </div>
);

const Features: React.FC = () => {
    return (
        <section className="bg-white py-16 sm:py-20 border-t border-gray-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-x-8">
                    {featuresData.map((feature, index) => (
                        <FeatureItem key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
