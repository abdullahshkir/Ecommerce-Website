import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { DashboardIcon, ProductsIcon, ClipboardIcon, UsersIcon, LogOutIcon, SettingsIcon } from '../icons';

interface AdminSidebarProps {
  onLogout: () => void;
}

const NavItem: React.FC<{ to: string; icon: React.ReactNode; children: React.ReactNode }> = ({ to, icon, children }) => {
    const activeClass = 'bg-blue-600 text-white';
    const inactiveClass = 'text-gray-600 hover:bg-gray-200 hover:text-gray-900';
    return (
        <NavLink
            to={to}
            className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${isActive ? activeClass : inactiveClass}`}
        >
            {icon}
            <span className="ml-3 font-medium">{children}</span>
        </NavLink>
    );
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onLogout }) => {
  return (
    <div className="hidden lg:flex flex-col w-64 bg-white border-r">
      <div className="flex items-center justify-center h-20 border-b">
        <Link to="/adminpanel/dashboard" className="text-3xl font-extrabold tracking-wide text-black font-orbitron">Mobixo</Link>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-2">
            <NavItem to="/adminpanel/dashboard" icon={<DashboardIcon className="w-5 h-5"/>}>Dashboard</NavItem>
            <NavItem to="/adminpanel/products" icon={<ProductsIcon className="w-5 h-5"/>}>Products</NavItem>
            <NavItem to="/adminpanel/orders" icon={<ClipboardIcon className="w-5 h-5"/>}>Orders</NavItem>
            <NavItem to="/adminpanel/users" icon={<UsersIcon className="w-5 h-5"/>}>Users</NavItem>
        </nav>
      </div>
       <div className="p-4 border-t">
            <nav className="space-y-2">
                <NavItem to="#" icon={<SettingsIcon className="w-5 h-5"/>}>Settings</NavItem>
                <button 
                    onClick={onLogout}
                    className="w-full flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                >
                    <LogOutIcon className="w-5 h-5"/>
                    <span className="ml-3 font-medium">Logout</span>
                </button>
            </nav>
       </div>
    </div>
  );
};

export default AdminSidebar;