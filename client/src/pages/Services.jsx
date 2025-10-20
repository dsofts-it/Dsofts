import React, { useEffect, useState } from 'react';
import api from '../lib/axios.js';
import PageTransition from '../components/PageTransition.jsx';

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const run = async () => {
      try { const { data } = await api.get('/content/services'); setServices(data.services || []); } catch {}
    }; run();
  }, []);

  return (
    <PageTransition>
      <h2 className="section-title">Our Services</h2>
      <p className="muted">Everything you need to launch fast.</p>
      <div className="grid">
        {services.map((s) => (
          <div key={s.key || s._id} className="card">
            {s.icon && <div style={{fontSize:26}}>{s.icon}</div>}
            <h3>{s.title}</h3>
            <p className="muted">{s.description || s.desc}</p>
            {typeof s.priceFrom === 'number' && <div className="muted">Starting at ₹ {Number(s.priceFrom).toLocaleString()}</div>}
          </div>
        ))}
      </div>
    </PageTransition>
  );
}
