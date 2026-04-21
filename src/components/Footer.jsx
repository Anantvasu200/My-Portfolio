import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin } from './Icons';
import { Terminal, Mail, ArrowUpRight } from 'lucide-react';

const links = [
  { name: 'About',      href: '#about' },
  { name: 'Tech',       href: '#tech' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects',   href: '#projects' },
  { name: 'Contact',    href: '#contact' },
];

const socials = [
  {
    icon: <Github className="w-4 h-4" />,
    href: 'https://github.com/Anantvasu200',
    label: 'GitHub',
  },
  {
    icon: <Linkedin className="w-4 h-4" />,
    href: 'https://www.linkedin.com/in/anant-kumar-awasthi-422840201/',
    label: 'LinkedIn',
  },
  {
    icon: <Mail className="w-4 h-4" />,
    href: 'mailto:anantvasu200@gmail.com',
    label: 'Email',
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800/50 bg-white dark:bg-transparent font-sans">
      <div className="container mx-auto px-6 md:px-12 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">

          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <a href="#" className="inline-flex items-center gap-2 font-display font-bold text-xl text-slate-900 dark:text-white">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Terminal className="w-4 h-4 text-white" />
              </span>
              Anant<span className="text-primary">.</span>
            </a>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
              DevSecOps Engineer building resilient, secure, and observable systems at scale.
            </p>
            <div className="flex items-center gap-3 mt-1">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary hover:scale-110 transition-all border border-slate-200/60 dark:border-slate-700/40"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-mono font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-5">
              Navigate
            </p>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.name}>
                  <a
                    href={l.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-1.5 group w-fit"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-primary transition-colors" />
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Status / CTA */}
          <div>
            <p className="text-xs font-mono font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-5">
              Status
            </p>
            <div className="glass rounded-2xl p-5 border border-slate-200/60 dark:border-slate-700/40">
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Open to opportunities</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-500 mb-4 leading-relaxed">
                Currently employed remotely · open to exciting full-time or contract roles in DevSecOps / Platform Engineering.
              </p>
              <a
                href="mailto:anantvasu200@gmail.com"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-secondary transition-colors"
              >
                Get in touch <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400 dark:text-slate-600 font-mono">
            © {year} Anant Awasthi · All rights reserved.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-600">
            Designed &amp; built with{' '}
            <span className="text-red-400">♥</span>{' '}
            using React + Vite + Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
