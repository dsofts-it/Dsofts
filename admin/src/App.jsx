import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiLayout, FiLayers, FiUsers, FiLogOut } from 'react-icons/fi';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import AdminLogin from './pages/auth/Login.jsx';
import AdminRegister from './pages/auth/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Services from './pages/Services.jsx';
import Clients from './pages/Clients.jsx';
import logo from './assets/studio-mark.jpg';
import './index.css';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: FiLayout },
  { to: '/services', label: 'Services', icon: FiLayers },
  { to: '/clients', label: 'Clients', icon: FiUsers },
];

const Protected = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-14 w-14 overflow-hidden rounded-2xl shadow-soft">
            <img src={logo} alt="Studio mark" className="h-full w-full object-cover" />
          </div>
          <p className="text-sm font-semibold text-slate-500">Checking access&hellip;</p>
        </div>
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') {
    return (
      <div className="min-h-screen grid place-items-center px-4">
        <div className="card max-w-md text-center">
          <div className="text-lg font-semibold text-slate-800">Admin access required</div>
          <div className="mt-2 text-sm text-slate-500">Please login with an administrator account to continue.</div>
        </div>
      </div>
    );
  }
  return children;
};

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isAdmin = user && user.role === 'admin';

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-[-280px] h-[420px] bg-hero-glow opacity-90 blur-3xl" />
      {isAdmin && (
        <nav className="sticky top-6 z-40">
          <div className="mx-auto max-w-6xl px-4">
            <div className="app-glow flex items-center gap-3 px-4 py-3 md:px-6 md:py-4">
              <Link to="/" className="flex items-center gap-3">
                <div className="relative h-11 w-11 overflow-hidden rounded-2xl shadow-soft">
                  <img src={logo} alt="Studio logo" className="h-full w-full object-cover" />
                  <span className="absolute inset-0 rounded-2xl border border-white/50" />
                </div>
                <span className="hidden text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-brand sm:inline">
                  Admin
                </span>
              </Link>
              <div className="hidden flex-1 items-center gap-1 pl-4 md:flex">
                {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
                  const active = location.pathname === to || location.pathname.startsWith(`${to}/`);
                  return (
                    <Link
                      key={to}
                      to={to}
                      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-3 py-2 text-sm font-semibold transition ${
                        active ? 'text-brand' : 'text-slate-600 hover:text-brand'
                      }`}
                    >
                      <Icon className="relative z-10" />
                      <span className="relative z-10">{label}</span>
                      <span
                        className={`absolute inset-0 rounded-xl bg-brand/10 transition-opacity duration-200 ${
                          active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                      />
                    </Link>
                  );
                })}
              </div>
              <div className="hidden items-center gap-3 md:flex">
                <div className="rounded-xl border border-white/60 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-600">
                  {user?.name}
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex items-center gap-2 rounded-xl border border-brand/20 bg-white/80 px-3 py-2 text-sm font-semibold text-brand transition hover:border-brand hover:bg-white"
                >
                  <FiLogOut /> Logout
                </button>
              </div>
              <button
                type="button"
                className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/50 bg-white/70 text-slate-700 transition hover:border-brand/50 hover:text-brand md:hidden"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>
          </div>
          {menuOpen && (
            <div className="mx-auto mt-3 w-full max-w-6xl px-4 md:hidden">
              <div className="app-glow flex flex-col gap-2 px-4 py-4">
                {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
                  const active = location.pathname === to || location.pathname.startsWith(`${to}/`);
                  return (
                    <Link
                      key={to}
                      to={to}
                      className={`inline-flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                        active ? 'bg-brand/10 text-brand' : 'text-slate-700 hover:bg-brand/10 hover:text-brand'
                      }`}
                    >
                      <Icon />
                      {label}
                    </Link>
                  );
                })}
                <div className="my-3 h-px bg-white/60" />
                <div className="flex items-center justify-between gap-3 rounded-xl border border-white/60 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-600">
                  <span>{user?.name}</span>
                  <button type="button" onClick={logout} className="text-brand">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>
      )}
      <main
        className={`relative z-10 mx-auto w-full max-w-6xl px-4 ${isAdmin ? 'pb-16 pt-10 md:pt-16' : 'py-14'}`}
      >
        {children}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/register" element={<AdminRegister />} />
          <Route
            path="/"
            element={(
              <Protected>
                <Dashboard />
              </Protected>
            )}
          />
          <Route
            path="/services"
            element={(
              <Protected>
                <Services />
              </Protected>
            )}
          />
          <Route
            path="/clients"
            element={(
              <Protected>
                <Clients />
              </Protected>
            )}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}
