import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import MiniGame from './MiniGame';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* ── Decorative grid pattern ───────────────────────────────── */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#64748b 1px,transparent 1px),linear-gradient(90deg,#64748b 1px,transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── Radial glow centre ────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-primary/10 dark:bg-primary/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* ── Availability badge ────────────────────────────────── */}
          <motion.div {...fadeUp(0)} className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2.5 glass rounded-full px-5 py-2.5 shadow-sm border border-white/40 dark:border-white/10">
              {/* Pulsing green dot */}
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Available for remote opportunities
              </span>
              {/* Location pill */}
              <span className="hidden sm:inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 rounded-full px-2.5 py-0.5 text-xs font-medium text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700/50">
                <MapPin className="w-3 h-3" />
                India
              </span>
            </div>
          </motion.div>

          {/* ── Main headline ─────────────────────────────────────── */}
          <motion.h1
            {...fadeUp(0.1)}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-7 font-display text-slate-900 dark:text-white leading-[1.08]"
          >
            Building{' '}
            <span className="text-gradient relative">
              Scalable Systems
              {/* Underline decoration */}
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 8"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M1 6 Q75 1 150 5 Q225 9 299 4"
                  stroke="url(#uGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="uGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            ,{' '}<br className="hidden md:block" />
            Not Just Code.
          </motion.h1>

          {/* ── Sub-headline ──────────────────────────────────────── */}
          <motion.p
            {...fadeUp(0.2)}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-4 max-w-2xl mx-auto leading-relaxed"
          >
            I'm{' '}
            <span className="font-semibold text-slate-900 dark:text-white">Anant Awasthi</span>,
            a DevSecOps Engineer specialising in{' '}
            <span className="font-medium text-primary">Elastic Stack</span>,{' '}
            <span className="font-medium text-secondary">CI/CD Pipelines</span> &amp;{' '}
            Secure Backend Systems.
          </motion.p>

          {/* ── Stats row ─────────────────────────────────────────── */}
          <motion.div {...fadeUp(0.25)} className="flex items-center justify-center gap-6 mb-10 flex-wrap">
            {[
              { value: '50+', label: 'Nodes Monitored' },
              { value: '99.9%', label: 'Uptime SLA' },
              { value: '3×', label: 'Faster Deploys' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-2xl font-bold font-display text-slate-900 dark:text-white">{stat.value}</span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-500 mt-0.5">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* ── CTA Buttons ───────────────────────────────────────── */}
          <motion.div
            {...fadeUp(0.3)}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            {/* Primary */}
            <a
              href="#projects"
              className="relative w-full sm:w-auto group px-8 py-3.5 rounded-2xl overflow-hidden font-semibold text-white flex items-center justify-center gap-2 shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-shadow"
            >
              {/* Animated gradient bg */}
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary group-hover:from-secondary group-hover:to-primary transition-all duration-500" />
              <span className="relative">View My Work</span>
              <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Secondary */}
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-3.5 glass rounded-2xl text-slate-800 dark:text-white font-semibold hover:bg-white/90 dark:hover:bg-white/10 hover:shadow-lg transition-all flex items-center justify-center gap-2 group border border-white/50 dark:border-white/10"
            >
              <Terminal className="w-4 h-4 text-primary" />
              <span>Contact Me</span>
            </a>

            {/* Tertiary — resume */}
            <a
              href="#experience"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Experience
            </a>
          </motion.div>

          {/* ── Mini-Game ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl"
          >
            {/* Browser chrome wrapper */}
            <div className="glass rounded-3xl overflow-hidden ring-1 ring-slate-200/60 dark:ring-white/8 shadow-2xl shadow-slate-300/40 dark:shadow-black/50">
              {/* Title bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200/60 dark:border-white/8 bg-white/40 dark:bg-slate-900/50">
                {/* Traffic lights */}
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors cursor-default" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors cursor-default" />
                  <span className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-500 transition-colors cursor-default" />
                </div>
                {/* URL bar */}
                <div className="flex-1 mx-4 max-w-xs">
                  <div className="flex items-center gap-1.5 bg-white/60 dark:bg-slate-800/60 rounded-lg px-3 py-1 border border-slate-200/50 dark:border-slate-700/50">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 truncate">
                      runner@portfolio:~$ ./devops-runner
                    </span>
                    <span className="animate-pulse text-slate-400">▋</span>
                  </div>
                </div>
                {/* Right side hint */}
                <span className="text-xs font-mono text-slate-400 dark:text-slate-600 hidden sm:block">
                  ESC to quit
                </span>
              </div>

              {/* Game */}
              <div className="p-3 md:p-4 bg-transparent">
                <MiniGame />
              </div>
            </div>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="flex flex-col items-center gap-1.5 mt-8"
            >
              <span className="text-xs font-mono text-slate-400 dark:text-slate-600 tracking-widest uppercase">
                Scroll to explore
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-5 h-8 rounded-full border-2 border-slate-300 dark:border-slate-700 flex items-start justify-center pt-1.5"
              >
                <div className="w-1 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600" />
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
