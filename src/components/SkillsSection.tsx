import React, { useState } from 'react';
import { SKILLS_DATA, type SkillGroup } from '../data/portfolioData';
import { Check, Terminal } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<string>('All');

  const filteredGroups = selectedTier === 'All'
    ? SKILLS_DATA
    : SKILLS_DATA.filter((g) => g.tier === selectedTier);

  return (
    <section id="skills" className="py-24 px-6 md:px-12 max-w-7xl mx-auto select-none border-t border-zinc-900">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>03 / TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Skills & Applied Stack
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 max-w-xl">
            An authentic inventory of active languages, database engines, and frameworks.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 p-1 rounded-2xl bg-zinc-950/80 border border-zinc-800">
          {['All', 'Intermediate', 'Beginner', 'Applied Experience'].map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                selectedTier === tier
                  ? 'bg-cyan-950/70 border border-cyan-400/50 text-cyan-300 font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Groups Grid */}
      <div className="space-y-10">
        {filteredGroups.map((group: SkillGroup) => {
          let tierBadgeColor = 'bg-cyan-950/60 text-cyan-300 border-cyan-400/40';
          if (group.tier === 'Beginner') {
            tierBadgeColor = 'bg-indigo-950/60 text-indigo-300 border-indigo-400/40';
          } else if (group.tier === 'Applied Experience') {
            tierBadgeColor = 'bg-emerald-950/60 text-emerald-300 border-emerald-400/40';
          }

          return (
            <div key={group.tier} className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-mono border ${tierBadgeColor}`}>
                  {group.tier.toUpperCase()} LEVEL
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  {group.description}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/90 hover:border-cyan-500/50 backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {skill.name}
                        </h4>
                        <Terminal className="w-3.5 h-3.5 text-zinc-600 group-hover:text-cyan-400 transition-colors" />
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {skill.focus}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                      <span>Verified in projects</span>
                      <Check className="w-3 h-3 text-cyan-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
