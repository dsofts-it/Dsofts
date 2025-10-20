import React from 'react';
import PageTransition from './PageTransition.jsx';

export default function AuthLayout({ title, subtitle, children }){
  return (
    <PageTransition>
      <div className="min-h-[60vh] grid md:grid-cols-2 gap-6 items-center">
        <div className="hidden md:block">
          <div className="rounded-2xl border border-slate-800 p-8 bg-gradient-to-br from-slate-900/70 to-slate-800/30 shadow-soft">
            <h3 className="text-3xl font-extrabold text-brand">Dsofts IT Services</h3>
            <p className="text-slate-300 mt-2">Build websites, Android apps and payment‑ready platforms with us.</p>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-300">
              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">Fast Delivery</div>
              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">Affordable Pricing</div>
              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">Secure & Scalable</div>
              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">Support</div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-6 shadow-soft">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          {subtitle && <div className="text-slate-400 mb-3">{subtitle}</div>}
          {children}
        </div>
      </div>
    </PageTransition>
  );
}
