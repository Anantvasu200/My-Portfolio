import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MapPin } from 'lucide-react';
import { Github, Linkedin } from './Icons';

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative z-10 border-t border-slate-200 dark:border-white/5 font-sans bg-slate-50 dark:bg-transparent">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-slate-300 dark:bg-slate-700 w-8"></div>
            <span className="font-mono text-primary font-semibold text-sm uppercase tracking-wider">Connect</span>
            <div className="h-px bg-slate-300 dark:bg-slate-700 w-8"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-slate-900 dark:text-white">Get In <span className="text-gradient">Touch.</span></h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Whether you have a question about my work, want to discuss a project, or just want to say hi, my inbox is always open.</p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 space-y-6"
          >
            <div className="glass-card p-6 flex items-start gap-4 hover:-translate-y-1 transition-transform cursor-default">
              <div className="bg-primary/10 p-3 rounded-xl text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-white font-display font-bold mb-1">Email</h4>
                <a href="mailto:anantawasthi773@gmail.com" className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors text-sm font-mono">anantawasthi773@gmail.com</a>
              </div>
            </div>
            
            <div className="glass-card p-6 flex items-start gap-4 hover:-translate-y-1 transition-transform cursor-default">
              <div className="bg-secondary/10 p-3 rounded-xl text-secondary">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-white font-display font-bold mb-1">Location</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-mono">New Delhi, India</p>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <a href="https://github.com/Anantvasu200" className="glass-card p-4 text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-all">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/anant-kumar-awasthi-422840201/" className="glass-card p-4 text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-3 glass-card p-8 flex flex-col gap-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Name</label>
                <input type="text" id="name" className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-inner" placeholder="Your Name" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Email</label>
                <input type="email" id="email" className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-inner" placeholder="your@email.com" />
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-grow">
              <label htmlFor="message" className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">Message</label>
              <textarea id="message" rows="4" className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none h-full shadow-inner" placeholder="How can we work together?"></textarea>
            </div>
            <button className="bg-primary hover:bg-blue-600 text-white font-mono text-sm font-bold uppercase tracking-widest py-4 px-6 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 mt-2 w-full hover:-translate-y-0.5">
              <span>Send Message</span>
              <Send className="w-4 h-4" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
