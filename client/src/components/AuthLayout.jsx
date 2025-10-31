import React from 'react';
import PageTransition from './PageTransition.jsx';
import logo from '../assets/dsofts-logo.jpg';

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <PageTransition>
      <div className="flex min-h-[75vh] w-full items-center justify-center px-4 py-12">
        <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/60 bg-white/90 p-8 shadow-soft">
          <div className="absolute -top-32 right-[-120px] h-40 w-40 rounded-full bg-gradient-to-br from-brand/20 to-accent/20 blur-3xl" />
          <div className="flex items-center gap-3 mb-6">
            <div className="relative h-12 w-12 overflow-hidden rounded-2xl shadow-soft">
              <img src={logo} alt="Studio logo" className="h-full w-full object-cover" />
              <span className="absolute inset-0 rounded-2xl border border-white/50" />
            </div>
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-brand">
              Studio Access
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">{title}</h2>
          {subtitle && <p className="mt-2 text-sm text-slate-500">{subtitle}</p>}
          <div className="mt-6 space-y-4">{children}</div>
        </div>
      </div>
    </PageTransition>
  );
}
