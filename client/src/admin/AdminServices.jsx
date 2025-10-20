import React, { useEffect, useState } from 'react';
import api from '../lib/axios.js';

export default function AdminServices(){
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ key:'', title:'', description:'', priceFrom:0, active:true, icon:'' });
  const [editId, setEditId] = useState(null);

  const load = async () => {
    const { data } = await api.get('/content/services');
    setList(data.services || []);
  };
  useEffect(()=>{ load(); },[]);

  const save = async (e) => {
    e.preventDefault();
    if (editId) {
      await api.put(`/content/services/${editId}`, form);
    } else {
      await api.post('/content/services', form);
    }
    setForm({ key:'', title:'', description:'', priceFrom:0, active:true, icon:'' });
    setEditId(null);
    load();
  };

  const edit = (s) => { setEditId(s._id); setForm({ key:s.key, title:s.title, description:s.description, priceFrom:s.priceFrom||0, active:s.active, icon:s.icon||'' }); };
  const del = async (id) => { if(confirm('Delete service?')){ await api.delete(`/content/services/${id}`); load(); } };

  return (
    <div className="grid" style={{gridTemplateColumns:'1fr 1fr'}}>
      <div className="card">
        <h3>{editId? 'Edit Service':'Add Service'}</h3>
        <form onSubmit={save}>
          <input className="input" placeholder="key" value={form.key} onChange={e=>setForm({...form,key:e.target.value})} />
          <div className="spacer"></div>
          <input className="input" placeholder="title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
          <div className="spacer"></div>
          <input className="input" placeholder="icon (optional)" value={form.icon} onChange={e=>setForm({...form,icon:e.target.value})} />
          <div className="spacer"></div>
          <textarea className="textarea" rows="4" placeholder="description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}></textarea>
          <div className="spacer"></div>
          <input className="input" type="number" placeholder="priceFrom" value={form.priceFrom} onChange={e=>setForm({...form,priceFrom:Number(e.target.value)})} />
          <div className="spacer"></div>
          <label className="row"><input type="checkbox" checked={form.active} onChange={e=>setForm({...form,active:e.target.checked})} /> active</label>
          <div className="spacer"></div>
          <button className="btn" type="submit">Save</button>
        </form>
      </div>
      <div className="card">
        <h3>Services</h3>
        {list.map(s=> (
          <div key={s._id} className="row" style={{justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid rgba(255,255,255,.06)'}}>
            <div>
              <b>{s.title}</b> <span className="muted">({s.key})</span>
              <div className="muted">₹ {Number(s.priceFrom||0).toLocaleString()} • {s.active? 'active':'hidden'}</div>
            </div>
            <div className="row" style={{gap:6}}>
              <button className="btn secondary" onClick={()=>edit(s)}>Edit</button>
              <button className="btn secondary" onClick={()=>del(s._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

