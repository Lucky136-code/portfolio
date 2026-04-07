import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    const whatsappMessage = `Hello Lucky! My name is ${name} (${email}). ${message}`;
    const whatsappUrl = `https://wa.me/919304277935?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="py-24 px-6 bg-black relative">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-5xl md:text-7xl font-bold text-white mb-8">
              Let's build <br />
              <span className="text-accent">something great.</span>
            </h2>
            
            <p className="text-white/50 text-xl mb-12 max-w-md">
              Have a project in mind or just want to say hi? Feel free to reach out. 
              I'm always open to new opportunities and collaborations.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-500">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-white/40 text-sm uppercase tracking-widest mb-1">Email</p>
                  <p className="text-white text-lg font-medium">luckyyadav1180@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-500">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-white/40 text-sm uppercase tracking-widest mb-1">WhatsApp</p>
                  <p className="text-white text-lg font-medium">+91 9304277935</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-500">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-white/40 text-sm uppercase tracking-widest mb-1">Location</p>
                  <p className="text-white text-lg font-medium">Jaipur, Rajasthan, India</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-12 rounded-3xl border-white/5"
          >
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                  <Send className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                <p className="text-white/50">Thank you for reaching out. Redirecting to WhatsApp...</p>
                <Button variant="outline" onClick={() => setIsSubmitted(false)} className="rounded-full">
                  Send another message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Name</label>
                  <Input 
                    name="name"
                    required 
                    placeholder="John Doe" 
                    className="bg-white/5 border-white/10 rounded-xl h-14 focus:border-accent transition-colors"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Email</label>
                  <Input 
                    name="email"
                    required 
                    type="email" 
                    placeholder="john@example.com" 
                    className="bg-white/5 border-white/10 rounded-xl h-14 focus:border-accent transition-colors"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-mono text-white/40 uppercase tracking-widest">Message</label>
                  <Textarea 
                    name="message"
                    required 
                    placeholder="Tell me about your project..." 
                    className="bg-white/5 border-white/10 rounded-xl min-h-[150px] focus:border-accent transition-colors"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full rounded-xl h-14 bg-accent hover:bg-accent/90 text-white font-bold text-lg gap-2 transition-all duration-300">
                  Send via WhatsApp
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
