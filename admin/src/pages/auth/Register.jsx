import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AdminRegister(){
  const { register } = useAuth();
  const [form, setForm] = useState({ name:'', email:'', password:'', confirmPassword:'' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try { await register(form); navigate('/'); }
    catch (e) { setError(e.response?.data?.message || e.message || 'Registration failed'); }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-b from-white to-blue-50/30 text-slate-800 px-4">
      <div className="w-full max-w-md card">
        <div className="text-xl font-bold mb-2">Create Admin Account</div>
        <form onSubmit={submit} className="space-y-3">
          <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          <input className="input" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          <input type="password" className="input" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
          <input type="password" className="input" placeholder="Confirm password" value={form.confirmPassword} onChange={e=>setForm({...form,confirmPassword:e.target.value})} />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button className="btn w-full" type="submit">Register</button>
        </form>
        <div className="text-xs text-slate-500 mt-3">Note: grant admin role in DB for this account.</div>
      </div>
    </div>
  );
}

