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
  Zap,
  Loader2,
  AlertCircle,
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
  { id: 'fullstack', title: 'Full-Stack Web App', description: 'Complete web application with dynamic backend, database, and custom workflows.', baseEstimate: 5000 },
  { id: 'design-system', title: 'UI/UX & Design System', description: 'Tailored component system, interactive prototypes, and brand guidelines.', baseEstimate: 3000 },
  { id: 'audit', title: 'Codebase Audit & Refactor', description: 'Performance optimization, security audit, and zero-tech-debt cleanup.', baseEstimate: 2500 },
  { id: 'backend', title: 'API & Backend Systems', description: 'Scalable REST/GraphQL APIs, webhooks, microservices, and database design.', baseEstimate: 3500 },
];

const FEATURE_OPTIONS: FeatureOption[] = [
  { id: 'auth', label: 'User Auth & Role-Based Access Control', cost: 600 },
  { id: 'payments', label: 'Stripe / Custom Payment Gateway', cost: 800 },
  { id: 'realtime', label: 'Real-time WebSockets & Live Feeds', cost: 1000 },
  { id: 'i18n', label: 'Multi-language (i18n) Architecture', cost: 500 },
  { id: 'cms', label: 'Headless CMS Integration (Sanity/Strapi)', cost: 700 },
  { id: 'animations', label: 'Custom Kinetic & Framer Motion UI', cost: 900 },
];

const STEP_LABELS = ['Scope', 'Features', 'Timeline', 'Submit'];

export default function ProjectEstimator() {
  const [step, setStep] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<string>('fullstack');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string>('normal');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [clientData, setClientData] = useState({ name: '', email: '', details: '' });

  const selectedProjectTypeObj = PROJECT_TYPES.find((t) => t.id === selectedType);
  const basePrice = selectedProjectTypeObj?.baseEstimate || 0;
  
  const selectedFeatureLabels = selectedFeatures.map(
    (id) => FEATURE_OPTIONS.find((f) => f.id === id)?.label
  ).filter(Boolean);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Replace with your Web3Forms access key or endpoint
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '6142a9c9-a21e-487d-9106-04cd46914be1', // <-- Insert your access key here
          subject: `New Project Brief from ${clientData.name}`,
          from_name: clientData.name,
          email: clientData.email,
          message: clientData.details,
          project_type: selectedProjectTypeObj?.title,
          selected_features: selectedFeatureLabels.join(', ') || 'None selected',
          delivery_timeline: timeline === 'rush' ? 'Priority Sprint (+25%)' : 'Standard Velocity',
          estimated_investment: `$${totalEstimate.toLocaleString()} USD`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
      } else {
        setSubmitError(result.message || 'Failed to submit brief. Please try again.');
      }
    } catch (error) {
      setSubmitError('An unexpected error occurred. Please check your network connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-500px w-500px rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-10 top-1/4 h-300px w-300px rounded-full bg-indigo-500/10 blur-[100px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-10 backdrop-blur-xl shadow-2xl shadow-cyan-950/40">
          
          {/* Header + Running Estimate */}
          <div className="flex flex-col gap-6 border-b border-slate-800 pb-8 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-mono font-medium text-cyan-400">
                <Calculator className="h-3.5 w-3.5" />
                <span>Interactive Scope &amp; Budget Calculator</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Configure Your Build
              </h2>
            </div>

            <motion.div 
              key={totalEstimate}
              initial={{ scale: 0.95, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex items-center gap-3 rounded-2xl border border-cyan-500/40 bg-linear-to-r from-cyan-950/40 to-slate-900 px-5 py-3 text-right shadow-lg shadow-cyan-500/10"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Projected Investment</p>
                <p className="font-mono text-2xl font-black text-cyan-400">
                  ${totalEstimate.toLocaleString()}{' '}
                  <span className="text-xs font-normal text-slate-400">USD</span>
                </p>
              </div>
            </motion.div>
          </div>

          {/* Animated Progress Bar */}
          <div className="my-8 grid grid-cols-4 gap-3">
            {STEP_LABELS.map((label, i) => {
              const stepNumber = i + 1;
              const isActive = stepNumber <= step;
              return (
                <div key={label} className="space-y-2">
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-800">
                    <motion.div
                      className="h-full bg-linear-to-r from-cyan-500 to-indigo-500"
                      initial={{ width: 0 }}
                      animate={{ width: isActive ? '100%' : '0%' }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    />
                  </div>
                  <p className={`hidden font-mono text-[11px] sm:block ${isActive ? 'text-cyan-400 font-semibold' : 'text-slate-500'}`}>
                    0{stepNumber}. {label}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Step Contents */}
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4 py-12 text-center"
            >
              <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/20">
                <Check className="h-10 w-10" />
              </div>
              <h3 className="text-3xl font-bold text-white">Scope & Brief Received!</h3>
              <p className="mx-auto max-w-md text-sm leading-relaxed text-slate-300">
                Thanks <strong className="text-white">{clientData.name || 'there'}</strong>. We have saved your projected architecture with an estimated investment of{' '}
                <strong className="text-cyan-400">${totalEstimate.toLocaleString()} USD</strong>. We will review your requirements within 24 hours.
              </p>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              {/* Step 1: Scope */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4 py-2"
                >
                  <div className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Layers className="h-4 w-4 text-cyan-400" /> Select core architecture:
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {PROJECT_TYPES.map((type) => {
                      const isSelected = selectedType === type.id;
                      return (
                        <motion.button
                          key={type.id}
                          type="button"
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedType(type.id)}
                          className={`relative rounded-2xl border p-5 text-left transition-colors duration-200 ${
                            isSelected
                              ? 'border-cyan-500 bg-linear-to-br from-cyan-950/60 to-slate-900 text-white shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/50'
                              : 'border-slate-800 bg-slate-950/50 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
                          }`}
                        >
                          <div className="mb-2 flex items-start justify-between">
                            <h4 className="font-semibold text-white">{type.title}</h4>
                            <span className="rounded-lg bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 font-mono text-xs font-semibold text-cyan-300">
                              From ${type.baseEstimate.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-xs leading-relaxed text-slate-400">{type.description}</p>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Features */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4 py-2"
                >
                  <div className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Cpu className="h-4 w-4 text-cyan-400" /> Choose key technical capabilities:
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {FEATURE_OPTIONS.map((feat) => {
                      const isSelected = selectedFeatures.includes(feat.id);
                      return (
                        <motion.button
                          key={feat.id}
                          type="button"
                          whileHover={{ scale: 1.01, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleFeature(feat.id)}
                          className={`flex items-center justify-between rounded-xl border p-4 text-left transition-all duration-200 ${
                            isSelected
                              ? 'border-cyan-500 bg-cyan-950/40 text-white shadow-md shadow-cyan-500/10'
                              : 'border-slate-800 bg-slate-950/50 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`flex h-5 w-5 items-center justify-center rounded-md border transition-colors ${isSelected ? 'border-cyan-400 bg-cyan-500 text-slate-950' : 'border-slate-700 bg-slate-900'}`}>
                              {isSelected && <Check className="h-3.5 w-3.5 stroke-3" />}
                            </div>
                            <span className="text-sm font-medium">{feat.label}</span>
                          </div>
                          <span className="font-mono text-xs font-semibold text-cyan-400">+${feat.cost}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Timeline */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4 py-2"
                >
                  <div className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-300">
                    <Clock className="h-4 w-4 text-cyan-400" /> Select delivery velocity:
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setTimeline('normal')}
                      className={`rounded-2xl border p-5 text-left transition-all ${
                        timeline === 'normal'
                          ? 'border-cyan-500 bg-cyan-950/40 text-white shadow-lg shadow-cyan-500/10'
                          : 'border-slate-800 bg-slate-950/50 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="mb-1 flex items-center justify-between">
                        <h4 className="font-semibold text-white">Standard Velocity</h4>
                        <Zap className="h-4 w-4 text-slate-500" />
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">Standard 4–6 week production schedule with full milestones.</p>
                    </motion.button>

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setTimeline('rush')}
                      className={`rounded-2xl border p-5 text-left transition-all ${
                        timeline === 'rush'
                          ? 'border-cyan-500 bg-cyan-950/40 text-white shadow-lg shadow-cyan-500/10'
                          : 'border-slate-800 bg-slate-950/50 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="mb-1 flex items-center justify-between">
                        <h4 className="font-semibold text-white">Priority Sprint (+25%)</h4>
                        <Sparkles className="h-4 w-4 text-amber-400" />
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">Accelerated 2–3 week launch window with dedicated focus.</p>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Contact & Submit */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="py-2"
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
                          placeholder="Alex Morgan"
                          className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
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
                          placeholder="alex@company.com"
                          className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
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
                        className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                      />
                    </div>

                    {submitError && (
                      <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-400">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <motion.button 
                      type="submit" 
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-indigo-600 px-6 py-3.5 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          Sending Brief...
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </>
                      ) : (
                        <>
                          Submit Brief &amp; Book Discovery Call
                          <Send className="h-4 w-4 stroke-[2.5]" />
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Bottom Controls */}
          {!isSubmitted && (
            <div className="mt-8 flex items-center justify-between border-t border-slate-800 pt-6">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 1 || isSubmitting}
                className={`inline-flex items-center gap-1.5 text-sm font-medium transition-opacity ${
                  step === 1 ? 'pointer-events-none opacity-0' : 'text-slate-400 hover:text-white'
                }`}
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>

              {step < 4 && (
                <motion.button 
                  type="button" 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNext} 
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-800 border border-slate-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 transition-colors"
                >
                  Next Step <ArrowRight className="h-4 w-4 text-cyan-400" />
                </motion.button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}