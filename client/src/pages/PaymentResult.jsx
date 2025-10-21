import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition.jsx';

export default function PaymentResult() {
  const params = new URLSearchParams(useLocation().search);
  const success = params.get('success') === 'true';
  return (
    <PageTransition>
      <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center">
        <h2 className={`text-2xl font-extrabold ${success ? 'text-green-600' : 'text-red-600'}`}>
          {success ? 'Payment Success' : 'Payment Failed'}
        </h2>
        <p className="text-slate-600 mt-1">{success ? 'Thank you! Your payment is confirmed.' : 'Please try again or use a different method.'}</p>
        <div className="h-4" />
        <Link className="btn" to="/">Back to Home</Link>
      </div>
    </PageTransition>
  );
}

