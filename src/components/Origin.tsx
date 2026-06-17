"use client";

import { motion } from "framer-motion";

export default function Origin() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section id="about" className="relative z-10 w-full min-h-screen py-32 bg-black/60 border-t border-white/5 flex items-center">
      <div className="container max-w-5xl mx-auto px-6">
        
        {/* Section Header (Centered) */}
        <div className="mb-16 text-center flex flex-col items-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">About Me</h2>
          <div className="w-12 h-1 bg-white"></div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Main Biography Column */}
          <div className="md:col-span-7 space-y-6 text-neutral-300 text-sm md:text-base leading-relaxed font-light">
            <p>
              I am an Artificial Intelligence & Machine Learning engineer in training, currently pursuing my B.Tech at NIMS University, Jaipur (Class of 2027). I focus on moving AI beyond simple text completions to autonomous agentic layers capable of system orchestration.
            </p>
            <p>
              Over the last few years, I have built and managed various neural network pipelines, computer vision integrations, and local LLM tool wrappers. I am highly interested in the emerging Model Context Protocol (MCP) stack to build unified application APIs.
            </p>
            <p>
              My development philosophy is centered around building secure, clean, and highly performant applications that solve real-world automation challenges.
            </p>
          </div>

          {/* Glassmorphic Stats/Education Column (Spotlight Hover) */}
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            className="md:col-span-5 mouse-glow-card bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.37)] p-8 rounded-lg space-y-6 transition-all duration-300 hover:border-white/25 hover:shadow-[0_12px_40px_rgba(0,240,255,0.08)] hover:bg-white/[0.05]"
          >
            <div>
              <h3 className="font-heading text-lg font-semibold text-white tracking-wide mb-6">Education & Background</h3>
              
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-neutral-500 font-mono block">DEGREE & FIELD</span>
                  <span className="text-sm text-neutral-200 font-medium">B.Tech in Artificial Intelligence & Machine Learning</span>
                  <span className="text-xs text-neutral-400 block">NIMS University, Jaipur (2023 - 2027)</span>
                </div>
                
                <div>
                  <span className="text-xs text-neutral-500 font-mono block">RECOGNITION</span>
                  <span className="text-sm text-neutral-200 font-medium">Model Context Protocol (MCP) Certified</span>
                  <span className="text-xs text-neutral-400 block">Anthropic Developer Certification</span>
                </div>

                <div>
                  <span className="text-xs text-neutral-500 font-mono block">INITIATIVES</span>
                  <span className="text-sm text-neutral-200 font-medium">Founder of AgentOS Project</span>
                  <span className="text-xs text-neutral-400 block">Open Source Developer & Core Builder</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
