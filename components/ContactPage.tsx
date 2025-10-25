import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import { PhoneIcon, MailIcon, FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon } from './icons';

// A simple location icon for this component
const LocationIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
);

const ContactInfoItem: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; }> = ({ icon, title, children }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 bg-gray-100 rounded-full p-3 text-gray-700">
            {icon}
        </div>
        <div>
            <h4 className="font-semibold text-lg text-gray-800">{title}</h4>
            <div className="text-gray-600">{children}</div>
        </div>
    </div>
);

const ContactPage: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const socialLinks = [
        { href: '#', icon: <FacebookIcon className="w-5 h-5" /> },
        { href: '#', icon: <TwitterIcon className="w-5 h-5" /> },
        { href: '#', icon: <InstagramIcon className="w-5 h-5" /> },
        { href: '#', icon: <YoutubeIcon className="w-5 h-5" /> },
    ];

    return (
        <>
            <SEO
                title="Contact Us | Mobixo"
                description="Get in touch with Mobixo. We are here to help you with any questions or concerns. Reach out via phone, email, or our contact form."
            />
            <div className="bg-white">
                <div className="bg-gray-100 py-8" style={{backgroundImage: 'url(https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761502936/breadcrumb_bg_xwnbkv.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
                        <div className="text-sm text-gray-600 mt-2">
                            <Link to="/" className="hover:text-black">Home</Link>
                            <span className="mx-2">/</span>
                            <span>Contact Us</span>
                        </div>
                    </div>
                </div>

                <div className={`container mx-auto px-4 py-16 md:py-24 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Left Side: Contact Info */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Have a question or a comment? Use the form to send us a message or contact us by mail, phone, or email.
                                </p>
                            </div>
                            <div className="space-y-6">
                                <ContactInfoItem icon={<LocationIcon className="w-6 h-6"/>} title="Our Location">
                                    <p>123 Street, New York, USA</p>
                                </ContactInfoItem>
                                <ContactInfoItem icon={<PhoneIcon className="w-6 h-6"/>} title="Phone Number">
                                    <p>+01 234 567 89</p>
                                </ContactInfoItem>
                                <ContactInfoItem icon={<MailIcon className="w-6 h-6"/>} title="Email Address">
                                    <p>Mobixo@domain.com</p>
                                </ContactInfoItem>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Follow Us</h3>
                                <div className="flex space-x-4">
                                    {socialLinks.map((link, index) => (
                                        <a key={index} href={link.href} className="text-gray-500 hover:text-black transition-colors bg-gray-100 p-3 rounded-full">
                                            {link.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Contact Form */}
                        <div>
                             <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us A Message</h2>
                                <form className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                                        <input type="text" id="name" name="name" required className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"/>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email *</label>
                                            <input type="email" id="email" name="email" required className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"/>
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                            <input type="tel" id="phone" name="phone" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"/>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message *</label>
                                        <textarea id="message" name="message" rows={5} required className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition"></textarea>
                                    </div>
                                    <div>
                                        <button type="submit" className="w-full bg-black text-white py-3.5 rounded-full font-bold text-sm hover:bg-gray-800 transition-colors">
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="h-96 bg-gray-300">
                    <img src="https://res.cloudinary.com/dzx5zkl7v/image/upload/v1761569940/map-placeholder_wzdxuj.jpg" alt="Map of our location" className="w-full h-full object-cover" />
                </div>
            </div>
        </>
    );
};

export default ContactPage;
