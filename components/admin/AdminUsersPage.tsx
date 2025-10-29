import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVerticalIcon } from '../icons';
import { fetchAllUsers } from '../../src/integrations/supabase/api';
import { User } from '../../types';

const AdminUsersPage: React.FC = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadUsers = async () => {
            setIsLoading(true);
            try {
                const fetchedUsers = await fetchAllUsers();
                // Filter out users who are pending admin approval or are admins themselves, 
                // unless we want to show all users including admins here. 
                // For a general 'Customers' list, we usually show 'user' role.
                // For simplicity, we show all non-pending users here.
                setUsers(fetchedUsers.filter(u => u.role !== 'pending_admin'));
            } catch (error) {
                console.error("Failed to load users:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadUsers();
    }, []);

    const handleUserClick = (userId: string) => {
        navigate(`/adminpanel/users/${userId}`);
    };

    if (isLoading) {
        return <div className="text-center py-10 text-gray-600">Loading customers...</div>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Customers</h2>
                 <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-full font-semibold text-sm hover:bg-gray-300 transition-colors">
                    Export CSV
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 uppercase">
                        <tr>
                            <th className="px-4 py-3 font-medium">User</th>
                            <th className="px-4 py-3 font-medium">Email</th>
                            <th className="px-4 py-3 font-medium">Role</th>
                            <th className="px-4 py-3 font-medium">Registration Date</th>
                            <th className="px-4 py-3 font-medium text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {users.map(user => (
                            <tr key={user.id} onClick={() => handleUserClick(user.id)} className="hover:bg-gray-50 cursor-pointer">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                            {user.display_name.charAt(0) || user.email.charAt(0)}
                                        </div>
                                        <span className="font-semibold text-gray-800">{user.display_name || user.email}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-gray-600">{user.email}</td>
                                <td className="px-4 py-3 text-gray-600 capitalize">{user.role}</td>
                                <td className="px-4 py-3 text-gray-600">{new Date(user.created_at || '').toLocaleDateString()}</td>
                                <td className="px-4 py-3 text-center">
                                    <button className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors" onClick={(e) => e.stopPropagation()}>
                                        <MoreVerticalIcon className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {users.length === 0 && !isLoading && (
                    <div className="text-center py-10 text-gray-500">No customers found.</div>
                )}
            </div>
        </div>
    );
};

export default AdminUsersPage;