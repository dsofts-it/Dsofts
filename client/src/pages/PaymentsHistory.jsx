import React, { useEffect, useState } from 'react';
import api from '../lib/axios.js';

export default function PaymentsHistory(){
  const [list, setList] = useState([]);
  useEffect(()=>{(async()=>{ const {data}=await api.get('/payments/my'); setList(data.payments||[]); })();},[]);
  return (
    <div>
      <h2 className="text-2xl font-extrabold text-slate-900">Payment History</h2>
      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6">
        {list.length===0 && <div className="text-slate-500">No payments yet.</div>}
        {list.map(p=> (
          <div key={p._id} className="flex items-center justify-between border-b border-slate-200/60 py-2 last:border-b-0">
            <div>{new Date(p.createdAt).toLocaleString()} — <b className="capitalize">{p.status}</b></div>
            <div>₹ {Number(p.amount||0).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

