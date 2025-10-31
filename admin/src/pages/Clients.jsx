import React, { useEffect, useState } from 'react';
import api from '../lib/axios.js';

export default function Clients(){
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ name:'', website:'', logoUrl:'', testimonial:'' });

  const load = async ()=>{ const {data} = await api.get('/content/clients'); setList(data.clients||[]); };
  useEffect(()=>{load();},[]);

  const add = async (e)=>{ e.preventDefault(); await api.post('/content/clients', form); setForm({ name:'', website:'', logoUrl:'', testimonial:'' }); load(); };
  const del = async (id)=>{ await api.delete(`/content/clients/${id}`); load(); };

  return (
    <div className="space-y-4">
      <div className="text-2xl font-bold">Happy Clients</div>
      <form onSubmit={add} className="card space-y-2">
        <div className="font-semibold">Add Client</div>
        <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <input className="input" placeholder="Website" value={form.website} onChange={e=>setForm({...form,website:e.target.value})} />
        <input className="input" placeholder="Logo URL" value={form.logoUrl} onChange={e=>setForm({...form,logoUrl:e.target.value})} />
        <textarea className="input" placeholder="Testimonial" value={form.testimonial} onChange={e=>setForm({...form,testimonial:e.target.value})} />
        <button className="btn w-full" type="submit">Create</button>
      </form>

      <div className="grid md:grid-cols-2 gap-3">
        {list.map(c=> (
          <div key={c._id} className="card">
            <div className="font-semibold">{c.name}</div>
            {c.logoUrl && <img src={c.logoUrl} alt={c.name} className="h-10 my-2" />}
            <div className="text-sm text-slate-600">{c.testimonial}</div>
            <div className="text-xs text-slate-500">{c.website}</div>
            <button className="btn secondary mt-2" onClick={()=>del(c._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

