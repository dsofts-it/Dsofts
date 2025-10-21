import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { FcGoogle } from 'react-icons/fc';

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
      const isAdminIntent = new URLSearchParams(location.search).get('admin') === '1';
      navigate(isAdminIntent ? '/admin' : '/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-[70vh] grid place-items-center">
      <div className="w-full max-w-md card">
        <h2 className="text-2xl font-bold mb-2 text-slate-900">Login</h2>
        <form onSubmit={submit} className="space-y-3">
          <input className="input" placeholder="Email" value={identifier} onChange={e=>setIdentifier(e.target.value)} />
          <input type="password" className="input" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button className="btn w-full py-3" type="submit">Login</button>
        </form>
        <div className="mt-3" />
        <a href={`${API_ORIGIN}/api/auth/google`} className="btn secondary w-full flex items-center justify-center gap-2 py-3"><FcGoogle size={18}/> Sign in with Google</a>
        <div className="mt-4 flex items-center justify-between text-sm">
          <Link to="/forgot-password" className="text-brand">Forgot password?</Link>
          <Link to="/register" className="text-brand">Create account</Link>
        </div>
      </div>
    </div>
  );
}
