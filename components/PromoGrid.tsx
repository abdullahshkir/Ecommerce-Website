import React from 'react';

const promoData = [
    {
        title: 'Galaxy S10 Lite',
        subtitle: 'Save up to 25%',
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761380938/C1_tppwzs.jpg',
    },
    {
        title: 'New SmartWatch',
        subtitle: 'Save up to 35%',
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761380938/C2_sleraw.jpg',
    },
    {
        title: 'Dell XPS 2020',
        subtitle: 'Engineered to run on ultra-fast networks.',
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761380938/C3_wmmmcj.jpg',
    },
    {
        title: 'Save up to',
        subtitle: 'Plus earn 2% back in Kalles rewards.',
        imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761380937/C4_hjjnq3.jpg',
    }
];

const PromoCard: React.FC<{ title: string, subtitle: string, imageUrl: string }> = ({ title, subtitle, imageUrl }) => (
    <div className="group relative bg-[#f7f7f7] flex items-center justify-between p-6 sm:p-8 overflow-hidden h-64 sm:h-72 rounded-lg">
        <div className="w-5/12 z-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-black mb-1 sm:mb-2">{title}</h3>
            <p className="text-base text-gray-600 mb-4 sm:mb-6">{subtitle}</p>
            <a href="#" className="inline-block bg-transparent text-black text-base font-semibold py-2 px-6 border border-gray-400 rounded-full hover:bg-black hover:text-white hover:border-black transition-colors duration-300">
                Buy Now
            </a>
        </div>
        <div className="w-7/12 h-full flex justify-center items-center">
             <img src={imageUrl} alt={title} className="h-full w-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-105" />
        </div>
    </div>
);

const PromoGrid: React.FC = () => {
    return (
        <section className="py-12 sm:py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {promoData.map((promo, index) => (
                        <PromoCard key={index} {...promo} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PromoGrid;
