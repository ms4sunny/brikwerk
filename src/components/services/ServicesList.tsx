import { Terminal, Cpu, ShieldCheck, Gauge, Check } from 'lucide-react';

interface ServiceItem {
  id: string;
  icon: typeof Terminal;
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

export default function ServicesList() {
  return (
    <section className="py-20 relative bg-slate-900/40 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 text-primary-400 font-mono text-xs uppercase tracking-widest mb-3">
            <Cpu className="h-4 w-4" /> Core Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Engineering Precision for the Web.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="rounded-2xl border border-white/10 bg-slate-950 p-8 flex flex-col justify-between hover:border-primary-500/40 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-primary-500/10 text-primary-400 border border-primary-500/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{service.title}</h3>
                      <p className="text-xs font-mono text-slate-400">{service.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-white/5">
                    <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Deliverables:</p>
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
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