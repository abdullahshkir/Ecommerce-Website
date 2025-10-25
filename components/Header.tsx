import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PhoneIcon, MailIcon, SearchIcon, UserIcon, HeartIcon, CartIcon, ChevronDownIcon, ArrowRightIcon, CloseIcon, MenuIcon } from './icons';
import SearchOverlay from './SearchOverlay';
import LoginModal from './LoginModal';
import CartModal from './CartModal';
import { useCurrency } from '../contexts/CurrencyContext';

const NavItem: React.FC<{ href: string; children: React.ReactNode; new?: boolean; sale?: boolean }> = ({ href, children, new: isNew, sale: isSale }) => (
    <a href={href} className="text-gray-700 hover:text-black transition-colors relative group py-2">
        <span>{children}</span>
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
        {isNew && <span className="absolute -top-2 -right-3 bg-cyan-400 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">New</span>}
        {isSale && <span className="absolute -top-2 -right-3 bg-orange-400 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">Sale</span>}
    </a>
);

const Header: React.FC = () => {
    const [isTopBarVisible, setTopBarVisible] = useState(true);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isSearchOpen, setSearchOpen] = useState(false);
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isCartOpen, setCartOpen] = useState(false);
    const [cartItemCount, setCartItemCount] = useState(1);
    const { currency, setCurrency } = useCurrency();
    const [isCurrencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

    const navLinks = [
        { name: 'Demo', href: '#' },
        { name: 'Shop', href: '#', new: true },
        { name: 'Product', href: '#' },
        { name: 'Sale', href: '#', sale: true },
        { name: 'Pages', href: '#' },
        { name: 'Lookbooks', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Buy Theme', href: '#' },
    ];

    return (
        <>
            <header className="sticky top-0 bg-white shadow-sm z-10">
                {/* Top Announcement Bar */}
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

                {/* Secondary Header */}
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

                {/* Main Navigation */}
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        {/* Left & Center: Logo and Nav */}
                        <div className="flex items-center flex-grow">
                            <Link to="/" className="text-3xl font-extrabold tracking-tighter text-black">Mobixo</Link>
                            <nav className="hidden lg:flex items-center space-x-6 ml-10">
                                {navLinks.map((link) => (
                                    <NavItem key={link.name} href={link.href} new={link.new} sale={link.sale}>
                                        {link.name}
                                    </NavItem>
                                ))}
                            </nav>
                        </div>

                        {/* Right: Icons */}
                        <div className="flex items-center space-x-4">
                            <button onClick={() => setSearchOpen(true)} className="text-gray-700 hover:text-black"><SearchIcon /></button>
                            <button onClick={() => setLoginOpen(true)} className="hidden sm:block text-gray-700 hover:text-black"><UserIcon /></button>
                            <Link to="/wishlist" className="relative text-gray-700 hover:text-black">
                                <HeartIcon />
                                <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">6</span>
                            </Link>
                            <button onClick={() => setCartOpen(true)} className="relative text-gray-700 hover:text-black">
                                <CartIcon />
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                        {cartItemCount}
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
                            <button className="lg:hidden text-gray-700 hover:text-black" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                <MenuIcon />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                     <div className="lg:hidden bg-white border-t border-gray-200">
                        <nav className="flex flex-col px-4 py-2">
                             {navLinks.map((link) => (
                                 <a key={link.name} href={link.href} className="py-2 text-gray-700 hover:text-black transition-colors flex justify-between items-center">
                                    <span>{link.name}</span>
                                    {link.new && <span className="bg-cyan-400 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">New</span>}
                                    {link.sale && <span className="bg-orange-400 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">Sale</span>}
                                </a>
                             ))}
                        </nav>
                     </div>
                )}
            </header>
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />
            <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
            <CartModal isOpen={isCartOpen} onClose={() => setCartOpen(false)} updateCartCount={setCartItemCount} />
        </>
    );
};

export default Header;