import React, { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import AuthLayout from '../../components/AuthLayout.jsx';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);

  const serverRoot = useMemo(() => {
    const raw = import.meta.env.VITE_API_URL || '';
    return raw.replace(/\/api\/?$/, '');
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await login(identifier, password);
      const params = new URLSearchParams(location.search);
      const next = params.get('next');
      const isAdminIntent = params.get('admin') === '1';
      navigate(next || (isAdminIntent ? '/profile' : '/profile'));
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to sign in. Please double-check your details.');
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to continue collaborating with our crew.">
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500" htmlFor="login-email">
            Email
          </label>
          <div className="relative">
            <FiMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="login-email"
              className="input pl-9"
              placeholder="you@company.com"
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              autoComplete="email"
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500" htmlFor="login-password">
            Password
          </label>
          <div className="relative">
            <FiLock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="login-password"
              type={show ? 'text' : 'password'}
              className="input pl-9 pr-9"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? 'Hide password' : 'Show password'}
            >
              {show ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>
        {error && (
          <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-2 text-sm text-rose-600">
            {error}
          </div>
        )}
        <button className="btn w-full justify-center py-3" type="submit">
          Sign in
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
        <Link to="/register" className="text-brand hover:underline">
          Create account
        </Link>
      </div>
    </AuthLayout>
  );
}
