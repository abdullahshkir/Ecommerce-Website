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

    // Check if the user is logged in AND has the 'admin' role.
    if (user?.role === 'admin') {
        return <Outlet />;
    }
    
    // If the user is logged in but not an admin (role is 'user' or 'pending_admin'), 
    // or if the user is not logged in, redirect to the admin login page.
    return <Navigate to="/adminpanel" replace />;
};

export default AdminRouteGuard;