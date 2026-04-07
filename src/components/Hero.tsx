import { motion } from 'motion/react';
import { ArrowDown, Download, Mail, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start"
        >
          <motion.h1 
            className="font-signature text-6xl sm:text-7xl md:text-9xl text-white mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Lucky Anish
          </motion.h1>
          
          <motion.h2 
            className="font-heading text-2xl md:text-4xl font-semibold text-white/90 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            AI/ML Engineer & <br />
            <span className="text-accent">Full Stack Developer</span>
          </motion.h2>
          
          <motion.p 
            className="text-white/60 text-lg max-w-md mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Building intelligent systems. Designing seamless experiences. 
            Transforming complex data into intuitive digital solutions.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Button size="lg" className="rounded-full px-8 bg-white text-black hover:bg-white/90 transition-all duration-300">
              View Projects
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 border-white/20 hover:bg-white/10 transition-all duration-300">
              Contact Me
            </Button>
            <Button 
              size="lg" 
              variant="ghost" 
              className="rounded-full px-6 text-white/70 hover:text-white transition-all duration-300 gap-2"
              onClick={() => window.open('/resume(2).pdf', '_blank')}
            >
              <Download className="w-4 h-4" />
              Resume
            </Button>
          </motion.div>
          
          <motion.div 
            className="flex gap-6 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <a href="https://github.com/Lucky136-code" target="_blank" rel="noreferrer" className="text-white/40 hover:text-accent transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/luckyanish136" target="_blank" rel="noreferrer" className="text-white/40 hover:text-accent transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:luckyyadav1180@gmail.com" className="text-white/40 hover:text-accent transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            {/* Decorative Rings */}
            <div className="absolute inset-0 border border-accent/20 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute -inset-4 border border-white/5 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
            
            <div className="absolute inset-2 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl shadow-accent/20">
              <img 
                src="/profile.png" 
                alt="Lucky Anish" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-mono"></span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
