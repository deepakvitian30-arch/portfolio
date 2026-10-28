import React from 'react';
import type { PlanetInfo } from '../three/FilmDirectorScene';
import { ArrowRight, Sparkles } from 'lucide-react';

interface PlanetHoverCardProps {
  planet: PlanetInfo | null;
  pos: { x: number; y: number };
}

export const PlanetHoverCard: React.FC<PlanetHoverCardProps> = ({ planet, pos }) => {
  if (!planet) return null;

  // Position the card near the cursor without falling off viewport
  const left = Math.min(window.innerWidth - 320, Math.max(20, pos.x + 20));
  const top = Math.min(window.innerHeight - 200, Math.max(80, pos.y - 40));

  return (
    <div
      className="fixed z-50 pointer-events-none transition-all duration-150 ease-out animate-fade-in"
      style={{ left: `${left}px`, top: `${top}px` }}
    >
      <div className="w-72 p-4 rounded-2xl bg-black/85 backdrop-blur-xl border border-cyan-400/50 shadow-[0_0_30px_rgba(56,189,248,0.35)] select-none">
        
        {/* Top Tag & Planet Name */}
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="font-mono-cinema text-[9px] uppercase tracking-[0.2em] text-cyan-300">
              PLANET {planet.index}
            </span>
          </div>
          <span className="font-mono-cinema text-[8px] text-zinc-500 uppercase tracking-widest">
            3D SPHERE
          </span>
        </div>

        <h4 className="font-cinema text-2xl text-white tracking-wide">
          {planet.name}
        </h4>

        <p className="font-mono-cinema text-[10px] text-cyan-400/90 tracking-wide mt-0.5">
          {planet.subtitle}
        </p>

        <p className="text-xs text-zinc-300 font-light mt-2 leading-relaxed">
          {planet.description}
        </p>

        {/* Action Hint */}
        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono-cinema text-cyan-300">
          <span>CLICK TO ENGAGE CAMERA</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>

      </div>
    </div>
  );
};
