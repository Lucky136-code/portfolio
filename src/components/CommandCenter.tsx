"use client";

import { motion } from "framer-motion";

interface SkillCategory {
  title: string;
  skills: string[];
}

const skillSets: SkillCategory[] = [
  {
    title: "AI & Machine Learning",
    skills: ["Deep Learning & CNNs", "Computer Vision (OpenCV)", "Natural Language Processing (NLP)", "PyTorch & TensorFlow", "Model Context Protocol (MCP)"],
  },
  {
    title: "Engineering & Languages",
    skills: ["Python Development", "React / Next.js", "Node.js & Express", "FastAPI / Flask", "Docker Containerization", "PostgreSQL & Supabase"],
  },
];

export default function CommandCenter() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section id="skills" className="relative z-10 w-full min-h-screen py-32 bg-black border-t border-white/5 flex items-center">
      <div className="container max-w-5xl mx-auto px-6">
        
        {/* Section Header (Centered) */}
        <div className="mb-16 text-center flex flex-col items-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">Technical Skills</h2>
          <div className="w-12 h-1 bg-white"></div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {skillSets.map((category, idx) => (
            <div key={idx} className="space-y-6">
              <h3 className="font-heading text-lg font-semibold text-neutral-300 border-b border-white/10 pb-3">
                {category.title}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {category.skills.map((skill, sIdx) => (
                  <motion.div
                    key={sIdx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: sIdx * 0.05 }}
                    whileHover={{ y: -4 }}
                    onMouseMove={handleMouseMove}
                    className="p-4 mouse-glow-card bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] rounded-md cursor-default transition-all duration-300 hover:border-[#00f0ff]/35 hover:shadow-[0_8px_24px_rgba(0,240,255,0.08)] hover:bg-white/[0.06]"
                  >
                    <div>
                      <span className="text-sm font-sans font-medium text-neutral-200">
                        {skill}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
