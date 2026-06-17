"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed top-0 left-0 right-0 z-50 py-5 bg-black/80 backdrop-blur-md border-b border-white/5"
        >
          {/* Centered navigation links, logo removed as requested */}
          <div className="max-w-6xl mx-auto px-6 flex justify-center items-center">
            <nav className="flex gap-6 md:gap-10">
              <a href="#about" className="font-sans text-xs tracking-wider text-neutral-400 hover:text-white transition-colors">
                About
              </a>
              <a href="#skills" className="font-sans text-xs tracking-wider text-neutral-400 hover:text-white transition-colors">
                Skills
              </a>
              <a href="#projects" className="font-sans text-xs tracking-wider text-neutral-400 hover:text-white transition-colors">
                Projects
              </a>
              <a href="#certifications" className="font-sans text-xs tracking-wider text-neutral-400 hover:text-white transition-colors">
                Certifications
              </a>
              <a href="#contact" className="font-sans text-xs tracking-wider text-neutral-400 hover:text-white transition-colors">
                Contact
              </a>
            </nav>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
