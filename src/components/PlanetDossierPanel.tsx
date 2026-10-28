import React, { useState } from 'react';
import { PERSONAL_INFO, PROJECTS_DATA, SKILLS_DATA, ACHIEVEMENTS_DATA } from '../data/portfolioData';
import { 
  ExternalLink, 
  Maximize2, 
  Send, 
  Copy, 
  Check, 
  Trophy, 
  CheckCircle2,
  GraduationCap,
  Code2,
  MapPin,
  X,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { GithubIcon } from './GithubIcon';

interface PlanetDossierPanelProps {
  currentDestinationIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onOpenImageModal: (src: string, title: string) => void;
  onNavigateToNext: () => void;
}

export const PlanetDossierPanel: React.FC<PlanetDossierPanelProps> = ({
  currentDestinationIndex,
  isOpen,
  onClose,
  onOpenImageModal,
  onNavigateToNext
}) => {
  // Contact state
  const [senderName, setSenderName] = useState('');
  const [senderOrg, setSenderOrg] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen || currentDestinationIndex === 0) return null;

  const doseSense = PROJECTS_DATA[0];
  const vitidy = PROJECTS_DATA[1];
  const ennaval = PROJECTS_DATA[2];
  const parking = PROJECTS_DATA[3];
  const changeDetector = PROJECTS_DATA[4];

  const formattedNote = `Hello Deepak,\n\nName: ${senderName || '[Your Name]'}\nOrganization: ${senderOrg || '[Organization]'}\n\nMessage:\n${senderMessage || 'I would like to connect regarding software engineering opportunities.'}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedNote);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${senderName || 'Engineering Team'}`);
    const body = encodeURIComponent(formattedNote);
    window.location.href = `mailto:${PERSONAL_INFO.socials.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-y-0 right-0 z-30 w-full sm:w-[540px] lg:w-[600px] p-4 sm:p-6 flex flex-col justify-center pointer-events-none select-none">
      <div className="pointer-events-auto max-h-[85vh] overflow-y-auto rounded-3xl bg-black/85 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] animate-fade-in flex flex-col justify-between custom-scrollbar">
        
        {/* Header Bar */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="font-mono-cinema text-[10px] text-cyan-300 uppercase tracking-[0.25em]">
                DESTINATION DOSSIER • 0{currentDestinationIndex}
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Minimize dossier"
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 1. OBSIDIAN — ABOUT ME */}
          {currentDestinationIndex === 1 && (
            <div>
              <span className="font-mono-cinema text-[10px] text-cyan-400 uppercase tracking-widest block mb-1">
                PLANET EARTH • STUDENT PROFILE
              </span>
              <h2 className="font-cinema text-4xl sm:text-5xl text-white mb-4">
                THE CORE: ABOUT DEEPAK
              </h2>
              <p className="text-sm text-zinc-300 font-light leading-relaxed mb-4">
                I am a first-year Information Technology student at <strong className="text-white font-medium">VIT Vellore (Class of 2030)</strong>, deeply focused on full-stack web engineering, scalable backends, and intelligent software systems.
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                My approach is pragmatic: rather than copying tutorials, I develop practical software that solves genuine friction—from non-invasive clinical adherence detection for HackGrid to database-authenticated campus complaint routing for thousands of students.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
                <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800">
                  <div className="flex items-center space-x-1.5 text-cyan-400 mb-1">
                    <GraduationCap className="w-4 h-4" />
                    <span className="font-mono-cinema text-[9px] uppercase">Campus</span>
                  </div>
                  <p className="font-bold text-white text-xs">VIT Vellore</p>
                  <p className="text-[10px] text-zinc-400 font-mono">B.Tech IT • 2030</p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800">
                  <div className="flex items-center space-x-1.5 text-cyan-400 mb-1">
                    <Code2 className="w-4 h-4" />
                    <span className="font-mono-cinema text-[9px] uppercase">Focus</span>
                  </div>
                  <p className="font-bold text-white text-xs">Full-Stack</p>
                  <p className="text-[10px] text-zinc-400 font-mono">FastAPI • React • SQL</p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800">
                  <div className="flex items-center space-x-1.5 text-cyan-400 mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="font-mono-cinema text-[9px] uppercase">Location</span>
                  </div>
                  <p className="font-bold text-white text-xs">Tamil Nadu, India</p>
                  <p className="text-[10px] text-zinc-400 font-mono">Open to Internships</p>
                </div>
              </div>
            </div>
          )}

          {/* 2. MEDORA — DOSESENSE */}
          {currentDestinationIndex === 2 && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono-cinema text-[10px] text-cyan-400 uppercase tracking-widest">
                  PLANET NEPTUNE • HEALTHCARE DECISION-SUPPORT
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-cinema bg-emerald-950/60 border border-emerald-400/40 text-emerald-300">
                  {doseSense.status}
                </span>
              </div>
              <h2 className="font-cinema text-4xl sm:text-5xl text-white mb-2">
                {doseSense.title}
              </h2>
              <p className="font-mono-cinema text-xs text-cyan-300 mb-4">
                {doseSense.tagline}
              </p>
              <p className="text-xs text-zinc-300 leading-relaxed mb-5">
                {doseSense.overview}
              </p>

              {/* HackGrid Charts Box */}
              {doseSense.images && (
                <div className="p-3.5 rounded-2xl bg-zinc-950/90 border border-zinc-800 mb-5">
                  <div className="flex items-center justify-between font-mono-cinema text-[11px] text-zinc-400 mb-2">
                    <span className="text-white font-bold">HackGrid 2026 Analytical Charts:</span>
                    <span className="text-cyan-400">Click to expand</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {doseSense.images.map((img, i) => (
                      <div
                        key={i}
                        onClick={() => onOpenImageModal(img, `DoseSense Analysis Deliverable ${i + 1}`)}
                        className="relative aspect-video rounded-xl bg-black/80 overflow-hidden border border-zinc-800 hover:border-cyan-400 transition-all cursor-pointer group"
                      >
                        <img src={img} alt="DoseSense Deliverable" className="w-full h-full object-contain p-1" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Maximize2 className="w-4 h-4 text-cyan-300" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stack & Links */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {doseSense.techStack.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md text-[11px] font-mono-cinema bg-zinc-900 border border-zinc-800 text-zinc-300">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={doseSense.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono-cinema text-xs shadow-lg transition-all"
                >
                  <span>LAUNCH LIVE SITE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={doseSense.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono-cinema text-xs transition-all"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>VIEW REPO</span>
                </a>
              </div>
            </div>
          )}

          {/* 3. VITANIA — VITIDY */}
          {currentDestinationIndex === 3 && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono-cinema text-[10px] text-amber-400 uppercase tracking-widest">
                  PLANET VENUS • CAMPUS OPERATIONS
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-cinema bg-emerald-950/60 border border-emerald-400/40 text-emerald-300">
                  {vitidy.status}
                </span>
              </div>
              <h2 className="font-cinema text-4xl sm:text-5xl text-white mb-2">
                {vitidy.title}
              </h2>
              <p className="font-mono-cinema text-xs text-emerald-400 mb-4">
                {vitidy.tagline}
              </p>
              <p className="text-xs text-zinc-300 leading-relaxed mb-5">
                {vitidy.overview}
              </p>

              <div className="space-y-1.5 mb-5">
                {vitidy.highlights.map((h, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs text-zinc-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {vitidy.techStack.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md text-[11px] font-mono-cinema bg-zinc-900 border border-zinc-800 text-zinc-300">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={vitidy.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-mono-cinema text-xs shadow-lg transition-all"
                >
                  <span>LAUNCH LIVE PORTAL</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={vitidy.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono-cinema text-xs transition-all"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>VIEW REPO</span>
                </a>
              </div>
            </div>
          )}

          {/* 4. ENNAVAL — BOUTIQUE */}
          {currentDestinationIndex === 4 && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono-cinema text-[10px] text-purple-400 uppercase tracking-widest">
                  PLANET SATURN • 3D DIGITAL ATELIER
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-cinema bg-purple-950/60 border border-purple-400/40 text-purple-300">
                  {ennaval.status}
                </span>
              </div>
              <h2 className="font-cinema text-4xl sm:text-5xl text-white mb-2">
                {ennaval.title}
              </h2>
              <p className="font-mono-cinema text-xs text-purple-400 mb-4">
                {ennaval.tagline}
              </p>
              <p className="text-xs text-zinc-300 leading-relaxed mb-5">
                {ennaval.overview}
              </p>

              <div className="space-y-1.5 mb-5">
                {ennaval.highlights.map((h, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs text-zinc-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {ennaval.techStack.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md text-[11px] font-mono-cinema bg-zinc-900 border border-zinc-800 text-zinc-300">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {ennaval.liveUrl && (
                  <a
                    href={ennaval.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-mono-cinema text-xs shadow-lg transition-all"
                  >
                    <span>LAUNCH LIVE ATELIER</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <a
                  href={ennaval.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono-cinema text-xs transition-all"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>VIEW REPOSITORY</span>
                </a>
              </div>
            </div>
          )}

          {/* 5. MARS — PARKING MANAGEMENT */}
          {currentDestinationIndex === 5 && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono-cinema text-[10px] text-red-400 uppercase tracking-widest">
                  PLANET MARS • SYSTEMS PROTOTYPE
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-cinema bg-red-950/60 border border-red-400/40 text-red-300">
                  {parking.status}
                </span>
              </div>
              <h2 className="font-cinema text-4xl sm:text-5xl text-white mb-2">
                {parking.title}
              </h2>
              <p className="font-mono-cinema text-xs text-red-400 mb-4">
                {parking.tagline}
              </p>
              <p className="text-xs text-zinc-300 leading-relaxed mb-5">
                {parking.overview}
              </p>

              <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/30 text-xs text-red-200 mb-5">
                <span className="font-bold">Prototype Tariff Model: </span>
                Car (₹200) • Bike (₹100) • Commercial Tempo (₹300).
              </div>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {parking.techStack.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md text-[11px] font-mono-cinema bg-zinc-900 border border-zinc-800 text-zinc-300">
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={parking.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono-cinema text-xs transition-all"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>VIEW REPOSITORY</span>
              </a>
            </div>
          )}

          {/* 6. JUPITER — WEBSITE CHANGE DETECTOR */}
          {currentDestinationIndex === 6 && changeDetector && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono-cinema text-[10px] text-emerald-400 uppercase tracking-widest">
                  PLANET JUPITER • DOM SURVEILLANCE & CHANGE DETECTOR
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-cinema bg-emerald-950/60 border border-emerald-400/40 text-emerald-300">
                  {changeDetector.status}
                </span>
              </div>
              <h2 className="font-cinema text-4xl sm:text-5xl text-white mb-2">
                {changeDetector.title}
              </h2>
              <p className="font-mono-cinema text-xs text-emerald-400 mb-4">
                {changeDetector.tagline}
              </p>
              <p className="text-xs text-zinc-300 leading-relaxed mb-5">
                {changeDetector.overview}
              </p>

              <div className="space-y-1.5 mb-5">
                {changeDetector.highlights.map((h, i) => (
                  <div key={i} className="flex items-start space-x-2 text-xs text-zinc-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {changeDetector.techStack.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md text-[11px] font-mono-cinema bg-zinc-900 border border-zinc-800 text-zinc-300">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {changeDetector.liveUrl && (
                  <a
                    href={changeDetector.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-mono-cinema text-xs shadow-lg transition-all"
                  >
                    <span>LAUNCH CHANGE DETECTOR</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <a
                  href={changeDetector.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono-cinema text-xs transition-all"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>VIEW REPO</span>
                </a>
              </div>
            </div>
          )}

          {/* 7. URANUS — SKILLS */}
          {currentDestinationIndex === 7 && (
            <div>
              <span className="font-mono-cinema text-[10px] text-cyan-400 uppercase tracking-widest block mb-1">
                PLANET URANUS • STACK MATRIX
              </span>
              <h2 className="font-cinema text-4xl sm:text-5xl text-white mb-4">
                TECHNICAL ARSENAL
              </h2>

              <div className="space-y-4">
                {SKILLS_DATA.map((grp) => (
                  <div key={grp.tier} className="space-y-2">
                    <span className="font-mono-cinema text-[10px] uppercase text-zinc-400 font-bold block">
                      {grp.tier} LEVEL
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {grp.skills.map((s) => (
                        <div key={s.name} className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800">
                          <p className="font-bold text-white text-xs">{s.name}</p>
                          <p className="text-[10px] text-cyan-400 font-mono mt-0.5">{s.focus}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8. MERCURY — ACHIEVEMENTS */}
          {currentDestinationIndex === 8 && (
            <div>
              <span className="font-mono-cinema text-[10px] text-amber-400 uppercase tracking-widest block mb-1">
                PLANET MERCURY • HONORS VAULT
              </span>
              <h2 className="font-cinema text-4xl sm:text-5xl text-white mb-4">
                HONORS & MILESTONES
              </h2>

              <div className="space-y-2.5">
                {ACHIEVEMENTS_DATA.map((ach) => (
                  <div
                    key={ach.id}
                    className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800 hover:border-amber-400/50 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-2.5">
                        <Trophy className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                        <div>
                          <h3 className="font-bold text-white text-xs">{ach.title}</h3>
                          <p className="font-mono-cinema text-[10px] text-amber-400/90 mt-0.5">
                            {ach.category}
                          </p>
                          <p className="text-xs text-zinc-400 font-light mt-1">
                            {ach.description}
                          </p>
                        </div>
                      </div>
                      <span className="font-mono-cinema text-[9px] text-amber-300 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-500/30 whitespace-nowrap ml-2">
                        {ach.highlight}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 9. THE SUN — CONTACT */}
          {currentDestinationIndex === 9 && (
            <div>
              <span className="font-mono-cinema text-[10px] text-amber-400 uppercase tracking-widest block mb-1">
                THE SUN • DIRECT TRANSMISSION GATEWAY
              </span>
              <h2 className="font-cinema text-4xl sm:text-5xl text-white mb-2">
                DIRECT TRANSMISSION
              </h2>
              <p className="text-xs text-zinc-300 font-light mb-4">
                Have a technical inquiry, engineering internship opportunity, or project collaboration? Compose a message directly below or reach out via official handles.
              </p>

              <form onSubmit={handleSendEmail} className="space-y-3 mb-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-mono-cinema uppercase text-zinc-400 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Alex Mercer"
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 font-mono-cinema text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono-cinema uppercase text-zinc-400 mb-1">
                      Organization
                    </label>
                    <input
                      type="text"
                      value={senderOrg}
                      onChange={(e) => setSenderOrg(e.target.value)}
                      placeholder="e.g. Tech Studio / University"
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 font-mono-cinema text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono-cinema uppercase text-zinc-400 mb-1">
                    Transmission Note
                  </label>
                  <textarea
                    rows={3}
                    value={senderMessage}
                    onChange={(e) => setSenderMessage(e.target.value)}
                    placeholder="Let's build something remarkable..."
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 font-sans text-xs focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <button
                    type="submit"
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono-cinema text-xs shadow-md transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>LAUNCH EMAIL CLIENT</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono-cinema text-xs transition-all cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'COPIED' : 'COPY NOTE'}</span>
                  </button>
                </div>
              </form>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono-cinema text-zinc-400">
                <div className="flex items-center space-x-4">
                  <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 flex items-center space-x-1">
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                  <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400">
                    LinkedIn
                  </a>
                </div>
                <span className="text-[11px] text-zinc-500">{PERSONAL_INFO.socials.email}</span>
              </div>
            </div>
          )}

        </div>

        {/* Footer Next Button */}
        <div className="pt-4 border-t border-white/10 mt-6 flex items-center justify-between">
          <span className="font-mono-cinema text-[10px] text-zinc-500 uppercase">
            ENGAGE NEXT PLANET
          </span>
          <button
            onClick={onNavigateToNext}
            className="flex items-center space-x-1.5 text-xs font-mono-cinema text-cyan-400 hover:text-cyan-300 cursor-pointer"
          >
            <span>ADVANCE VOYAGE</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
