import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import Clients from './pages/Clients.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import ForgotPassword from './pages/auth/ForgotPassword.jsx';
import ResetPassword from './pages/auth/ResetPassword.jsx';
import Profile from './pages/Profile.jsx';
import ProjectBuilder from './pages/ProjectBuilder.jsx';
import Payment from './pages/Payment.jsx';
import PaymentResult from './pages/PaymentResult.jsx';
import PaymentsHistory from './pages/PaymentsHistory.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import AdminApp from './admin/AdminApp.jsx';
import Loader from './components/Loader.jsx';
import PageTransition from './components/PageTransition.jsx';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="max-w-[1160px] mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <img src="/dsofts-logo.png" alt="Dsofts IT" className="h-7" onError={(e)=>{e.currentTarget.style.display='none'}} />
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand to-brandLight grid place-items-center text-white font-black">D</div>
            <Link to="/">Dsofts IT Services</Link>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link to="/services" className="hover:text-blue-600 transition">Services</Link>
            <Link to="/clients" className="hover:text-blue-600 transition">Happy Clients</Link>
            <Link to="/project-builder" className="hover:text-blue-600 transition">Project Builder</Link>
            <Link to="/about" className="hover:text-blue-600 transition">About</Link>
            <Link to="/contact" className="hover:text-blue-600 transition">Contact</Link>
            <Link to="/pay" className="hover:text-blue-600 transition">Pay</Link>
            <Link to="/admin" className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-500 hover:text-blue-600 transition">Admin</Link>
            {user ? (
              <>
                <Link to="/profile" className="hover:text-blue-600 transition">Hi, {user.name.split(' ')[0]}</Link>
                <button className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-500 transition" onClick={logout}>Logout</button>
              </>
            ) : (
              location.pathname !== '/login' && <Link className="px-3 py-1.5 rounded-lg bg-brand text-white hover:opacity-90 transition" to="/login">Login</Link>
            )}
          </div>
        </div>
      </nav>
      <div className="max-w-[1160px] mx-auto px-6 py-6"><PageTransition>{children}</PageTransition></div>
      <footer className="border-t border-slate-200 text-center text-slate-500 py-6">© {new Date().getFullYear()} Dsofts IT — Warje, Pune • +91 90000 00000</footer>
    </div>
  );
};

const Protected = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  return user ? children : <Navigate to="/login" replace />;
};

export default function App() {
  const [bootLoading, setBootLoading] = useState(true);
  const location = useLocation();
  useEffect(() => {
    const t = setTimeout(() => setBootLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  // Track page visits
  useEffect(() => {
    fetch((import.meta.env.VITE_API_URL || 'http://localhost:5000/api') + '/metrics/visit', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: location.pathname + location.search })
    }).catch(()=>{});
  }, [location.pathname, location.search]);

  return (
    <AuthProvider>
      {bootLoading && <Loader />}
      {!bootLoading && (
        <Layout>
          <Routes>
            {/* Public homepage */}
            <Route path="/" element={<Home />} />

            {/* Everything else requires login */}
            <Route path="/services" element={<Protected><Services /></Protected>} />
            <Route path="/clients" element={<Protected><Clients /></Protected>} />
            <Route path="/about" element={<Protected><About /></Protected>} />
            <Route path="/contact" element={<Protected><Contact /></Protected>} />
            <Route path="/project-builder" element={<Protected><ProjectBuilder /></Protected>} />
            <Route path="/pay" element={<Protected><Payment /></Protected>} />
            <Route path="/payment-result" element={<Protected><PaymentResult /></Protected>} />
            <Route path="/profile" element={<Protected><Profile /></Protected>} />
            <Route path="/payments/history" element={<Protected><PaymentsHistory /></Protected>} />
            <Route path="/admin/*" element={<Protected><AdminApp /></Protected>} />

            {/* Auth routes remain open */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Routes>
        </Layout>
      )}
    </AuthProvider>
  );
}
