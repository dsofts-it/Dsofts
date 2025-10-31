import React, { useEffect, useState } from 'react';
import api from '../lib/axios.js';

export default function Dashboard(){
  const [data, setData] = useState(null);
  useEffect(()=>{ (async()=>{ try{ const {data} = await api.get('/admin/metrics'); setData(data);}catch{}})(); },[]);

  return (
    <div className="space-y-4">
      <div className="text-2xl font-bold">Dashboard</div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {['users','inquiries','paidPayments','revenue','visits'].map((k)=> (
          <div key={k} className="card">
            <div className="text-sm text-slate-500 capitalize">{k}</div>
            <div className="text-2xl font-extrabold">{data?.totals?.[k] ?? '—'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

