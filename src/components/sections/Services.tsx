import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Layers, Zap, ShieldCheck, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Cpu,
    title: "High-Throughput Backend Systems",
    description: "Custom Node.js, Go, and Python microservices designed for low latency, peak load handling, and real-time streaming.",
    tags: ["Node.js", "Go", "Redis", "Kafka"]
  },
  {
    icon: Layers,
    title: "Interactive Web Architecture",
    description: "Astro and React platforms engineered with dynamic motion, zero runtime overhead, and instant page transitions.",
    tags: ["Astro", "React", "TypeScript", "Tailwind"]
  },
  {
    icon: Zap,
    title: "WebGL & Spatial 3D Web UI",
    description: "Awwwards-grade 3D visual experiences, custom shader animations, and interactive canvas graphics.",
    tags: ["Three.js", "WebGL", "Framer Motion", "Canvas"]
  },
  {
    icon: ShieldCheck,
    title: "Enterprise AI & Workflow Automation",
    description: "LLM integration, autonomous AI agent pipelines, and custom API middleware tailored to complex workflows.",
    tags: ["OpenAI", "LangChain", "Python", "Vector DBs"]
  }
];

export const Services: React.FC = () => {
  return (
    <section className="section-y container-app" id="services">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="eyebrow mb-3">Core Engineering</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4">
          Architected for Speed & <span className="text-gradient-purple">Scale</span>
        </h2>
        <p className="text-slate-400 text-lg">
          We don't build standard websites — we engineer resilient digital infrastructure and immersive web experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 group hover:border-purple-500/30 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">{service.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {service.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>

              <a href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors">
                Explore Architecture <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};