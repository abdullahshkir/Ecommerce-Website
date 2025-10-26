import React from 'react';
import { MoreVerticalIcon } from '../icons';

const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', registrationDate: '2025-07-29' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', registrationDate: '2025-07-29' },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', registrationDate: '2025-07-28' },
    { id: 4, name: 'Alice Williams', email: 'alice.w@example.com', registrationDate: '2025-07-28' },
    { id: 5, name: 'Charlie Brown', email: 'charlie.b@example.com', registrationDate: '2025-07-27' },
    { id: 6, name: 'Diana Miller', email: 'diana.m@example.com', registrationDate: '2025-07-26' },
];

const AdminUsersPage: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Users</h2>
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
                            <th className="px-4 py-3 font-medium">Registration Date</th>
                            <th className="px-4 py-3 font-medium text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {mockUsers.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                            {user.name.charAt(0)}
                                        </div>
                                        <span className="font-semibold text-gray-800">{user.name}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-gray-600">{user.email}</td>
                                <td className="px-4 py-3 text-gray-600">{user.registrationDate}</td>
                                <td className="px-4 py-3 text-center">
                                    <button className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
                                        <MoreVerticalIcon className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsersPage;