import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Atom, Box, FileCode2, Rocket, Server, Wind, type LucideIcon } from 'lucide-react';

interface StackItem {
  id: string;
  name: string;
  icon: LucideIcon;
  role: string;
  snippet: string;
}

const STACK: StackItem[] = [
  {
    id: 'astro',
    name: 'Astro',
    icon: Rocket,
    role: 'Islands architecture, zero JS by default',
    snippet: `---
const projects = await getCollection('work');
---
<WorkGrid client:visible projects={projects} />`,
  },
  {
    id: 'react',
    name: 'React',
    icon: Atom,
    role: 'Interactive islands & component system',
    snippet: `function useTilt(ref: RefObject<HTMLDivElement>) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  return { rotateX, rotateY };
}`,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: FileCode2,
    role: 'End-to-end type safety',
    snippet: `interface Project {
  id: string;
  status: 'Live System' | 'Case Study';
}`,
  },
  {
    id: 'node',
    name: 'Node.js',
    icon: Server,
    role: 'API layer & service orchestration',
    snippet: `app.get('/api/metrics', async (_req, res) => {
  const data = await getLiveMetrics();
  res.json(data);
});`,
  },
  {
    id: 'webgl',
    name: 'WebGL',
    icon: Box,
    role: 'GPU-accelerated visual experiences',
    snippet: `const geometry = new THREE.IcosahedronGeometry(1, 4);
const material = new THREE.ShaderMaterial({ uniforms });`,
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    icon: Wind,
    role: 'Utility-first design system',
    snippet: `<div className="glass-card shadow-glow-primary">
  {/* ... */}
</div>`,
  },
];

interface Metric {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  decimals?: number;
}

const METRICS: Metric[] = [
  { label: 'Uptime', value: 99.9, suffix: '%', decimals: 1 },
  { label: 'API Latency', value: 100, suffix: 'ms', prefix: '<' },
  { label: 'Lighthouse Score', value: 98, suffix: '/100' },
  { label: 'Deploys / Month', value: 40, suffix: '+' },
];

const COUNT_DURATION_MS = 1200;

function MetricCounter({ metric }: { metric: Metric }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / COUNT_DURATION_MS, 1);
      const eased = 1 - (1 - progress) ** 3; // ease-out cubic
      setDisplay(metric.value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, metric.value]);

  const formatted = metric.decimals ? display.toFixed(metric.decimals) : Math.round(display).toString();

  return (
    <span ref={ref} className="tabular-nums">
      {metric.prefix}
      {formatted}
      {metric.suffix}
    </span>
  );
}

/**
 * TechStackWidget
 * Dashboard-style section: a row of animated metric counters (count up
 * once scrolled into view) above a two-pane panel — a tab list of the
 * core stack on the left, and a live-swapping code snippet preview on
 * the right.
 */
export default function TechStackWidget() {
  const [activeId, setActiveId] = useState<string>(STACK[0].id);
  const active = STACK.find((item) => item.id === activeId) ?? STACK[0];

  return (
    <section className="section-y">
      <div className="mb-12">
        <p className="eyebrow text-primary-300">Engineering Stack</p>
        <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
          What we build with — and how it performs
        </h2>
      </div>

      {/* Live metrics row */}
      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {METRICS.map((metric) => (
          <div key={metric.label} className="glass-card p-5 text-center">
            <p className="text-2xl font-bold text-white sm:text-3xl">
              <MetricCounter metric={metric} />
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
              {metric.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        {/* Stack tab list */}
        <div className="glass-card p-2" role="tablist" aria-label="Engineering stack">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
            {STACK.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(item.id)}
                  className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all duration-300 ${
                    isActive
                      ? 'border-primary/40 bg-primary/10'
                      : 'border-transparent hover:border-white/10 hover:bg-white/5'
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      isActive ? 'bg-primary/20 text-primary-300' : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-white">{item.name}</span>
                  <span className="text-xs leading-snug text-slate-500">{item.role}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Code preview */}
        <div className="glass-card overflow-hidden !p-0">
          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-secondary-500/70" />
            <span className="ml-2 text-xs font-medium text-slate-500">
              {active.name.toLowerCase().replace(/[.\s]/g, '')}.snippet
            </span>
          </div>
          <AnimatePresence mode="wait">
            <motion.pre
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="overflow-x-auto p-5 text-[13px] leading-relaxed text-slate-300"
            >
              <code>{active.snippet}</code>
            </motion.pre>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
