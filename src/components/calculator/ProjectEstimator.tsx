import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Calculator,
  Layers,
  Cpu,
  Clock,
  Send,
} from 'lucide-react';

interface ProjectType {
  id: string;
  title: string;
  description: string;
  baseEstimate: number;
}

interface FeatureOption {
  id: string;
  label: string;
  cost: number;
}

const PROJECT_TYPES: ProjectType[] = [
  { id: 'fullstack', title: 'Full-Stack Web App', description: 'Complete web application with dynamic backend and database.', baseEstimate: 5000 },
  { id: 'design-system', title: 'UI/UX & Design System', description: 'Tailored component system, wireframes, and design guidelines.', baseEstimate: 3000 },
  { id: 'audit', title: 'Codebase Audit & Refactor', description: 'Performance optimization, security audit, and tech debt cleanup.', baseEstimate: 2500 },
  { id: 'backend', title: 'API & Backend Systems', description: 'Scalable REST/GraphQL APIs, webhooks, and microservices.', baseEstimate: 3500 },
];

const FEATURE_OPTIONS: FeatureOption[] = [
  { id: 'auth', label: 'User Auth & Role Control', cost: 600 },
  { id: 'payments', label: 'Stripe / Payment Integration', cost: 800 },
  { id: 'realtime', label: 'Real-time Sockets / Feeds', cost: 1000 },
  { id: 'i18n', label: 'Multi-language (i18n)', cost: 500 },
  { id: 'cms', label: 'Headless CMS Integration', cost: 700 },
  { id: 'animations', label: 'Custom Framer / Canvas Animations', cost: 900 },
];

const STEP_LABELS = ['Scope', 'Features', 'Timeline', 'Submit'];

/**
 * ProjectEstimator
 * Self-contained 4-step scope & budget calculator. Wrapped in its own
 * `container-app` + `section-y` so it can be dropped onto any page as a
 * standalone section — if it's ever placed inside a layout that already
 * wraps its slot in `container-app` (like sections composed directly in
 * BaseLayout's `<main>`), drop the outer `container-app` here to avoid
 * double horizontal padding.
 */
export default function ProjectEstimator() {
  const [step, setStep] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<string>('fullstack');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string>('normal');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [clientData, setClientData] = useState({ name: '', email: '', details: '' });

  const basePrice = PROJECT_TYPES.find((t) => t.id === selectedType)?.baseEstimate || 0;
  const featuresPrice = selectedFeatures.reduce((acc, featId) => {
    const feat = FEATURE_OPTIONS.find((f) => f.id === featId);
    return acc + (feat ? feat.cost : 0);
  }, 0);
  const multiplier = timeline === 'rush' ? 1.25 : 1.0;
  const totalEstimate = Math.round((basePrice + featuresPrice) * multiplier);

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section className="section-y">
      <div className="container-app">
        <div className="glass-panel relative mx-auto max-w-3xl overflow-hidden rounded-2xl p-6 sm:p-10">
          {/* Ambient accent glow, consistent with hero/card treatment elsewhere */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

          {/* Header + running estimate */}
          <div className="flex flex-col gap-4 border-b border-white/10 pb-8 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <Calculator className="h-4 w-4 text-primary-400" />
                <span className="eyebrow">Interactive Scope &amp; Budget Estimator</span>
              </div>
              <h2 className="text-2xl font-bold text-white">Estimate Your Project</h2>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 text-right">
              <div>
                <p className="font-mono text-[10px] uppercase text-slate-400">Est. Investment</p>
                <p className="font-mono text-lg font-bold text-primary-300">
                  ${totalEstimate.toLocaleString()}{' '}
                  <span className="text-xs font-normal text-slate-400">USD</span>
                </p>
              </div>
            </div>
          </div>

          {/* Step indicator */}
          <div className="my-6 grid grid-cols-4 gap-2">
            {STEP_LABELS.map((label, i) => {
              const stepNumber = i + 1;
              return (
                <div key={label} className="space-y-1">
                  <div
                    className={`h-1.5 rounded-full transition-colors duration-300 ${
                      stepNumber <= step ? 'bg-primary shadow-glow-primary' : 'bg-white/10'
                    }`}
                  />
                  <p className="hidden font-mono text-[10px] text-slate-500 sm:block">
                    0{stepNumber}. {label}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Step contents */}
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4 py-12 text-center"
            >
              <div className="mb-2 inline-flex h-16 w-16 items-center justify-center rounded-full border border-secondary/30 bg-secondary/20 text-secondary-400 shadow-glow-secondary">
                <Check className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Project Brief Received!</h3>
              <p className="mx-auto max-w-md text-sm leading-relaxed text-slate-300">
                Thanks {clientData.name || 'there'}. We&apos;ve logged your projected budget of{' '}
                <strong className="text-white">${totalEstimate.toLocaleString()} USD</strong> and
                will review your scope within 24 hours.
              </p>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4 py-4"
                >
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Layers className="h-4 w-4 text-primary-400" /> Select primary project core:
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {PROJECT_TYPES.map((type) => {
                      const isSelected = selectedType === type.id;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setSelectedType(type.id)}
                          className={`relative rounded-xl border p-5 text-left transition-all duration-200 ${
                            isSelected
                              ? 'border-primary bg-primary/10 text-white shadow-glow-primary'
                              : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10'
                          }`}
                        >
                          <div className="mb-2 flex items-start justify-between">
                            <h4 className="font-semibold text-white">{type.title}</h4>
                            <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-xs text-primary-300">
                              From ${type.baseEstimate.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-xs leading-relaxed text-slate-400">{type.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4 py-4"
                >
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Cpu className="h-4 w-4 text-primary-400" /> Select key architectural features:
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {FEATURE_OPTIONS.map((feat) => {
                      const isSelected = selectedFeatures.includes(feat.id);
                      return (
                        <button
                          key={feat.id}
                          type="button"
                          onClick={() => toggleFeature(feat.id)}
                          className={`flex items-center justify-between rounded-xl border p-4 text-left transition-all duration-200 ${
                            isSelected
                              ? 'border-primary bg-primary/10 text-white'
                              : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                          }`}
                        >
                          <span className="text-sm font-medium">{feat.label}</span>
                          <span className="font-mono text-xs text-primary-300">+${feat.cost}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4 py-4"
                >
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Clock className="h-4 w-4 text-primary-400" /> Target delivery timeline:
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setTimeline('normal')}
                      className={`rounded-xl border p-5 text-left transition-all ${
                        timeline === 'normal'
                          ? 'border-primary bg-primary/10 text-white'
                          : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <h4 className="mb-1 font-semibold">Standard Velocity</h4>
                      <p className="text-xs text-slate-400">Standard 4–6 week delivery schedule.</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTimeline('rush')}
                      className={`rounded-xl border p-5 text-left transition-all ${
                        timeline === 'rush'
                          ? 'border-primary bg-primary/10 text-white'
                          : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <div className="mb-1 flex items-center justify-between">
                        <h4 className="font-semibold">Priority Sprint (+25%)</h4>
                        <Sparkles className="h-4 w-4 text-amber-400" />
                      </div>
                      <p className="text-xs text-slate-400">Accelerated 2–3 week launch window.</p>
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="py-4"
                >
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block font-mono text-xs text-slate-300">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={clientData.name}
                          onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                          placeholder="John Doe"
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white transition-colors focus:border-primary/60 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block font-mono text-xs text-slate-300">
                          Work Email
                        </label>
                        <input
                          type="email"
                          required
                          value={clientData.email}
                          onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                          placeholder="john@company.com"
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white transition-colors focus:border-primary/60 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block font-mono text-xs text-slate-300">
                        Project Context (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={clientData.details}
                        onChange={(e) => setClientData({ ...clientData, details: e.target.value })}
                        placeholder="Briefly describe what you're building..."
                        className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white transition-colors focus:border-primary/60 focus:outline-none"
                      />
                    </div>

                    <button type="submit" className="btn-primary w-full justify-center text-sm font-semibold">
                      Submit Brief &amp; Book Discovery Call
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Bottom navigation */}
          {!isSubmitted && (
            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-6">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 1}
                className={`inline-flex items-center gap-1.5 text-sm font-medium transition-opacity ${
                  step === 1 ? 'pointer-events-none opacity-0' : 'text-slate-400 hover:text-white'
                }`}
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>

              {step < 4 && (
                <button type="button" onClick={handleNext} className="btn-primary text-sm">
                  Next Step <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
