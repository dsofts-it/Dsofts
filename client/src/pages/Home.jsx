import React from 'react';
import { Link } from 'react-router-dom';
import { FiZap, FiClock, FiShield, FiSmartphone, FiCode, FiLayers, FiArrowRight } from 'react-icons/fi';
import { SiFlutter, SiNodedotjs, SiReact, SiNextdotjs, SiPostgresql, SiAmazonaws } from 'react-icons/si';
import PageTransition from '../components/PageTransition.jsx';

export default function Home() {
  return (
    <PageTransition>
      {/* Hero (light) */}
      <section className="pt-10 md:pt-16">
        <div className="relative rounded-3xl border border-slate-200 bg-white p-8 md:p-12 shadow-sm overflow-hidden">
          <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-gradient-to-br from-brand/10 to-brandLight/20 blur-3xl" />
          <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm mb-2">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-600"></span> Dsofts IT Services
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-slate-900">We craft modern apps that grow your business.</h1>
          <p className="text-slate-600 mt-3 max-w-3xl">Websites, Android apps, MLM/referral systems and outsourcing — delivered fast, secure and payment-ready. Built on battle-tested tech.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/login" className="px-5 py-3 rounded-xl bg-gradient-to-r from-brand to-brandLight text-white shadow-sm hover:opacity-95 transition inline-flex items-center gap-2">Get Quote <FiArrowRight/></Link>
            <a href="https://wa.me/919000000000" target="_blank" rel="noreferrer" className="px-5 py-3 rounded-xl bg-blue-50 text-slate-800 border border-slate-200 hover:bg-blue-100 transition">WhatsApp</a>
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section className="mt-10">
        <h2 className="text-xl md:text-2xl font-bold mb-3 text-slate-900">What we build</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            {i:<FiCode/>,t:'Web Development',d:'Landing pages, dashboards, portals'},
            {i:<FiSmartphone/>,t:'Android Apps',d:'Native/hybrid apps with offline'},
            {i:<FiLayers/>,t:'Referral/MLM',d:'Plans, wallet, payouts'},
            {i:<FiZap/>,t:'Outsourcing',d:'We deliver for your clients'}
          ].map((s,idx)=> (
            <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-blue-400 transition">
              <div className="text-blue-600 text-2xl">{s.i}</div>
              <div className="font-semibold mt-2 text-slate-900">{s.t}</div>
              <div className="text-slate-600 text-sm">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech strip */}
      <section className="mt-10">
        <div className="flex flex-wrap items-center gap-6 text-slate-500">
          {[SiFlutter,SiNodedotjs,SiReact,SiNextdotjs,SiPostgresql,SiAmazonaws].map((Icon,i)=> (
            <div key={i} className="flex items-center gap-2">
              <Icon className="text-2xl"/>
              <div className="hidden sm:block">{Icon.name.replace('Si','')}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="mt-10">
        <h2 className="text-xl md:text-2xl font-bold mb-3 text-slate-900">Why choose us</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <FiClock className="text-blue-600 text-2xl"/>
            <div className="font-semibold mt-2 text-slate-900">Fast Delivery</div>
            <div className="text-slate-600 text-sm">Agile process and clear milestones.</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <FiZap className="text-blue-600 text-2xl"/>
            <div className="font-semibold mt-2 text-slate-900">Affordable Pricing</div>
            <div className="text-slate-600 text-sm">Transparent estimates and flexible phases.</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <FiShield className="text-blue-600 text-2xl"/>
            <div className="font-semibold mt-2 text-slate-900">Maintenance & Support</div>
            <div className="text-slate-600 text-sm">We stay after launch with real support.</div>
          </div>
        </div>
      </section>

      {/* Portfolio grid */}
      <section className="mt-10">
        <h2 className="text-xl md:text-2xl font-bold mb-3 text-slate-900">Recent work</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[1,2,3].map(i=> (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
              <div className="h-40 bg-gradient-to-br from-blue-50 to-white"></div>
              <div className="p-4">
                <div className="font-semibold text-slate-900">Project #{i}</div>
                <div className="text-slate-600 text-sm">Landing page + Admin panel</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Client logos */}
      <section className="mt-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-wrap items-center justify-between gap-4">
          {['Fintech','Retail','Real Estate','Education','Healthcare','SaaS'].map((t,i)=> (
            <div key={i} className="text-slate-500">{t}</div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="mt-10">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-50 to-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xl font-bold text-slate-900">Ready to start?</div>
            <div className="text-slate-600">Tell us about your project. We’ll reply within 24h.</div>
          </div>
          <div className="flex gap-3">
            <a href="https://wa.me/919000000000" target="_blank" rel="noreferrer" className="px-5 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-blue-50 transition">WhatsApp</a>
            <Link to="/login" className="px-5 py-3 rounded-xl bg-brand text-white hover:opacity-90 transition">Get Quote</Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

