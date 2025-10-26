import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { MenuIcon, SearchIcon, UserIcon, SettingsIcon, ChevronDownIcon } from '../icons';

interface AdminLayoutProps {
  onLogout: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ onLogout }) => {
    const location = useLocation();

    const getPageTitle = () => {
        const path = location.pathname.split('/').pop() || 'dashboard';
        return path.charAt(0).toUpperCase() + path.slice(1);
    };

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <AdminSidebar onLogout={onLogout} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex justify-between items-center p-4 bg-white border-b">
                    <div className="flex items-center">
                        <button className="text-gray-500 lg:hidden">
                            <MenuIcon className="h-6 w-6" />
                        </button>
                        <h1 className="text-xl font-semibold text-gray-800 ml-2">{getPageTitle()}</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative hidden md:block">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input type="text" placeholder="Search..." className="bg-gray-100 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="relative">
                            <button className="flex items-center space-x-2">
                                <UserIcon className="w-8 h-8 rounded-full bg-gray-200 p-1" />
                                <div className="hidden md:block text-left">
                                    <p className="font-semibold text-sm">Admin</p>
                                    <p className="text-xs text-gray-500">Super Admin</p>
                                </div>
                                <ChevronDownIcon className="w-4 h-4 text-gray-500 hidden md:block"/>
                            </button>
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;