import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout.jsx';

// Derive the server origin robustly from VITE_API_URL (consistent with Login page)
let API_ORIGIN = 'http://localhost:5000';
try {
  if (import.meta.env.VITE_API_URL) {
    API_ORIGIN = new URL(import.meta.env.VITE_API_URL).origin;
  }
} catch {
  const raw = String(import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
  API_ORIGIN = raw.endsWith('/api') ? raw.slice(0, -4) : (raw || API_ORIGIN);
}

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(form);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <AuthLayout title="Create account" subtitle="Start your journey with us">
      <form onSubmit={submit} className="space-y-3">
        <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <input className="input" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input type="password" className="input" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
        <input type="password" className="input" placeholder="Confirm password" value={form.confirmPassword} onChange={e=>setForm({...form,confirmPassword:e.target.value})} />
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <button className="btn w-full py-3" type="submit">Register</button>
      </form>
      <div className="mt-4 text-sm flex items-center justify-between text-slate-300">
        <a className="text-brand" href="/forgot-password">Forgot password?</a>
        <a className="text-brand" href="/login">Sign in</a>
      </div>
    </AuthLayout>
  );
}
