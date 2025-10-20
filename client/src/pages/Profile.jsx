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
    setTimeout(()=>setMsg(''), 1000);
  };

  return (
    <div>
      <h2 className="section-title">My Profile</h2>
      <div className="card" style={{maxWidth:560}}>
        <form onSubmit={submit}>
          <input className="input" placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          <div className="spacer"></div>
          <input className="input" placeholder="Avatar URL (optional)" value={form.avatar} onChange={e=>setForm({...form,avatar:e.target.value})} />
          <div className="spacer"></div>
          {msg && <div className="muted">{msg}</div>}
          <button className="btn" type="submit">Save</button>
        </form>
      </div>
      <div className="spacer" />
      <Link className="btn" to="/payments/history">View Payment History</Link>
    </div>
  );
}
