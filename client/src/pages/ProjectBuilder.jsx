import React, { useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../lib/axios.js';
import PageTransition from '../components/PageTransition.jsx';

const presets = {
  website: {
    title: 'Website',
    description: 'Marketing sites, landing pages, portals and content hubs that convert.',
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
    description: 'Native or hybrid Android experiences with offline-first, realtime sync and push engagement.',
    options: {
      type: ['Utility', 'E-commerce', 'Booking', 'Food Delivery'],
      features: ['Auth', 'Push Notifications', 'Offline Mode', 'Payments'],
    },
    base: 20000,
    increments: { type: { Utility: 0, 'E-commerce': 12000, Booking: 10000, 'Food Delivery': 15000 } },
    featurePrice: 3000,
  },
  mlm: {
    title: 'MLM Platform',
    description: 'Wallets, genealogy charts, payout automation and compliance-ready reporting.',
    options: { plan: ['Binary', 'Unilevel', 'Matrix'], features: ['Wallet', 'Payouts', 'Genealogy', 'Reports'] },
    base: 30000,
    increments: { plan: { Binary: 0, Unilevel: 6000, Matrix: 10000 } },
    featurePrice: 4000,
  },
  'local-shop': {
    title: 'Local Commerce',
    description: 'POS, inventory, invoicing and omni-channel ordering for growing retailers.',
    options: {
      modules: ['POS', 'Inventory', 'Billing', 'Customer Accounts', 'Online Store'],
      features: ['Reports', 'GST', 'Low-stock Alerts'],
    },
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
    let value = cfg.base;
    for (const key of Object.keys(cfg.increments || {})) {
      const picked = selection[key];
      value += cfg.increments[key]?.[picked] || 0;
    }
    if (features?.length) value += features.length * cfg.featurePrice;
    return value;
  }, [cfg, selection, features]);

  const toggleFeature = (feature) => {
    setFeatures((previous) => (previous.includes(feature) ? previous.filter((item) => item !== feature) : [...previous, feature]));
  };

  const submit = async (event) => {
    event.preventDefault();
    const payload = {
      projectType: type,
      selections: { ...selection, features },
      estimatedPrice: price,
      ...contact,
    };
    if (!user) {
      const params = new URLSearchParams({ next: location.pathname });
      navigate(`/login?${params.toString()}`);
      return;
    }
    try {
      await api.post('/inquiries', payload);
      window.alert('Thanks! We will contact you with a personalised quote.');
    } catch (error) {
      window.alert(`Failed to submit: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <PageTransition>
      <div className="space-y-10">
        <section className="app-glow overflow-hidden rounded-[32px] border border-white/60 bg-white/90 p-8 shadow-soft md:p-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr),320px]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Project planner</p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-[40px]">
                Configure your build, see indicative budgets and reserve your slot.
              </h1>
              <p className="mt-4 max-w-3xl text-sm text-slate-500 md:text-base">
                Select the experience you need, choose relevant modules and features, then share your contact details.
                We&apos;ll follow up with a tailored proposal, delivery roadmap and ways of working deck.
              </p>
            </div>
            <div className="grid gap-3 text-sm text-slate-600">
              <div className="rounded-2xl border border-white/60 bg-white/85 p-4">
                <div className="text-xs font-semibold uppercase text-slate-500">Timeline guide</div>
                <div className="mt-1 font-semibold text-slate-900">4&ndash;8 weeks for launch · Support pods available</div>
              </div>
              <div className="rounded-2xl border border-white/60 bg-white/85 p-4">
                <div className="text-xs font-semibold uppercase text-slate-500">What you&apos;ll receive</div>
                <div className="mt-1 font-semibold text-slate-900">Detailed estimate · Suggested scope · Squad composition</div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr),360px]">
          <div className="card space-y-6 border-white/55 bg-white/90">
            <div className="flex flex-wrap gap-3">
              {Object.entries(presets).map(([key, preset]) => {
                const isActive = type === key;
                return (
                  <button
                    key={key}
                    type="button"
                    className={`inline-flex flex-col rounded-2xl border px-4 py-3 text-left text-sm transition ${
                      isActive
                        ? 'border-brand bg-brand/10 text-brand shadow-soft'
                        : 'border-white/60 bg-white/80 text-slate-700 hover:border-brand/40'
                    }`}
                    onClick={() => {
                      setType(key);
                      setSelection({});
                      setFeatures([]);
                    }}
                  >
                    <span className="font-semibold">{preset.title}</span>
                    <span className="mt-1 text-xs text-slate-500">{preset.description}</span>
                  </button>
                );
              })}
            </div>

            <div className="space-y-6">
              {Object.entries(cfg.options).map(([key, options]) => (
                <div key={key} className="space-y-3">
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{key}</div>
                  <div className="flex flex-wrap gap-3">
                    {options.map((option) => {
                      const isSelected = selection[key] === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          className={`rounded-2xl border px-4 py-2 text-sm transition ${
                            isSelected
                              ? 'border-brand bg-brand text-white shadow-soft'
                              : 'border-white/60 bg-white/85 text-slate-700 hover:border-brand/40'
                          }`}
                          onClick={() => setSelection((current) => ({ ...current, [key]: option }))}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {cfg.options.features && (
                <div className="space-y-3">
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Features</div>
                  <div className="flex flex-wrap gap-3">
                    {cfg.options.features.map((feature) => {
                      const active = features.includes(feature);
                      return (
                        <button
                          key={feature}
                          type="button"
                          className={`rounded-2xl border px-4 py-2 text-sm transition ${
                            active
                              ? 'border-brand bg-brand/90 text-white shadow-soft'
                              : 'border-white/60 bg-white/85 text-slate-700 hover:border-brand/40'
                          }`}
                          onClick={() => toggleFeature(feature)}
                        >
                          {feature}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <aside className="app-glow space-y-6 rounded-[32px] border border-white/60 bg-white/90 p-6 shadow-soft">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Estimated investment</div>
              <div className="mt-2 text-3xl font-bold text-slate-900">Rs. {price.toLocaleString()}</div>
              <p className="mt-2 text-xs text-slate-500">
                Includes discovery, design, development, QA and launch support. Detailed breakdown arrives in your inbox.
              </p>
            </div>
            <form className="space-y-3 text-sm" onSubmit={submit}>
              <input
                className="input"
                placeholder="Your name"
                value={contact.contactName}
                onChange={(event) => setContact((current) => ({ ...current, contactName: event.target.value }))}
              />
              <input
                className="input"
                placeholder="Email"
                value={contact.contactEmail}
                onChange={(event) => setContact((current) => ({ ...current, contactEmail: event.target.value }))}
              />
              <input
                className="input"
                placeholder="Phone (optional)"
                value={contact.contactPhone}
                onChange={(event) => setContact((current) => ({ ...current, contactPhone: event.target.value }))}
              />
              <button className="btn w-full justify-center" type="submit">
                Request detailed quote
              </button>
            </form>
            <p className="text-xs text-slate-500">
              We keep your details confidential and only use them to plan your build. No spam, ever.
            </p>
          </aside>
        </div>
      </div>
    </PageTransition>
  );
}
