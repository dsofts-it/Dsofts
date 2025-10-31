import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import AuthLayout from '../../components/AuthLayout.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
          <input
            id="login-email"
            className="input"
            placeholder="you@company.com"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500" htmlFor="login-password">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            className="input"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {error && (
          <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-2 text-sm text-rose-600">
            {error}
          </div>
        )}
        <button className="btn w-full justify-center py-3" type="submit">
          Sign in
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
