import { motion } from 'motion/react';
import { Brain, Layout, Server, Database, Cpu, Code } from 'lucide-react';

const skillGroups = [
  {
    title: "AI & Machine Learning",
    icon: Brain,
    skills: ["TensorFlow", "PyTorch", "Keras", "Scikit-Learn", "HuggingFace", "OpenCV", "BERT", "CNNs", "LLMs"],
    color: "text-purple-400"
  },
  {
    title: "Frontend Development",
    icon: Layout,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion", "Three.js", "WebGL"],
    color: "text-blue-400"
  },
  {
    title: "Backend & Infrastructure",
    icon: Server,
    skills: ["Node.js", "FastAPI", "Flask", "PostgreSQL", "MongoDB", "Supabase", "Docker", "Git", "Linux"],
    color: "text-emerald-400"
  }
];

export default function Skills() {
  return (
    <section className="py-24 px-6 bg-black">
      <div className="container max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">Technical Arsenal</h2>
          <p className="text-white/50 max-w-xl">
            A comprehensive toolkit for building intelligent, scalable, and beautiful digital products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillGroups.map((group, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-3xl border-white/5 hover:border-white/10 transition-colors group"
            >
              <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <group.icon className={`w-6 h-6 ${group.color}`} />
              </div>
              
              <h3 className="font-heading text-xl font-bold text-white mb-6">{group.title}</h3>
              
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, j) => (
                  <span 
                    key={j} 
                    className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
