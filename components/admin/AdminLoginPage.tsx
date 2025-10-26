import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from '../icons';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
}

const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('admin@mobixo.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@mobixo.com' && password === 'admin123') {
      setError('');
      onLoginSuccess();
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-wide text-black font-orbitron">Mobixo</h1>
            <p className="mt-2 text-gray-600">Admin Panel</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-sm text-center text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
          <div className="relative">
            <label className="text-sm font-bold text-gray-700 tracking-wide">Email</label>
            <input
              className="w-full text-base py-3 px-4 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="mail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-8 relative">
            <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-gray-700 tracking-wide">Password</label>
            </div>
            <div className="relative">
                <input
                  className="w-full text-base py-3 px-4 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                 <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                    {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center bg-black text-white p-3 rounded-full tracking-wide font-semibold cursor-pointer hover:bg-gray-800 transition-all duration-300"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;