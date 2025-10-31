import React from 'react';
import PageTransition from './PageTransition.jsx';
import logo from '../assets/dsofts-logo.jpg';

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <PageTransition>
      <div className="min-h-[70vh] w-full flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <img src={logo} alt="Dsofts IT" className="h-8" onError={(e)=>{e.currentTarget.style.display='none'}} />
            <div className="text-slate-900 font-extrabold text-lg">Dsofts IT Services</div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
          {subtitle && <div className="text-slate-600 mb-4">{subtitle}</div>}
          {children}
        </div>
      </div>
    </PageTransition>
  );
}
