import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Rocket, ChevronRight, Compass } from 'lucide-react';
import type { DestinationData } from '../three/SpaceTravelScene';

interface SystemOverviewCardProps {
  destinations: DestinationData[];
  onSelectDestination: (index: number) => void;
  onStartTour: () => void;
}

export const SystemOverviewCard: React.FC<SystemOverviewCardProps> = ({
  destinations,
  onSelectDestination,
  onStartTour
}) => {
  return (
    <div className="fixed inset-y-0 left-0 z-30 w-full sm:w-[540px] lg:w-[620px] p-4 sm:p-8 flex flex-col justify-center pointer-events-none select-none">
      <div className="pointer-events-auto p-8 sm:p-10 rounded-3xl bg-black/80 backdrop-blur-2xl border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.95)] animate-fade-in">
        
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-cyan-950/70 border border-cyan-400/40 text-cyan-300 font-mono-cinema text-[11px] mb-5">
          <Rocket className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>SPACE EXPLORATION PROTOCOL</span>
          <span className="text-zinc-600">/</span>
          <span>8 3D WORLDS</span>
        </div>

        <h1 className="font-cinema text-5xl sm:text-7xl lg:text-8xl text-white leading-[0.92] mb-5 tracking-wide">
          BUILDING IDEAS INTO{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
            DIGITAL EXPERIENCES.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed mb-6">
          {PERSONAL_INFO.supportingText}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <button
            onClick={() => onSelectDestination(2)}
            className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono-cinema text-xs transition-all shadow-[0_0_25px_rgba(56,189,248,0.35)] cursor-pointer active:scale-95"
          >
            <span>FLY TO MEDORA (DOSESENSE)</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onSelectDestination(1)}
            className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono-cinema text-xs transition-all cursor-pointer backdrop-blur-md"
          >
            <span>ABOUT OBSIDIAN</span>
          </button>
        </div>

        {/* Interactive Planetary Navigation Grid */}
        <div className="pt-5 border-t border-white/10">
          <div className="flex items-center justify-between mb-2.5">
            <span className="font-mono-cinema text-[10px] text-zinc-400 uppercase tracking-widest">
              DIRECT PLANETARY DESTINATIONS:
            </span>
            <button
              onClick={onStartTour}
              className="text-[10px] font-mono-cinema text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 cursor-pointer"
            >
              <span>START CINEMATIC TOUR</span>
              <Compass className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {destinations.map((dest) => (
              <button
                key={dest.index}
                onClick={() => onSelectDestination(dest.index)}
                className="px-2.5 py-2 rounded-xl bg-zinc-950/70 hover:bg-cyan-950/40 border border-zinc-800 hover:border-cyan-400/50 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dest.colorHex }} />
                  <span className="font-cinema text-xs text-white group-hover:text-cyan-300">
                    {dest.name}
                  </span>
                </div>
                <span className="font-mono-cinema text-[9px] text-zinc-500 block truncate">
                  {dest.tagline.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
