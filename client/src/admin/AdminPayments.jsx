import React, { useEffect, useState } from 'react';
import api from '../lib/axios.js';

export default function AdminPayments(){
  const [list, setList] = useState([]);
  useEffect(()=>{(async()=>{ const {data}=await api.get('/admin/payments'); setList(data.payments||[]); })();},[]);
  return (
    <div className="card">
      <h3>Payments</h3>
      {list.map(p=> (
        <div key={p._id} className="row" style={{justifyContent:'space-between', borderBottom:'1px solid rgba(255,255,255,.06)', padding:'8px 0'}}>
          <div><b>{p.status}</b> <span className="muted">{p.paymentId||p.orderId}</span></div>
          <div className="muted">₹ {Number(p.amount||0).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}

