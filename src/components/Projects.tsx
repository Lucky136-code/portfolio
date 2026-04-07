import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Image Classification CNN",
    description: "Built a deep learning image classifier on the CIFAR-10 dataset achieving 92.3% validation accuracy across 10 classes. Trained over 12 epochs on 60,000 samples; applied data augmentation and batch normalization to reduce overfitting.",
    tech: ["Python", "TensorFlow", "Keras", "CNN"],
    link: "https://github.com/Lucky136-code",
    github: "https://github.com/Lucky136-code",
    color: "from-blue-500/20 to-purple-500/20"
  },
  {
    title: "BERT Sentiment Analysis API",
    description: "Fine-tuned a pre-trained BERT transformer model for binary sentiment classification achieving 89.1% accuracy on 25K samples. Built and deployed a Flask REST API exposing a /predict endpoint for real-time inference.",
    tech: ["Python", "HuggingFace", "Flask", "BERT"],
    link: "https://github.com/Lucky136-code",
    github: "https://github.com/Lucky136-code",
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    title: "Vet Clinic Web Application",
    description: "Full-stack veterinary clinic platform featuring appointment booking and pet health record management. Integrated Supabase for persistent PostgreSQL-backed storage replacing volatile React state.",
    tech: ["React", "Next.js", "Supabase", "Vercel"],
    link: "https://vet-clinic-drab.vercel.app",
    github: "https://github.com/Lucky136-code",
    color: "from-orange-500/20 to-red-500/20"
  },
  {
    title: "Uma Traders",
    description: "Production website for a luxury natural stone and handicrafts business. Implemented dynamic product catalog, inquiry system, and WebGL-inspired canvas animations for brand storytelling.",
    tech: ["HTML", "CSS", "JS", "Full Stack"],
    link: "https://umatraderss.com",
    github: "https://github.com/Lucky136-code",
    color: "from-indigo-500/20 to-blue-500/20"
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.project-card');
    
    cards.forEach((card: any, index: number) => {
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: `top ${15 + index * 2}%`, // Centered pinning with slight offset for stack
          endTrigger: containerRef.current,
          end: 'bottom bottom',
          pin: true,
          pinSpacing: false,
          scrub: true,
        },
        scale: 1 - (cards.length - index) * 0.03,
        opacity: 1,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} id="projects" className="relative py-32 px-6 bg-black overflow-hidden">
      <div className="container max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 text-center"
        >
          <h2 className="font-heading text-5xl md:text-8xl font-bold text-white mb-8 tracking-tighter">
            Featured <span className="text-accent">Work</span>
          </h2>
          <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            A selection of projects that showcase my expertise in AI/ML and Full Stack development.
          </p>
        </motion.div>

        <div className="flex flex-col gap-[40vh] pb-[20vh]">
          {projects.map((project, i) => (
            <div 
              key={i} 
              className="project-card w-full min-h-[450px] md:min-h-[550px] glass rounded-[2.5rem] p-8 md:p-12 flex flex-col lg:flex-row gap-8 lg:gap-16 items-center border border-white/10 shadow-2xl relative group"
              style={{ 
                background: `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)`,
                backdropFilter: 'blur(20px)'
              }}
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="flex-1 flex flex-col space-y-6 z-10 h-full">
                <div className="flex items-center gap-4 text-accent">
                  <div className="w-10 h-[1px] bg-accent/30" />
                  <span className="text-xs font-mono uppercase tracking-[0.3em] font-bold">Project 0{i + 1}</span>
                </div>
                
                <h3 className="font-heading text-3xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                  {project.title}
                </h3>
                
                <p className="text-white/50 text-base md:text-lg leading-relaxed font-light max-w-xl">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech.map((t, j) => (
                    <span key={j} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-white/60 font-mono uppercase tracking-wider">
                      {t}
                    </span>
                  ))}
                </div>
                
                <div className="relative z-20 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-8 mt-auto">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-center gap-3 px-6 py-3.5 bg-accent text-white rounded-full font-bold text-sm hover:bg-white hover:text-black transition-all duration-500 group/btn shadow-2xl shadow-accent/20 active:scale-95"
                  >
                    <span>View Project</span>
                    <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                  </a>
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-center gap-3 px-6 py-3.5 bg-white/10 border border-white/20 text-white rounded-full font-bold text-sm hover:bg-white hover:text-black transition-all duration-500 group/btn backdrop-blur-sm active:scale-95"
                  >
                    <Github className="w-5 h-5" />
                    <span>GitHub Source</span>
                  </a>
                </div>
              </div>
              
              <div className={`flex-1 w-full aspect-[16/10] lg:aspect-square rounded-3xl bg-gradient-to-br ${project.color} border border-white/10 flex items-center justify-center relative overflow-hidden group/img z-10`}>
                <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
                
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="z-10 text-white/10 font-heading text-7xl md:text-9xl font-black uppercase tracking-tighter select-none blur-[2px] group-hover/img:blur-0 transition-all duration-700"
                >
                  {project.title.split(' ')[0]}
                </motion.div>
                
                {/* Decorative Elements */}
                <div className="absolute top-8 right-8 w-24 h-24 border border-white/10 rounded-full animate-pulse" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/20 rounded-full blur-[100px] group-hover/img:bg-accent/40 transition-colors duration-700" />
                
                {/* Floating Icon */}
                <div className="absolute bottom-8 right-8 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 transform translate-y-4 opacity-0 group-hover/img:translate-y-0 group-hover/img:opacity-100 transition-all duration-500">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
