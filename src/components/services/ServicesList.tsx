import { Terminal, Cpu, ShieldCheck, Gauge, Check, type LucideIcon } from 'lucide-react';

interface ServiceItem {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

const SERVICES: ServiceItem[] = [
  {
    id: 'fullstack',
    icon: Terminal,
    title: 'Full-Stack Web Engineering',
    subtitle: 'End-to-End Production Applications',
    description: 'Custom React, Next.js, and TypeScript web platforms designed to scale seamlessly with zero technical debt.',
    deliverables: ['Custom React Architecture', 'Serverless & Edge API Setup', 'Database Schema Design', '100% Lighthouse Score Target'],
  },
  {
    id: 'performance',
    icon: Gauge,
    title: 'Performance & Bundle Audits',
    subtitle: 'Sub-Second Page Load Optimization',
    description: 'Deep profiling of memory leaks, layout shifts (CLS), bundle sizes, and hydration bottlenecks for complex applications.',
    deliverables: ['Core Web Vitals Remediation', 'Asset & CSS purging', 'Render Loop Optimization', 'Comprehensive Audit Report'],
  },
  {
    id: 'systems',
    icon: Cpu,
    title: 'Design Systems & UI Engineering',
    subtitle: 'Scalable Component Libraries',
    description: 'Accessible, dark-mode ready Tailwind CSS component design systems built specifically for rapid UI composition.',
    deliverables: ['Figma-to-Code Parity', 'TypeScript Prop Validation', 'Custom Animations (Framer/GSAP)', 'Accessibility (WCAG 2.1)'],
  },
  {
    id: 'security',
    icon: ShieldCheck,
    title: 'Backend Systems & API Architecture',
    subtitle: 'Secure, Resilient Infra',
    description: 'REST and GraphQL APIs built with strict request validation, webhooks, authentication, and database isolation.',
    deliverables: ['Role-Based Auth (RBAC)', 'Stripe Payment Integrations', 'Rate-limiting & Middleware', 'CI/CD Pipeline Setup'],
  },
];

/**
 * ServicesList
 * Section wrapped in `section-y` + `container-app` to match the rest of
 * the site's rhythm/gutters — same caveat as ProjectEstimator/CaseStudies:
 * drop `container-app` if this ends up inside a `<main>` that already
 * applies it.
 */
export default function ServicesList() {
  return (
    <section className="section-y relative">
      <div className="container-app">
        <div className="mb-16 max-w-2xl">
          <div className="mb-3 flex items-center gap-2">
            <Cpu className="h-4 w-4 text-primary-400" />
            <span className="eyebrow">Core Capabilities</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Engineering Precision for the Web.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="glass-card flex flex-col justify-between p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-glow-primary"
              >
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-xl border border-primary/20 bg-primary/10 p-3 text-primary-400">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{service.title}</h3>
                      <p className="font-mono text-xs text-slate-400">{service.subtitle}</p>
                    </div>
                  </div>

                  <p className="mb-6 text-sm leading-relaxed text-slate-300">
                    {service.description}
                  </p>

                  <div className="space-y-2 border-t border-white/10 pt-4">
                    <p className="mb-2 font-mono text-xs uppercase tracking-wider text-slate-400">
                      Deliverables:
                    </p>
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="h-3.5 w-3.5 shrink-0 text-secondary-400" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
