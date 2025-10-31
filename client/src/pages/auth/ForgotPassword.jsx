import React, { useState } from 'react';
import api from '../../lib/axios.js';
import AuthLayout from '../../components/AuthLayout.jsx';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    await api.post('/auth/forgot-password', { email });
    setSent(true);
  };

  return (
    <AuthLayout title="Reset access" subtitle="Enter your email and weʼll send you a secure link.">
      {sent ? (
        <div className="rounded-2xl border border-brand/20 bg-brand/10 px-4 py-3 text-sm text-brand">
          If an account exists for <strong>{email}</strong>, you&apos;ll receive a reset link shortly.
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500" htmlFor="forgot-email">
              Email
            </label>
            <input
              id="forgot-email"
              className="input"
              placeholder="you@company.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <button className="btn w-full justify-center py-3" type="submit">
            Send reset link
          </button>
        </form>
      )}
    </AuthLayout>
  );
}
