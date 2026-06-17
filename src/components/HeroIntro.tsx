"use client";

import { motion } from "framer-motion";

export default function HeroIntro() {
  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col justify-center items-center text-center px-6 pointer-events-auto">
      <div className="max-w-3xl flex flex-col items-center">
        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 px-3 py-1 bg-white/[0.03] border border-white/10 rounded-full text-xs text-neutral-400 font-sans tracking-wide"
        >
          Available for Opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
          className="font-heading text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6"
        >
          Lucky Anish
        </motion.h1>

        {/* Title / Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-sans text-lg md:text-xl text-neutral-300 font-medium mb-4"
        >
          AI / ML Developer & Systems Builder
        </motion.p>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="font-sans text-sm md:text-base text-neutral-400 max-w-xl leading-relaxed mb-8"
        >
          B.Tech student specializing in Artificial Intelligence and Machine Learning. Building autonomous agent systems, training deep learning neural nets, and engineering modern full-stack web applications.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto justify-center"
        >
          <a
            href="#projects"
            className="px-6 py-3 bg-white text-black font-semibold text-sm rounded-md hover:bg-neutral-200 transition-colors"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 bg-neutral-900 border border-white/10 text-white font-semibold text-sm rounded-md hover:bg-neutral-800 transition-colors"
          >
            Get In Touch
          </a>
        </motion.div>

        {/* Social Links Panel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center gap-6"
        >
          {/* GitHub */}
          <a
            href="https://github.com/Lucky136-code"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/[0.03] border border-white/10 rounded-md hover:border-white/30 text-neutral-400 hover:text-white transition-all"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/luckyanish136"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/[0.03] border border-white/10 rounded-md hover:border-white/30 text-neutral-400 hover:text-white transition-all"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>

          {/* Email */}
          <a
            href="mailto:luckyyadav1180@gmail.com"
            className="p-3 bg-white/[0.03] border border-white/10 rounded-md hover:border-white/30 text-neutral-400 hover:text-white transition-all"
            aria-label="Email"
          >
            <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
