import React, { useEffect, useState } from 'react';
import api from '../lib/axios.js';
import PageTransition from '../components/PageTransition.jsx';

export default function PaymentsHistory() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/payments/my');
        setPayments(data.payments || []);
      } catch {
        setPayments([]);
      }
    })();
  }, []);

  return (
    <PageTransition>
      <section className="space-y-6">
        <header className="app-glow overflow-hidden rounded-[32px] border border-white/60 bg-white/90 p-8 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Payments</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Transaction history</h1>
          <p className="mt-2 text-sm text-slate-500">
            A quick overview of invoices settled via our payment gateway. Need a copy of a receipt? Reach us at
            hello@studiocollective.design.
          </p>
        </header>

        <div className="card border-white/55 bg-white/90">
          {payments.length === 0 && <div className="text-sm text-slate-500">No payments recorded yet.</div>}
          {payments.map((payment) => (
            <div
              key={payment._id || payment.orderId}
              className="grid items-center gap-3 border-t border-white/60 py-4 first:border-t-0 md:grid-cols-[minmax(0,1fr),auto,auto]"
            >
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  {new Date(payment.createdAt).toLocaleString()}
                </div>
                <div className="text-xs uppercase tracking-[0.3em] text-slate-400">{payment.orderId}</div>
              </div>
              <div className="text-sm font-semibold capitalize text-slate-600 md:text-center">
                {payment.status}
              </div>
              <div className="text-sm font-semibold text-brand md:text-right">
                Rs. {Number(payment.amount || 0).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
