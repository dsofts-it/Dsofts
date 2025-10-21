import React, { useEffect, useState } from 'react';
import api from '../lib/axios.js';
import PageTransition from '../components/PageTransition.jsx';

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const run = async () => {
      try {
        const { data } = await api.get('/content/services');
        setServices(data.services || []);
      } catch {}
    };
    run();
  }, []);

  return (
    <PageTransition>
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Our Services</h2>
          <p className="text-slate-600">Everything you need to launch fast.</p>
        </div>
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div
            key={s.key || s._id}
            className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition group overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand to-brandLight opacity-70" />
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
              {typeof s.priceFrom === 'number' && (
                <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-2 py-1">
                  From ₹ {Number(s.priceFrom).toLocaleString()}
                </span>
              )}
            </div>
            {s.icon && <div className="text-3xl mt-2 text-blue-600/80">{s.icon}</div>}
            <p className="text-slate-600 mt-2">{s.description || s.desc}</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
              <span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>
              <span>Fast delivery</span>
            </div>
          </div>
        ))}
      </div>
    </PageTransition>
  );
}

