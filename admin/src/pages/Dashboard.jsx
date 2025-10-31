import React, { useEffect, useState } from 'react';
import api from '../lib/axios.js';

const METRIC_LABELS = {
  users: 'Active users',
  inquiries: 'Open inquiries',
  paidPayments: 'Payments captured',
  revenue: 'Revenue (Rs.)',
  visits: 'Site visits',
};

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/admin/metrics');
        setMetrics(data);
      } catch {
        setMetrics(null);
      }
    })();
  }, []);

  return (
    <div className="space-y-8">
      <header className="app-glow overflow-hidden rounded-[32px] border border-white/60 bg-white/90 p-6 shadow-soft md:p-8">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Studio overview</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
            <p className="mt-2 text-sm text-slate-500">
              Quick insight into user growth, revenue and recent demand. Numbers update every time you open this page.
            </p>
          </div>
          <div className="rounded-2xl border border-white/60 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            {new Date().toLocaleString()}
          </div>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Object.entries(METRIC_LABELS).map(([key, label]) => (
          <div key={key} className="card border-white/55 bg-white/90">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{label}</div>
            <div className="mt-3 text-3xl font-bold text-slate-900">
              {metrics?.totals?.[key] != null ? metrics.totals[key] : '--'}
            </div>
          </div>
        ))}
      </section>

      {metrics?.latest && (
        <section className="card border-white/55 bg-white/90 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Latest activity</div>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <div className="text-sm font-semibold text-slate-900">Recent inquiry</div>
              <p className="mt-1 text-sm text-slate-500">{metrics.latest.inquiry?.email || 'No data'}</p>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">Recent payment</div>
              <p className="mt-1 text-sm text-slate-500">
                {metrics.latest.payment
                  ? `Rs. ${Number(metrics.latest.payment.amount || 0).toLocaleString()} · ${metrics.latest.payment.status}`
                  : 'No payments yet'}
              </p>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">Recent user</div>
              <p className="mt-1 text-sm text-slate-500">{metrics.latest.user?.email || 'No users yet'}</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
