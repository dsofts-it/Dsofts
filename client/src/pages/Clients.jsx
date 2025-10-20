import React, { useEffect, useState } from 'react';
import api from '../lib/axios.js';
import PageTransition from '../components/PageTransition.jsx';

export default function Clients() {
  const [clients, setClients] = useState([]);
  useEffect(() => {
    (async () => {
      try { const { data } = await api.get('/content/clients'); setClients(data.clients || []); } catch {}
    })();
  }, []);
  return (
    <PageTransition>
      <h2 className="section-title">Happy Clients</h2>
      <p className="muted">Some of the businesses we’ve served.</p>
      <div className="grid">
        {clients.length === 0 && <div className="muted">No clients added yet. Seed from backend.</div>}
        {clients.map((c) => (
          <a key={c._id} className="card" href={c.website} target="_blank" rel="noreferrer">
            <h3>{c.name}</h3>
            <p className="muted">{c.website}</p>
            {c.testimonial && <p>“{c.testimonial}”</p>}
          </a>
        ))}
      </div>
    </PageTransition>
  );
}
