import React from 'react';

export default function About() {
  return (
    <div>
      <h2 className="section-title">About Dsofts IT</h2>
      <p className="muted">We are a small, focused team building reliable digital products: websites, Android apps, and business tools. We care about clarity, speed and honest pricing.</p>
      <div className="grid" style={{marginTop:12}}>
        <div className="card"><b>Mission</b><p className="muted">Deliver high‑quality software for startups and SMEs.</p></div>
        <div className="card"><b>Values</b><p className="muted">Transparency, on‑time delivery, and long‑term support.</p></div>
        <div className="card"><b>Stack</b><p className="muted">React, Node.js, Express, MongoDB, Razorpay.</p></div>
      </div>
    </div>
  );
}

