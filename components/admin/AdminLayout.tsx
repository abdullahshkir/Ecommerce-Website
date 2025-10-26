import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { MenuIcon, SearchIcon, UserIcon, SettingsIcon, ChevronDownIcon } from '../icons';

interface AdminLayoutProps {
  onLogout: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ onLogout }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const getPageTitle = () => {
        const pathSegments = location.pathname.split('/').filter(Boolean);
        const lastSegment = pathSegments[pathSegments.length - 1] || 'dashboard';
        
        if (!isNaN(Number(lastSegment))) {
            const parentSegment = pathSegments[pathSegments.length - 2] || '';
            return `${parentSegment.charAt(0).toUpperCase() + parentSegment.slice(1)} Detail`;
        }

        return lastSegment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            <AdminSidebar onLogout={onLogout} isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
                    <div className="flex items-center">
                        <button className="text-gray-500 lg:hidden mr-3" onClick={() => setSidebarOpen(true)}>
                            <MenuIcon className="h-6 w-6" />
                        </button>
                        <h1 className="text-xl font-semibold text-gray-800">{getPageTitle()}</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative hidden md:block">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                className="w-full text-sm py-2 pl-10 pr-4 bg-gray-100 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors" 
                            />
                        </div>
                        <div className="relative">
                            <button className="flex items-center space-x-2">
                                <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                                    <UserIcon className="w-5 h-5 text-gray-600" />
                                </div>
                                <div className="hidden md:block text-left">
                                    <p className="font-semibold text-sm">Admin</p>
                                    <p className="text-xs text-gray-500">Super Admin</p>
                                </div>
                                <ChevronDownIcon className="w-4 h-4 text-gray-500 hidden md:block"/>
                            </button>
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;