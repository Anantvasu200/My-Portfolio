import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Server, Zap } from 'lucide-react';

const experiences = [
  {
    id: 'stm',
    company: 'STM Solutions',
    role: 'DevSecOps Engineer & Full Stack',
    type: 'Full-time Remote',
    date: '2024 — Present',
    bullets: [
      'Deployed Elastic Stack (Elasticsearch, Kibana) across multiple production sites for real-time observability and system diagnostics',
      'Rolled out Elastic Agents via Fleet Server for centralized log collection across 50+ nodes',
      'Built CI/CD pipelines in Jenkins with automated build, test, and secure deployment stages',
      'Embedded DevSecOps security scanning gates into delivery pipelines, maintaining high uptime SLAs',
      'Architected containerized microservices using Docker & Kubernetes on OpenShift and AWS (EC2, VPC)'
    ],
    metrics: [
      { label: 'Nodes Monitored', value: '50+', icon: <Server className="w-5 h-5 text-primary" /> },
      { label: 'Uptime SLA', value: '99.9%', icon: <Activity className="w-5 h-5 text-secondary" /> },
      { label: 'Deploy Speed', value: '3x', icon: <Zap className="w-5 h-5 text-accent" /> },
    ],
    tech: ['Elastic Stack', 'Jenkins', 'Kubernetes', 'Docker', 'AWS', 'OpenShift']
  }
];

export default function Experience() {
  const [activeTab, setActiveTab] = useState(experiences[0].id);
  const activeExperience = experiences.find(e => e.id === activeTab);

  return (
    <section id="experience" className="py-24 relative z-10 font-sans border-t border-slate-200 dark:border-white/5 bg-white dark:bg-transparent">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-primary font-semibold text-sm uppercase tracking-wider">Career</span>
            <div className="h-px bg-slate-300 dark:bg-slate-700 w-12"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-slate-900 dark:text-white">Work <span className="text-gradient">Experience.</span></h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg">Professional journey and operational impact.</p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8 md:gap-12">
          {/* Left Timeline / Tabs */}
          <div className="md:col-span-4 flex flex-col gap-2 relative">
            <div className="absolute left-[15px] top-0 bottom-0 w-px bg-slate-200 dark:bg-white/10 hidden md:block z-0" />
            
            {experiences.map((exp) => (
              <button
                key={exp.id}
                onClick={() => setActiveTab(exp.id)}
                className={`relative z-10 text-left px-6 py-4 transition-all duration-300 border-l-2 rounded-r-2xl ${
                  activeTab === exp.id 
                    ? 'border-primary bg-primary/5 shadow-sm' 
                    : 'border-transparent dark:border-white/10 hover:border-slate-300 dark:hover:border-white/30 hover:bg-slate-50 dark:hover:bg-white/5'
                }`}
              >
                <div className={`text-lg font-display font-bold mb-1 ${activeTab === exp.id ? 'text-primary' : 'text-slate-800 dark:text-slate-200'}`}>
                  {exp.company}
                </div>
                <div className="text-sm font-medium text-slate-500 dark:text-slate-400">{exp.date}</div>
              </button>
            ))}
          </div>

          {/* Right Content */}
          <div className="md:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExperience.id}
                initial={{ opacity: 0, x: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.3 }}
                className="glass-card p-8 md:p-10 relative group"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-8">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">{activeExperience.role}</h3>
                    <div className="text-sm font-medium text-primary bg-primary/10 w-fit px-3 py-1 rounded-full">{activeExperience.type}</div>
                  </div>
                </div>
                
                {/* Metrics Glowing Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {activeExperience.metrics.map((metric, idx) => (
                    <div key={idx} className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex flex-col gap-2 relative overflow-hidden group/metric hover:border-primary/50 transition-colors">
                      <div className="absolute -right-4 -top-4 w-16 h-16 bg-primary/5 rounded-full group-hover/metric:scale-150 transition-transform duration-500" />
                      <div className="bg-white dark:bg-slate-800 p-2 rounded-xl w-fit shadow-sm">{metric.icon}</div>
                      <div className="text-3xl font-display font-bold text-slate-900 dark:text-white mt-2">{metric.value}</div>
                      <div className="text-sm font-medium text-slate-500 dark:text-slate-400">{metric.label}</div>
                    </div>
                  ))}
                </div>

                <ul className="space-y-4 text-slate-600 dark:text-slate-300 mb-8 text-sm md:text-base leading-relaxed">
                  {activeExperience.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex gap-4 group/bullet">
                      <div className="mt-1.5 min-w-[8px] h-[8px] rounded-full bg-primary/30 group-hover/bullet:bg-primary transition-colors flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-200 dark:border-slate-800">
                  {activeExperience.tech.map((t, i) => (
                    <span key={i} className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300 px-3 py-1.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-lg shadow-sm dark:shadow-none">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
