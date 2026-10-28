import React from 'react';
import { ACHIEVEMENTS_DATA } from '../data/portfolioData';
import { Trophy, Compass, BookOpen, Award, CheckCircle2 } from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const getIcon = (category: string) => {
    switch (category) {
      case 'Hackathon': return Trophy;
      case 'Leadership': return Compass;
      case 'Technical Workshop': return BookOpen;
      default: return Award;
    }
  };

  return (
    <section id="achievements" className="py-24 px-6 md:px-12 max-w-7xl mx-auto select-none border-t border-zinc-900">
      
      {/* Section Header */}
      <div className="mb-14">
        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>04 / MILESTONES & HONORS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Achievements & Experience
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-3 max-w-xl">
          Competitive hackathon results, technical workshops, and student leadership roles.
        </p>
      </div>

      {/* Grid of Milestone Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACHIEVEMENTS_DATA.map((item) => {
          const Icon = getIcon(item.category);
          const isHackGrid = item.id === 'hackgrid';

          return (
            <div
              key={item.id}
              className={`p-6 rounded-3xl backdrop-blur-xl border transition-all duration-300 flex flex-col justify-between ${
                isHackGrid
                  ? 'bg-gradient-to-br from-cyan-950/40 via-zinc-950/80 to-zinc-950/80 border-cyan-500/50 shadow-[0_0_30px_rgba(56,189,248,0.15)]'
                  : 'bg-zinc-950/80 border-zinc-800/90 hover:border-zinc-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl border ${
                    isHackGrid
                      ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
                    {item.highlight}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>Verified Milestones</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
