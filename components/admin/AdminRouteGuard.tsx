import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const AdminRouteGuard: React.FC = () => {
    const { user, isLoadingUser } = useUser();

    if (isLoadingUser) {
        // Optionally render a loading spinner here
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-2xl font-bold text-gray-800">Loading Admin...</div>
            </div>
        );
    }

    if (user?.role === 'admin') {
        return <Outlet />;
    }

    // Redirect to login page if not admin or not logged in
    return <Navigate to="/adminpanel" replace />;
};

export default AdminRouteGuard;