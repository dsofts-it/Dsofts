import React, { useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../lib/axios.js';
import PageTransition from '../components/PageTransition.jsx';

const presets = {
  website: {
    title: 'Website',
    options: {
      type: ['Static', 'Dynamic', 'Animated'],
      features: ['Auth', 'Admin Panel', 'Blog', 'E-commerce', 'Payments', 'SEO'],
    },
    base: 12000,
    increments: { type: { Static: 0, Dynamic: 5000, Animated: 7000 } },
    featurePrice: 2000,
  },
  android: {
    title: 'Android App',
    options: { type: ['Utility', 'E-commerce', 'Booking', 'Food Delivery'], features: ['Auth', 'Push Notifications', 'Offline Mode', 'Payments'] },
    base: 20000,
    increments: { type: { Utility: 0, 'E-commerce': 12000, Booking: 10000, 'Food Delivery': 15000 } },
    featurePrice: 3000,
  },
  mlm: {
    title: 'MLM Project',
    options: { plan: ['Binary', 'Unilevel', 'Matrix'], features: ['Wallet', 'Payouts', 'Genealogy', 'Reports'] },
    base: 30000,
    increments: { plan: { Binary: 0, Unilevel: 6000, Matrix: 10000 } },
    featurePrice: 4000,
  },
  'local-shop': {
    title: 'Local Shop',
    options: { modules: ['POS', 'Inventory', 'Billing', 'Customer Accounts', 'Online Store'], features: ['Reports', 'GST', 'Low-stock Alerts'] },
    base: 15000,
    increments: { modules: { POS: 0, Inventory: 5000, Billing: 4000, 'Customer Accounts': 4000, 'Online Store': 10000 } },
    featurePrice: 2500,
  },
};

export default function ProjectBuilder() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [type, setType] = useState('website');
  const [selection, setSelection] = useState({});
  const [features, setFeatures] = useState([]);
  const [contact, setContact] = useState({ contactName: '', contactEmail: '', contactPhone: '' });
  const cfg = presets[type];

  const price = useMemo(() => {
    let p = cfg.base;
    for (const k of Object.keys(cfg.increments || {})) {
      const keyVal = selection[k];
      p += cfg.increments[k]?.[keyVal] || 0;
    }
    if (features?.length) p += features.length * cfg.featurePrice;
    return p;
  }, [cfg, selection, features]);

  const toggleFeature = (f) => setFeatures((arr) => (arr.includes(f) ? arr.filter((x) => x !== f) : [...arr, f]));

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      projectType: type,
      selections: { ...selection, features },
      estimatedPrice: price,
      ...contact,
    };
    // Require login only at submission time
    if (!user) {
      const params = new URLSearchParams({ next: location.pathname });
      navigate(`/login?${params.toString()}`);
      return;
    }
    try {
      await api.post('/inquiries', payload);
      alert('Thanks! We will contact you with a quote.');
    } catch (e) {
      alert('Failed to submit: ' + (e.response?.data?.message || e.message));
    }
  };

  return (
    <PageTransition>
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Project Builder</h2>
          <p className="text-slate-600">Describe your project and get an instant estimate.</p>
        </div>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex flex-wrap gap-2">
            {Object.keys(presets).map((k) => (
              <button
                key={k}
                className={`px-4 py-2 rounded-xl border transition ${type === k ? 'bg-brand text-white border-blue-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-blue-50'}`}
                onClick={() => {
                  setType(k);
                  setSelection({});
                  setFeatures([]);
                }}
              >
                {presets[k].title}
              </button>
            ))}
          </div>
          <div className="mt-4 space-y-5">
            {Object.entries(cfg.options).map(([k, arr]) => (
              <div key={k}>
                <div className="text-sm font-semibold text-slate-700 capitalize">{k}</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {arr.map((v) => (
                    <button
                      key={v}
                      className={`px-4 py-2 rounded-xl border transition ${selection[k] === v ? 'bg-brand text-white border-blue-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-blue-50'}`}
                      onClick={() => setSelection({ ...selection, [k]: v })}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {cfg.options.features && (
              <div>
                <div className="text-sm font-semibold text-slate-700">Features</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {cfg.options.features.map((f) => (
                    <button
                      key={f}
                      className={`px-4 py-2 rounded-xl border transition ${features.includes(f) ? 'bg-brand text-white border-blue-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-blue-50'}`}
                      onClick={() => toggleFeature(f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-slate-900">Estimate</h3>
          <p className="text-slate-600">Base + options + features</p>
          <div className="mt-2 text-3xl font-extrabold text-slate-900">₹ {price.toLocaleString()}</div>
          <div className="mt-4">
            <form onSubmit={submit}>
              <input className="input" placeholder="Your name" value={contact.contactName} onChange={(e) => setContact({ ...contact, contactName: e.target.value })} />
              <div className="h-3" />
              <input className="input" placeholder="Email" value={contact.contactEmail} onChange={(e) => setContact({ ...contact, contactEmail: e.target.value })} />
              <div className="h-3" />
              <input className="input" placeholder="Phone (optional)" value={contact.contactPhone} onChange={(e) => setContact({ ...contact, contactPhone: e.target.value })} />
              <div className="h-4" />
              <button className="btn w-full" type="submit">Request Quote</button>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

