import React from 'react';
import { Link } from 'react-router-dom';
import { ShopIcon, HeartIcon, CartIcon, UserIcon, SearchIcon } from './icons';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';

interface MobileBottomNavProps {
  onSearchClick: () => void;
  onAccountClick: () => void;
}

const NavItem: React.FC<{ to?: string; onClick?: () => void; icon: React.ReactNode; label: string; badgeCount?: number; }> = ({ to, onClick, icon, label, badgeCount }) => {
    const content = (
        <div className="flex flex-col items-center justify-center text-center text-gray-600 hover:text-black transition-colors w-16">
            <div className="relative">
                {icon}
                {badgeCount !== undefined && badgeCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                        {badgeCount}
                    </span>
                )}
            </div>
            <span className="text-xs mt-1">{label}</span>
        </div>
    );

    if (to) {
        return <Link to={to}>{content}</Link>;
    }

    return <button onClick={onClick}>{content}</button>;
};

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onSearchClick, onAccountClick }) => {
    const { wishlistItems } = useWishlist();
    const { openCart, cartCount } = useCart();

    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_5px_rgba(0,0,0,0.05)] z-40">
            <div className="flex justify-around items-center h-16">
                <NavItem to="/shop" icon={<ShopIcon className="w-6 h-6" />} label="Shop" />
                <NavItem to="/wishlist" icon={<HeartIcon className="w-6 h-6" />} label="Wishlist" badgeCount={wishlistItems.length} />
                <NavItem onClick={openCart} icon={<CartIcon className="w-6 h-6" />} label="Cart" badgeCount={cartCount} />
                <NavItem onClick={onAccountClick} icon={<UserIcon className="w-6 h-6" />} label="Account" />
                <NavItem onClick={onSearchClick} icon={<SearchIcon className="w-6 h-6" />} label="Search" />
            </div>
        </div>
    );
};

export default MobileBottomNav;
