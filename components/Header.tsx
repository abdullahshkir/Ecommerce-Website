import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PhoneIcon, MailIcon, SearchIcon, UserIcon, HeartIcon, CartIcon, ChevronDownIcon, ArrowRightIcon, CloseIcon, MenuIcon } from './icons';
import SearchOverlay from './SearchOverlay';
import LoginModal from './LoginModal';
import { useCurrency } from '../contexts/CurrencyContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import MobileMenu from './MobileMenu';

const NavItem: React.FC<{ href: string; children: React.ReactNode; new?: boolean; sale?: boolean }> = ({ href, children, new: isNew, sale: isSale }) => (
    <a href={href} className="text-gray-700 hover:text-black transition-colors relative group py-2">
        <span>{children}</span>
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
        {isNew && <span className="absolute -top-2 -right-3 bg-cyan-400 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">New</span>}
        {isSale && <span className="absolute -top-2 -right-3 bg-orange-400 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">Sale</span>}
    </a>
);

interface HeaderProps {
    onSearchClick: () => void;
    onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchClick, onLoginClick }) => {
    const [isTopBarVisible, setTopBarVisible] = useState(true);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { currency, setCurrency } = useCurrency();
    const [isCurrencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
    const { wishlistItems } = useWishlist();
    const { openCart, cartCount } = useCart();

    const navLinks: { name: string; href: string; new?: boolean; sale?: boolean }[] = [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '#', new: true, sale: true },
        { name: 'About', href: '#' },
        { name: 'Contact', href: '#' },
    ];
    
    const handleMobileMenuClose = () => setMobileMenuOpen(false);

    return (
        <>
            {/* Top Announcement Bar (Not sticky) */}
            {isTopBarVisible && (
                <div className="bg-blue-600 text-white text-sm font-medium">
                    <div className="container mx-auto px-4 py-2 flex justify-center items-center relative">
                        <p>
                            Today deal sale off <span className="font-bold">70%</span>. End in. Hurry Up
                            <a href="#" className="inline-flex items-center ml-2 underline">
                                <ArrowRightIcon className="w-4 h-4" />
                            </a>
                        </p>
                        <button onClick={() => setTopBarVisible(false)} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full">
                           <CloseIcon className="w-4 h-4"/>
                        </button>
                    </div>
                </div>
            )}

            {/* Secondary Header (Not sticky) */}
            <div className="hidden md:block border-b border-gray-200 text-xs text-gray-500">
                <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <a href="tel:+0123456789" className="flex items-center hover:text-black">
                            <PhoneIcon className="mr-1.5" />
                            +01 23456789
                        </a>
                        <a href="mailto:Mobixo@domain.com" className="flex items-center hover:text-black">
                            <MailIcon className="mr-1.5" />
                            Mobixo@domain.com
                        </a>
                    </div>
                    <div>
                        <p>Summer sale discount off <span className="text-red-500 font-semibold">50%</span>! <a href="#" className="underline font-semibold hover:text-black">Shop Now</a></p>
                    </div>
                </div>
            </div>

            {/* Main Header (Sticky) */}
            <header className="sticky top-0 bg-white shadow-sm z-40">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        {/* Left: Logo */}
                        <div className="lg:flex-1">
                            <Link to="/" className="text-3xl font-extrabold tracking-tighter text-black">Mobixo</Link>
                        </div>
                        
                        {/* Center: Desktop Nav */}
                        <nav className="hidden lg:flex justify-center flex-1 space-x-6">
                            {navLinks.map((link) => (
                                <NavItem key={link.name} href={link.href} new={link.new} sale={link.sale}>
                                    {link.name}
                                </NavItem>
                            ))}
                        </nav>

                        {/* Right: Icons & Mobile Menu Button */}
                        <div className="lg:flex-1 lg:flex lg:justify-end">
                             <div className="flex items-center space-x-4">
                                <button onClick={onSearchClick} className="text-gray-700 hover:text-black"><SearchIcon /></button>
                                <button onClick={onLoginClick} className="hidden sm:block text-gray-700 hover:text-black"><UserIcon /></button>
                                <Link to="/wishlist" className="relative text-gray-700 hover:text-black">
                                    <HeartIcon />
                                    {wishlistItems.length > 0 && (
                                        <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">{wishlistItems.length}</span>
                                    )}
                                </Link>
                                <button onClick={openCart} className="relative text-gray-700 hover:text-black">
                                    <CartIcon />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                            {cartCount}
                                        </span>
                                    )}
                                </button>
                                <div className="hidden sm:block relative">
                                    <button 
                                        onClick={() => setCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                                        className="flex items-center space-x-1 cursor-pointer text-gray-700 hover:text-black"
                                    >
                                        <span className="text-sm font-medium">{currency}</span>
                                        <ChevronDownIcon />
                                    </button>
                                    {isCurrencyDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg py-1 z-20 border">
                                            <a
                                                href="#"
                                                onClick={(e) => { e.preventDefault(); setCurrency('USD'); setCurrencyDropdownOpen(false); }}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                USD
                                            </a>
                                            <a
                                                href="#"
                                                onClick={(e) => { e.preventDefault(); setCurrency('PKR'); setCurrencyDropdownOpen(false); }}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                PKR
                                            </a>
                                        </div>
                                    )}
                                </div>
                                {/* Mobile Menu Button */}
                                <button className="lg:hidden text-gray-700 hover:text-black" onClick={() => setMobileMenuOpen(true)}>
                                    <MenuIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            
            <MobileMenu 
                isOpen={isMobileMenuOpen} 
                onClose={handleMobileMenuClose}
                onSearchClick={() => {
                    handleMobileMenuClose();
                    onSearchClick();
                }}
                onLoginClick={() => {
                    handleMobileMenuClose();
                    onLoginClick();
                }}
            />
        </>
    );
};

export default Header;