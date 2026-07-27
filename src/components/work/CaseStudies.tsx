import { ArrowUpRight, Code2, Cpu, Zap, CheckCircle2 } from 'lucide-react';

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

export default function CaseStudies() {
  return (
    <section className="py-20 relative bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-primary-400 font-mono text-xs uppercase tracking-widest mb-3">
            <Code2 className="h-4 w-4" /> Selected Engineering Works
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Proof in Production.
          </h2>
          <p className="mt-4 text-slate-400 text-base leading-relaxed">
            Zero fluff, zero boilerplate. A collection of engineered web platforms built for performance, resilience, and user engagement.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/50 p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary-500/50 hover:bg-slate-900/80"
            >
              <div>
                {/* Category & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase text-primary-400 tracking-wider">
                    {study.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {study.client}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-300 transition-colors flex items-center justify-between">
                  {study.title}
                  <ArrowUpRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity text-primary-400" />
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {study.description}
                </p>

                {/* Metrics Callout Box */}
                <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-white/5 border border-white/5 mb-6">
                  {study.metrics.map((m, idx) => (
                    <div key={idx}>
                      <div className="text-base font-mono font-bold text-emerald-400">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Tags Footer */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded border border-white/10 bg-white/5 text-slate-300"
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