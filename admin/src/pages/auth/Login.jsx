import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import logo from '../../assets/studio-mark.jpg';

export default function AdminLogin() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed');
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
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Sign in</h1>
          <p className="mt-2 text-sm text-slate-500">
            Restricted area for internal teams. Use the credentials shared with you.
          </p>
        </div>
        <form onSubmit={submit} className="space-y-4 text-left">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500" htmlFor="admin-email">
              Email
            </label>
            <input
              id="admin-email"
              className="input"
              placeholder="team@studio.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500" htmlFor="admin-password">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              className="input"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          {error && (
            <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-2 text-sm text-rose-600">{error}</div>
          )}
          <button className="btn w-full justify-center py-3" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
