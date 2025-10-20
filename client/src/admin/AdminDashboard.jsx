import React, { useEffect, useMemo, useState } from 'react';
import api from '../lib/axios.js';

export default function AdminDashboard(){
  const [data, setData] = useState(null);

  useEffect(()=>{(async()=>{ try{ const {data} = await api.get('/admin/metrics'); setData(data);} catch(e){ console.error(e);} })();},[]);

  const days = useMemo(()=>{
    if(!data?.dailyVisits) return [];
    return data.dailyVisits.map(d=>({ day: d._id.slice(5), count: d.count }));
  },[data]);

  if(!data) return <div className="card">Loading metrics…</div>;

  return (
    <div className="grid" style={{gridTemplateColumns:'1.2fr 1fr'}}>
      <div className="card">
        <div className="badge">Live Preview</div>
        <h2 style={{marginTop:8}}>Realtime overview</h2>
        <p className="muted">Users, visits, inquiries and revenue at a glance.</p>
        <div className="grid" style={{gridTemplateColumns:'repeat(4,1fr)', marginTop:12}}>
          {[
            {k:'Users',v:data.totals.users},
            {k:'Visits',v:data.totals.visits},
            {k:'Inquiries',v:data.totals.inquiries},
            {k:'Revenue',v:'₹ '+Number(data.totals.revenue||0).toLocaleString()},
          ].map((x,i)=> (
            <div key={i} className="card shadow-soft" style={{textAlign:'center'}}>
              <div style={{fontSize:22, fontWeight:800}}>{x.v}</div>
              <div className="muted">{x.k}</div>
            </div>
          ))}
        </div>

        <div className="spacer"></div>
        <h3>Visits (7 days)</h3>
        <div className="row" style={{alignItems:'flex-end', gap:8}}>
          {days.map((d,idx)=> (
            <div key={idx} style={{width:40}}>
              <div className="bar" style={{height: Math.max(6, d.count*6)}}></div>
              <div className="muted" style={{fontSize:12, textAlign:'center'}}>{d.day.slice(3)}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <h3>Tips</h3>
        <p className="muted">Use the Services tab to add/update services shown on the public site. Monitor new inquiries and recent payments here.</p>
      </div>
    </div>
  );
}

