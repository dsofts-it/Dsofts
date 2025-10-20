import React, { useEffect, useState } from 'react';
import api from '../lib/axios.js';

export default function PaymentsHistory(){
  const [list, setList] = useState([]);
  useEffect(()=>{(async()=>{ const {data}=await api.get('/payments/my'); setList(data.payments||[]); })();},[]);
  return (
    <div>
      <h2 className="section-title">Payment History</h2>
      <div className="card">
        {list.length===0 && <div className="muted">No payments yet.</div>}
        {list.map(p=> (
          <div key={p._id} className="row" style={{justifyContent:'space-between', borderBottom:'1px solid rgba(255,255,255,.06)', padding:'8px 0'}}>
            <div>{new Date(p.createdAt).toLocaleString()} — <b>{p.status}</b></div>
            <div>₹ {Number(p.amount||0).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

