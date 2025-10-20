import React, { useState } from 'react';
import PageTransition from '../components/PageTransition.jsx';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    // This demo doesn’t send email; integrate a backend endpoint if needed.
    setSent(true);
  };

  if (sent) return <div className="card center"><h3>Thanks!</h3><p className="muted">We will contact you at {form.email}.</p></div>;

  return (
    <PageTransition>
      <h2 className="section-title">Contact Us</h2>
      <p className="muted">Reach us by email or phone. We usually reply within 24 hours.</p>
      <div className="spacer"></div>
      <form className="grid" onSubmit={submit} style={{gridTemplateColumns:'1fr 1fr'}}>
        <input className="input" placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <input className="input" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input className="input" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
        <textarea className="textarea" rows="4" placeholder="Project brief" value={form.message} onChange={e=>setForm({...form,message:e.target.value})}></textarea>
        <div><button className="btn" type="submit">Send</button></div>
      </form>
      <div className="spacer"></div>
      <div className="card"><b>Email</b>: contact@dsofts.example • <b>Phone</b>: +91 90000 00000</div>
    </PageTransition>
  );
}
