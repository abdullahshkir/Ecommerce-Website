import React, { useState, useEffect } from 'react';
import { fetchSettings, updateSettings, GlobalSettings } from '../../src/integrations/supabase/api';

const AdminSettingsPage: React.FC = () => {
    const [settings, setSettings] = useState<GlobalSettings>({ id: 1, visitor_limit: 1000 });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        const loadSettings = async () => {
            setIsLoading(true);
            try {
                const fetchedSettings = await fetchSettings();
                setSettings(fetchedSettings);
            } catch (error) {
                setMessage({ type: 'error', text: 'Failed to load settings.' });
            } finally {
                setIsLoading(false);
            }
        };
        loadSettings();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setSettings(prev => ({ ...prev, visitor_limit: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage(null);
        
        try {
            await updateSettings({ visitor_limit: settings.visitor_limit });
            setMessage({ type: 'success', text: 'Settings saved successfully!' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to save settings.' });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <div className="text-center py-10 text-gray-600">Loading settings...</div>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm max-w-2xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Global Settings</h2>
            
            {message && (
                <div className={`p-3 mb-4 rounded-md text-sm ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4 p-4 border rounded-lg">
                    <h3 className="font-semibold text-gray-800">Visitor Tracking Cleanup</h3>
                    <div>
                        <label htmlFor="visitor_limit" className="block text-sm font-medium text-gray-700 mb-1">
                            Auto-Delete Limit (Number of Visitors)
                        </label>
                        <input 
                            type="number" 
                            id="visitor_limit" 
                            name="visitor_limit" 
                            min="100"
                            step="100"
                            value={settings.visitor_limit}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition" 
                        />
                        <p className="text-xs text-gray-500 mt-1">If the total number of visitors exceeds this limit, the oldest records will be automatically deleted when a new visitor arrives.</p>
                    </div>
                </div>

                <div>
                    <button type="submit" disabled={isSaving} className="bg-black text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition-colors disabled:bg-gray-400">
                        {isSaving ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminSettingsPage;