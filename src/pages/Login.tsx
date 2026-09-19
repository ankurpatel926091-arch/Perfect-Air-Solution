import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserAuth } from '@/context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUserAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen py-24 flex items-center justify-center bg-neutral-50 px-4">
      <div className="max-w-md w-full bg-white rounded-md shadow-sm border border-neutral-200 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-syne text-brand-blue tracking-tight">Welcome Back</h1>
          <p className="text-neutral-500 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-md border border-neutral-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-colors"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-md border border-neutral-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-colors"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-blue text-white py-3 rounded-md font-medium hover:bg-brand-blue-dark transition-colors cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-neutral-500">
          Don't have an account? <Link to="/register" className="text-brand-orange font-medium hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
