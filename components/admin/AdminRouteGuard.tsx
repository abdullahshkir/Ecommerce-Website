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
    
    // If user is logged in but not admin (e.g., 'user' or 'pending_admin'), redirect to admin login page.
    // The AdminLoginPage will handle displaying the appropriate message if the user is pending.
    return <Navigate to="/adminpanel" replace />;
};

export default AdminRouteGuard;