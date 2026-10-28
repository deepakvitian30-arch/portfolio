import React from 'react';
import { ChevronLeft, ChevronRight, Orbit, FastForward, Eye, EyeOff } from 'lucide-react';
import type { DestinationData } from '../three/SpaceTravelScene';

interface SpaceNavigationDockProps {
  currentDestinationIndex: number;
  destinations: DestinationData[];
  isTraveling: boolean;
  dossierVisible: boolean;
  onToggleDossier: () => void;
  onSelectDestination: (index: number) => void;
  onSkipTravel: () => void;
}

export const SpaceNavigationDock: React.FC<SpaceNavigationDockProps> = ({
  currentDestinationIndex,
  destinations,
  isTraveling,
  dossierVisible,
  onToggleDossier,
  onSelectDestination,
  onSkipTravel
}) => {
  const handlePrev = () => {
    if (currentDestinationIndex <= 1) {
      onSelectDestination(destinations.length);
    } else {
      onSelectDestination(currentDestinationIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentDestinationIndex >= destinations.length) {
      onSelectDestination(1);
    } else {
      onSelectDestination(currentDestinationIndex + 1);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 sm:p-6 pointer-events-none select-none">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-3">
        
        {/* Floating Quick Actions Bar (Skip Travel / Return to Orbit / Toggle Dossier) */}
        <div className="pointer-events-auto flex items-center space-x-2">
          {isTraveling && (
            <button
              onClick={onSkipTravel}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400 text-cyan-300 font-mono-cinema text-xs backdrop-blur-md transition-all cursor-pointer shadow-[0_0_15px_rgba(56,189,248,0.3)] animate-pulse"
            >
              <FastForward className="w-3.5 h-3.5" />
              <span>SKIP TRAVEL</span>
            </button>
          )}

          {currentDestinationIndex > 0 && !isTraveling && (
            <>
              <button
                onClick={() => onSelectDestination(0)}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-black/75 hover:bg-black/90 border border-white/10 hover:border-cyan-400/40 text-zinc-300 hover:text-white font-mono-cinema text-xs backdrop-blur-md transition-all cursor-pointer shadow-md"
              >
                <Orbit className="w-3.5 h-3.5 text-cyan-400" />
                <span>RETURN TO ORBIT</span>
              </button>

              <button
                onClick={onToggleDossier}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-black/75 hover:bg-black/90 border border-white/10 hover:border-cyan-400/40 text-zinc-300 hover:text-white font-mono-cinema text-xs backdrop-blur-md transition-all cursor-pointer shadow-md"
              >
                {dossierVisible ? <EyeOff className="w-3.5 h-3.5 text-cyan-400" /> : <Eye className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{dossierVisible ? 'HIDE DOSSIER' : 'VIEW DETAILS'}</span>
              </button>
            </>
          )}
        </div>

        {/* Spacecraft Planetary Waypoint Dock */}
        <div className="pointer-events-auto w-full flex items-center justify-between p-2 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.9)]">
          
          {/* Previous Destination */}
          <button
            onClick={handlePrev}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer flex items-center space-x-1 text-xs font-mono-cinema"
            title="Previous Planet"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">PREV</span>
          </button>

          {/* Planet Pills List */}
          <div className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto no-scrollbar px-2">
            {destinations.map((dest) => {
              const isActive = currentDestinationIndex === dest.index;
              return (
                <button
                  key={dest.index}
                  onClick={() => onSelectDestination(dest.index)}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-mono-cinema transition-all cursor-pointer flex items-center space-x-1.5 whitespace-nowrap ${
                    isActive
                      ? 'bg-cyan-950/70 border-cyan-400 text-white shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                      : 'bg-zinc-950/60 border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20'
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: dest.colorHex }}
                  />
                  <span className="font-cinema text-sm tracking-wider">
                    {dest.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Next Destination */}
          <button
            onClick={handleNext}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer flex items-center space-x-1 text-xs font-mono-cinema"
            title="Next Planet"
          >
            <span className="hidden sm:inline">NEXT</span>
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>

      </div>
    </div>
  );
};
