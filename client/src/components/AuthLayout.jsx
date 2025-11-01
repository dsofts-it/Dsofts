import React from 'react';
import PageTransition from './PageTransition.jsx';
import logo from '../assets/dsofts-logo.jpg';

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <PageTransition>
      <div className="flex min-h-[75vh] w-full items-center justify-center bg-mesh-light px-4 py-12">
        <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/60 bg-white/95 p-8 shadow-soft">
          <div className="absolute -top-24 -left-20 h-48 w-48 rounded-full bg-gradient-to-br from-brand/15 to-accent/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br from-accent/20 to-brand/15 blur-3xl" />
          <div className="mb-6 flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-2xl shadow-soft">
              <img src={logo} alt="Dsofts logo" className="h-full w-full object-cover" />
              <span className="absolute inset-0 rounded-2xl border border-white/50" />
            </div>
            <div>
              <div className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-brand">Dsofts Access</div>
              <div className="text-xs font-semibold text-slate-500">Sign in to manage your projects</div>
            </div>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">{title}</h2>
          {subtitle && <p className="mt-2 text-sm text-slate-500">{subtitle}</p>}
          <div className="mt-6 space-y-4">{children}</div>
        </div>
      </div>
    </PageTransition>
  );
}
