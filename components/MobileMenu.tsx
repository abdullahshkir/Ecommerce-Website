import React, { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CloseIcon, PlusIcon, MinusIcon, HeartIcon, SearchIcon, UserIcon, PhoneIcon, MailIcon } from './icons';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchClick: () => void;
  onLoginClick: () => void;
}

type SubMenuItem = { name: string; href: string; };
type MenuItem = {
  name: string;
  href?: string;
  icon?: React.FC<{className?: string}>;
  subItems?: SubMenuItem[];
  action?: 'search' | 'login';
};

const MobileMenuItem: FC<{ item: MenuItem; onAction: (item: MenuItem) => void; onNavigate: () => void; }> = ({ item, onAction, onNavigate }) => {
    const [isSubMenuOpen, setSubMenuOpen] = useState(false);
    
    const hasSubItems = item.subItems && item.subItems.length > 0;

    const handleClick = () => {
        if (hasSubItems) {
            setSubMenuOpen(!isSubMenuOpen);
        } else if (item.action) {
            onAction(item);
        }
    };
    
    if (item.href && !hasSubItems) {
        return (
            <li className="border-b border-gray-200">
                <Link to={item.href} onClick={onNavigate} className="w-full flex justify-between items-center py-4 px-6 text-left text-gray-800 hover:bg-gray-50">
                    <span className="flex items-center">
                        {item.icon && <item.icon className="w-5 h-5 mr-3 text-gray-600" />}
                        {item.name}
                    </span>
                </Link>
            </li>
        );
    }

    return (
        <li className="border-b border-gray-200">
            <button onClick={handleClick} className="w-full flex justify-between items-center py-4 px-6 text-left text-gray-800 hover:bg-gray-50">
                <span className="flex items-center">
                    {item.icon && <item.icon className="w-5 h-5 mr-3 text-gray-600" />}
                    {item.name}
                </span>
                {hasSubItems && (
                    isSubMenuOpen ? <MinusIcon className="w-4 h-4 text-gray-500" /> : <PlusIcon className="w-4 h-4 text-gray-500" />
                )}
            </button>
            {hasSubItems && isSubMenuOpen && (
                <ul className="pl-12 pb-2 bg-gray-50">
                    {item.subItems?.map(subItem => (
                        <li key={subItem.name}>
                            <Link to={subItem.href} onClick={onNavigate} className="block py-2 text-gray-600 hover:text-black">
                                {subItem.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
};

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, onClose, onSearchClick, onLoginClick }) => {
    const [activeTab, setActiveTab] = useState('menu');

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);
    
    const menuItems: MenuItem[] = [
        { name: 'Home', href: '/' },
        { 
            name: 'Shop', 
            href: '/shop',
            subItems: [
                { name: 'Accesories', href: '/shop?category=Accesories' },
                { name: 'Smart TV', href: '/shop?category=Smart+TV' },
                { name: 'Camera', href: '/shop?category=Camera' },
                { name: 'Digital', href: '/shop?category=Digital' },
            ]
        },
        { name: 'About', href: '#' },
        { name: 'Contact', href: '#' },
        { name: 'Wishlist', href: '/wishlist', icon: HeartIcon },
        { name: 'Search', icon: SearchIcon, action: 'search' },
        { name: 'My account', icon: UserIcon, action: 'login' },
    ];
    
    const categories = ['Accesories', 'Smart TV', 'Camera', 'Digital'];

    const handleAction = (item: MenuItem) => {
        if (item.action === 'search') onSearchClick();
        if (item.action === 'login') onLoginClick();
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end" aria-modal="true" role="dialog">
            <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300" onClick={onClose} aria-hidden="true"></div>
            
            <div className={`relative w-full max-w-sm bg-white h-full shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    <div className="flex-shrink-0 flex items-stretch border-b">
                        <div className="grid grid-cols-2 flex-grow text-center font-semibold text-gray-500">
                            <button onClick={() => setActiveTab('menu')} className={`py-4 ${activeTab === 'menu' ? 'bg-gray-100 text-black border-b-2 border-blue-500' : 'bg-white'}`}>
                                MENU
                            </button>
                            <button onClick={() => setActiveTab('categories')} className={`py-4 ${activeTab === 'categories' ? 'bg-gray-100 text-black border-b-2 border-blue-500' : 'bg-white'}`}>
                                CATEGORIES
                            </button>
                        </div>
                        <button onClick={onClose} className="px-5 flex items-center justify-center bg-gray-100 text-gray-600 hover:text-black z-10 border-l">
                            <CloseIcon className="w-6 h-6" />
                        </button>
                    </div>
                    
                    <div className="flex-grow overflow-y-auto">
                        {activeTab === 'menu' && (
                            <ul className="flex flex-col">
                                {menuItems.map(item => (
                                    <MobileMenuItem key={item.name} item={item} onAction={handleAction} onNavigate={onClose} />
                                ))}
                            </ul>
                        )}
                        {activeTab === 'categories' && (
                           <ul className="flex flex-col">
                                {categories.map(cat => (
                                    <li key={cat} className="border-b border-gray-200">
                                        <Link to={`/shop?category=${encodeURIComponent(cat)}`} onClick={onClose} className="w-full flex justify-between items-center py-4 px-6 text-left text-gray-800 hover:bg-gray-50">
                                            {cat}
                                            <PlusIcon className="w-4 h-4 text-gray-500" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    
                    <div className="flex-shrink-0 p-6 border-t border-gray-200 bg-white">
                        <h3 className="font-semibold text-gray-800 mb-3">Need help?</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="tel:+0123456789" className="flex items-center text-gray-600 hover:text-black">
                                    <PhoneIcon className="w-4 h-4 mr-2" />
                                    +01 23456789
                                </a>
                            </li>
                            <li>
                                <a href="mailto:Mobixo@domain.com" className="flex items-center text-gray-600 hover:text-black">
                                    <MailIcon className="w-4 h-4 mr-2" />
                                    Mobixo@domain.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;