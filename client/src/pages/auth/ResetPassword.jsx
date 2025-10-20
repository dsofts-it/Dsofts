import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../lib/axios.js';
import AuthLayout from '../../components/AuthLayout.jsx';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/reset-password', { token, ...form });
      setMsg(data.message);
      setTimeout(() => navigate('/login'), 1000);
    } catch (e) {
      setMsg(e.response?.data?.message || 'Failed');
    }
  };

  return (
    <AuthLayout title="Reset password" subtitle="Enter and confirm your new password">
      <form onSubmit={submit}>
        <input type="password" className="input" placeholder="New password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
        <div className="spacer"></div>
        <input type="password" className="input" placeholder="Confirm password" value={form.confirmPassword} onChange={e=>setForm({...form,confirmPassword:e.target.value})} />
        <div className="spacer"></div>
        {msg && <div className="muted">{msg}</div>}
        <button className="btn" type="submit">Update</button>
      </form>
    </AuthLayout>
  );
}
