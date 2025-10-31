import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../lib/axios.js';
import AuthLayout from '../../components/AuthLayout.jsx';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post('/auth/reset-password', { token, ...form });
      setMessage(data.message);
      setTimeout(() => navigate('/login'), 1200);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to reset password. Please try again.');
    }
  };

  return (
    <AuthLayout title="Set a new password" subtitle="Secure your account with an updated password.">
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500" htmlFor="reset-password">
            New password
          </label>
          <input
            id="reset-password"
            type="password"
            className="input"
            placeholder="Create a strong password"
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500" htmlFor="reset-confirm">
            Confirm password
          </label>
          <input
            id="reset-confirm"
            type="password"
            className="input"
            placeholder="Repeat password"
            value={form.confirmPassword}
            onChange={(event) => setForm((current) => ({ ...current, confirmPassword: event.target.value }))}
          />
        </div>
        {message && (
          <div className="rounded-2xl border border-brand/20 bg-brand/10 px-4 py-2 text-sm text-brand">
            {message}
          </div>
        )}
        <button className="btn w-full justify-center py-3" type="submit">
          Update password
        </button>
      </form>
    </AuthLayout>
  );
}
