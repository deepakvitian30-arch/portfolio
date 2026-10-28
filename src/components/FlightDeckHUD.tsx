import React, { useState } from 'react';
import { soundManager } from '../audio/soundManager';
import { Compass, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import type { DestinationData } from '../three/SpaceTravelScene';

interface FlightDeckHUDProps {
  currentDestinationIndex: number;
  destinations: DestinationData[];
  isTraveling: boolean;
  isCinematicTour: boolean;
  onToggleCinematicTour: () => void;
  onSelectDestination: (index: number) => void;
}

export const FlightDeckHUD: React.FC<FlightDeckHUDProps> = ({
  currentDestinationIndex,
  destinations,
  isTraveling,
  isCinematicTour,
  onToggleCinematicTour,
  onSelectDestination
}) => {
  const [isMuted, setIsMuted] = useState(soundManager.getIsMuted());
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleSound = () => {
    const unmuted = soundManager.toggleMute();
    setIsMuted(!unmuted);
  };

  const activeDest = destinations.find(d => d.index === currentDestinationIndex);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 p-4 sm:p-6 select-none pointer-events-none">
        <div className="w-full flex items-center justify-between">
          
          {/* Top-Left: Commander Identity & Orbital Sector */}
          <div className="pointer-events-auto flex items-center space-x-3.5">
            <button
              onClick={() => onSelectDestination(0)}
              className="flex items-center space-x-3 text-left group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center font-cinema text-lg text-cyan-300 group-hover:border-cyan-400/80 group-hover:bg-cyan-500/20 transition-all shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                D
              </div>
              <div className="flex flex-col">
                <span className="font-cinema text-base sm:text-lg text-white tracking-[0.14em] group-hover:text-cyan-300 transition-colors">
                  DEEPAK SUBRAMANIAM
                </span>
                <span className="font-mono-cinema text-[10px] text-zinc-400">
                  VIT VELLORE • IT '30
                </span>
              </div>
            </button>

            {/* Flight Telemetry Status */}
            <div className="hidden md:flex items-center space-x-2 px-3.5 py-1 rounded-full bg-black/75 border border-white/10 backdrop-blur-md shadow-md text-[11px] font-mono-cinema">
              <span className={`w-2 h-2 rounded-full ${isTraveling ? 'bg-amber-400 animate-ping' : 'bg-cyan-400 animate-pulse'}`} />
              <span className="text-zinc-400 uppercase tracking-widest text-[10px]">
                {isTraveling ? 'WARP TRANSIT IN PROGRESS' : activeDest ? `ORBIT: PLANET ${activeDest.name}` : 'DEEP SPACE SYSTEM ORBIT'}
              </span>
            </div>
          </div>

          {/* Top-Right: Sound, Cinematic Auto-Tour & Destination Selector */}
          <div className="pointer-events-auto flex items-center space-x-2 sm:space-x-2.5">
            
            {/* Cinematic Auto-Tour Toggle */}
            <button
              onClick={onToggleCinematicTour}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-[10px] font-mono-cinema tracking-wider backdrop-blur-md transition-all cursor-pointer shadow-md ${
                isCinematicTour
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                  : 'bg-black/60 hover:bg-black/80 border-white/10 text-zinc-400 hover:text-white'
              }`}
              title="Automatically cruise between planets in a cinematic tour"
            >
              {isCinematicTour ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-cyan-400" />}
              <span className="hidden sm:inline">{isCinematicTour ? 'AUTO-TOUR ACTIVE' : 'CINEMATIC TOUR'}</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              className="p-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 hover:border-cyan-400/40 text-zinc-400 hover:text-white transition-all cursor-pointer backdrop-blur-md shadow-md"
              title={isMuted ? "Sound Muted" : "Atmospheric Audio Active"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>

            {/* All Destinations Directory */}
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 hover:border-cyan-400/40 text-[10px] font-mono-cinema text-zinc-300 hover:text-white transition-all cursor-pointer backdrop-blur-md shadow-md"
            >
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>DESTINATIONS</span>
            </button>

          </div>

        </div>
      </header>

      {/* Destinations Modal / Quick Selector */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl p-6 sm:p-12 flex flex-col justify-between overflow-y-auto animate-fade-in select-none">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div>
              <span className="font-mono-cinema text-[10px] text-cyan-400 uppercase tracking-[0.25em] block mb-1">
                SPACE FLIGHT DIRECTORY
              </span>
              <h3 className="font-cinema text-3xl sm:text-5xl text-white tracking-wide">
                SELECT A PLANETARY DESTINATION
              </h3>
            </div>

            <button
              onClick={() => setMenuOpen(false)}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 my-8">
            <button
              onClick={() => { onSelectDestination(0); setMenuOpen(false); }}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                currentDestinationIndex === 0
                  ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_25px_rgba(56,189,248,0.25)]'
                  : 'bg-zinc-950/70 border-white/10 hover:border-cyan-400/40 hover:bg-zinc-900/80'
              }`}
            >
              <div>
                <span className="font-cinema text-2xl text-cyan-300">00</span>
                <h4 className="font-cinema text-2xl text-white tracking-wide mt-1">SYSTEM ORBIT</h4>
                <p className="font-mono-cinema text-[10px] text-cyan-400/80 mt-1 uppercase">WIDE SPACE VIEW</p>
              </div>
              <p className="text-xs text-zinc-400 mt-3">Overview of the entire solar system and spacecraft</p>
            </button>

            {destinations.map((dest) => {
              const isActive = currentDestinationIndex === dest.index;
              return (
                <button
                  key={dest.index}
                  onClick={() => { onSelectDestination(dest.index); setMenuOpen(false); }}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_25px_rgba(56,189,248,0.25)]'
                      : 'bg-zinc-950/70 border-white/10 hover:border-cyan-400/40 hover:bg-zinc-900/80'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-cinema text-2xl text-cyan-300">0{dest.index}</span>
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dest.colorHex }} />
                    </div>
                    <h4 className="font-cinema text-2xl text-white tracking-wide">{dest.name}</h4>
                    <p className="font-mono-cinema text-[10px] text-cyan-400/80 mt-1 uppercase">{dest.tagline}</p>
                  </div>
                  <p className="text-xs text-zinc-400 mt-3">{dest.category}</p>
                </button>
              );
            })}
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono-cinema text-zinc-500">
            <span>DIRECT SPACECRAFT DESTINATION PROTOCOL</span>
            <span>DEEPAK SUBRAMANIAM • PORTFOLIO VOYAGE</span>
          </div>
        </div>
      )}
    </>
  );
};
