import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import logo from '../../assets/studio-mark.jpg';

export default function AdminRegister() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="app-glow w-full max-w-md space-y-6 rounded-[32px] border border-white/60 bg-white/90 p-8 text-center shadow-soft">
        <div className="mx-auto h-12 w-12 overflow-hidden rounded-2xl shadow-soft">
          <img src={logo} alt="Studio mark" className="h-full w-full object-cover" />
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Admin console</div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Create admin account</h1>
          <p className="mt-2 text-sm text-slate-500">
            Provision new internal access. Remember to grant the admin role in the database if your policy requires it.
          </p>
        </div>
        <form onSubmit={submit} className="space-y-4 text-left">
          <input
            className="input"
            placeholder="Name"
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          />
          <input
            className="input"
            placeholder="Email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
          />
          <input
            type="password"
            className="input"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={(event) => setForm((current) => ({ ...current, confirmPassword: event.target.value }))}
          />
          {error && (
            <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-2 text-sm text-rose-600">{error}</div>
          )}
          <button className="btn w-full justify-center py-3" type="submit">
            Register admin
          </button>
        </form>
        <div className="text-xs text-slate-400">
          Tip: limit admin accounts to team members covered by your data processing agreements.
        </div>
      </div>
    </div>
  );
}
