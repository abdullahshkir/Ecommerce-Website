import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import { GiftIcon, SupportIcon, TruckIcon } from './icons';

const AboutPage: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const teamMembers = [
        { name: 'John Doe', role: 'Founder & CEO', imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761566444/team1_bavpaf.jpg' },
        { name: 'Jane Smith', role: 'Chief Marketing Officer', imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761566445/team2_w00h3r.jpg' },
        { name: 'Peter Jones', role: 'Lead Developer', imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761566444/team3_ev7sji.jpg' },
        { name: 'Sarah Williams', role: 'Product Designer', imageUrl: 'https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761566444/team4_wz8w8z.jpg' },
    ];

    const stats = [
        { value: '10K+', label: 'Happy Customers' },
        { value: '5K+', label: 'Products In Store' },
        { value: '15+', label: 'Years of Experience' },
        { value: '99%', label: 'Client Satisfaction' },
    ];

    const values = [
      { icon: <GiftIcon className="h-9 w-9 text-blue-600"/>, title: 'Best Quality Products', description: 'We source only the highest quality products from trusted manufacturers.' },
      { icon: <TruckIcon className="h-9 w-9 text-blue-600"/>, title: 'Free & Fast Shipping', description: 'Enjoy free and fast shipping on all orders over a certain amount.' },
      { icon: <SupportIcon className="h-9 w-9 text-blue-600"/>, title: '24/7 Customer Support', description: 'Our dedicated support team is here to help you around the clock.' },
    ];

    return (
        <>
            <SEO
                title="About Us | Mobixo"
                description="Learn more about Mobixo, our mission, values, and the team dedicated to bringing you the best in modern electronics and gadgets."
            />
            <div className={`bg-white transition-all duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                {/* Breadcrumb Banner */}
                <div className="bg-gray-100 py-8" style={{backgroundImage: 'url(https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761502936/breadcrumb_bg_xwnbkv.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl font-bold text-gray-800">About Our Store</h1>
                        <div className="text-sm text-gray-600 mt-2">
                            <Link to="/" className="hover:text-black">Home</Link>
                            <span className="mx-2">/</span>
                            <span>About Us</span>
                        </div>
                    </div>
                </div>

                {/* Our Story Section */}
                <section className="container mx-auto px-4 py-16 md:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <span className="text-blue-600 font-semibold">WELCOME TO MOBIXO</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">The Future of Online Shopping.</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Mobixo was founded with a simple mission: to provide the latest and greatest in electronics and gadgets with an unparalleled shopping experience. We believe that technology should be accessible, enjoyable, and seamlessly integrated into your life.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                From state-of-the-art smart TVs to high-performance drones and crystal-clear audio equipment, we carefully curate our collection to ensure every product meets our high standards of quality, innovation, and value. Our team is passionate about technology and dedicated to helping you find the perfect products to match your lifestyle.
                            </p>
                            <Link to="/shop" className="inline-block bg-black text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition-colors">
                                Shop Now
                            </Link>
                        </div>
                        <div className="order-1 lg:order-2">
                            <img src="https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761565578/about-us_tjd6jw.jpg" alt="Our team working" className="rounded-lg shadow-lg w-full h-auto object-cover" />
                        </div>
                    </div>
                </section>
                
                {/* Values Section */}
                <section className="bg-gray-50 py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                             <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What We Provide?</h2>
                             <p className="mt-4 text-gray-600">We are committed to providing our customers with exceptional service and top-tier products.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {values.map((value, index) => (
                                <div key={index} className="text-center p-8 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                                    <div className="inline-block bg-blue-100 rounded-full p-4 mb-4">
                                       {value.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                                    <p className="text-gray-600">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="container mx-auto px-4 py-16 md:py-24">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Awesome Team</h2>
                        <p className="mt-4 text-gray-600">Meet the passionate individuals who make Mobixo a reality.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="group text-center">
                                <div className="relative overflow-hidden rounded-lg mb-4">
                                    <img src={member.imageUrl} alt={member.name} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <h4 className="font-bold text-lg text-gray-800">{member.name}</h4>
                                <p className="text-gray-500">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* Stats Section */}
                <section className="bg-blue-600 text-white">
                     <div className="container mx-auto px-4 py-16">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            {stats.map((stat, index) => (
                                <div key={index}>
                                    <span className="block text-4xl md:text-5xl font-bold">{stat.value}</span>
                                    <p className="mt-2 text-blue-200">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
};

export default AboutPage;
