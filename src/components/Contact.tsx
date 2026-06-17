"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formattedMessage = `[Portfolio Uplink]\n\nSender: ${formState.name} (${formState.email})\n\nMessage:\n${formState.message}`;
    const waUrl = `https://wa.me/919304277935?text=${encodeURIComponent(formattedMessage)}`;

    setTimeout(() => {
      window.open(waUrl, "_blank");
      setIsSubmitting(false);
      setFormState({ name: "", email: "", message: "" });
    }, 1000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section id="contact" className="relative z-10 w-full min-h-screen py-32 bg-black/60 border-t border-white/5 flex items-center">
      <div className="container max-w-5xl mx-auto px-6">
        
        {/* Section Header (Centered) */}
        <div className="mb-16 text-center flex flex-col items-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">Get In Touch</h2>
          <div className="w-12 h-1 bg-white"></div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Info Side */}
          <div className="md:col-span-5 space-y-8">
            <h3 className="font-heading text-xl font-semibold text-neutral-200">Contact Channels</h3>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-light">
              Feel free to reach out if you have any questions, project ideas, or opportunities you would like to discuss.
            </p>

            <div className="space-y-4 text-sm font-sans">
              <div>
                <span className="text-xs text-neutral-500 font-mono block">EMAIL</span>
                <a href="mailto:luckyyadav1180@gmail.com" className="text-neutral-200 hover:text-[#00f0ff] transition-colors">
                  luckyyadav1180@gmail.com
                </a>
              </div>
              
              <div>
                <span className="text-xs text-neutral-500 font-mono block">LINKEDIN</span>
                <a href="https://www.linkedin.com/in/luckyanish136" target="_blank" rel="noopener noreferrer" className="text-neutral-200 hover:text-[#00f0ff] transition-colors">
                  linkedin.com/in/luckyanish136
                </a>
              </div>

              <div>
                <span className="text-xs text-neutral-500 font-mono block">GITHUB</span>
                <a href="https://github.com/Lucky136-code" target="_blank" rel="noopener noreferrer" className="text-neutral-200 hover:text-[#00f0ff] transition-colors">
                  github.com/Lucky136-code
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <a
                href="/resume.docx"
                download
                className="inline-flex items-center gap-2 text-xs bg-white/5 border border-white/10 px-4 py-2.5 rounded text-neutral-300 hover:border-white/30 hover:text-white transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download Resume</span>
              </a>
            </div>
          </div>

          {/* Glassmorphic Form Side (Spotlight Hover) */}
          <motion.div 
            whileHover={{ y: -4 }}
            onMouseMove={handleMouseMove}
            className="md:col-span-7 mouse-glow-card bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.37)] p-8 rounded-lg transition-all duration-300 hover:border-[#00f0ff]/25 hover:shadow-[0_12px_40px_rgba(0,240,255,0.08)] hover:bg-white/[0.04]"
          >
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs text-neutral-400 font-medium font-sans">Name</label>
                  <input 
                    type="text" 
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-black border border-white/10 px-4 py-3 text-sm text-neutral-200 outline-none rounded-md focus:border-white/30 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs text-neutral-400 font-medium font-sans">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full bg-black border border-white/10 px-4 py-3 text-sm text-neutral-200 outline-none rounded-md focus:border-white/30 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs text-neutral-400 font-medium font-sans">Message</label>
                  <textarea 
                    id="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="How can I help you?"
                    className="w-full bg-black border border-white/10 px-4 py-3 text-sm text-neutral-200 outline-none rounded-md resize-none focus:border-white/30 transition-colors"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full font-sans text-sm bg-white text-black font-semibold py-3.5 rounded-md hover:bg-neutral-200 transition-colors"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </motion.div>

        </div>


      </div>
    </section>
  );
}
