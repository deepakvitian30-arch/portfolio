import React from 'react';
import { GraduationCap, MapPin, Compass, Code2, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto select-none border-t border-zinc-900">
      
      {/* Section Header */}
      <div className="mb-14">
        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>02 / ABOUT ME</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Engineering with Curiosity & Purpose
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Narrative Story */}
        <div className="lg:col-span-7 space-y-6 text-zinc-300 text-base md:text-lg font-light leading-relaxed">
          <p>
            I am a first-year Information Technology undergraduate at <strong className="text-white font-medium">Vellore Institute of Technology (VIT), Vellore</strong> (Class of 2030), focused on full-stack web engineering, scalable backends, and intelligent systems.
          </p>

          <p>
            My engineering philosophy centers on <strong className="text-cyan-300 font-medium">learning through building</strong>. Rather than remaining in theory or standard classroom assignments, I dive directly into real problems—whether that means architecting a non-invasive medication adherence risk engine for HackGrid or creating database-secured campus complaint routing pipelines.
          </p>

          <p>
            I value code readability, pragmatic architectural decisions, and responsive user experiences. When building software, my priority is shipping reliable tools that solve real operational friction for people.
          </p>

          <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 text-xs md:text-sm text-cyan-200 flex items-start space-x-3.5">
            <Sparkles className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold text-white">Active Objective: </span>
              Currently seeking software engineering internships, open-source projects, and technical hackathon collaborations where I can contribute to high-impact production codebases.
            </div>
          </div>
        </div>

        {/* Right Column: Academic & Engineering Fast-Facts Grid */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 backdrop-blur-xl">
            <div className="flex items-center space-x-2 text-cyan-400 mb-2">
              <GraduationCap className="w-4 h-4" />
              <span className="text-[11px] font-mono uppercase tracking-wider">Institution</span>
            </div>
            <p className="font-bold text-white text-sm">VIT Vellore</p>
            <p className="text-xs text-zinc-400 mt-1">B.Tech in Information Technology</p>
            <p className="text-[10px] font-mono text-zinc-500 mt-2">Undergraduate • Class of 2030</p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 backdrop-blur-xl">
            <div className="flex items-center space-x-2 text-cyan-400 mb-2">
              <Code2 className="w-4 h-4" />
              <span className="text-[11px] font-mono uppercase tracking-wider">Core Focus</span>
            </div>
            <p className="font-bold text-white text-sm">Full-Stack Web</p>
            <p className="text-xs text-zinc-400 mt-1">Python, FastAPI, React, SQL & Modern UI</p>
            <p className="text-[10px] font-mono text-zinc-500 mt-2">End-to-End Development</p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 backdrop-blur-xl">
            <div className="flex items-center space-x-2 text-cyan-400 mb-2">
              <MapPin className="w-4 h-4" />
              <span className="text-[11px] font-mono uppercase tracking-wider">Base Location</span>
            </div>
            <p className="font-bold text-white text-sm">Vellore, Tamil Nadu</p>
            <p className="text-xs text-zinc-400 mt-1">India</p>
            <p className="text-[10px] font-mono text-zinc-500 mt-2">Open to Remote & On-Site</p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 backdrop-blur-xl">
            <div className="flex items-center space-x-2 text-cyan-400 mb-2">
              <Compass className="w-4 h-4" />
              <span className="text-[11px] font-mono uppercase tracking-wider">Ambition</span>
            </div>
            <p className="font-bold text-white text-sm">Software Engineer</p>
            <p className="text-xs text-zinc-400 mt-1">Designing dependable digital products</p>
            <p className="text-[10px] font-mono text-zinc-500 mt-2">Long-Term Craftsmanship</p>
          </div>

        </div>

      </div>

    </section>
  );
};
