import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import AuthLayout from '../../components/AuthLayout.jsx';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const serverRoot = useMemo(() => {
    const raw = import.meta.env.VITE_API_URL || '';
    return raw.replace(/\/api\/?$/, '');
  }, []);

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
          <div className="relative">
            <FiUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="register-name"
              className="input pl-9"
              placeholder="Your name"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              autoComplete="name"
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500" htmlFor="register-email">
            Email
          </label>
          <div className="relative">
            <FiMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="register-email"
              className="input pl-9"
              placeholder="you@company.com"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              autoComplete="email"
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500" htmlFor="register-password">
            Password
          </label>
          <div className="relative">
            <FiLock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="register-password"
              type={show1 ? 'text' : 'password'}
              className="input pl-9 pr-9"
              placeholder="Create a strong password"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
              onClick={() => setShow1((s) => !s)}
              aria-label={show1 ? 'Hide password' : 'Show password'}
            >
              {show1 ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500" htmlFor="register-confirm">
            Confirm password
          </label>
          <div className="relative">
            <FiLock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="register-confirm"
              type={show2 ? 'text' : 'password'}
              className="input pl-9 pr-9"
              placeholder="Repeat password"
              value={form.confirmPassword}
              onChange={(event) => setForm((current) => ({ ...current, confirmPassword: event.target.value }))}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
              onClick={() => setShow2((s) => !s)}
              aria-label={show2 ? 'Hide password' : 'Show password'}
            >
              {show2 ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>
        {error && (
          <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-2 text-sm text-rose-600">
            {error}
          </div>
        )}
        <button className="btn w-full justify-center py-3" type="submit">
          Create account
        </button>
        <button
          className="btn secondary w-full justify-center py-2.5"
          type="button"
          onClick={() => (window.location.href = `${serverRoot}/api/auth/google`)}
        >
          Continue with Google
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
