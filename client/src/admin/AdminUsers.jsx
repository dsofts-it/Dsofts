import React, { useEffect, useState } from 'react';
import api from '../lib/axios.js';

export default function AdminUsers(){
  const [list, setList] = useState([]);
  useEffect(()=>{(async()=>{ const {data}=await api.get('/admin/users'); setList(data.users||[]); })();},[]);
  return (
    <div className="card">
      <h3>Users</h3>
      {list.map(u=> (
        <div key={u._id} className="row" style={{justifyContent:'space-between', borderBottom:'1px solid rgba(255,255,255,.06)', padding:'8px 0'}}>
          <div><b>{u.name}</b> <span className="muted">{u.email}</span></div>
          <div className="muted">{u.role}</div>
        </div>
      ))}
    </div>
  );
}

