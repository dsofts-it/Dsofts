import React from 'react';
import PageTransition from '../components/PageTransition.jsx';

export default function About() {
  return (
    <PageTransition>
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">About Dsofts IT</h2>
          <p className="text-slate-600 mt-2">
            We are a focused engineering team building reliable digital products — websites, Android apps, and business tools.
            We care about clarity, speed and honest pricing.
          </p>
          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="text-sm text-slate-500">Mission</div>
              <div className="font-semibold text-slate-900">High-quality software for startups and SMEs</div>
            </div>
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="text-sm text-slate-500">Values</div>
              <div className="font-semibold text-slate-900">Transparency, on-time delivery, long-term support</div>
            </div>
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="text-sm text-slate-500">Stack</div>
              <div className="font-semibold text-slate-900">React, Node.js, Express, MongoDB, Razorpay</div>
            </div>
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="text-sm text-slate-500">Approach</div>
              <div className="font-semibold text-slate-900">Agile, milestone-based delivery</div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-white p-6">
          <div className="text-sm font-semibold text-blue-700">Our Process</div>
          <div className="mt-3 space-y-3">
            {['Discovery & Estimation','Design & Architecture','Build & Iterate','Launch & Support'].map((step,i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 grid place-items-center font-bold">{i+1}</div>
                <div className="font-medium text-slate-800">{step}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 h-2 rounded-full bg-gradient-to-r from-brand to-brandLight" />
        </div>
      </div>
    </PageTransition>
  );
}

