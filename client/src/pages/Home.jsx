import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowUpRight,
  FiChevronRight,
  FiZap,
  FiShield,
  FiLayers,
  FiAirplay,
} from 'react-icons/fi';
import { SiFlutter, SiNodedotjs, SiReact, SiNextdotjs, SiPostgresql, SiAmazonaws } from 'react-icons/si';
import PageTransition from '../components/PageTransition.jsx';

const metrics = [
  { label: 'projects launched', value: '120+' },
  { label: 'avg launch time', value: '6 weeks' },
  { label: 'client nps', value: '9.4/10' },
];

const capabilities = [
  {
    icon: <FiAirplay />,
    title: 'Product strategy',
    description: 'Discovery workshops, user journeys, technical roadmap and success metrics that align with your goals.',
    tags: ['Discovery', 'Roadmap'],
  },
  {
    icon: <FiLayers />,
    title: 'Design systems',
    description: 'Component libraries, motion systems and responsive UI kits that scale across platforms.',
    tags: ['UI Kits', 'Prototyping'],
  },
  {
    icon: <FiZap />,
    title: 'Full-stack builds',
    description: 'React, React Native, Node.js and cloud-native infrastructure engineered for performance.',
    tags: ['Web', 'Mobile'],
  },
  {
    icon: <FiShield />,
    title: 'Launch & growth',
    description: 'Automation, analytics dashboards, payments, security hardening and ongoing optimisation.',
    tags: ['DevOps', 'Support'],
  },
];

const process = [
  {
    step: '01',
    title: 'Blueprint & alignment',
    detail: 'Workshops, user stories, success criteria and visual direction to ensure we are solving the right problem.',
  },
  {
    step: '02',
    title: 'Design & prototype',
    detail: 'Rapid concepting, interaction design and polished UI that your stakeholders can experience.',
  },
  {
    step: '03',
    title: 'Build & iterate',
    detail: 'Agile sprints with weekly demos, automated QA and telemetry so you see progress in real time.',
  },
  {
    step: '04',
    title: 'Launch & scale',
    detail: 'Release orchestration, observability, growth experiments and a trusted team on standby post-launch.',
  },
];

const industries = ['Fintech', 'Retail', 'SaaS', 'Healthcare', 'Education', 'Logistics', 'Hospitality', 'Real Estate'];

export default function Home() {
  return (
    <PageTransition>
      <div className="space-y-16 md:space-y-20">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr),360px] lg:items-start">
          <div className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/95 p-8 md:p-12 shadow-soft">
            <div className="absolute -top-32 right-[-120px] h-72 w-72 rounded-full bg-gradient-to-br from-brand/20 via-transparent to-accent/30 blur-3xl" />
            <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand">
              Product studio
            </div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-[54px] md:leading-[1.05]">
              Design-driven apps that delight users and grow ambitious brands.
            </h1>
            <p className="mt-5 max-w-2xl text-base text-slate-600 md:text-lg">
              We partner with founders and product teams to deliver high-impact web, Android and hybrid experiences. From
              the first whiteboard to production, you get a cross-functional crew that ships fast and sweats every detail.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link className="btn" to="/project-builder">
                Start a project
                <FiArrowUpRight />
              </Link>
              <Link
                className="inline-flex items-center gap-2 rounded-2xl border border-white/60 bg-white/70 px-5 py-2.5 text-sm font-semibold text-brand transition hover:border-brand"
                to="/services"
              >
                Explore services
                <FiChevronRight />
              </Link>
              <Link
                className="inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:text-brand"
                to="/clients"
              >
                See our work
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {metrics.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/50 bg-white/80 p-4 shadow-sm">
                  <div className="text-2xl font-bold text-slate-900 md:text-3xl">{item.value}</div>
                  <div className="mt-1 text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="app-glow relative overflow-hidden rounded-[32px] border border-white/50 bg-white/90 p-8 shadow-soft">
            <div className="absolute inset-x-10 top-10 h-40 rounded-3xl bg-gradient-to-br from-brand/25 to-accent/25 blur-3xl" />
            <div className="relative space-y-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Featured build</div>
                <h3 className="mt-2 text-2xl font-bold text-slate-900">Subscription SaaS launcher</h3>
                <p className="mt-3 text-sm text-slate-500">
                  Multi-tenant admin, paywall funnels, usage analytics and CI/CD that keeps features landing weekly.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/60 bg-white/80 p-4">
                  <div className="text-xs font-semibold uppercase text-slate-500">Timeline</div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">6 weeks</div>
                </div>
                <div className="rounded-2xl border border-white/60 bg-white/80 p-4">
                  <div className="text-xs font-semibold uppercase text-slate-500">Platforms</div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">Web · Android</div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/60 bg-white/80 p-4">
                <div className="text-xs font-semibold uppercase text-slate-500">Impact</div>
                <div className="mt-1 text-sm font-semibold text-slate-900">3.2× MoM signups · 92% retention</div>
              </div>
              <Link
                to="/clients"
                className="inline-flex items-center justify-between gap-2 rounded-2xl border border-brand/20 bg-white/85 px-4 py-3 text-sm font-semibold text-brand transition hover:border-brand"
              >
                View case studies
                <FiArrowUpRight />
              </Link>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">What we do</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-[38px]">Vision to release, covered.</h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/60 bg-white/80 px-4 py-2 text-sm font-semibold text-brand transition hover:border-brand"
            >
              Full services deck
              <FiArrowUpRight />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {capabilities.map((item) => (
              <div key={item.title} className="card flex flex-col gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-2xl text-brand">
                  {item.icon}
                </div>
                <div>
                  <div className="text-xl font-semibold text-slate-900">{item.title}</div>
                  <p className="mt-2 text-sm text-slate-500">{item.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border border-white/60 bg-white/80 px-3 py-1 text-[0.7rem] font-semibold text-brand"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[420px,minmax(0,1fr)] lg:items-start">
          <div className="app-glow relative overflow-hidden rounded-[32px] border border-white/60 bg-white/90 p-8 shadow-soft">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Our process</div>
            <h3 className="mt-3 text-2xl font-bold text-slate-900">A rhythm built around clarity and velocity.</h3>
            <p className="mt-3 text-sm text-slate-500">
              Every engagement has rituals that keep stakeholders aligned and features shipping. Weekly demos, daily async
              updates and a transparent roadmap keep momentum unmistakable.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-600">
              <div className="rounded-2xl border border-white/60 bg-white/85 p-4">
                <div className="text-xs font-semibold uppercase text-slate-500">Toolkit</div>
                <div className="mt-1">Linear · Figma · Notion · Slack</div>
              </div>
              <div className="rounded-2xl border border-white/60 bg-white/85 p-4">
                <div className="text-xs font-semibold uppercase text-slate-500">Quality</div>
                <div className="mt-1">Automation, previews, observability baked in.</div>
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            {process.map((item) => (
              <div key={item.step} className="card flex items-start gap-4 border-white/50 bg-white/85">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-sm font-bold text-brand">
                  {item.step}
                </div>
                <div>
                  <div className="text-lg font-semibold text-slate-900">{item.title}</div>
                  <p className="mt-2 text-sm text-slate-500">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Stack we trust</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">Battle-tested technology partners.</h3>
            </div>
            <Link to="/clients" className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
              Explore implementation stories
              <FiArrowUpRight />
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-slate-500">
            {[
              { Icon: SiFlutter, name: 'Flutter' },
              { Icon: SiReact, name: 'React' },
              { Icon: SiNextdotjs, name: 'Next.js' },
              { Icon: SiNodedotjs, name: 'Node.js' },
              { Icon: SiPostgresql, name: 'PostgreSQL' },
              { Icon: SiAmazonaws, name: 'AWS' },
            ].map(({ Icon, name }) => (
              <div
                key={name}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/60 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-600"
              >
                <Icon className="text-2xl text-brand" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Industries</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">Trusted across verticals.</h3>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/60 bg-white/80 px-4 py-2 text-sm font-semibold text-brand transition hover:border-brand"
            >
              Schedule a call
              <FiArrowUpRight />
            </Link>
          </div>
          <div className="app-glow flex flex-wrap items-center justify-between gap-4 px-6 py-6">
            {industries.map((industry) => (
              <span key={industry} className="text-sm font-semibold text-slate-600">
                {industry}
              </span>
            ))}
          </div>
        </section>

        <section className="app-glow rounded-[32px] border border-white/60 bg-white/90 p-8 shadow-soft md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">Let&apos;s build</p>
              <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-[36px]">
                Ready for a partner obsessed with craft?
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-slate-500">
                Drop in your idea or Figma link. We will assemble the winning squad and reply within 24 hours with next steps.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link className="btn" to="/project-builder">
                Build my roadmap
                <FiArrowUpRight />
              </Link>
              <Link
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/60 bg-white/85 px-5 py-2.5 text-sm font-semibold text-brand transition hover:border-brand"
                to="/contact"
              >
                Talk to the team
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
