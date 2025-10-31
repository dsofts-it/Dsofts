import React, { useEffect, useState } from 'react';
import api from '../lib/axios.js';

export default function Services(){
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ title:'', description:'', priceFrom:0, active:true });

  const load = async ()=>{ const {data} = await api.get('/content/services'); setList(data.services||[]); };
  useEffect(()=>{load();},[]);

  const add = async (e)=>{ e.preventDefault(); await api.post('/content/services', form); setForm({ title:'', description:'', priceFrom:0, active:true }); load(); };
  const del = async (id)=>{ await api.delete(`/content/services/${id}`); load(); };

  return (
    <div className="space-y-4">
      <div className="text-2xl font-bold">Services</div>
      <form onSubmit={add} className="card space-y-2">
        <div className="font-semibold">Add Service</div>
        <input className="input" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
        <textarea className="input" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
        <input className="input" placeholder="Price From" type="number" value={form.priceFrom} onChange={e=>setForm({...form,priceFrom:parseInt(e.target.value||'0',10)})} />
        <label className="text-sm"><input type="checkbox" checked={form.active} onChange={e=>setForm({...form,active:e.target.checked})}/> Active</label>
        <button className="btn w-full" type="submit">Create</button>
      </form>

      <div className="grid md:grid-cols-2 gap-3">
        {list.map(s=> (
          <div key={s._id || s.key} className="card">
            <div className="font-semibold">{s.title}</div>
            <div className="text-sm text-slate-600">{s.description}</div>
            <div className="text-sm">From: {s.priceFrom}</div>
            {s._id && <button className="btn secondary mt-2" onClick={()=>del(s._id)}>Delete</button>}
          </div>
        ))}
      </div>
    </div>
  );
}

