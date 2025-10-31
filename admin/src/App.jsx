import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import AdminLogin from './pages/auth/Login.jsx';
import AdminRegister from './pages/auth/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Services from './pages/Services.jsx';
import Clients from './pages/Clients.jsx';
import './index.css';

const Protected = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen grid place-items-center">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <div className="min-h-screen grid place-items-center">Admin access required</div>;
  return children;
};

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30 text-slate-800">
      <nav className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="max-w-[1160px] mx-auto px-6 py-3 flex items-center justify-between">
          <div className="font-bold">Dsofts Admin</div>
          <div className="flex items-center gap-2">
            {user && <>
              <Link to="/" className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-blue-50 transition">Dashboard</Link>
              <Link to="/services" className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-blue-50 transition">Services</Link>
              <Link to="/clients" className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-blue-50 transition">Clients</Link>
              <button className="px-3 py-1.5 rounded-lg border border-slate-200" onClick={logout}>Logout</button>
            </>}
          </div>
        </div>
      </nav>
      <div className="max-w-[1160px] mx-auto px-6 py-6">{children}</div>
    </div>
  );
};

export default function App(){
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/register" element={<AdminRegister />} />
          <Route path="/" element={<Protected><Dashboard/></Protected>} />
          <Route path="/services" element={<Protected><Services/></Protected>} />
          <Route path="/clients" element={<Protected><Clients/></Protected>} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

