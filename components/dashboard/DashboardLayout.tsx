import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import { useUser } from '../../contexts/UserContext';

const DashboardLayout: React.FC = () => {
    const { logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <>
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
                    <DashboardSidebar onLogout={handleLogout} />
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