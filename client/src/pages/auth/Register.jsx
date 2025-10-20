import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { FcGoogle } from 'react-icons/fc';

export default function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(form);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-[70vh] grid place-items-center">
      <div className="w-full max-w-md card">
        <h2 className="text-2xl font-bold mb-2 text-slate-900">Create account</h2>
        <form onSubmit={submit} className="space-y-3">
          <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          <input className="input" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          <input type="password" className="input" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
          <input type="password" className="input" placeholder="Confirm password" value={form.confirmPassword} onChange={e=>setForm({...form,confirmPassword:e.target.value})} />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button className="btn w-full py-3" type="submit">Register</button>
        </form>
        <div className="mt-3" />
        <a href={`${import.meta.env.VITE_API_URL?.replace('/api','') || 'http://localhost:5000'}/api/auth/google`} className="btn secondary w-full flex items-center justify-center gap-2 py-3"><FcGoogle size={18}/> Continue with Google</a>
        <div className="mt-4 text-sm flex items-center justify-between">
          <a className="text-brand" href="/forgot-password">Forgot password?</a>
          <a className="text-brand" href="/login">Sign in</a>
        </div>
      </div>
    </div>
  );
}
