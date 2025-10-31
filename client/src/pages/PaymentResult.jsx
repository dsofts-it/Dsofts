import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition.jsx';

export default function PaymentResult() {
  const params = new URLSearchParams(useLocation().search);
  const success = params.get('success') === 'true';

  return (
    <PageTransition>
      <div className="mx-auto max-w-md">
        <div
          className={`app-glow rounded-[32px] border border-white/60 p-8 text-center shadow-soft ${
            success ? 'bg-white/90' : 'bg-white/80'
          }`}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
            {success ? 'Payment received' : 'Payment unsuccessful'}
          </div>
          <h1
            className={`mt-3 text-3xl font-bold tracking-tight ${
              success ? 'text-emerald-600' : 'text-rose-600'
            }`}
          >
            {success ? 'You are all set!' : "Payment didn't go through"}
          </h1>
          <p className="mt-3 text-sm text-slate-500">
            {success
              ? 'Thanks for your trust. A receipt is on its way to your inbox and your project dashboard has been updated.'
              : 'The payment gateway did not confirm the transaction. You can try again or contact us for alternate methods.'}
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link className="btn justify-center" to="/">
              Back to home
            </Link>
            {!success && (
              <Link
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/60 bg-white/85 px-4 py-2 text-sm font-semibold text-brand transition hover:border-brand"
                to="/pay"
              >
                Try payment again
              </Link>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
