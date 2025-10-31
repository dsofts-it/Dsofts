import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { FiMenu, FiX, FiLogIn, FiUserPlus } from 'react-icons/fi';
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
import Loader from './components/Loader.jsx';
import PageTransition from './components/PageTransition.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import logo from './assets/dsofts-logo.jpg';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: '/services', label: 'Services' },
    { to: '/clients', label: 'Our Work' },
    { to: '/project-builder', label: 'Project Planner' },
    { to: '/about', label: 'Studio' },
    { to: '/contact', label: 'Contact' },
    ...(user ? [{ to: '/pay', label: 'Payments' }] : []),
  ];

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname === to || location.pathname.startsWith(`${to}/`);
  };

  const desktopAuth = user ? (
    <div className="flex items-center gap-3">
      <Link
        to="/profile"
        className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-white/60 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand/50 hover:text-brand"
      >
        Hi, {user.name.split(' ')[0]}
      </Link>
      <button
        type="button"
        onClick={logout}
        className="inline-flex items-center gap-2 rounded-xl border border-brand/20 bg-white/80 px-3 py-2 text-sm font-semibold text-brand transition hover:border-brand hover:bg-white"
      >
        Logout
      </button>
    </div>
  ) : (
    <>
      {location.pathname !== '/login' && (
        <Link
          to="/login"
          className="inline-flex items-center gap-2 rounded-xl border border-brand/20 bg-white/80 px-3 py-2 text-sm font-semibold text-brand transition hover:border-brand"
        >
          <FiLogIn className="hidden sm:block" />
          Login
        </Link>
      )}
      {location.pathname !== '/register' && (
        <Link to="/register" className="btn hidden sm:inline-flex">
          <FiUserPlus className="hidden md:block" />
          Register
        </Link>
      )}
    </>
  );

  const mobileAuth = user ? (
    <>
      <Link
        to="/profile"
        className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-brand/10 hover:text-brand"
      >
        Profile
      </Link>
      <button
        type="button"
        onClick={logout}
        className="rounded-xl px-3 py-2 text-left text-sm font-semibold text-brand hover:bg-brand/10"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      {location.pathname !== '/login' && (
        <Link to="/login" className="rounded-xl px-3 py-2 text-sm font-semibold text-brand hover:bg-brand/10">
          Login
        </Link>
      )}
      {location.pathname !== '/register' && (
        <Link to="/register" className="btn w-full justify-center">
          Register
        </Link>
      )}
    </>
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-[-320px] h-[480px] bg-hero-glow opacity-90 blur-3xl" />
      <nav className="sticky top-6 z-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="app-glow flex items-center gap-3 px-4 py-3 md:px-6 md:py-4">
            <Link to="/" className="relative flex items-center transition hover:scale-[1.02]">
              <div className="relative h-11 w-11 overflow-hidden rounded-2xl shadow-soft">
                <img src={logo} alt="Studio logo" className="h-full w-full object-cover" />
                <span className="absolute inset-0 rounded-2xl border border-white/50" />
              </div>
            </Link>
            <div className="hidden flex-1 items-center gap-1 pl-4 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`group relative inline-flex items-center overflow-hidden rounded-xl px-3 py-2 text-sm font-semibold transition ${
                    isActive(link.to) ? 'text-brand' : 'text-slate-600 hover:text-brand'
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  <span
                    className={`absolute inset-0 rounded-xl bg-brand/10 transition-opacity duration-200 ${
                      isActive(link.to) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </Link>
              ))}
            </div>
            <div className="hidden items-center gap-2 md:flex">
              <ThemeToggle />
              {desktopAuth}
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
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                    isActive(link.to) ? 'bg-brand/10 text-brand' : 'text-slate-700 hover:bg-brand/10 hover:text-brand'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="my-3 h-px bg-white/60" />
              <div className="flex flex-col gap-2">{mobileAuth}</div>
              <div className="pt-2">
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </nav>
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 pt-12 md:pt-16">
        <PageTransition>{children}</PageTransition>
      </div>
      <footer className="relative z-10 mx-auto mt-20 w-full max-w-6xl px-4 pb-10">
        <div className="app-glow flex flex-col gap-6 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-2xl shadow-soft">
              <img src={logo} alt="Studio mark" className="h-full w-full object-cover" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-800">We design and ship digital experiences.</div>
              <div className="text-xs text-slate-500">&copy; {new Date().getFullYear()} Studio Collective · Pune · +91 90000 00000</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
            <a href="mailto:hello@studiocollective.design" className="transition hover:text-brand">
              hello@studiocollective.design
            </a>
            <Link to="/project-builder" className="transition hover:text-brand">
              Project Planner
            </Link>
            <Link to="/contact" className="transition hover:text-brand">
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </footer>
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

  useEffect(() => {
    fetch((import.meta.env.VITE_API_URL || 'http://localhost:5000/api') + '/metrics/visit', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: location.pathname + location.search }),
    }).catch(() => {});
  }, [location.pathname, location.search]);

  return (
    <AuthProvider>
      {bootLoading && <Loader />}
      {!bootLoading && (
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/project-builder" element={<ProjectBuilder />} />
            <Route
              path="/pay"
              element={(
                <Protected>
                  <Payment />
                </Protected>
              )}
            />
            <Route
              path="/payment-result"
              element={(
                <Protected>
                  <PaymentResult />
                </Protected>
              )}
            />
            <Route
              path="/profile"
              element={(
                <Protected>
                  <Profile />
                </Protected>
              )}
            />
            <Route
              path="/payments/history"
              element={(
                <Protected>
                  <PaymentsHistory />
                </Protected>
              )}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      )}
    </AuthProvider>
  );
}
