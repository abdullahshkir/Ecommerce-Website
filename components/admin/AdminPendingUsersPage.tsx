import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import { supabase } from '../../src/integrations/supabase/client';
import { UsersIcon } from '../icons';

const AdminPendingUsersPage: React.FC = () => {
    const [pendingUsers, setPendingUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPendingUsers = async () => {
        setIsLoading(true);
        // Fetch users from profiles table where role is 'pending_admin'
        const { data: profilesData, error } = await supabase
            .from('profiles')
            .select('id, first_name, last_name, role, auth_user:auth.users(email, created_at)')
            .eq('role', 'pending_admin');

        if (error) {
            console.error('Error fetching pending users:', error);
            setIsLoading(false);
            return;
        }
        
        const usersList: User[] = profilesData.map((profile: any) => ({
            id: profile.id,
            first_name: profile.first_name || '',
            last_name: profile.last_name || '',
            display_name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim(),
            email: profile.auth_user?.email || 'N/A',
            role: profile.role,
            created_at: profile.auth_user?.created_at,
        }));
        
        setPendingUsers(usersList);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchPendingUsers();
    }, []);

    const handleApprove = async (userId: string) => {
        // Update role to 'admin'
        const { error } = await supabase
            .from('profiles')
            .update({ role: 'admin' })
            .eq('id', userId);

        if (error) {
            console.error('Error approving user:', error);
            alert('Failed to approve user.');
        } else {
            alert('User approved as Admin!');
            fetchPendingUsers(); // Refresh list
        }
    };

    const handleReject = async (userId: string) => {
        // Update role to 'user' (or delete the profile/user)
        const { error } = await supabase
            .from('profiles')
            .update({ role: 'user' })
            .eq('id', userId);

        if (error) {
            console.error('Error rejecting user:', error);
            alert('Failed to reject user.');
        } else {
            alert('User rejected (role set to user).');
            fetchPendingUsers(); // Refresh list
        }
    };

    if (isLoading) {
        return <div className="text-center py-10 text-gray-600">Loading pending requests...</div>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <UsersIcon className="w-6 h-6"/> Pending Admin Requests
                </h2>
                <button onClick={fetchPendingUsers} className="bg-gray-200 text-gray-800 py-2 px-4 rounded-full font-semibold text-sm hover:bg-gray-300 transition-colors">
                    Refresh
                </button>
            </div>

            {pendingUsers.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No pending admin requests found.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 uppercase">
                            <tr>
                                <th className="px-4 py-3 font-medium">User</th>
                                <th className="px-4 py-3 font-medium">Email</th>
                                <th className="px-4 py-3 font-medium">Requested On</th>
                                <th className="px-4 py-3 font-medium text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {pendingUsers.map(user => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-semibold text-gray-800">{user.display_name || 'N/A'}</td>
                                    <td className="px-4 py-3 text-gray-600">{user.email}</td>
                                    <td className="px-4 py-3 text-gray-600">{new Date(user.created_at || '').toLocaleDateString()}</td>
                                    <td className="px-4 py-3 text-center space-x-2">
                                        <button 
                                            onClick={() => handleApprove(user.id)}
                                            className="bg-green-600 text-white py-1.5 px-4 rounded-full text-xs font-semibold hover:bg-green-700 transition-colors"
                                        >
                                            Approve
                                        </button>
                                        <button 
                                            onClick={() => handleReject(user.id)}
                                            className="bg-red-100 text-red-700 py-1.5 px-4 rounded-full text-xs font-semibold hover:bg-red-200 transition-colors"
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminPendingUsersPage;