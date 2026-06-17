"use client";

import { motion } from "framer-motion";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  description: string;
  credentialId?: string;
}

const certList: Certification[] = [
  {
    title: "Software Engineering Job Simulation",
    issuer: "J.P. Morgan",
    date: "Jun 2026",
    description: "Hands-on simulation covering software design, development, and engineering processes. Practical experience utilizing Spring MVC, Apache Kafka, and modular design patterns.",
    credentialId: "6a27e3a15b0bc151b65cfa6a",
  },
  {
    title: "Introduction to Model Context Protocol",
    issuer: "Anthropic",
    date: "Jun 2026",
    description: "Certified developer capability in constructing custom Model Context Protocol (MCP) servers, establishing client-side tool calling, and structuring secure LLM resource schemas.",
    credentialId: "5utqn2pfrk7n",
  },
  {
    title: "Introduction to Generative AI Studio",
    issuer: "Google Cloud Skills Boost",
    date: "Dec 2025",
    description: "Cloud certification covering generative models on Google Cloud Vertex AI Generative AI Studio, prototype testing, LLM parameter optimization, and prompt engineering.",
    credentialId: "9638839",
  },
  {
    title: "Getting Started with AI on Jetson Nano",
    issuer: "NVIDIA",
    date: "Dec 2025",
    description: "Edge AI developer certification covering object detection, image classification, neural networks, PyTorch workflows, and hardware model deployments on NVIDIA Jetson systems.",
    credentialId: "jjzDXD9kS3u4lOXSbhuMUw",
  },
];

const getLogo = (issuer: string) => {
  switch (issuer) {
    case "J.P. Morgan":
      return (
        <div className="w-10 h-10 bg-[#1f1916] border border-[#2b2420] flex items-center justify-center rounded p-1.5 select-none">
          {/* Official Chase / JPMorgan Octagonal logo SVG */}
          <svg viewBox="0 0 24 24" className="w-full h-full text-[#bda080]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 15.415c0 .468.38.85.848.85h5.937V.575L0 7.72v7.695m15.416 8.582c.467 0 .846-.38.846-.849v-5.937H.573l7.146 6.785h7.697M24 8.587a.844.844 0 0 0-.847-.846h-5.938V23.43l6.782-7.148L24 8.586M8.585.003a.847.847 0 0 0-.847.847v5.94h15.688L16.282.003H8.585Z" />
          </svg>
        </div>
      );
    case "Anthropic":
      return (
        <div className="w-10 h-10 bg-[#e7dcd3] border border-[#d3c4b6] flex items-center justify-center rounded p-2 select-none">
          {/* Official Anthropic Brand Logo SVG */}
          <svg viewBox="0 0 24 24" className="w-full h-full text-[#191919]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" />
          </svg>
        </div>
      );
    case "Google Cloud Skills Boost":
      return (
        <div className="w-10 h-10 bg-white border border-neutral-200 flex items-center justify-center rounded p-1.5 select-none">
          {/* Official Google Cloud Logo SVG */}
          <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.19 2.38a9.344 9.344 0 0 0-9.234 6.893c.053-.02-.055.013 0 0-3.875 2.551-3.922 8.11-.247 10.941l.006-.007-.007.03a6.717 6.717 0 0 0 4.077 1.356h5.173l.03.03h5.192c6.687.053 9.376-8.605 3.835-12.35a9.365 9.365 0 0 0-2.821-4.552l-.043.043.006-.05A9.344 9.344 0 0 0 12.19 2.38zm-.358 4.146c1.244-.04 2.518.368 3.486 1.15a5.186 5.186 0 0 1 1.862 4.078v.518c3.53-.07 3.53 5.262 0 5.193h-5.193l-.008.009v-.04H6.785a2.59 2.59 0 0 1-1.067-.23h.001a2.597 2.597 0 1 1 3.437-3.437l3.013-3.012A6.747 6.747 0 0 0 8.11 8.24c.018-.01.04-.026.054-.023a5.186 5.186 0 0 1 3.67-1.69z" fill="#4285F4" />
          </svg>
        </div>
      );
    case "NVIDIA":
      return (
        <div className="w-10 h-10 bg-[#76b900] flex items-center justify-center rounded p-1.5 select-none">
          {/* Official NVIDIA Claw Logo SVG */}
          <svg viewBox="0 0 24 24" className="w-full h-full text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.948 8.798v-1.43a6.7 6.7 0 0 1 .424-.018c3.922-.124 6.493 3.374 6.493 3.374s-2.774 3.851-5.75 3.851c-.398 0-.787-.062-1.158-.185v-4.346c1.528.185 1.837.857 2.747 2.385l2.04-1.714s-1.492-1.952-4-1.952a6.016 6.016 0 0 0-.796.035m0-4.735v2.138l.424-.027c5.45-.185 9.01 4.47 9.01 4.47s-4.08 4.964-8.33 4.964c-.37 0-.733-.035-1.095-.097v1.325c.3.035.61.062.91.062 3.957 0 6.82-2.023 9.593-4.408.459.371 2.34 1.263 2.73 1.652-2.633 2.208-8.772 3.984-12.253 3.984-.335 0-.653-.018-.971-.053v1.864H24V4.063zm0 10.326v1.131c-3.657-.654-4.673-4.46-4.673-4.46s1.758-1.944 4.673-2.262v1.237H8.94c-1.528-.186-2.73 1.245-2.73 1.245s.68 2.412 2.739 3.11M2.456 10.9s2.164-3.197 6.5-3.533V6.201C4.153 6.59 0 10.653 0 10.653s2.35 6.802 8.948 7.42v-1.237c-4.84-.6-6.492-5.936-6.492-5.936z" />
          </svg>
        </div>
      );
    default:
      return null;
  }
};

export default function Certifications() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section id="certifications" className="relative z-10 w-full min-h-[70vh] py-32 bg-black border-t border-white/5 flex items-center">
      <div className="container max-w-5xl mx-auto px-6">
        
        {/* Section Header (Centered) */}
        <div className="mb-16 text-center flex flex-col items-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">Certifications</h2>
          <div className="w-12 h-1 bg-white"></div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {certList.map((cert, idx) => (
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
                {/* Logo + Header Info */}
                <div className="flex justify-between items-start gap-4 mb-4">
                  {getLogo(cert.issuer)}
                  
                  <div className="text-right">
                    <span className="text-[10px] font-mono bg-[#00f0ff]/10 text-[#00f0ff] px-2 py-0.5 rounded block mb-1">
                      {cert.issuer}
                    </span>
                    <span className="text-xs text-neutral-500 font-mono">
                      {cert.date}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-heading text-base font-semibold text-white mb-3 group-hover:text-[#00f0ff] transition-colors">
                  {cert.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6">
                  {cert.description}
                </p>
              </div>

              {/* Credential ID */}
              {cert.credentialId && (
                <div className="border-t border-white/5 pt-3">
                  <span className="text-[10px] font-mono text-neutral-500 block">CREDENTIAL ID</span>
                  <span className="text-xs text-neutral-300 font-mono font-medium truncate">{cert.credentialId}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
