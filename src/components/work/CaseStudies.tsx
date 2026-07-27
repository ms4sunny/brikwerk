import { ArrowUpRight, Code2 } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  link?: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'noirwave',
    title: 'Noirwave Interactive Platform',
    client: 'Media & Entertainment',
    category: 'Interactive Web App',
    description: 'High-performance audio-visual media platform featuring 10 custom CSS/JS cursor engines, chiptune audio player, and skin toggle system.',
    metrics: [
      { label: 'Lighthouse Score', value: '99/100' },
      { label: 'Animation Frame Rate', value: '60 FPS' },
    ],
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Web Audio API'],
  },
  {
    id: 'focussound',
    title: 'Focussound Ambient Engine',
    client: 'Productivity Tech',
    category: 'Web Audio Application',
    description: 'Minimalist ambient audio platform engineered for zero layout shift, low battery footprint, and instant client-side sound mixing.',
    metrics: [
      { label: 'First Contentful Paint', value: '< 0.4s' },
      { label: 'Bundle Size', value: '< 45kb' },
    ],
    tags: ['Next.js', 'Web Audio API', 'Tailwind CSS', 'Vercel Edge'],
  },
  {
    id: 'fintech-core',
    title: 'Enterprise Analytics Engine',
    client: 'SaaS / B2B',
    category: 'Full-Stack Architecture',
    description: 'Real-time dashboard architecture capable of streaming high-frequency market telemetry with sub-50ms render latency.',
    metrics: [
      { label: 'Latency Reduction', value: '65%' },
      { label: 'Uptime Standard', value: '99.99%' },
    ],
    tags: ['React', 'Node.js', 'WebSockets', 'Tailwind CSS', 'PostgreSQL'],
  },
];

/**
 * CaseStudies
 * Section wrapped in `section-y` + `container-app` to match the vertical
 * rhythm and horizontal gutters used across the rest of the site — same
 * caveat as ProjectEstimator: drop `container-app` here if this ever sits
 * inside a `<main>` that already applies it.
 */
export default function CaseStudies() {
  return (
    <section className="section-y relative">
      <div className="container-app">
        {/* Section header */}
        <div className="mb-12 max-w-2xl">
          <div className="mb-3 flex items-center gap-2">
            <Code2 className="h-4 w-4 text-primary-400" />
            <span className="eyebrow">Selected Engineering Works</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Proof in Production.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            Zero fluff, zero boilerplate. A collection of engineered web platforms built for
            performance, resilience, and user engagement.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              className="glass-card group relative flex flex-col justify-between p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-glow-primary sm:p-8"
            >
              <div>
                {/* Category & client */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary-400">
                    {study.category}
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">{study.client}</span>
                </div>

                <h3 className="mb-3 flex items-center justify-between text-xl font-bold text-white transition-colors group-hover:text-primary-300">
                  {study.title}
                  <ArrowUpRight className="h-5 w-5 text-primary-400 opacity-0 transition-opacity group-hover:opacity-100" />
                </h3>

                <p className="mb-6 text-xs leading-relaxed text-slate-400">{study.description}</p>

                {/* Metrics callout */}
                <div className="mb-6 grid grid-cols-2 gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                  {study.metrics.map((m, idx) => (
                    <div key={idx}>
                      <div className="font-mono text-base font-bold text-secondary-400">
                        {m.value}
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
