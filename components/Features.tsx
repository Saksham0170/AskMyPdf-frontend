"use client";

import { ReactLenis } from 'lenis/react';
import { motion } from 'motion/react';
import { Upload, MessageSquare, Zap, FileSearch, Sparkles } from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Lightning Upload",
    description: "Drag and drop your PDFs instantly. Supports batch processing, multiple formats, and automatic text extraction for seamless document management.",
    gradient: "from-blue-500 to-indigo-600",
    bg: "bg-gradient-to-br from-blue-500 to-indigo-600",
    rotation: "rotate-3"
  },
  {
    icon: MessageSquare,
    title: "Natural Chat",
    description: "Ask questions in plain language. Our AI understands context and nuance, delivering precise answers without complex prompts or training.",
    gradient: "from-violet-500 to-purple-600",
    bg: "bg-gradient-to-br from-violet-500 to-purple-600",
    rotation: "-rotate-2"
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get accurate answers in seconds. Powered by state-of-the-art language models for speed and precision you can rely on every time.",
    gradient: "from-fuchsia-500 to-pink-600",
    bg: "bg-gradient-to-br from-fuchsia-500 to-pink-600",
    rotation: "rotate-2"
  },
  {
    icon: FileSearch,
    title: "Smart Search",
    description: "AI-powered semantic search that truly understands. Goes beyond keywords to comprehend meaning, context, and relationships in your documents.",
    gradient: "from-cyan-500 to-blue-500",
    bg: "bg-gradient-to-br from-cyan-500 to-blue-500",
    rotation: "-rotate-3"
  }
];

export default function Features() {
  return (
    <ReactLenis root>
      {/* Global Background: 
        Changed hardcoded #0a0a0f to adaptive bg-white/dark:bg-[#0a0a0f] 
      */}
      <main className='bg-white dark:bg-[#0a0a0f] transition-colors duration-300'>
        
        {/* Hero Section */}
        <div className='wrapper'>
          <section className='h-screen w-full bg-white dark:bg-[#0a0a0f] grid place-content-center sticky top-0 overflow-hidden transition-colors duration-300'>
            
            {/* Grid background:
               Added specific coloring for light mode (gray lines) and dark mode (white lines)
            */}
            <div className='absolute inset-0 
              bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] 
              dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] 
              bg-[size:4rem_4rem] 
              [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]' 
            />
            
            {/* Gradient orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            
            <div className='relative z-10'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className='flex justify-center mb-6'
              >
                {/* Badge: 
                  Adapted to be dark text/border on light mode, white text/border on dark mode 
                */}
                <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full 
                  bg-black/5 border border-black/10 text-black/80 
                  dark:bg-white/5 dark:border-white/10 dark:text-white/80 
                  backdrop-blur-xl text-sm font-medium transition-colors duration-300'>
                  <Sparkles className='w-4 h-4' />
                  Powerful Features
                </div>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className='text-5xl md:text-7xl px-8 font-bold text-center tracking-tight leading-[120%] mb-6 text-gray-900 dark:text-white transition-colors duration-300'
              >
                Everything You Need
                <br />
                <span className='bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent'>
                  To Master Your PDF
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className='text-xl text-gray-500 dark:text-white/60 text-center max-w-2xl mx-auto px-8 mb-8 transition-colors duration-300'
              >
                Scroll down to explore features 👇
              </motion.p>
            </div>
          </section>
        </div>

        {/* Sticky Cards Section */}
        <section className='w-full bg-white dark:bg-[#0a0a0f] relative transition-colors duration-300'>
          <div className='flex flex-col lg:flex-row justify-between lg:px-16 px-6 gap-12 lg:gap-0'>
            {/* Cards Column */}
            <div className='flex-1 grid gap-2'>
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <figure key={index} className='sticky top-0 h-screen grid place-content-center'>
                    <motion.article 
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      // Note: We keep text-white inside the card because the card background is always colorful/dark
                      className={`${feature.bg} ${feature.rotation} h-auto lg:h-96 w-full lg:w-[500px] rounded-3xl p-8 lg:p-10 grid gap-6 shadow-2xl relative overflow-hidden group hover:scale-105 transition-transform duration-300`}
                    >
                      {/* Noise texture overlay */}
                      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
                      
                      {/* Decorative circle */}
                      <div className='absolute -bottom-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-2xl' />
                      
                      <div className='relative z-10'>
                        {/* Icon */}
                        <div className='w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xl p-3.5 mb-4 border border-white/30'>
                          <Icon className='w-full h-full text-white' />
                        </div>
                        
                        {/* Title - Always white due to card background */}
                        <h2 className='text-3xl lg:text-4xl font-bold text-white mb-3'>
                          {feature.title}
                        </h2>
                        
                        {/* Description - Always white due to card background */}
                        <p className='text-base lg:text-lg text-white/90 leading-relaxed'>
                          {feature.description}
                        </p>
                      </div>
                    </motion.article>
                  </figure>
                );
              })}
            </div>
            
            {/* Sticky Title */}
            <div className='hidden lg:grid sticky top-0 h-screen place-content-center'>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className='text-5xl xl:text-6xl px-8 font-bold text-center tracking-tight leading-[120%] text-gray-900 dark:text-white transition-colors duration-300'>
                  Built for
                  <br />
                  <span className='bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent'>
                    Power Users
                  </span>
                  <br />
                  😎
                </h2>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </ReactLenis>
  );
}