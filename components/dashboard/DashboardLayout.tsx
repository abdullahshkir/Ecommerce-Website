import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import { SEO } from '../SEO';

interface DashboardLayoutProps {
    onLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ onLogout }) => {
    return (
        <>
        <SEO title="My Account | Mobixo" description="Manage your Mobixo account, view orders, and update your details." />
        <div className="bg-white">
             <div className="bg-gray-100 py-8">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-gray-800">My Account</h1>
                    <div className="text-sm text-gray-600 mt-2">
                        <Link to="/" className="hover:text-black">Home</Link>
                        <span className="mx-2">/</span>
                        <span>My Account</span>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row gap-8">
                    <DashboardSidebar onLogout={onLogout} />
                    <main className="flex-1">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
        </>
    );
};

export default DashboardLayout;
