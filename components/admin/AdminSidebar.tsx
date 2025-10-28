import React, { useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { DashboardIcon, ProductsIcon, ClipboardIcon, UsersIcon, LogOutIcon, SettingsIcon } from '../icons';

interface AdminSidebarProps {
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const NavItem: React.FC<{ to: string; icon: React.ReactNode; children: React.ReactNode }> = ({ to, icon, children }) => {
    const activeClass = 'bg-blue-600 text-white shadow-sm';
    const inactiveClass = 'text-gray-600 hover:bg-gray-100 hover:text-gray-900';
    return (
        <NavLink
            to={to}
            end={to === '/adminpanel/dashboard'}
            className={({ isActive }) => `flex items-center px-4 py-2.5 rounded-lg transition-colors duration-200 ${isActive ? activeClass : inactiveClass}`}
        >
            {icon}
            <span className="ml-3 font-medium text-sm">{children}</span>
        </NavLink>
    );
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onLogout, isOpen, onClose }) => {
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
        onClose();
    }
  }, [location.pathname]);

  const sidebarContent = (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-20 border-b border-gray-200">
            <Link to="/adminpanel/dashboard" className="text-3xl font-extrabold tracking-wide text-black font-orbitron">Mobixo</Link>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-2">
                <NavItem to="/adminpanel/dashboard" icon={<DashboardIcon className="w-5 h-5"/>}>Dashboard</NavItem>
                <NavItem to="/adminpanel/products" icon={<ProductsIcon className="w-5 h-5"/>}>Products</NavItem>
                <NavItem to="/adminpanel/orders" icon={<ClipboardIcon className="w-5 h-5"/>}>Orders</NavItem>
                <NavItem to="/adminpanel/users" icon={<UsersIcon className="w-5 h-5"/>}>Customers</NavItem>
                <NavItem to="/adminpanel/pending-admins" icon={<UsersIcon className="w-5 h-5"/>}>Pending Admins</NavItem>
            </nav>
        </div>
        <div className="p-4 border-t border-gray-200">
            <nav className="space-y-2">
                <NavItem to="#" icon={<SettingsIcon className="w-5 h-5"/>}>Settings</NavItem>
                <button 
                    onClick={onLogout}
                    className="w-full flex items-center px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                >
                    <LogOutIcon className="w-5 h-5"/>
                    <span className="ml-3 font-medium text-sm">Logout</span>
                </button>
            </nav>
        </div>
      </div>
  );

  return (
    <>
        {/* Mobile Backdrop */}
        <div 
            className={`fixed inset-0 z-40 bg-black bg-opacity-40 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={onClose}
        ></div>

        {/* Sidebar */}
        <aside className={`fixed lg:relative inset-y-0 left-0 z-50 flex-shrink-0 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
            {sidebarContent}
        </aside>
    </>
  );
};

export default AdminSidebar;