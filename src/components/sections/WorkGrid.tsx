import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Circle, ExternalLink, X } from 'lucide-react';

type Category = 'All' | 'Web3 / FinTech' | 'AI Platforms' | 'SaaS Systems';
type Status = 'Live System' | 'Case Study';

interface Project {
  id: string;
  title: string;
  client: string;
  category: Exclude<Category, 'All'>;
  status: Status;
  summary: string;
  description: string;
  stack: string[];
  href?: string;
  accent: 'primary' | 'secondary';
}

const CATEGORIES: Category[] = ['All', 'Web3 / FinTech', 'AI Platforms', 'SaaS Systems'];

const PROJECTS: Project[] = [
  {
    id: 'ledgerflow',
    title: 'LedgerFlow',
    client: 'Cross-border settlement network',
    category: 'Web3 / FinTech',
    status: 'Live System',
    summary: 'Real-time settlement rails processing 40K+ transactions a day.',
    description:
      'A full-stack rebuild of a cross-border settlement engine — event-sourced ledger, sub-200ms confirmation, and a compliance dashboard used by 12 banking partners.',
    stack: ['TypeScript', 'Node.js', 'PostgreSQL', 'Kafka'],
    href: '#',
    accent: 'secondary',
  },
  {
    id: 'signalstack',
    title: 'SignalStack',
    client: 'B2B forecasting platform',
    category: 'AI Platforms',
    status: 'Live System',
    summary: 'ML inference pipeline serving 2M predictions a day.',
    description:
      'Model-serving infrastructure and a React analyst console for a demand-forecasting SaaS — cut inference latency 6x and shipped a real-time anomaly feed.',
    stack: ['Python', 'React', 'FastAPI', 'Redis'],
    href: '#',
    accent: 'primary',
  },
  {
    id: 'opsgraph',
    title: 'OpsGraph',
    client: 'Internal tooling for a logistics operator',
    category: 'SaaS Systems',
    status: 'Case Study',
    summary: 'Unified ops dashboard replacing six legacy tools.',
    description:
      'Consolidated six disconnected internal tools into a single permissioned workspace, with a graph-based data model and role-aware views for 400+ operators.',
    stack: ['Astro', 'React', 'GraphQL', 'Tailwind'],
    accent: 'primary',
  },
  {
    id: 'vaultbridge',
    title: 'VaultBridge',
    client: 'Institutional custody platform',
    category: 'Web3 / FinTech',
    status: 'Case Study',
    summary: 'Multi-sig custody UX for institutional treasuries.',
    description:
      'Designed and built the transaction-approval flow for a multi-sig custody platform — reduced approval time from 40 minutes to under 3 with zero security regressions.',
    stack: ['TypeScript', 'Next.js', 'Solidity'],
    accent: 'secondary',
  },
  {
    id: 'promptrail',
    title: 'PromptRail',
    client: 'LLM ops platform',
    category: 'AI Platforms',
    status: 'Live System',
    summary: 'Prompt versioning and eval harness for production LLM apps.',
    description:
      'Built the evaluation and rollout pipeline for a prompt-ops platform — regression testing across 20+ model versions with automated eval scoring.',
    stack: ['TypeScript', 'Node.js', 'WebGL'],
    href: '#',
    accent: 'primary',
  },
  {
    id: 'meshboard',
    title: 'MeshBoard',
    client: 'Vertical SaaS for field services',
    category: 'SaaS Systems',
    status: 'Live System',
    summary: 'Offline-first scheduling app for 3,000+ field technicians.',
    description:
      'Offline-first PWA with conflict-free sync for field-service scheduling — cut dispatcher call volume by 70% across a 3,000-technician workforce.',
    stack: ['React', 'Astro', 'IndexedDB'],
    href: '#',
    accent: 'secondary',
  },
];

const TILT_RANGE = 14; // max degrees of rotation

function StatusBadge({ status }: { status: Status }) {
  const isLive = status === 'Live System';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${
        isLive
          ? 'border-secondary/30 bg-secondary/10 text-secondary-300'
          : 'border-white/10 bg-white/5 text-slate-300'
      }`}
    >
      <Circle
        className={`h-2 w-2 ${
          isLive ? 'animate-glow-pulse fill-secondary-400 text-secondary-400' : 'fill-slate-500 text-slate-500'
        }`}
      />
      {status}
    </span>
  );
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (project: Project) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 260, damping: 20, mass: 0.6 });
  const springRotateY = useSpring(rotateY, { stiffness: 260, damping: 20, mass: 0.6 });

  const handleMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY.set(px * TILT_RANGE);
      rotateX.set(py * -TILT_RANGE);
    },
    [rotateX, rotateY]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        data-cursor="View"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onOpen(project)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen(project)}
        className="group h-full cursor-pointer outline-none"
      >
        <motion.div
          style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: 'preserve-3d' }}
          className="glass-card relative h-full p-6 transition-shadow duration-300 group-focus-visible:shadow-glow-primary"
        >
          <div className="mb-6 flex items-start justify-between" style={{ transform: 'translateZ(30px)' }}>
            <StatusBadge status={project.status} />
            <ArrowUpRight className="h-4 w-4 text-slate-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary-300" />
          </div>

          <div style={{ transform: 'translateZ(20px)' }}>
            <p className="eyebrow text-primary-300">{project.category}</p>
            <h3 className="mt-2 text-2xl font-bold text-white">{project.title}</h3>
            <p className="mt-1 text-sm text-slate-500">{project.client}</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">{project.summary}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2" style={{ transform: 'translateZ(15px)' }}>
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-medium text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="absolute inset-0 bg-void/80"
        style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="glass-panel relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-8"
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 rounded-lg border border-white/10 p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
          aria-label="Close project details"
          data-cursor="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <StatusBadge status={project.status} />

        <p className="eyebrow mt-4 text-primary-300">{project.category}</p>
        <h3 id="project-modal-title" className="mt-2 text-3xl font-bold text-white">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-slate-500">{project.client}</p>
        <p className="mt-6 text-base leading-relaxed text-slate-300">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="btn-primary mt-8 text-sm"
            data-cursor="Open"
          >
            View Live Site
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

/**
 * WorkGrid
 * Filterable portfolio section. Cards tilt in 3D via spring-driven
 * rotateX/rotateY tied to pointer position, and open a detail modal
 * on click. Filtering animates the grid in/out with layout transitions.
 */
export default function WorkGrid() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filtered = useMemo(
    () =>
      activeCategory === 'All'
        ? PROJECTS
        : PROJECTS.filter((project) => project.category === activeCategory),
    [activeCategory]
  );

  const handleClose = useCallback(() => setActiveProject(null), []);

  return (
    <section id="work" className="section-y">
      <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-primary-300">Selected Work</p>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Systems we&apos;ve shipped</h2>
        </div>

        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter work by category">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                activeCategory === category
                  ? 'border-primary/50 bg-primary/15 text-primary-200'
                  : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setActiveProject} />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {activeProject && <ProjectModal project={activeProject} onClose={handleClose} />}
      </AnimatePresence>
    </section>
  );
}
