import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import Hero from './components/Hero';
import Terminal from './components/Terminal';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import SmoothScroll from './components/SmoothScroll';
import GrainOverlay from './components/GrainOverlay';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-background text-foreground selection:bg-accent selection:text-white overflow-hidden">
        <GrainOverlay />
        <CustomCursor />
        
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-[10001]"
          style={{ scaleX }}
        />

        {/* Navbar */}
        <nav className={`fixed top-0 left-0 right-0 z-[1000] px-6 py-4 md:px-12 md:py-6 flex justify-between items-center transition-all duration-500 ${isScrolled ? 'bg-black/50 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-heading font-bold tracking-tighter cursor-pointer group"
          >
            LUCKY<span className="text-accent group-hover:text-white transition-colors duration-500">.</span>ANISH
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-8"
          >
            {['Projects', 'Terminal', 'Skills', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-xs font-mono uppercase tracking-widest text-white/40 hover:text-white transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </motion.div>
        </nav>

        <main>
          <Hero />
          
          <section id="intro" className="py-24 px-6 bg-black">
            <div className="container max-w-4xl mx-auto text-center">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl md:text-4xl font-heading font-medium text-white/80 leading-tight"
              >
                I bridge the gap between <span className="text-white">complex AI algorithms</span> and <span className="text-white">intuitive user interfaces</span>. 
                My focus is on building real-world projects that solve actual problems.
              </motion.p>
            </div>
          </section>

          <section id="projects">
            <Projects />
          </section>

          <section id="terminal">
            <Terminal />
          </section>

          <section id="skills">
            <Skills />
          </section>

          <section id="contact">
            <Contact />
          </section>
        </main>

        <footer className="py-12 px-6 border-t border-white/5 bg-black">
          <div className="container max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-white/30 text-xs font-mono uppercase tracking-widest">
              © 2026 Lucky Anish. All rights reserved.
            </div>
            
            <div className="flex gap-8">
              <a href="#" className="text-white/30 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">GitHub</a>
              <a href="#" className="text-white/30 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">LinkedIn</a>
              <a href="#" className="text-white/30 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">Twitter</a>
            </div>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
