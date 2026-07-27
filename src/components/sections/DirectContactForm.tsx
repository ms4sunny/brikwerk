import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Check,
  Mail,
  User,
  MessageSquare,
  FileText,
  Loader2,
  AlertCircle,
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function DirectContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '6142a9c9-a21e-487d-9106-04cd46914be1',
          subject: `[Brikwerk] ${formData.subject}`,
          from_name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.message || 'Transmission failed. Please try again.');
      }
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred.');
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-500px w-500px rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-10 top-1/4 h-300px w-300px rounded-full bg-indigo-500/10 blur-[100px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-10 backdrop-blur-xl shadow-2xl shadow-cyan-950/40">
          
          {/* Header */}
          <div className="border-b border-slate-800 pb-8">
            <div className="space-y-3">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-mono font-medium text-cyan-400">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <span>Direct Studio Dispatch</span>
              </div>

              {/* Heading */}
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Send Direct Inquiry
              </h2>

              {/* Description */}
              <p className="max-w-md text-xs font-mono text-slate-400 leading-relaxed">
                Prefer an unscripted note? Drop a direct line and receive a reply within 24 hours.
              </p>
            </div>
          </div>

          {/* Form / Success Screen */}
          <div className="pt-8">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-4 py-12 text-center"
                >
                  <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/20">
                    <Check className="h-10 w-10" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">Transmission Delivered!</h3>
                  <p className="mx-auto max-w-md text-sm leading-relaxed text-slate-300">
                    Thanks for reaching out. We have logged your request and will follow up shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-mono hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {status === 'error' && (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-3 text-rose-400 text-sm">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="mb-2 flex items-center gap-2 font-mono text-xs font-medium text-slate-300">
                        <User className="h-3.5 w-3.5 text-cyan-400" /> Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Alex Morgan"
                        className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="mb-2 flex items-center gap-2 font-mono text-xs font-medium text-slate-300">
                        <Mail className="h-3.5 w-3.5 text-cyan-400" /> Work Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="alex@company.com"
                        className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="mb-2 flex items-center gap-2 font-mono text-xs font-medium text-slate-300">
                      <FileText className="h-3.5 w-3.5 text-cyan-400" /> Subject / Project Type *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Architecture Audit / Custom Application"
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="mb-2 flex items-center gap-2 font-mono text-xs font-medium text-slate-300">
                      <MessageSquare className="h-3.5 w-3.5 text-cyan-400" /> Message Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share your goals, current challenges, or timeline specifications..."
                      className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={status === 'submitting'}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-indigo-600 px-6 py-3.5 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-slate-950" />
                        <span>Transmitting Note...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Direct Message</span>
                        <Send className="h-4 w-4 stroke-[2.5]" />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}