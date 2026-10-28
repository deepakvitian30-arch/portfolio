import React, { useState } from 'react';
import { PROJECTS_DATA, type ProjectItem } from '../data/portfolioData';
import { 
  ExternalLink, 
  Layers, 
  Activity, 
  Building2, 
  ShoppingBag, 
  Car, 
  Maximize2,
  CheckCircle2
} from 'lucide-react';
import { GithubIcon } from './GithubIcon';

interface ProjectsSectionProps {
  onOpenImageModal: (src: string, title: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenImageModal }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'fullstack', label: 'Full-Stack Apps' },
    { id: 'creative', label: '3D Web & Prototypes' }
  ];

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'fullstack') return project.id === 'dosesense' || project.id === 'vitidy';
    if (activeTab === 'creative') return project.id === 'ennaval' || project.id === 'parking';
    return true;
  });

  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'dosesense': return Activity;
      case 'vitidy': return Building2;
      case 'ennaval': return ShoppingBag;
      case 'parking': return Car;
      default: return Layers;
    }
  };

  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto select-none">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>01 / SELECTED WORKS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Featured Projects & Systems
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 max-w-xl">
            Practical web software engineered to solve real campus, clinical, and commercial problems.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 p-1 rounded-2xl bg-zinc-950/80 border border-zinc-800">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                activeTab === cat.id
                  ? 'bg-cyan-950/70 border border-cyan-400/50 text-cyan-300 font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Showcase Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredProjects.map((project: ProjectItem) => {
          const Icon = getProjectIcon(project.id);
          const isDoseSense = project.id === 'dosesense';

          return (
            <div
              key={project.id}
              className="group rounded-3xl bg-zinc-950/85 border border-zinc-800/90 hover:border-cyan-500/40 p-6 md:p-8 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_35px_rgba(56,189,248,0.12)] flex flex-col justify-between"
            >
              <div>
                {/* Top Badge & Status */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-xl bg-cyan-950/50 border border-cyan-500/30 text-cyan-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
                      {project.badge}
                    </span>
                  </div>

                  <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full border ${
                    project.status === 'Deployed Live'
                      ? 'bg-emerald-950/50 text-emerald-300 border-emerald-500/40'
                      : project.status === 'Completed'
                      ? 'bg-blue-950/50 text-blue-300 border-blue-500/40'
                      : 'bg-amber-950/50 text-amber-300 border-amber-500/40'
                  }`}>
                    {project.status}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-cyan-400/80 mt-1 mb-4">
                  {project.tagline}
                </p>

                {/* Overview Description */}
                <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                  {project.overview}
                </p>

                {/* DoseSense HackGrid Real Charts Thumbnail Preview */}
                {isDoseSense && project.images && (
                  <div className="mb-6 p-4 rounded-2xl bg-black/60 border border-zinc-800/80">
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-2.5">
                      <span>HackGrid 2026 Analytical Charts:</span>
                      <span className="text-cyan-400">Click to expand</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {project.images.map((img, i) => (
                        <div
                          key={i}
                          onClick={() => onOpenImageModal(img, `DoseSense Analysis Deliverable ${i + 1}`)}
                          className="relative aspect-video rounded-xl bg-zinc-900 overflow-hidden border border-zinc-800 hover:border-cyan-400 transition-all cursor-pointer group/img"
                        >
                          <img src={img} alt="DoseSense Chart" className="w-full h-full object-contain p-1" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                            <Maximize2 className="w-3.5 h-3.5 text-cyan-300" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Architecture Highlights */}
                <div className="space-y-2 mb-6">
                  {project.highlights.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-zinc-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Live Site & GitHub */}
              <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-medium transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)] cursor-pointer"
                    >
                      <span>Live Site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-medium transition-all cursor-pointer"
                  >
                    <GithubIcon className="w-3.5 h-3.5 text-zinc-400" />
                    <span>View Repository</span>
                  </a>
                </div>

                <span className="text-[11px] font-mono text-zinc-500">
                  Deepak Subramaniam
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
