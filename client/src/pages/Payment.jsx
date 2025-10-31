import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/axios.js';
import PageTransition from '../components/PageTransition.jsx';

export default function Payment() {
  const [amount, setAmount] = useState(499);
  const [key, setKey] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/payments/key');
        setKey(data.keyId);
      } catch {
        setKey('');
      }
    })();
  }, []);

  const pay = async () => {
    try {
      const { data } = await api.post('/payments/create-order', { amount });
      const options = {
        key,
        amount: data.amount,
        currency: 'INR',
        name: 'Studio Collective',
        description: 'Services payment',
        order_id: data.orderId,
        handler: async (response) => {
          const verify = await api.post('/payments/verify', response);
          navigate(`/payment-result?success=${String(verify.data.success)}`);
        },
        prefill: {},
        theme: { color: '#6c5ce7' },
        retry: { enabled: true, max_count: 1 },
      };
      if (!window.Razorpay) {
        window.alert('Payment gateway is unavailable right now. Please try again shortly.');
        return;
      }
      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', () => {
        navigate('/payment-result?success=false');
      });
      razorpay.open();
    } catch (error) {
      window.alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <PageTransition>
      <div className="mx-auto max-w-lg space-y-6">
        <section className="app-glow overflow-hidden rounded-[32px] border border-white/60 bg-white/90 p-8 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Secure checkout</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Pay your invoice in seconds.</h1>
          <p className="mt-3 text-sm text-slate-500">
            UPI, cards and net banking supported via Razorpay. Funds are reconciled instantly against your project.
          </p>
        </section>
        <section className="card border-white/55 bg-white/90 space-y-4">
          <label className="block text-sm font-semibold uppercase tracking-[0.2em] text-slate-500" htmlFor="payment-amount">
            Amount (INR)
          </label>
          <input
            id="payment-amount"
            className="input"
            type="number"
            min="1"
            value={amount}
            onChange={(event) => {
              const value = Number(event.target.value);
              setAmount(Number.isNaN(value) ? 1 : Math.max(1, value));
            }}
          />
          <button className="btn w-full justify-center" onClick={pay} disabled={!key || !amount}>
            Pay Rs. {Number(amount || 0).toLocaleString()}
          </button>
          {!key && <div className="text-xs text-slate-500">Razorpay key not configured yet. Contact support to enable payments.</div>}
        </section>
      </div>
    </PageTransition>
  );
}
