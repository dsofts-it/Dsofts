import React from 'react';
import logo from '../assets/dsofts-logo.jpg';

export default function Loader() {
  return (
    <div className="loader">
      <div className="flex flex-col items-center gap-5 text-white">
        <div className="relative h-16 w-16 overflow-hidden rounded-3xl shadow-glow animate-float-slow">
          <img src={logo} alt="Studio mark" className="h-full w-full object-cover" />
          <span className="absolute inset-0 rounded-3xl border border-white/40" />
        </div>
        <div className="pulse">LOADING</div>
      </div>
    </div>
  );
}
