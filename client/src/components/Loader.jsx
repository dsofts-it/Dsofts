import React from 'react';

export default function Loader() {
  return (
    <div className="fixed inset-0 grid place-items-center bg-white z-50">
      <div className="text-center">
        <div className="text-3xl font-extrabold text-brand animate-pulse">Dsofts IT</div>
        <div className="text-sm text-slate-500 mt-2">Loading…</div>
      </div>
    </div>
  );
}
