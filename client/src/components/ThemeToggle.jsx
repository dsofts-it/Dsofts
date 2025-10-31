import React, { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    }
  }, [dark]);

  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-xl border border-white/60 bg-white/70 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand/50 hover:text-brand md:text-xs"
      onClick={() => setDark((v) => !v)}
      title="Toggle theme"
    >
      {dark ? <FiSun className="text-brand" /> : <FiMoon className="text-brand" />}
      <span className="hidden sm:inline">{dark ? 'Light' : 'Dark'} mode</span>
    </button>
  );
}
