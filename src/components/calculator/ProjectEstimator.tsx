import { useState } from 'react';
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
  Send 
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

export default function ProjectEstimator() {
  const [step, setStep] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<string>('fullstack');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string>('normal');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Form State
  const [clientData, setClientData] = useState({ name: '', email: '', details: '' });

  // Calculate Running Estimate
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="relative rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-10 shadow-2xl overflow-hidden">
        {/* Subtle Accent Glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header & Progress */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-primary-400 font-mono text-xs uppercase tracking-wider mb-1">
              <Calculator className="h-4 w-4" /> Interactive Scope & Budget Estimator
            </div>
            <h2 className="text-2xl font-bold text-white">Estimate Your Project</h2>
          </div>

          {/* Running Price Pill */}
          <div className="flex items-center gap-3 rounded-xl border border-primary-500/30 bg-primary-500/10 px-4 py-2 text-right">
            <div>
              <p className="text-[10px] font-mono uppercase text-slate-400">Est. Investment</p>
              <p className="text-lg font-bold font-mono text-primary-300">
                ${totalEstimate.toLocaleString()} <span className="text-xs text-slate-400 font-normal">USD</span>
              </p>
            </div>
          </div>
        </div>

        {/* Step Indicator Bar */}
        <div className="grid grid-cols-4 gap-2 my-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-1">
              <div
                className={`h-1.5 rounded-full transition-colors duration-300 ${
                  i <= step ? 'bg-primary-500' : 'bg-white/10'
                }`}
              />
              <p className="text-[10px] font-mono text-slate-400 hidden sm:block">
                0{i}. {i === 1 ? 'Scope' : i === 2 ? 'Features' : i === 3 ? 'Timeline' : 'Submit'}
              </p>
            </div>
          ))}
        </div>

        {/* Step Contents */}
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 text-center space-y-4"
          >
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-2">
              <Check className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Project Brief Received!</h3>
            <p className="text-slate-300 max-w-md mx-auto text-sm leading-relaxed">
              Thanks {clientData.name || 'there'}. We&apos;ve logged your projected budget of{' '}
              <strong className="text-white">${totalEstimate.toLocaleString()} USD</strong> and will review your scope within 24 hours.
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
                <div className="flex items-center gap-2 text-sm text-slate-300 font-medium mb-3">
                  <Layers className="h-4 w-4 text-primary-400" /> Select primary project core:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PROJECT_TYPES.map((type) => {
                    const isSelected = selectedType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setSelectedType(type.id)}
                        className={`text-left p-5 rounded-xl border transition-all duration-200 relative ${
                          isSelected
                            ? 'border-primary-500 bg-primary-500/10 text-white shadow-lg shadow-primary-500/10'
                            : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-white">{type.title}</h4>
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-primary-300">
                            From ${type.baseEstimate.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{type.description}</p>
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
                <div className="flex items-center gap-2 text-sm text-slate-300 font-medium mb-3">
                  <Cpu className="h-4 w-4 text-primary-400" /> Select key architectural features:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {FEATURE_OPTIONS.map((feat) => {
                    const isSelected = selectedFeatures.includes(feat.id);
                    return (
                      <button
                        key={feat.id}
                        type="button"
                        onClick={() => toggleFeature(feat.id)}
                        className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-200 ${
                          isSelected
                            ? 'border-primary-500 bg-primary-500/10 text-white'
                            : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                        }`}
                      >
                        <span className="text-sm font-medium">{feat.label}</span>
                        <span className="text-xs font-mono text-primary-300">
                          +${feat.cost}
                        </span>
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
                <div className="flex items-center gap-2 text-sm text-slate-300 font-medium mb-3">
                  <Clock className="h-4 w-4 text-primary-400" /> Target Delivery Timeline:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setTimeline('normal')}
                    className={`p-5 rounded-xl border text-left transition-all ${
                      timeline === 'normal'
                        ? 'border-primary-500 bg-primary-500/10 text-white'
                        : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <h4 className="font-semibold mb-1">Standard Velocity</h4>
                    <p className="text-xs text-slate-400">Standard 4–6 week delivery schedule.</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTimeline('rush')}
                    className={`p-5 rounded-xl border text-left transition-all ${
                      timeline === 'rush'
                        ? 'border-primary-500 bg-primary-500/10 text-white'
                        : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">Your Name</label>
                      <input
                        type="text"
                        required
                        value={clientData.name}
                        onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">Work Email</label>
                      <input
                        type="email"
                        required
                        value={clientData.email}
                        onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">Project Context (Optional)</label>
                    <textarea
                      rows={3}
                      value={clientData.details}
                      onChange={(e) => setClientData({ ...clientData, details: e.target.value })}
                      placeholder="Briefly describe what you're building..."
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary py-3 justify-center text-sm font-semibold"
                  >
                    Submit Brief & Book Discovery Call
                    <Send className="h-4 w-4 ml-1" />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Bottom Navigation Buttons */}
        {!isSubmitted && (
          <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-6">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className={`inline-flex items-center gap-1.5 text-sm font-medium transition-opacity ${
                step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-white'
              }`}
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>

            {step < 4 && (
              <button
                type="button"
                onClick={handleNext}
                className="btn-primary py-2 px-5 text-sm"
              >
                Next Step <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}