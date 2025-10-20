import React, { useEffect, useState } from 'react';
import api from '../lib/axios.js';

export default function AdminInquiries(){
  const [list, setList] = useState([]);
  useEffect(()=>{(async()=>{ const {data}=await api.get('/admin/inquiries'); setList(data.inquiries||[]); })();},[]);
  return (
    <div className="card">
      <h3>Project Inquiries</h3>
      {list.map(q=> (
        <div key={q._id} className="row" style={{justifyContent:'space-between', borderBottom:'1px solid rgba(255,255,255,.06)', padding:'8px 0'}}>
          <div><b>{q.contactName}</b> <span className="muted">{q.contactEmail}</span></div>
          <div className="muted">{q.projectType} • ₹ {Number(q.estimatedPrice||0).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}

