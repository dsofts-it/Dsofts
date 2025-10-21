import React, { useState } from 'react';
import PageTransition from '../components/PageTransition.jsx';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6 max-w-lg">
        <h3 className="text-lg font-semibold text-green-800">Thanks!</h3>
        <p className="text-green-700">We will contact you at {form.email}.</p>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Contact Us</h2>
          <p className="text-slate-600">We usually reply within 24 hours.</p>
        </div>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <form className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-6" onSubmit={submit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <input className="input" placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
            <input className="input" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <input className="input" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
            <div />
          </div>
          <div className="mt-4">
            <textarea className="textarea" rows="5" placeholder="Project brief" value={form.message} onChange={e=>setForm({...form,message:e.target.value})}></textarea>
          </div>
          <div className="mt-4">
            <button className="btn" type="submit">Send message</button>
          </div>
        </form>
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-white p-6">
          <div className="font-semibold text-slate-900">Contact details</div>
          <div className="text-slate-600 mt-2">Email: contact@dsofts.example</div>
          <div className="text-slate-600">Phone: +91 90000 00000</div>
          <div className="mt-6 h-2 rounded-full bg-gradient-to-r from-brand to-brandLight" />
        </div>
      </div>
    </PageTransition>
  );
}

