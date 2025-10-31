import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../lib/axios.js';
import PageTransition from '../components/PageTransition.jsx';

export default function Profile() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', avatar: user?.avatar || '' });
  const [flash, setFlash] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    const { data } = await api.put('/auth/profile', form);
    setUser(data.user);
    setFlash('Profile updated');
    setTimeout(() => setFlash(''), 1500);
  };

  return (
    <PageTransition>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr),320px]">
        <section className="card border-white/55 bg-white/90">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Profile</h1>
          <p className="mt-2 text-sm text-slate-500">Keep your details fresh so we can collaborate without friction.</p>
          <form className="mt-6 space-y-4" onSubmit={submit}>
            <input
              className="input"
              placeholder="Your name"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            />
            <input
              className="input"
              placeholder="Avatar URL (optional)"
              value={form.avatar}
              onChange={(event) => setForm((current) => ({ ...current, avatar: event.target.value }))}
            />
            {flash && <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700">{flash}</div>}
            <button className="btn" type="submit">
              Save changes
            </button>
          </form>
        </section>
        <aside className="app-glow space-y-4 rounded-[32px] border border-white/60 bg-white/90 p-6 shadow-soft">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Quick actions</div>
            <div className="mt-3 flex flex-col gap-3">
              <Link className="btn w-full justify-center" to="/project-builder">
                Plan a new project
              </Link>
              <Link
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/60 bg-white/85 px-4 py-2 text-sm font-semibold text-brand transition hover:border-brand"
                to="/payments/history"
              >
                View payment history
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-white/60 bg-white/80 p-4 text-sm text-slate-500">
            Need any help from our team? Reach us any time at{' '}
            <a className="font-semibold text-brand" href="mailto:hello@studiocollective.design">
              hello@studiocollective.design
            </a>
            .
          </div>
        </aside>
      </div>
    </PageTransition>
  );
}
