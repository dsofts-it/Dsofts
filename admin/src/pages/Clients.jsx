import React, { useEffect, useState } from 'react';
import api from '../lib/axios.js';

const EMPTY = { name: '', website: '', logoUrl: '', testimonial: '' };

export default function Clients() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      const { data } = await api.get('/content/clients');
      setList(data.clients || []);
    } catch {
      setList([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const add = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await api.post('/content/clients', form);
      setForm(EMPTY);
      await load();
    } finally {
      setLoading(false);
    }
  };

  const del = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/content/clients/${id}`);
      await load();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="app-glow overflow-hidden rounded-[32px] border border-white/60 bg-white/90 p-6 shadow-soft md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Showcase</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Clients</h1>
        <p className="mt-2 text-sm text-slate-500">
          Keep the public case studies up to date with the brands you are helping. Testimonials appear on the client
          spotlight page instantly.
        </p>
      </header>

      <form onSubmit={add} className="card space-y-4 border-white/55 bg-white/90">
        <div className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Add client</div>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            className="input"
            placeholder="Client name"
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          />
          <input
            className="input"
            placeholder="Website (https://...)"
            value={form.website}
            onChange={(event) => setForm((current) => ({ ...current, website: event.target.value }))}
          />
        </div>
        <input
          className="input"
          placeholder="Logo URL (optional)"
          value={form.logoUrl}
          onChange={(event) => setForm((current) => ({ ...current, logoUrl: event.target.value }))}
        />
        <textarea
          className="textarea"
          rows={4}
          placeholder="Testimonial or highlight"
          value={form.testimonial}
          onChange={(event) => setForm((current) => ({ ...current, testimonial: event.target.value }))}
        />
        <button className="btn w-full justify-center" type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Publish client story'}
        </button>
      </form>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((client) => (
          <article key={client._id || client.website} className="card border-white/55 bg-white/90 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold text-slate-900">{client.name}</div>
                <div className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  {client.website?.replace(/^https?:\/\//, '') || 'No website'}
                </div>
              </div>
              {client.logoUrl && (
                <img src={client.logoUrl} alt={client.name} className="h-10 w-10 rounded-lg object-cover" />
              )}
            </div>
            {client.testimonial && <p className="text-sm text-slate-500">"{client.testimonial}"</p>}
            <div className="flex items-center justify-end">
              <button
                type="button"
                className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-500 hover:underline"
                onClick={() => del(client._id)}
                disabled={loading}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
        {list.length === 0 && <div className="card border-white/55 bg-white/90 text-sm text-slate-500">No clients added yet.</div>}
      </section>
    </div>
  );
}
