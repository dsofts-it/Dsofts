import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../lib/axios.js';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', avatar: user?.avatar || '' });
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const { data } = await api.put('/auth/profile', form);
    setUser(data.user);
    setMsg('Profile updated');
    setTimeout(() => setMsg(''), 1000);
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-extrabold text-slate-900">My Profile</h2>
        <form onSubmit={submit} className="mt-4">
          <input className="input" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <div className="h-3" />
          <input className="input" placeholder="Avatar URL (optional)" value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} />
          <div className="h-3" />
          {msg && <div className="text-green-700">{msg}</div>}
          <div className="h-3" />
          <button className="btn" type="submit">Save</button>
        </form>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="font-semibold text-slate-900">Quick actions</div>
        <div className="mt-3 flex flex-col gap-2">
          <Link className="btn secondary" to="/payments/history">View Payment History</Link>
          <Link className="btn secondary" to="/project-builder">Build a Project</Link>
        </div>
      </div>
    </div>
  );
}

