import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AdminLogin(){
  const { login } = useAuth();
  const [email, setEmail] = useState('rohandede97@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try { await login(email, password); navigate('/'); }
    catch (e) { setError(e.response?.data?.message || e.message || 'Login failed'); }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-b from-white to-blue-50/30 text-slate-800 px-4">
      <div className="w-full max-w-md card">
        <div className="text-xl font-bold mb-2">Dsofts Admin</div>
        <form onSubmit={submit} className="space-y-3">
          <input className="input" placeholder="Admin email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input type="password" className="input" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button className="btn w-full" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
