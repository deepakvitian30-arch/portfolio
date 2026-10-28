import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundManager } from '../audio/soundManager';
import { GithubIcon } from './GithubIcon';
import { ArrowUpRight, X, Orbit } from 'lucide-react';

export interface FilmHUDProps {
  currentChapter: number;
  totalChapters: number;
  scrollProgress: number;
  onJumpToChapter: (index: number) => void;
}

export const CHAPTERS_LIST = [
  { index: 0, num: '01', title: 'Prologue', planet: 'THE SYSTEM', slug: 'EXT. DIGITAL NEXUS — SUNRISE', subtitle: 'Deepak Subramaniam' },
  { index: 1, num: '02', title: 'The Core', planet: 'OBSIDIAN', slug: 'INT. VIT VELLORE — ACADEMIC LAB', subtitle: 'About Me & Ethos' },
  { index: 2, num: '03', title: 'DoseSense', planet: 'MEDORA', slug: 'INT. CLINICAL INTELLIGENCE LAB', subtitle: 'Healthcare Decision-Support' },
  { index: 3, num: '04', title: 'VITidy', planet: 'VITANIA', slug: 'INT. CAMPUS OPERATIONS HUB', subtitle: 'Hostel Coordination Platform' },
  { index: 4, num: '05', title: 'ENNAVAL', planet: 'ENNAVAL', slug: 'INT. HAUTE COUTURE ATELIER', subtitle: '3D Luxury Digital Boutique' },
  { index: 5, num: '06', title: 'Transit-09', planet: 'TRANSIT-09', slug: 'EXT. LOGISTICS TERMINAL', subtitle: 'Parking Management Prototype' },
  { index: 6, num: '07', title: 'Skill Arsenal', planet: 'TECHNORA', slug: 'INT. CODEBASE & STACK MATRIX', subtitle: 'Languages & Applied Frameworks' },
  { index: 7, num: '08', title: 'Milestones', planet: 'ACHIEVEMENTS', slug: 'INT. ARCHIVE OF HONORS', subtitle: 'HackGrid Finalist & Academic Journey' },
  { index: 8, num: '09', title: 'Transmission', planet: 'CONTACT', slug: 'INT. COMM GATEWAY — NIGHT', subtitle: 'Direct Transmission & Contact' }
];

export const FilmHUD: React.FC<FilmHUDProps> = ({
  currentChapter,
  scrollProgress,
  onJumpToChapter
}) => {
  const [isMuted, setIsMuted] = useState(soundManager.getIsMuted());
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close drawer on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && drawerOpen) {
        setDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [drawerOpen]);

  const toggleSound = () => {
    const unmuted = soundManager.toggleMute();
    setIsMuted(!unmuted);
  };

  const handleSelectChapter = (idx: number) => {
    onJumpToChapter(idx);
    setDrawerOpen(false);
  };

  const activeChap = CHAPTERS_LIST[currentChapter] || CHAPTERS_LIST[0];
  const progressPercent = Math.round(scrollProgress * 100);

  // Segment ticks for progress line (9 chapters: 0%, 12.5%, 25%, 37.5%, 50%, 62.5%, 75%, 87.5%, 100%)
  const chapterTicks = [0, 12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100];

  return (
    <>
      {/* 1. Cinematic Film Grain Overlay */}
      <div 
        aria-hidden="true" 
        className="grain fixed inset-0 pointer-events-none z-[8] opacity-5 select-none"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`
        }}
      />

      {/* 2. Top Film HUD Strip */}
      <header className="fixed top-0 left-0 right-0 z-40 p-4 sm:p-6 md:p-8 pointer-events-none select-none">
        <div className="w-full flex items-start justify-between">
          
          {/* Top-Left: Mark & Active Planet/Chapter */}
          <div className="pointer-events-auto flex flex-col items-start gap-1">
            <button
              onClick={() => handleSelectChapter(0)}
              className="text-left group cursor-pointer"
            >
              <span className="font-cinema tracking-[0.14em] text-white text-lg sm:text-xl block group-hover:text-cyan-300 transition-colors">
                DEEPAK SUBRAMANIAM
              </span>
            </button>
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono-cinema text-[10px] sm:text-[11px] text-zinc-300 tracking-[0.18em] uppercase">
                {activeChap.num} — {activeChap.planet}
              </span>
              <span className="hidden md:inline text-zinc-600 font-mono text-[10px]">·</span>
              <span className="hidden md:inline font-mono-cinema text-[10px] text-zinc-500 uppercase tracking-wider">
                {activeChap.slug}
              </span>
            </div>
          </div>

          {/* Top-Right: Return to Orbit, Sound EQ & Menu */}
          <div className="flex items-center space-x-2 sm:space-x-3 pointer-events-auto">
            {/* Quick Return to Orbit button (visible when scrolled) */}
            {currentChapter > 0 && (
              <button
                onClick={() => handleSelectChapter(0)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-400/40 text-cyan-300 hover:text-white transition-all cursor-pointer text-[10px] font-mono-cinema tracking-wider backdrop-blur-md shadow-lg"
              >
                <Orbit className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">RETURN TO ORBIT</span>
              </button>
            )}

            {/* Audio Toggle with Animated Equalizer Bars */}
            <button
              onClick={toggleSound}
              aria-label={isMuted ? "Play sound" : "Mute sound"}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 hover:border-cyan-400/40 backdrop-blur-md text-zinc-300 hover:text-white transition-all cursor-pointer shadow-lg"
              title={isMuted ? "Audio Muted — Click to activate ambient audio" : "Audio Active"}
            >
              <div className={`flex items-end gap-[2.5px] h-3.5 ${!isMuted ? 'playing' : ''}`}>
                <span className={`w-[2px] bg-cyan-400 rounded-full transition-all duration-300 ${!isMuted ? 'h-3 animate-pulse' : 'h-1.5 opacity-50'}`} />
                <span className={`w-[2px] bg-cyan-400 rounded-full transition-all duration-300 ${!isMuted ? 'h-3.5 animate-pulse delay-75' : 'h-2 opacity-50'}`} />
                <span className={`w-[2px] bg-cyan-400 rounded-full transition-all duration-300 ${!isMuted ? 'h-2 animate-pulse delay-150' : 'h-1 opacity-50'}`} />
                <span className={`w-[2px] bg-cyan-400 rounded-full transition-all duration-300 ${!isMuted ? 'h-3 animate-pulse delay-100' : 'h-2 opacity-50'}`} />
              </div>
              <span className="font-mono-cinema text-[9px] uppercase tracking-widest text-zinc-400">
                {isMuted ? 'SOUND OFF' : 'SOUND ON'}
              </span>
            </button>

            {/* Menu / Chapters Button */}
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open film screenplay chapters"
              className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 hover:border-cyan-400/40 backdrop-blur-md text-zinc-300 hover:text-white transition-all cursor-pointer shadow-lg"
            >
              <div className="flex flex-col justify-center items-center w-4 h-3 gap-1">
                <span className="w-full h-[1.5px] bg-white rounded-full" />
                <span className="w-full h-[1.5px] bg-white rounded-full" />
              </div>
              <span className="font-mono-cinema text-[9px] uppercase tracking-widest text-zinc-300">
                PLANETS
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* 3. Bottom Film Director Indicators */}
      <div className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none select-none pb-4 sm:pb-6 px-4 sm:px-8">
        
        {/* Bottom Center Scroll Hint (animated mouse + progress meter) */}
        <div className="flex flex-col items-center justify-center mb-3">
          <div className="flex items-center space-x-2 text-[9px] font-mono-cinema text-zinc-400 uppercase tracking-[0.25em] mix-blend-difference">
            <span>SCROLL OR CLICK PLANETS TO DIRECT</span>
            <span className="text-zinc-600">·</span>
            <span className="text-cyan-400 font-bold">{progressPercent}%</span>
          </div>

          <div className="w-32 h-[1px] bg-white/20 my-1 relative overflow-hidden rounded-full">
            <div 
              className="h-full bg-cyan-400 transition-all duration-100 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <span className="text-[8px] font-mono-cinema text-zinc-500 uppercase tracking-[0.25em]">
            INTERACTIVE 3D SOLAR SYSTEM • 8 PLANETARY DESTINATIONS
          </span>
        </div>

        {/* Minimalist Progress Track with Chapter Tick Pips */}
        <div className="relative w-full h-[1px] bg-white/15 mix-blend-difference">
          {chapterTicks.map((pos, i) => (
            <span
              key={i}
              className="absolute top-[-2px] w-[1px] h-[5px] bg-white/40"
              style={{ left: `${pos}%` }}
            />
          ))}
          <div
            className="absolute top-0 left-0 h-full bg-cyan-400 transition-all duration-75"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

      </div>

      {/* 4. Full Chapters Screenplay Index Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-[#04060a]/95 backdrop-blur-2xl p-6 sm:p-12 flex flex-col justify-between overflow-y-auto animate-fade-in select-none">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div>
              <span className="font-mono-cinema text-[10px] text-cyan-400 uppercase tracking-[0.25em] block mb-1">
                SOLAR SYSTEM DIRECTORY
              </span>
              <h3 className="font-cinema text-3xl sm:text-5xl text-white tracking-wide">
                SELECT A 3D PLANET TO DIRECT CAMERA
              </h3>
            </div>

            <button
              onClick={() => setDrawerOpen(false)}
              aria-label="Close chapters drawer"
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Screenplay Chapters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 my-8">
            {CHAPTERS_LIST.map((chap) => {
              const isActive = currentChapter === chap.index;
              return (
                <button
                  key={chap.index}
                  onClick={() => handleSelectChapter(chap.index)}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between group ${
                    isActive
                      ? 'bg-cyan-950/40 border-cyan-400/80 shadow-[0_0_30px_rgba(56,189,248,0.25)]'
                      : 'bg-zinc-950/70 border-white/10 hover:border-cyan-400/50 hover:bg-zinc-900/80'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-cinema text-2xl text-cyan-300 group-hover:text-cyan-200">
                        {chap.num}
                      </span>
                      <span className="font-mono-cinema text-[9px] text-zinc-500 uppercase tracking-widest">
                        {chap.planet}
                      </span>
                    </div>

                    <h4 className="font-cinema text-2xl text-white tracking-wide group-hover:text-cyan-100">
                      {chap.title}
                    </h4>

                    <p className="font-mono-cinema text-[10px] text-cyan-400/80 tracking-wider mt-1 uppercase">
                      {chap.slug}
                    </p>
                  </div>

                  <p className="text-xs text-zinc-400 mt-4 font-sans font-light">
                    {chap.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Drawer Footer Details */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-cinema text-zinc-500">
            <div className="flex items-center space-x-5">
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 text-zinc-300 hover:text-cyan-400 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>@deepakvitian30-arch</span>
              </a>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 text-zinc-300 hover:text-cyan-400 transition-colors"
              >
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <span className="text-[11px] tracking-widest text-zinc-600 uppercase">
              DEEPAK SUBRAMANIAM • VIT VELLORE B.TECH IT
            </span>
          </div>
        </div>
      )}
    </>
  );
};
