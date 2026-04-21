import React from 'react';
import { motion } from 'framer-motion';
import { Server, Shield, Zap, GitBranch, Activity } from 'lucide-react';

const cards = [
  {
    icon: <Server className="w-5 h-5" />,
    iconBg: 'bg-blue-500/10 dark:bg-blue-500/15',
    iconColor: 'text-blue-500',
    title: 'Infrastructure as Code',
    description:
      'Building robust, repeatable environments using automation tools and modern containerization strategies.',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    iconBg: 'bg-violet-500/10 dark:bg-violet-500/15',
    iconColor: 'text-violet-500',
    title: 'High Performance',
    description:
      'Optimizing architectures for low latency, high throughput, and maximum uptime under heavy loads.',
  },
  {
    icon: <Shield className="w-5 h-5" />,
    iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
    iconColor: 'text-emerald-500',
    title: 'DevSecOps Mindset',
    description:
      'Integrating security into the continuous integration and delivery pipeline from day one.',
  },
];

const quickStats = [
  { icon: <Activity className="w-4 h-4 text-primary" />, value: '1+ yr', label: 'Production experience' },
  { icon: <Server className="w-4 h-4 text-secondary" />, value: '50+', label: 'Nodes managed' },
  { icon: <GitBranch className="w-4 h-4 text-emerald-500" />, value: '100%', label: 'Automated pipelines' },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="container mx-auto px-6 md:px-12">

        {/* ── Two-column layout ─────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-primary font-semibold text-sm uppercase tracking-wider">About</span>
              <div className="h-px bg-slate-300 dark:bg-slate-700 w-12" />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-slate-900 dark:text-white">
              Engineering <span className="text-gradient">Reliability.</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">
              I don't just write code; I design systems that scale. With extensive experience bridging
              the gap between development and operations, my focus is always on creating resilient,
              secure, and highly available architectures.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Currently working at{' '}
              <span className="font-semibold text-slate-900 dark:text-white">STM Solutions</span>
              {' '}(a Dubai-based startup), I handle the complete application lifecycle — from architecting
              microservices and configuring CI/CD pipelines to ensuring deep observability through
              Elastic Stack. If a system can be automated, I automate it.
            </p>
          </motion.div>

          {/* Right — quick stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-4"
          >
            {quickStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className="glass-card p-5 flex items-center gap-5 group"
              >
                <div className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-slate-800/60 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-display font-extrabold text-slate-900 dark:text-white leading-none mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.label}</p>
                </div>
              </motion.div>
            ))}

            {/* Terminal snippet for flavour */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.55 }}
              className="glass rounded-2xl p-4 border border-slate-200/60 dark:border-slate-700/40 font-mono text-xs leading-5"
            >
              <div className="flex gap-1.5 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              </div>
              <p className="text-slate-400 dark:text-slate-600">$ whoami</p>
              <p className="text-emerald-500">anant-awasthi</p>
              <p className="text-slate-400 dark:text-slate-600 mt-1">$ cat role.txt</p>
              <p className="text-primary">DevSecOps Engineer @ STM Solutions</p>
              <p className="text-slate-400 dark:text-slate-600 mt-1">$ uptime</p>
              <p className="text-slate-700 dark:text-slate-300">1+ year, 0 critical incidents <span className="text-emerald-400">✓</span></p>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Feature cards ─────────────────────────────────────── */}
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-7 group relative overflow-hidden"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-2xl ${card.iconBg} flex items-center justify-center mb-5 relative z-10 group-hover:scale-110 transition-transform duration-300 shadow-inner`}
              >
                <span className={card.iconColor}>{card.icon}</span>
              </div>

              <h3 className="text-lg font-display font-bold mb-2.5 text-slate-900 dark:text-white relative z-10">
                {card.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm relative z-10">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
