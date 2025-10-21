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
      } catch {}
    })();
  }, []);
  return (
    <PageTransition>
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Happy Clients</h2>
          <p className="text-slate-600">Some of the businesses we’ve served.</p>
        </div>
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {clients.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-slate-500">
            No clients added yet. Add them from Admin > Content.
          </div>
        )}
        {clients.map((c) => (
          <a
            key={c._id}
            className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition group overflow-hidden"
            href={c.website}
            target="_blank"
            rel="noreferrer"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand to-brandLight opacity-70" />
            <h3 className="text-lg font-semibold text-slate-900">{c.name}</h3>
            <p className="text-slate-500 text-sm">{c.website}</p>
            {c.testimonial && (
              <p className="text-slate-700 mt-3 italic">“{c.testimonial}”</p>
            )}
          </a>
        ))}
      </div>
    </PageTransition>
  );
}

