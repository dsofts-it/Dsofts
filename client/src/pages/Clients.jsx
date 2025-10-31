import React, { useEffect, useState } from 'react';
import api from '../lib/axios.js';
import PageTransition from '../components/PageTransition.jsx';

export default function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/content/clients');
        setClients(data.clients || []);
      } catch {
        setClients([]);
      }
    })();
  }, []);

  return (
    <PageTransition>
      <div className="space-y-10">
        <header className="app-glow overflow-hidden rounded-[32px] border border-white/60 bg-white/90 p-8 shadow-soft md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Client stories</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-[40px]">
            Partnering with founders and teams shipping the future.
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-slate-500 md:text-base">
            We build for a spectrum of industries: fintech platforms, marketplace operators, learning startups, logistics
            intelligence and beyond. Each engagement packs strategy, design, engineering and growth into one autonomous pod.
          </p>
        </header>

        {clients.length === 0 ? (
          <div className="card text-center text-slate-500">
            Client showcases will appear once they are added from the admin console.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {clients.map((client) => (
              <a
                key={client._id || client.website || client.name}
                href={client.website}
                target="_blank"
                rel="noreferrer"
                className="card group relative overflow-hidden border-white/55 bg-white/90 transition hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{client.name}</h2>
                    {client.website && (
                      <p className="mt-1 text-xs uppercase tracking-[0.3em] text-slate-400">{client.website.replace(/^https?:\/\//, '')}</p>
                    )}
                  </div>
                  <span className="inline-flex rounded-full border border-white/60 bg-white/80 px-3 py-1 text-[0.7rem] font-semibold text-brand">
                    Case study
                  </span>
                </div>
                {client.testimonial && (
                  <blockquote className="mt-4 text-sm text-slate-500">
                    "{client.testimonial}"
                  </blockquote>
                )}
                {client.highlights && client.highlights.length > 0 && (
                  <ul className="mt-4 space-y-2 text-sm text-slate-500">
                    {client.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-[7px] inline-block h-1.5 w-1.5 rounded-full bg-brand/70" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
