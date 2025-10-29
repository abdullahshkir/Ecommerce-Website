import React from 'react';
import { NavLink } from 'react-router-dom';
import { ClipboardIcon, MapPinIcon, UserIcon, LogOutIcon, ShopIcon, StarIcon } from '../icons';

interface DashboardSidebarProps {
    onLogout: () => void;
}

const SidebarLink: React.FC<{ to: string; icon: React.ReactNode; children: React.ReactNode; end?: boolean; }> = ({ to, icon, children, end = false }) => {
    const activeClass = "bg-gray-100 text-black";
    const inactiveClass = "text-gray-600 hover:bg-gray-50 hover:text-black";
    
    return (
        <NavLink
            to={to}
            end={end}
            className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-md transition-colors text-sm font-medium ${isActive ? activeClass : inactiveClass}`
            }
        >
            {icon}
            <span className="ml-3">{children}</span>
        </NavLink>
    );
};


const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ onLogout }) => {
    return (
        <aside className="w-full md:w-64 flex-shrink-0">
            <div className="p-4 bg-white rounded-lg border">
                <nav className="space-y-1">
                    <SidebarLink to="/account" icon={<ShopIcon className="w-5 h-5"/>} end={true}>Dashboard</SidebarLink>
                    <SidebarLink to="/account/orders" icon={<ClipboardIcon className="w-5 h-5"/>}>Orders</SidebarLink>
                    <SidebarLink to="/account/reviews" icon={<StarIcon className="w-5 h-5"/>}>Reviews</SidebarLink>
                    <SidebarLink to="/account/addresses" icon={<MapPinIcon className="w-5 h-5"/>}>Addresses</SidebarLink>
                    <SidebarLink to="/account/details" icon={<UserIcon className="w-5 h-5"/>}>Account Details</SidebarLink>
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center px-4 py-3 rounded-md transition-colors text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-black"
                    >
                        <LogOutIcon className="w-5 h-5"/>
                        <span className="ml-3">Logout</span>
                    </button>
                </nav>
            </div>
        </aside>
    );
};

export default DashboardSidebar;