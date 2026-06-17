"use client";

import { motion } from "framer-motion";

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
}

const projectList: Project[] = [
  {
    title: "AgentOS",
    description: "A Tauri-based local environment allowing AI agents to execute system workflows, process real-time Whisper audio inputs, and orchestrate files safely.",
    tech: ["Rust", "TypeScript", "Tauri", "Whisper API", "Node.js"],
    github: "https://github.com/Lucky136-code/AgentOS",
  },
  {
    title: "Vector Analytics",
    description: "Real-time web traffic monitor utilizing statistical classifier models to separate human navigation patterns from automated bot activity.",
    tech: ["Python", "React", "FastAPI", "PostgreSQL", "Scikit-Learn"],
    github: "https://github.com/Lucky136-code/vector",
  },
  {
    title: "RAG Documentation Chatbot",
    description: "LangChain-based retrieval QA system processing internal PDF datasets into semantic vectors to eliminate GPT hallucination states.",
    tech: ["Python", "LangChain", "ChromaDB", "FastAPI", "HuggingFace"],
    github: "https://github.com/Lucky136-code/RagChatBot",
  },
  {
    title: "BERT Sentiment Analyzer",
    description: "Fine-tuned HuggingFace BERT model wrapped in a Flask endpoint to classify sentiment levels of social post datasets.",
    tech: ["Python", "PyTorch", "HuggingFace", "Flask"],
    github: "https://github.com/Lucky136-code",
  },
  {
    title: "CIFAR-10 CNN Classifier",
    description: "Convolutional Neural Network built using TensorFlow/Keras to categorize image datasets with custom dropout optimization.",
    tech: ["Python", "TensorFlow", "Keras", "Matplotlib"],
    github: "https://github.com/Lucky136-code",
  },
];

export default function Archives() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section id="projects" className="relative z-10 w-full min-h-screen py-32 bg-black/60 border-t border-white/5 flex items-center">
      <div className="container max-w-5xl mx-auto px-6">
        
        {/* Section Header (Centered) */}
        <div className="mb-16 text-center flex flex-col items-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">Featured Projects</h2>
          <div className="w-12 h-1 bg-white"></div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectList.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              onMouseMove={handleMouseMove}
              className="group mouse-glow-card bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.37)] p-6 rounded-lg transition-all duration-300 hover:border-[#00f0ff]/35 hover:shadow-[0_12px_40px_rgba(0,240,255,0.08)] hover:bg-white/[0.06] flex flex-col justify-between"
            >
              <div>
                {/* Title */}
                <h3 className="font-heading text-lg font-semibold text-white mb-3 group-hover:text-[#00f0ff] transition-colors">
                  {project.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              {/* Footer Tech + Link */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded text-neutral-300">
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-white group-hover:underline font-medium"
                >
                  <span>View Repository</span>
                  <span>→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
