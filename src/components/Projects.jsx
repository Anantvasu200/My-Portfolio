import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Terminal } from 'lucide-react';
import { Github } from './Icons';

const projects = [
  {
    id: 1,
    title: 'DevOps CI/CD Pipeline',
    categoryLabel: 'DevOps',
    description: 'Implemented CI/CD pipelines integrating GitHub, Jenkins, and Docker for automated build and deployment workflows.',
    tech: ['Jenkins', 'Docker', 'GitHub Actions'],
    highlights: ['Zero-downtime deployment', 'Automated testing gates', 'Docker-based artifact management'],
    category: 'devops'
  },
  {
    id: 2,
    title: 'Elastic Observability Setup',
    categoryLabel: 'DevOps',
    description: 'Centralized logging and metrics cluster designed for high availability and deep system monitoring.',
    tech: ['Elasticsearch', 'Kibana', 'Logstash'],
    highlights: ['Hot/Warm/Cold data architecture', 'Custom Kibana dashboards', 'Real-time alerting mechanisms'],
    category: 'devops'
  },
  {
    id: 3,
    title: 'Smart Meter OCR System',
    categoryLabel: 'AI',
    description: 'Computer vision application to extract text from smart meter displays and generate audit reports.',
    tech: ['Python', 'Tesseract OCR', 'OpenCV'],
    highlights: ['High accuracy text extraction', 'Automated Excel reports', 'Bulk processing engine'],
    category: 'ai'
  },
  {
    id: 4,
    title: 'Business Associate Management System',
    categoryLabel: 'Full Stack',
    description: 'End-to-end portal for onboarding vendors, managing life cycles, and generating identification credentials.',
    tech: ['React', 'Node.js', 'Microsoft SQL'],
    highlights: ['Vendor onboarding workflow', 'Automated ID card generation', 'Role-based access control'],
    category: 'fullstack'
  },
  {
    id: 5,
    title: 'Full Stack Blog Platform',
    categoryLabel: 'Full Stack',
    description: 'Performant publishing platform with rich text capabilities and social engagement features.',
    tech: ['React', 'Node.js', 'JWT', 'TipTap'],
    highlights: ['Secure JWT authentication', 'Rich text editor integration', 'Real-time like/share system'],
    category: 'fullstack'
  },
  {
    id: 6,
    title: 'AI Assistant Interface',
    categoryLabel: 'AI',
    description: 'Intelligent assistant blending computer vision with large language model capabilities.',
    tech: ['MediaPipe', 'LLaMA', 'FastAPI'],
    highlights: ['Real-time pose/face tracking', 'Context-aware AI responses', 'Low-latency inference API'],
    category: 'ai'
  }
];

const categoryColors = {
  devops: 'from-primary/20 via-primary/5 to-transparent',
  ai: 'from-secondary/20 via-secondary/5 to-transparent',
  fullstack: 'from-accent/20 via-accent/5 to-transparent'
};

const categoryBadgeColors = {
  devops: 'bg-primary/10 text-primary border-primary/20',
  ai: 'bg-secondary/10 text-secondary border-secondary/20',
  fullstack: 'bg-accent/10 text-accent border-accent/20'
};

export default function Projects() {
  const [filter, setFilter] = useState('all');
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 relative z-10 font-sans border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-transparent">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-primary font-semibold text-sm uppercase tracking-wider">Portfolio</span>
              <div className="h-px bg-slate-300 dark:bg-slate-700 w-12"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-slate-900 dark:text-white">Selected <span className="text-gradient">Works.</span></h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg">A selection of my best work across DevOps, Full Stack Development, and AI integrations.</p>
          </div>
          
          <div className="flex flex-wrap gap-2 p-1.5 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm w-max">
            {['all', 'devops', 'fullstack', 'ai'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 text-sm font-semibold rounded-full transition-all capitalize ${filter === f ? 'bg-primary text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="glass-card p-8 group flex flex-col h-full relative"
              >
                {/* Top subtle gradient mapped to category */}
                <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${categoryColors[project.category]} opacity-50 pointer-events-none`} />
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="font-display text-5xl font-extrabold text-slate-200 dark:text-white/5 transition-colors group-hover:text-slate-300 dark:group-hover:text-white/10">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                  <div className="flex gap-4 text-slate-400 dark:text-slate-500">
                    <a href="#" className="hover:text-primary dark:hover:text-primary transition-colors hover:scale-110"><Github className="w-5 h-5" /></a>
                    <a href="#" className="hover:text-primary dark:hover:text-primary transition-colors hover:scale-110"><ExternalLink className="w-5 h-5" /></a>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <span className={`font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${categoryBadgeColors[project.category]}`}>
                    {project.categoryLabel}
                  </span>
                </div>

                <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-4 group-hover:text-primary transition-colors relative z-10">{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow relative z-10">{project.description}</p>
                
                <div className="mb-8 space-y-2 relative z-10">
                  <div className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
                    Highlights
                  </div>
                  <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-3">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-primary text-lg leading-none mt-[-2px]">•</span>
                        <span className="leading-snug">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-200 dark:border-slate-800 mt-auto relative z-10">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 px-2 py-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
