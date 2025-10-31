import React from 'react';
import PageTransition from '../components/PageTransition.jsx';

const pillars = [
  {
    title: 'Strategy first',
    description:
      'We start with outcomes, not features. Every build is anchored in measurable goals, user research and a pragmatic roadmap.',
  },
  {
    title: 'Design with intent',
    description:
      'Interfaces should feel effortless. Motion, typography and feedback loops are designed to keep users confident and engaged.',
  },
  {
    title: 'Engineering excellence',
    description:
      'Clean architecture, automated testing and observability ensure products scale gracefully long after launch day.',
  },
  {
    title: 'Partnership mindset',
    description:
      'We operate as an integrated team, not a vendor. Expect transparent communication, considered guidance and shared wins.',
  },
];

const stats = [
  { label: 'Products launched', value: '120+' },
  { label: 'Timezones covered', value: '4' },
  { label: 'Retention rate', value: '93%' },
  { label: 'Avg. partnership', value: '18 months' },
];

export default function About() {
  return (
    <PageTransition>
      <div className="space-y-10 md:space-y-12">
        <section className="app-glow overflow-hidden rounded-[32px] border border-white/60 bg-white/90 p-8 shadow-soft md:p-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr),320px]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">About the studio</p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-[40px]">
                A product team built for founders and modern enterprises.
              </h1>
              <p className="mt-4 max-w-3xl text-sm text-slate-500 md:text-base">
                We combine product strategy, brand expression and engineering craft to launch experiences that feel
                effortless. Whether you are validating a new idea or reimagining a platform, we plug in as a dedicated
                squad that ships with intent.
              </p>
              <div className="mt-6 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
                <div className="rounded-2xl border border-white/60 bg-white/85 p-4">
                  <div className="text-xs font-semibold uppercase text-slate-500">Headquarters</div>
                  <div className="mt-1 font-semibold text-slate-900">Pune · Remote friendly</div>
                </div>
                <div className="rounded-2xl border border-white/60 bg-white/85 p-4">
                  <div className="text-xs font-semibold uppercase text-slate-500">Focus areas</div>
                  <div className="mt-1 font-semibold text-slate-900">Product platforms · Marketplaces · SaaS · Mobile</div>
                </div>
              </div>
            </div>
            <div className="grid gap-3 text-sm text-slate-600">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/60 bg-white/85 p-4">
                  <div className="text-xs font-semibold uppercase text-slate-500">{stat.label}</div>
                  <div className="mt-1 text-2xl font-bold text-slate-900">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr),360px] lg:items-start">
          <div className="grid gap-4 md:grid-cols-2">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="card border-white/55 bg-white/90">
                <div className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">{pillar.title}</div>
                <p className="mt-3 text-sm text-slate-500">{pillar.description}</p>
              </div>
            ))}
          </div>
          <div className="app-glow relative overflow-hidden rounded-[32px] border border-white/60 bg-white/90 p-8 shadow-soft">
            <div className="absolute -top-32 right-[-120px] h-72 w-72 rounded-full bg-gradient-to-br from-brand/20 to-accent/20 blur-3xl" />
            <div className="relative space-y-4 text-sm text-slate-500">
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Our playbook</div>
              <p>
                Multi-disciplinary pods blend strategy, product design, engineering and QA. Each pod comes with a dedicated
                producer who ensures every sprint feels intentional and transparent.
              </p>
              <p>
                Stand-ups are asynchronous and documented, demos happen weekly, and retrospectives ensure we are always
                leveling up alongside your product metrics.
              </p>
              <p>
                We keep experimentation high and risk low via feature flags, canary releases and observability baked into
                the pipeline from day zero.
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
