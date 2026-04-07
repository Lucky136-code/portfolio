import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, X, Minus, Square } from 'lucide-react';

type CommandResponse = {
  type: 'text' | 'list' | 'error' | 'success' | 'input';
  content: string | string[];
  label?: string;
};

export default function Terminal() {
  const [history, setHistory] = useState<{ command: string; response: CommandResponse }[]>([]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isContactFlow, setIsContactFlow] = useState(false);
  const [contactStep, setContactStep] = useState(0);
  const [contactData, setContactData] = useState({ name: '', email: '', message: '' });
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const commands: Record<string, () => CommandResponse> = {
    help: () => ({
      type: 'list',
      content: [
        'help     - Show this help menu',
        'about    - Learn more about me',
        'projects - View my featured projects',
        'skills   - See my technical stack',
        'contact  - Start a conversation',
        'social   - My digital presence',
        'resume   - Download my CV',
        'clear    - Clear the terminal'
      ]
    }),
    about: () => ({
      type: 'text',
      content: "I'm Lucky Anish, an AI/ML Engineer and Full Stack Developer based in Jaipur, India. Currently pursuing B.Tech in AI & ML at NIMS University. I specialize in building intelligent systems using TensorFlow, PyTorch, and BERT, while crafting seamless web experiences with React, Next.js, and FastAPI."
    }),
    projects: () => ({
      type: 'list',
      content: [
        '1. Image Classification CNN (92.3% Accuracy)',
        '2. BERT Sentiment Analysis API',
        '3. Collaborative Filtering RecSys',
        '4. Vet Clinic Web App (Full Stack)',
        '5. Uma Traders (Production Site)'
      ]
    }),
    skills: () => ({
      type: 'list',
      content: [
        'AI/ML: TensorFlow, PyTorch, Keras, HuggingFace, OpenCV',
        'Frontend: React, Next.js, Tailwind CSS, GSAP, Three.js',
        'Backend: Node.js, FastAPI, Flask, PostgreSQL, MongoDB',
        'Languages: Python, JavaScript, TypeScript, Java, Go, Rust'
      ]
    }),
    social: () => ({
      type: 'list',
      content: [
        'GitHub: github.com/Lucky136-code',
        'LinkedIn: linkedin.com/in/luckyanish136',
        'Email: luckyyadav1180@gmail.com'
      ]
    }),
    resume: () => {
      window.open('/resume(2).pdf', '_blank');
      return { type: 'success', content: 'Opening resume in a new tab...' };
    },
    clear: () => {
      setHistory([]);
      return { type: 'text', content: '' };
    },
    contact: () => {
      setIsContactFlow(true);
      setContactStep(0);
      return { type: 'input', content: 'Starting contact flow... What is your name?', label: 'Name' };
    }
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    if (!trimmedCmd) return;

    setCommandHistory(prev => [cmd, ...prev]);
    setHistoryIndex(-1);

    if (isContactFlow) {
      handleContactFlow(cmd);
      return;
    }

    const response = commands[trimmedCmd] ? commands[trimmedCmd]() : { 
      type: 'error' as const, 
      content: `Command not found: ${trimmedCmd}. Type 'help' for available commands.` 
    };

    if (trimmedCmd !== 'clear') {
      setHistory(prev => [...prev, { command: cmd, response }]);
    }
    setInput('');
  };

  const handleContactFlow = (value: string) => {
    let nextResponse: CommandResponse;
    
    if (contactStep === 0) {
      setContactData(prev => ({ ...prev, name: value }));
      setContactStep(1);
      nextResponse = { type: 'input', content: `Nice to meet you, ${value}! What is your email?`, label: 'Email' };
    } else if (contactStep === 1) {
      setContactData(prev => ({ ...prev, email: value }));
      setContactStep(2);
      nextResponse = { type: 'input', content: 'Got it. What message would you like to send?', label: 'Message' };
    } else {
      const finalData = { ...contactData, message: value };
      setIsContactFlow(false);
      setContactStep(0);
      
      const whatsappMessage = `Hello Lucky! My name is ${finalData.name} (${finalData.email}). ${finalData.message}`;
      const whatsappUrl = `https://wa.me/919304277935?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
      
      nextResponse = { type: 'success', content: 'Thank you! Redirecting you to WhatsApp to send the message...' };
    }

    setHistory(prev => [...prev, { command: value, response: nextResponse }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <section className="py-24 px-6 bg-black relative overflow-hidden">
      <div className="container max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="font-heading text-4xl font-bold text-white mb-4">Interactive Terminal</h2>
          <p className="text-white/50">Explore my world through the command line.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass rounded-xl overflow-hidden shadow-2xl border-white/10"
        >
          {/* Terminal Header */}
          <div className="bg-white/5 px-4 py-3 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-accent" />
              <span className="text-xs font-mono text-white/50">lucky-anish@portfolio: ~</span>
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-white/10" />
              <div className="w-3 h-3 rounded-full bg-white/10" />
              <div className="w-3 h-3 rounded-full bg-accent/50" />
            </div>
          </div>

          {/* Terminal Body */}
          <div 
            ref={scrollRef}
            className="h-[500px] overflow-y-auto p-6 font-mono text-sm md:text-base bg-black/40 custom-scrollbar"
            onClick={() => inputRef.current?.focus()}
          >
            <div className="text-accent mb-4">
              Welcome to Lucky Anish's Terminal v1.0.0
              <br />
              Type 'help' to see available commands.
            </div>

            {history.map((item, i) => (
              <div key={i} className="mb-4">
                <div className="flex gap-2 text-white/40">
                  <span>$</span>
                  <span>{item.command}</span>
                </div>
                <div className="mt-2">
                  {item.response.type === 'list' ? (
                    <ul className="space-y-1">
                      {(item.response.content as string[]).map((line, j) => (
                        <li key={j} className="text-white/80">{line}</li>
                      ))}
                    </ul>
                  ) : (
                    <div className={
                      item.response.type === 'error' ? 'text-red-400' : 
                      item.response.type === 'success' ? 'text-green-400' : 
                      item.response.type === 'input' ? 'text-accent' : 'text-white/80'
                    }>
                      {item.response.content}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="flex gap-2 items-center">
              <span className="text-accent">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none outline-none flex-1 text-white caret-accent"
              />
              <motion.div 
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-2 h-5 bg-accent"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
