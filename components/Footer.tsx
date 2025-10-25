import React from 'react';
import {
    FacebookIcon,
    TwitterIcon,
    InstagramIcon,
    YoutubeIcon,
    VisaIcon,
    MastercardIcon,
    PaypalIcon,
    AmexIcon
} from './icons';

const Footer: React.FC = () => {
    const socialLinks = [
        { href: '#', icon: <FacebookIcon className="w-5 h-5" /> },
        { href: '#', icon: <TwitterIcon className="w-5 h-5" /> },
        { href: '#', icon: <InstagramIcon className="w-5 h-5" /> },
        { href: '#', icon: <YoutubeIcon className="w-5 h-5" /> },
    ];

    const footerLinks = {
        'Information': [
            { href: '#', text: 'About Us' },
            { href: '#', text: 'Contact Us' },
            { href: '#', text: 'Terms & Conditions' },
            { href: '#', text: 'Returns & Exchanges' },
            { href: '#', text: 'Shipping & Delivery' },
        ],
        'Account': [
            { href: '#', text: 'My Account' },
            { href: '#', text: 'Track your Order' },
            { href: '#', text: 'Wishlist' },
            { href: '#', text: 'Payment Methods' },
        ],
        'Useful Links': [
            { href: '#', text: 'New Products' },
            { href: '#', text: 'Best Sales' },
            { href: '#', text: 'Login' },
            { href: '#', text: 'Register' },
        ],
    };

    return (
        <footer className="bg-[#111111] text-gray-400">
            {/* Top Section: Newsletter */}
            <div className="border-b border-gray-800">
                 <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <h2 className="text-2xl font-bold text-white mb-1">Get In Touch</h2>
                        <p className="text-sm">Subscribe for latest stories and promotions</p>
                    </div>
                    <form className="w-full max-w-md">
                        <div className="flex items-center border-b border-gray-600">
                            <input
                                className="appearance-none bg-transparent border-none w-full text-white mr-3 py-2 px-2 leading-tight focus:outline-none"
                                type="email"
                                placeholder="Your email address"
                                aria-label="Email address"
                            />
                            <button
                                className="flex-shrink-0 bg-white text-black text-sm font-bold py-2.5 px-6 rounded-full hover:bg-gray-200 transition-colors"
                                type="button"
                            >
                                Subscribe
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Middle Section: Links */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Us Column */}
                    <div className="mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold text-white mb-4">About Us</h3>
                        <p className="text-sm leading-relaxed mb-4">
                            123 Street, New York, USA<br />
                            +01 234 567 89<br />
                            Mobixo@domain.com
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((link, index) => (
                                <a key={index} href={link.href} className="text-gray-400 hover:text-white transition-colors">
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
                            <ul className="space-y-2">
                                {links.map((link, index) => (
                                    <li key={index}>
                                        <a href={link.href} className="text-sm hover:text-white transition-colors">{link.text}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Section: Copyright & Developer Credit */}
            <div className="bg-[#1a1a1a]">
                <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-xs">
                    <p className="mb-4 md:mb-0">&copy; 2025 Mobixo. All Rights Reserved.</p>
                    <p>
                        Developed by{' '}
                        <a 
                            href="https://abdullahshakir.vercel.app/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-semibold text-white hover:underline"
                        >
                            Abdullah Shakir
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;