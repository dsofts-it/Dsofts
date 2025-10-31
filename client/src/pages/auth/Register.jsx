import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import AuthLayout from '../../components/AuthLayout.jsx';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await register(form);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || "We couldn't create your account. Please try again.");
    }
  };

  return (
    <AuthLayout title="Create account" subtitle="Join the workspace and access your projects.">
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500" htmlFor="register-name">
            Name
          </label>
          <input
            id="register-name"
            className="input"
            placeholder="Your name"
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500" htmlFor="register-email">
            Email
          </label>
          <input
            id="register-email"
            className="input"
            placeholder="you@company.com"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500" htmlFor="register-password">
            Password
          </label>
          <input
            id="register-password"
            type="password"
            className="input"
            placeholder="Create a strong password"
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500" htmlFor="register-confirm">
            Confirm password
          </label>
          <input
            id="register-confirm"
            type="password"
            className="input"
            placeholder="Repeat password"
            value={form.confirmPassword}
            onChange={(event) => setForm((current) => ({ ...current, confirmPassword: event.target.value }))}
          />
        </div>
        {error && (
          <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-2 text-sm text-rose-600">
            {error}
          </div>
        )}
        <button className="btn w-full justify-center py-3" type="submit">
          Create account
        </button>
      </form>
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
        <Link to="/forgot-password" className="text-brand hover:underline">
          Forgot password
        </Link>
        <Link to="/login" className="text-brand hover:underline">
          Already have an account
        </Link>
      </div>
    </AuthLayout>
  );
}
