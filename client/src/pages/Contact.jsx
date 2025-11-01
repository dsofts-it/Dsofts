import React, { useState } from 'react';
import PageTransition from '../components/PageTransition.jsx';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <PageTransition>
        <div className="app-glow mx-auto max-w-xl rounded-[32px] border border-white/60 bg-white/90 p-8 text-center shadow-soft">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Message received</div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Thanks for reaching out!</h2>
          <p className="mt-3 text-sm text-slate-500">
            We&apos;ll reply to <strong>{form.email || 'your inbox'}</strong> within 24 hours with next steps. Looking forward to building
            something remarkable together.
          </p>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="space-y-10">
        <header className="app-glow overflow-hidden rounded-[32px] border border-white/60 bg-white/90 p-8 shadow-soft md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Let&apos;s talk</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-[40px]">
            Brief us in five minutes and we&apos;ll prep the right squad.
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-500 md:text-base">
            Whether you have a Figma prototype, a pitch deck or just a hunch, we&apos;ll help shape the next move. Share a few
            details and we&apos;ll respond with a tailored plan, budget considerations and timeline ideas.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr),320px]">
          <form className="card space-y-4 border-white/55 bg-white/90" onSubmit={submit}>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="input"
                placeholder="Your name"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              />
              <input
                className="input"
                placeholder="Work email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="input"
                placeholder="Phone / WhatsApp"
                value={form.phone}
                onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
              />
              <select
                className="select"
                value={form.timeline || ''}
                onChange={(event) => setForm((current) => ({ ...current, timeline: event.target.value }))}
              >
                <option value="">Ideal launch window</option>
                <option value="now">ASAP</option>
                <option value="3weeks">In 3-6 weeks</option>
                <option value="quarter">This quarter</option>
                <option value="unsure">Not sure yet</option>
              </select>
            </div>
            <textarea
              className="textarea"
              rows={6}
              placeholder="Tell us about the product, problem or goal."
              value={form.message}
              onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-500">
                We respect your inbox. Expect a thoughtful response, not a sales script.
              </p>
              <button className="btn sm:w-auto" type="submit">
                Share project details
              </button>
            </div>
          </form>

          <aside className="app-glow space-y-5 rounded-[32px] border border-white/60 bg-white/90 p-6 shadow-soft">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Direct line</div>
              <div className="mt-2 text-sm font-semibold text-slate-900">dsoft.itservies.gmail.com</div>
              <div className="text-sm text-slate-500">WhatsApp/Cell: +91 8446031622</div>
            </div>
            <div className="rounded-2xl border border-white/60 bg-white/80 p-4 text-sm text-slate-500">
              Prefer WhatsApp? Drop your number and we&apos;ll send over a quick intro and availability.
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Availability</div>
              <div className="mt-2 text-sm text-slate-500">
                We dedicate two new build slots and one refresh slot per month. The next window opens{' '}
                <strong>{new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}</strong>.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </PageTransition>
  );
}
