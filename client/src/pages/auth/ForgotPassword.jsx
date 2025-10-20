import React, { useState } from 'react';
import api from '../../lib/axios.js';
import AuthLayout from '../../components/AuthLayout.jsx';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/auth/forgot-password', { email });
    setSent(true);
  };

  return (
    <AuthLayout title="Forgot password" subtitle="We’ll send a link to your email">
      {sent ? (
        <p className="muted">If an account exists, a reset link has been sent.</p>
      ) : (
        <form onSubmit={submit}>
          <input className="input" placeholder="Your email" value={email} onChange={e=>setEmail(e.target.value)} />
          <div className="spacer"></div>
          <button className="btn" type="submit">Send reset link</button>
        </form>
      )}
    </AuthLayout>
  );
}
