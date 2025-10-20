import React, { useMemo, useState } from 'react';
import api from '../lib/axios.js';
import PageTransition from '../components/PageTransition.jsx';

const presets = {
  website: {
    title: 'Website',
    options: {
      type: ['Static', 'Dynamic', 'Animated'],
      features: ['Auth', 'Admin Panel', 'Blog', 'E‑commerce', 'Payments', 'SEO'],
    },
    base: 12000,
    increments: { type: { Static: 0, Dynamic: 5000, Animated: 7000 } },
    featurePrice: 2000,
  },
  android: {
    title: 'Android App',
    options: { type: ['Utility', 'E‑commerce', 'Booking', 'Food Delivery'], features: ['Auth', 'Push Notifications', 'Offline Mode', 'Payments'] },
    base: 20000,
    increments: { type: { Utility: 0, 'E‑commerce': 12000, Booking: 10000, 'Food Delivery': 15000 } },
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
    options: { modules: ['POS', 'Inventory', 'Billing', 'Customer Accounts', 'Online Store'], features: ['Reports', 'GST', 'Low‑stock Alerts'] },
    base: 15000,
    increments: { modules: { POS: 0, Inventory: 5000, Billing: 4000, 'Customer Accounts': 4000, 'Online Store': 10000 } },
    featurePrice: 2500,
  },
};

export default function ProjectBuilder() {
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

  const toggleFeature = (f) => setFeatures((arr) => arr.includes(f) ? arr.filter(x=>x!==f) : [...arr, f]);

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      projectType: type,
      selections: { ...selection, features },
      estimatedPrice: price,
      ...contact,
    };
    try {
      await api.post('/inquiries', payload);
      alert('Thanks! We will contact you with a quote.');
    } catch (e) {
      alert('Failed to submit: ' + (e.response?.data?.message || e.message));
    }
  };

  return (
    <PageTransition>
      <h2 className="section-title">Project Builder</h2>
      <p className="muted">Describe your project and get an instant rough estimate.</p>
      <div className="grid" style={{gridTemplateColumns:'1.2fr 1fr'}}>
        <div className="card">
          <div className="row" style={{gap:8}}>
            {Object.keys(presets).map((k) => (
              <button key={k} className="btn secondary" style={{background: type===k? 'var(--accent)':'transparent', color:type===k?'#fff':'inherit'}} onClick={()=>{setType(k); setSelection({}); setFeatures([]);}}>
                {presets[k].title}
              </button>
            ))}
          </div>
          <div className="spacer" />
          {Object.entries(cfg.options).map(([k, arr]) => (
            <div key={k}>
              <b style={{textTransform:'capitalize'}}>{k}</b>
              <div className="row" style={{marginTop:6}}>
                {arr.map((v) => (
                  <button key={v} className="btn secondary" style={{background: selection[k]===v? 'var(--accent)':'transparent', color: selection[k]===v? '#fff':'inherit'}} onClick={()=>setSelection({...selection,[k]:v})}>{v}</button>
                ))}
              </div>
              <div className="spacer" />
            </div>
          ))}

          {cfg.options.features && (
            <div>
              <b>Features</b>
              <div className="row" style={{marginTop:6}}>
                {cfg.options.features.map((f) => (
                  <button key={f} className="btn secondary" style={{background: features.includes(f)? 'var(--accent)':'transparent', color: features.includes(f)? '#fff':'inherit'}} onClick={()=>toggleFeature(f)}>{f}</button>
                ))}
              </div>
            </div>
          )}

        </div>
        <div className="card">
          <h3>Estimate</h3>
          <p className="muted">Base + options + features</p>
          <h1 style={{marginTop:6}}>₹ {price.toLocaleString()}</h1>
          <div className="spacer" />
          <form onSubmit={submit}>
            <input className="input" placeholder="Your name" value={contact.contactName} onChange={e=>setContact({...contact,contactName:e.target.value})} />
            <div className="spacer"></div>
            <input className="input" placeholder="Email" value={contact.contactEmail} onChange={e=>setContact({...contact,contactEmail:e.target.value})} />
            <div className="spacer"></div>
            <input className="input" placeholder="Phone (optional)" value={contact.contactPhone} onChange={e=>setContact({...contact,contactPhone:e.target.value})} />
            <div className="spacer"></div>
            <button className="btn" type="submit">Request Quote</button>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}
