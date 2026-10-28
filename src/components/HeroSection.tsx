import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowDown, Sparkles, ChevronRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-6 md:px-12 overflow-hidden select-none">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Hero Typography & CTAs */}
        <div className="lg:col-span-7 z-10 flex flex-col items-start animate-fade-in">
          
          {/* Status Badge */}
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-6 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>VIT VELLORE • B.TECH IT 2030</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-300">OPEN TO INTERNSHIPS</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
            Building ideas into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              digital experiences.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl mb-8">
            {PERSONAL_INFO.supportingText}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <button
              onClick={() => scrollTo('#projects')}
              className="flex items-center space-x-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-sm transition-all shadow-[0_0_25px_rgba(56,189,248,0.35)] cursor-pointer active:scale-95 group"
            >
              <span>Explore My Work</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollTo('#about')}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-700/80 hover:border-zinc-500 text-zinc-200 text-sm font-medium transition-all cursor-pointer backdrop-blur-md"
            >
              <span>About Me</span>
            </button>
          </div>

          {/* Quick Pillars Strip */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-800/80 w-full max-w-lg text-xs font-mono">
            <div>
              <p className="text-zinc-500 uppercase tracking-wider text-[10px]">Specialization</p>
              <p className="text-zinc-200 font-semibold mt-0.5">Full-Stack Dev</p>
            </div>
            <div>
              <p className="text-zinc-500 uppercase tracking-wider text-[10px]">Recognition</p>
              <p className="text-cyan-400 font-semibold mt-0.5">HackGrid Finalist</p>
            </div>
            <div>
              <p className="text-zinc-500 uppercase tracking-wider text-[10px]">Campus</p>
              <p className="text-zinc-200 font-semibold mt-0.5">VIT Vellore</p>
            </div>
          </div>

        </div>

        {/* Right Column: 3D Holographic Artifact Canvas Area */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[360px] lg:min-h-[500px] pointer-events-none">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute w-60 h-60 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Interactive Floating Badge Card */}
          <div className="absolute bottom-6 right-4 sm:right-10 z-20 p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-xl shadow-2xl flex items-center space-x-3 pointer-events-auto">
            <div className="p-2.5 rounded-xl bg-cyan-950/50 border border-cyan-400/40 text-cyan-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-bold text-white tracking-wide">Interactive 3D Canvas</p>
              <p className="text-[11px] font-mono text-zinc-400">Move cursor to interact with geometry</p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <div 
        onClick={() => scrollTo('#projects')}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-1 text-zinc-500 hover:text-cyan-400 transition-colors cursor-pointer"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest">SCROLL</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
};
