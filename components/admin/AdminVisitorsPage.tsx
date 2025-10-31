import React, { useState, useEffect } from 'react';
import { fetchVisitors, Visitor, clearAllVisitors } from '../../src/integrations/supabase/api';
import { UsersIcon, TrashIcon } from '../icons';

const AdminVisitorsPage: React.FC = () => {
    const [visitors, setVisitors] = useState<Visitor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isClearing, setIsClearing] = useState(false);

    const loadVisitors = async () => {
        setIsLoading(true);
        try {
            const fetchedVisitors = await fetchVisitors();
            setVisitors(fetchedVisitors);
        } catch (error) {
            console.error("Failed to load visitors:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadVisitors();
        // Optionally refresh every 30 seconds for 'live' view
        const interval = setInterval(loadVisitors, 30000); 
        return () => clearInterval(interval);
    }, []);
    
    const handleClearData = async () => {
        if (window.confirm("Are you sure you want to delete ALL visitor data? This action cannot be undone.")) {
            setIsClearing(true);
            try {
                await clearAllVisitors();
                alert("All visitor data cleared successfully.");
                loadVisitors();
            } catch (error) {
                alert("Failed to clear visitor data. Check console for details.");
                console.error(error);
            } finally {
                setIsClearing(false);
            }
        }
    };

    const formatTime = (timestamp: string) => {
        return new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    if (isLoading) {
        return <div className="text-center py-10 text-gray-600">Loading Live Visitors...</div>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <UsersIcon className="w-6 h-6"/> Live Visitors ({visitors.length})
                </h2>
                <div className="flex space-x-3">
                    <button 
                        onClick={handleClearData} 
                        disabled={isClearing}
                        className="flex items-center gap-1 bg-red-100 text-red-700 py-2 px-4 rounded-full font-semibold text-sm hover:bg-red-200 transition-colors disabled:opacity-50"
                    >
                        <TrashIcon className="w-4 h-4"/>
                        {isClearing ? 'Clearing...' : 'Clear Data'}
                    </button>
                    <button onClick={loadVisitors} className="bg-gray-200 text-gray-800 py-2 px-4 rounded-full font-semibold text-sm hover:bg-gray-300 transition-colors">
                        Refresh
                    </button>
                </div>
            </div>

            {visitors.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No visitor data recorded yet.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 uppercase">
                            <tr>
                                <th className="px-4 py-3 font-medium">Time</th>
                                <th className="px-4 py-3 font-medium">IP Address</th>
                                <th className="px-4 py-3 font-medium">Device / OS</th>
                                <th className="px-4 py-3 font-medium">Browser</th>
                                <th className="px-4 py-3 font-medium">Referrer</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {visitors.map(visitor => (
                                <tr key={visitor.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-gray-600">{formatTime(visitor.created_at)}</td>
                                    <td className="px-4 py-3 font-semibold text-gray-800">{visitor.ip_address}</td>
                                    <td className="px-4 py-3 text-gray-600">{visitor.device_type} / {visitor.os}</td>
                                    <td className="px-4 py-3 text-gray-600">{visitor.browser}</td>
                                    <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{visitor.referrer}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminVisitorsPage;