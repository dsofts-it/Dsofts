import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import AuthLayout from '../../components/AuthLayout.jsx';

// Derive the server origin robustly from VITE_API_URL
let API_ORIGIN = 'http://localhost:5000';
try {
  if (import.meta.env.VITE_API_URL) {
    API_ORIGIN = new URL(import.meta.env.VITE_API_URL).origin;
  }
} catch {
  // Fallback: strip a trailing /api if present
  const raw = String(import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
  API_ORIGIN = raw.endsWith('/api') ? raw.slice(0, -4) : (raw || API_ORIGIN);
}

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(identifier, password);
      const sp = new URLSearchParams(location.search);
      const next = sp.get('next');
      const isAdminIntent = sp.get('admin') === '1';
      navigate(next || (isAdminIntent ? '/profile' : '/profile'));
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your account">
      <form onSubmit={submit} className="space-y-3">
        <input className="input" placeholder="Email" value={identifier} onChange={e=>setIdentifier(e.target.value)} />
        <input type="password" className="input" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <button className="btn w-full py-3" type="submit">Login</button>
      </form>
      <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
        <Link to="/forgot-password" className="text-brand">Forgot password?</Link>
        <Link to="/register" className="text-brand">Create account</Link>
      </div>
    </AuthLayout>
  );
}
