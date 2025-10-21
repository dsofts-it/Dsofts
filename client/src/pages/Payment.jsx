import React, { useEffect, useState } from 'react';
import api from '../lib/axios.js';
import { useNavigate } from 'react-router-dom';
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
      } catch {}
    })();
  }, []);

  const pay = async () => {
    try {
      const { data } = await api.post('/payments/create-order', { amount });
      const options = {
        key,
        amount: data.amount,
        currency: 'INR',
        name: 'Dsofts IT',
        description: 'Service payment',
        order_id: data.orderId,
        handler: async function (response) {
          const verify = await api.post('/payments/verify', response);
          navigate('/payment-result?success=' + String(verify.data.success));
        },
        prefill: {},
        theme: { color: '#2563eb' },
        retry: { enabled: true, max_count: 1 },
      };
      const rz = new window.Razorpay(options);
      rz.on('payment.failed', function () {
        navigate('/payment-result?success=false');
      });
      rz.open();
    } catch (e) {
      alert(e.response?.data?.message || e.message);
    }
  };

  return (
    <PageTransition>
      <div className="max-w-lg rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-slate-900">Pay Online</h3>
        <p className="text-slate-600">Enter amount and pay securely via Razorpay (UPI/Cards/NetBanking).</p>
        <div className="h-3" />
        <input className="input" type="number" min="1" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        <div className="h-3" />
        <button className="btn" onClick={pay} disabled={!key}>Pay ₹ {Number(amount || 0).toLocaleString()}</button>
        {!key && <div className="text-slate-500 mt-2">Razorpay key not set.</div>}
      </div>
    </PageTransition>
  );
}

