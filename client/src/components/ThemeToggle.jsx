import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
  // Default to light theme
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <button className="btn secondary" onClick={() => setDark((v) => !v)} title="Toggle theme">
      {dark ? 'Light' : 'Dark'}
    </button>
  );
}
