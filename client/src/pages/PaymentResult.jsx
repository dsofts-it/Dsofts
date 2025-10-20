import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition.jsx';

export default function PaymentResult() {
  const params = new URLSearchParams(useLocation().search);
  const success = params.get('success') === 'true';
  return (
    <PageTransition>
    <div className="card center" style={{maxWidth:500}}>
      <h2 style={{color: success ? '#22c55e' : '#ef4444'}}>
        {success ? 'Payment Success' : 'Payment Failed'}
      </h2>
      <p className="muted">{success ? 'Thank you! Your payment is confirmed.' : 'Please try again or use a different method.'}</p>
      <div className="spacer"></div>
      <Link className="btn" to="/">Back to Home</Link>
    </div>
    </PageTransition>
  );
}
