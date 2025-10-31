import React, { useEffect, useState } from 'react';
import api from '../lib/axios.js';

const EMPTY_FORM = { title: '', description: '', priceFrom: 0, active: true };

export default function Services() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      const { data } = await api.get('/content/services');
      setList(data.services || []);
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
      await api.post('/content/services', form);
      setForm(EMPTY_FORM);
      await load();
    } finally {
      setLoading(false);
    }
  };

  const del = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/content/services/${id}`);
      await load();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="app-glow overflow-hidden rounded-[32px] border border-white/60 bg-white/90 p-6 shadow-soft md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Content</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Services</h1>
        <p className="mt-2 text-sm text-slate-500">
          Publish or update the offerings showcased on the marketing site. Edits reflect instantly for visitors.
        </p>
      </header>

      <form onSubmit={add} className="card space-y-4 border-white/55 bg-white/90">
        <div className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Add service</div>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            className="input"
            placeholder="Service title"
            value={form.title}
            onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
          />
          <input
            className="input"
            placeholder="Starting price (Rs.)"
            type="number"
            min="0"
            value={form.priceFrom}
            onChange={(event) => {
              const value = Number(event.target.value);
              setForm((current) => ({ ...current, priceFrom: Number.isNaN(value) ? 0 : Math.max(0, value) }));
            }}
          />
        </div>
        <textarea
          className="textarea"
          rows={4}
          placeholder="Describe what this service includes and the outcomes clients can expect."
          value={form.description}
          onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
        />
        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(event) => setForm((current) => ({ ...current, active: event.target.checked }))}
          />
          Active on site
        </label>
        <button className="btn w-full justify-center" type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Publish service'}
        </button>
      </form>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((service) => (
          <article key={service._id || service.key || service.title} className="card border-white/55 bg-white/90">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">{service.title}</h2>
                <p className="mt-2 text-sm text-slate-500">{service.description}</p>
              </div>
              <span className="inline-flex rounded-full border border-white/60 bg-white/80 px-3 py-1 text-[0.7rem] font-semibold text-brand">
                Rs. {Number(service.priceFrom || 0).toLocaleString()}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              <span>{service.active ? 'Visible' : 'Hidden'}</span>
              {service._id && (
                <button
                  type="button"
                  className="text-rose-500 hover:underline"
                  onClick={() => del(service._id)}
                  disabled={loading}
                >
                  Delete
                </button>
              )}
            </div>
          </article>
        ))}
        {list.length === 0 && <div className="card border-white/55 bg-white/90 text-sm text-slate-500">No services added yet.</div>}
      </section>
    </div>
  );
}
