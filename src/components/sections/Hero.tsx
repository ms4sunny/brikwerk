import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Compass, Zap, Activity, ShieldCheck, type LucideIcon } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

interface Metric {
  icon: LucideIcon;
  value: string;
  label: string;
  glow: 'primary' | 'secondary';
}

const METRICS: Metric[] = [
  { icon: Activity, value: '99.9%', label: 'System Uptime', glow: 'secondary' },
  { icon: Zap, value: '10x', label: 'Render Speed', glow: 'primary' },
  { icon: ShieldCheck, value: 'Zero', label: 'Tech Debt', glow: 'secondary' },
];

/* Strictly typing variant objects resolves Framer Motion TypeScript inference errors */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Hero
 * Primary above-the-fold section: eyebrow pill, headline with a
 * gradient-highlighted phrase, subtitle, dual CTAs, and a floating
 * stack of GlassCard metric tiles on the right.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-16 md:pb-32 md:pt-24">
      <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
        {/* Left: copy + CTAs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl"
        >
          <motion.div
            variants={itemVariants}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="text-sm">⚡</span>
            <span className="eyebrow text-primary-300">
              Next-Gen Software Architecture &amp; Web Engineering
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-balance text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl"
          >
            We Engineer Scalable{' '}
            <span className="text-gradient-primary">Digital Products</span> That
            Drive Growth
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-balance text-lg leading-relaxed text-slate-400"
          >
            Brikwerk partners with ambitious B2B teams to design, build, and scale
            production-grade software — from resilient backend architecture to
            interfaces engineered for conversion. No templates, no shortcuts,
            just senior engineering from kickoff to launch.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-4">
            <a href="/contact" className="btn-primary">
              Start Project
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="/work" className="btn-secondary">
              <Compass className="h-4 w-4" />
              Explore Work
            </a>
          </motion.div>
        </motion.div>

        {/* Right: floating metrics card stack */}
        <div className="relative mx-auto h-105 w-full max-w-md lg:mx-0">
          {METRICS.map((metric, i) => {
            const Icon = metric.icon;
            const offset = i - (METRICS.length - 1) / 2;

            return (
              <motion.div
                key={metric.label}
                className="absolute inset-x-4 sm:inset-x-10"
                style={{ top: `${i * 88}px`, zIndex: METRICS.length - i }}
                initial={{ opacity: 0, y: 40, rotate: offset * 3 }}
                animate={{
                  opacity: 1,
                  y: [0, -10, 0],
                  rotate: offset * 3,
                }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.3 + i * 0.15 },
                  y: {
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.4,
                  },
                }}
              >
                <GlassCard glow={metric.glow} className="flex items-center gap-4">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                      metric.glow === 'primary'
                        ? 'bg-primary/15 text-primary-300'
                        : 'bg-secondary/15 text-secondary-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xl font-bold text-white">{metric.value}</p>
                    <p className="text-sm text-slate-400">{metric.label}</p>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}