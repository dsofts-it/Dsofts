import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/axios.js';
import PageTransition from '../components/PageTransition.jsx';

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const run = async () => {
      try {
        const { data } = await api.get('/content/services');
        setServices(data.services || []);
      } catch {
        setServices([]);
      }
    };
    run();
  }, []);

  return (
    <PageTransition>
      <div className="space-y-12">
        <section className="app-glow overflow-hidden rounded-[32px] border border-white/60 bg-white/90 p-8 shadow-soft md:p-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr),320px]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Services</p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-[40px]">
                Strategy, design and engineering with one integrated crew.
              </h1>
              <p className="mt-4 max-w-2xl text-sm text-slate-500 md:text-base">
                Pick the engagements that meet you where you are. We plug into early-stage founders as easily as we scale
                established product orgs, making sure momentum and clarity stay high from kickoff to launch.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                <span>Discovery</span>
                <span>Product design</span>
                <span>Engineering</span>
                <span>Growth</span>
              </div>
            </div>
            <div className="grid gap-4 text-sm text-slate-600">
              <div className="rounded-2xl border border-white/60 bg-white/85 p-4">
                <div className="text-xs font-semibold uppercase text-slate-500">Ways to engage</div>
                <div className="mt-2 font-semibold text-slate-900">Fixed scope · Monthly pods · Dedicated squads</div>
              </div>
              <div className="rounded-2xl border border-white/60 bg-white/85 p-4">
                <div className="text-xs font-semibold uppercase text-slate-500">Availability</div>
                <div className="mt-2 font-semibold text-slate-900">Next kickoff: {new Date().toLocaleString(undefined, { month: 'long' })}</div>
                <Link
                  to="/project-builder"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:underline"
                >
                  Reserve a slot →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {services.length === 0 ? (
          <div className="card text-center text-slate-500">
            Services will appear here once you add them from the admin console.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.key || service._id || service.title}
                className="card group overflow-hidden border-white/55 bg-white/90 transition hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold text-slate-900">{service.title}</h2>
                  {typeof service.priceFrom === 'number' && (
                    <span className="inline-flex items-center rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-[0.7rem] font-semibold text-brand">
                      From ₹ {Number(service.priceFrom).toLocaleString()}
                    </span>
                  )}
                </div>
                {service.icon && (
                  <div className="mt-4 text-4xl text-brand/60 transition group-hover:text-brand">{service.icon}</div>
                )}
                <p className="mt-4 text-sm text-slate-500">{service.description || service.desc}</p>
                <div className="mt-6 flex flex-wrap gap-2 text-[0.7rem] font-semibold text-slate-500">
                  <span className="inline-flex items-center rounded-full border border-white/60 bg-white/80 px-3 py-1 uppercase tracking-[0.3em]">
                    Sprint ready
                  </span>
                  <span className="inline-flex items-center rounded-full border border-white/60 bg-white/80 px-3 py-1 uppercase tracking-[0.3em]">
                    Dedicated lead
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}

