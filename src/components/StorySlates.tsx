import React, { useState } from 'react';
import { PERSONAL_INFO, PROJECTS_DATA, SKILLS_DATA, ACHIEVEMENTS_DATA } from '../data/portfolioData';
import { 
  ExternalLink, 
  ChevronRight, 
  Maximize2, 
  Send, 
  Copy, 
  Check, 
  Trophy, 
  CheckCircle2,
  GraduationCap,
  Code2,
  MapPin,
  Sparkles,
  Orbit
} from 'lucide-react';
import { GithubIcon } from './GithubIcon';

interface StorySlatesProps {
  onOpenImageModal: (src: string, title: string) => void;
  onNavigateToStage: (index: number) => void;
}

export const StorySlates: React.FC<StorySlatesProps> = ({ onOpenImageModal, onNavigateToStage }) => {
  // Contact composer state
  const [senderName, setSenderName] = useState('');
  const [senderOrg, setSenderOrg] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [copied, setCopied] = useState(false);

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

  const doseSense = PROJECTS_DATA[0];
  const vitidy = PROJECTS_DATA[1];
  const ennaval = PROJECTS_DATA[2];
  const parking = PROJECTS_DATA[3];

  const PLANET_SYSTEM = [
    { index: 1, name: 'OBSIDIAN', label: 'About Me', color: '#38bdf8' },
    { index: 2, name: 'MEDORA', label: 'DoseSense', color: '#22d3ee' },
    { index: 3, name: 'VITANIA', label: 'VITidy', color: '#10b981' },
    { index: 4, name: 'ENNAVAL', label: 'Boutique', color: '#ec4899' },
    { index: 5, name: 'TRANSIT-09', label: 'Parking', color: '#f59e0b' },
    { index: 6, name: 'TECHNORA', label: 'Skills', color: '#38bdf8' },
    { index: 7, name: 'ACHIEVEMENTS', label: 'Honors', color: '#fbbf24' },
    { index: 8, name: 'CONTACT', label: 'Transmission', color: '#22d3ee' }
  ];

  return (
    <div className="relative z-10 w-full select-none">

      {/* STAGE 01: PROLOGUE / HERO (THE SOLAR SYSTEM OVERVIEW) */}
      <section className="min-h-screen flex items-center justify-start px-6 md:px-14 lg:px-20 py-28">
        <div className="max-w-2xl p-8 sm:p-10 rounded-3xl bg-black/70 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 font-mono-cinema text-[11px] mb-5">
            <Orbit className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} />
            <span>SOLAR SYSTEM PROLOGUE</span>
            <span className="text-zinc-600">/</span>
            <span>8 3D PLANETARY WORLDS</span>
          </div>

          <h1 className="font-cinema text-5xl sm:text-7xl md:text-8xl text-white leading-[0.92] mb-5 tracking-wide">
            BUILDING IDEAS INTO{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              DIGITAL EXPERIENCES.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed mb-6">
            {PERSONAL_INFO.supportingText}
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-8">
            <button
              onClick={() => onNavigateToStage(2)}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono-cinema text-xs transition-all shadow-[0_0_25px_rgba(56,189,248,0.35)] cursor-pointer active:scale-95"
            >
              <span>EXPLORE MEDORA (DOSESENSE)</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateToStage(1)}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono-cinema text-xs transition-all cursor-pointer backdrop-blur-md"
            >
              <span>ABOUT OBSIDIAN</span>
            </button>
          </div>

          {/* Interactive Planet Quick-Selector */}
          <div className="pt-5 border-t border-white/10">
            <span className="font-mono-cinema text-[10px] text-zinc-400 uppercase tracking-widest block mb-2.5">
              3D PLANETARY DESTINATIONS (CLICK TO FLY):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PLANET_SYSTEM.map((p) => (
                <button
                  key={p.index}
                  onClick={() => onNavigateToStage(p.index)}
                  className="px-2.5 py-1.5 rounded-lg bg-zinc-950/70 hover:bg-cyan-950/40 border border-zinc-800 hover:border-cyan-400/50 text-left transition-all cursor-pointer group"
                >
                  <div className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
                    <span className="font-cinema text-xs text-white group-hover:text-cyan-300">
                      {p.name}
                    </span>
                  </div>
                  <span className="font-mono-cinema text-[9px] text-zinc-500 block">
                    {p.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* STAGE 02: PLANET OBSIDIAN (ABOUT ME) */}
      {/* Planet on Left (x = -8.5) -> Slate on Right */}
      <section className="min-h-screen flex items-center justify-end px-6 md:px-14 lg:px-20 py-28 border-t border-zinc-900/80">
        <div className="max-w-2xl w-full p-8 sm:p-10 rounded-3xl bg-black/75 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 font-mono-cinema text-[11px] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PLANET OBSIDIAN</span>
            <span className="text-zinc-600">/</span>
            <span>INT. VIT VELLORE — ACADEMIC LAB</span>
          </div>

          <h2 className="font-cinema text-4xl sm:text-6xl text-white mb-4">
            THE CORE: ABOUT DEEPAK
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed mb-4">
            I am a first-year Information Technology student at <strong className="text-white font-medium">VIT Vellore (Class of 2030)</strong>, deeply focused on full-stack web engineering, scalable backends, and intelligent software systems.
          </p>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
            My approach is pragmatic: rather than copying tutorials, I develop practical software that solves genuine friction—from non-invasive clinical adherence detection for HackGrid to database-authenticated campus complaint routing for thousands of students.
          </p>

          {/* Quick Pillar Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
            <div className="p-3.5 rounded-xl bg-zinc-950/85 border border-zinc-800/90 backdrop-blur-md">
              <div className="flex items-center space-x-2 text-cyan-400 mb-1">
                <GraduationCap className="w-4 h-4" />
                <span className="font-mono-cinema text-[9px] uppercase">Campus</span>
              </div>
              <p className="font-bold text-white text-xs">VIT Vellore</p>
              <p className="text-[10px] text-zinc-400 font-mono">B.Tech IT • 2030</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/85 border border-zinc-800/90 backdrop-blur-md">
              <div className="flex items-center space-x-2 text-cyan-400 mb-1">
                <Code2 className="w-4 h-4" />
                <span className="font-mono-cinema text-[9px] uppercase">Engineering</span>
              </div>
              <p className="font-bold text-white text-xs">Full-Stack</p>
              <p className="text-[10px] text-zinc-400 font-mono">FastAPI • React • SQL</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/85 border border-zinc-800/90 backdrop-blur-md">
              <div className="flex items-center space-x-2 text-cyan-400 mb-1">
                <MapPin className="w-4 h-4" />
                <span className="font-mono-cinema text-[9px] uppercase">Location</span>
              </div>
              <p className="font-bold text-white text-xs">Tamil Nadu, India</p>
              <p className="text-[10px] text-zinc-400 font-mono">Open to Internships</p>
            </div>
          </div>

          <button
            onClick={() => onNavigateToStage(2)}
            className="flex items-center space-x-2 text-xs font-mono-cinema text-cyan-400 hover:text-cyan-300 cursor-pointer"
          >
            <span>NEXT PLANET: MEDORA (DOSESENSE)</span>
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>
      </section>

      {/* STAGE 03: PLANET MEDORA (DOSESENSE) */}
      {/* Planet on Right (x = 8.5) -> Slate on Left */}
      <section className="min-h-screen flex items-center justify-start px-6 md:px-14 lg:px-20 py-28 border-t border-zinc-900/80">
        <div className="max-w-2xl w-full p-8 sm:p-10 rounded-3xl bg-black/75 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 font-mono-cinema text-[11px] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PLANET MEDORA</span>
            <span className="text-zinc-600">/</span>
            <span>INT. CLINICAL INTELLIGENCE LAB</span>
          </div>

          <div className="flex items-center space-x-3 mb-2">
            <h2 className="font-cinema text-4xl sm:text-6xl text-white">
              {doseSense.title}
            </h2>
            <span className="px-3 py-0.5 rounded-full text-[10px] font-mono-cinema bg-emerald-950/60 border border-emerald-400/40 text-emerald-300">
              {doseSense.status}
            </span>
          </div>

          <p className="font-mono-cinema text-xs text-cyan-400 mb-3">
            {doseSense.tagline}
          </p>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-5">
            {doseSense.overview}
          </p>

          {/* Real HackGrid Charts Box */}
          {doseSense.images && (
            <div className="p-3.5 rounded-2xl bg-zinc-950/90 border border-zinc-800/90 backdrop-blur-xl mb-5">
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

          {/* Tech Stack & Action Links */}
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
      </section>

      {/* STAGE 04: PLANET VITANIA (VITIDY) */}
      {/* Planet on Left (x = -8.5) -> Slate on Right */}
      <section className="min-h-screen flex items-center justify-end px-6 md:px-14 lg:px-20 py-28 border-t border-zinc-900/80">
        <div className="max-w-2xl w-full p-8 sm:p-10 rounded-3xl bg-black/75 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-emerald-950/60 border border-emerald-400/40 text-emerald-300 font-mono-cinema text-[11px] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PLANET VITANIA</span>
            <span className="text-zinc-600">/</span>
            <span>INT. CAMPUS OPERATIONS HUB</span>
          </div>

          <div className="flex items-center space-x-3 mb-2">
            <h2 className="font-cinema text-4xl sm:text-6xl text-white">
              {vitidy.title}
            </h2>
            <span className="px-3 py-0.5 rounded-full text-[10px] font-mono-cinema bg-emerald-950/60 border border-emerald-400/40 text-emerald-300">
              {vitidy.status}
            </span>
          </div>

          <p className="font-mono-cinema text-xs text-emerald-400 mb-3">
            {vitidy.tagline}
          </p>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-5">
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
      </section>

      {/* STAGE 05: PLANET ENNAVAL (BOUTIQUE) */}
      {/* Planet on Right (x = 8.5) -> Slate on Left */}
      <section className="min-h-screen flex items-center justify-start px-6 md:px-14 lg:px-20 py-28 border-t border-zinc-900/80">
        <div className="max-w-2xl w-full p-8 sm:p-10 rounded-3xl bg-black/75 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-purple-950/60 border border-purple-400/40 text-purple-300 font-mono-cinema text-[11px] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PLANET ENNAVAL</span>
            <span className="text-zinc-600">/</span>
            <span>INT. HAUTE COUTURE ATELIER</span>
          </div>

          <div className="flex items-center space-x-3 mb-2">
            <h2 className="font-cinema text-4xl sm:text-6xl text-white">
              {ennaval.title}
            </h2>
            <span className="px-3 py-0.5 rounded-full text-[10px] font-mono-cinema bg-purple-950/60 border border-purple-400/40 text-purple-300">
              {ennaval.status}
            </span>
          </div>

          <p className="font-mono-cinema text-xs text-purple-400 mb-3">
            {ennaval.tagline}
          </p>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-5">
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

          <a
            href={ennaval.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono-cinema text-xs transition-all"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>VIEW REPOSITORY</span>
          </a>

        </div>
      </section>

      {/* STAGE 06: PLANET TRANSIT-09 (PARKING MANAGEMENT) */}
      {/* Planet on Left (x = -8.5) -> Slate on Right */}
      <section className="min-h-screen flex items-center justify-end px-6 md:px-14 lg:px-20 py-28 border-t border-zinc-900/80">
        <div className="max-w-2xl w-full p-8 sm:p-10 rounded-3xl bg-black/75 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-950/60 border border-amber-400/40 text-amber-300 font-mono-cinema text-[11px] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PLANET TRANSIT-09</span>
            <span className="text-zinc-600">/</span>
            <span>EXT. LOGISTICS TERMINAL</span>
          </div>

          <div className="flex items-center space-x-3 mb-2">
            <h2 className="font-cinema text-4xl sm:text-6xl text-white">
              {parking.title}
            </h2>
            <span className="px-3 py-0.5 rounded-full text-[10px] font-mono-cinema bg-amber-950/60 border border-amber-400/40 text-amber-300">
              {parking.status}
            </span>
          </div>

          <p className="font-mono-cinema text-xs text-amber-400 mb-3">
            {parking.tagline}
          </p>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-5">
            {parking.overview}
          </p>

          {/* Prototype Tariff Note */}
          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 mb-5">
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
      </section>

      {/* STAGE 07: PLANET TECHNORA (SKILLS MATRIX) */}
      {/* Planet on Right (x = 8.5) -> Slate on Left */}
      <section className="min-h-screen flex items-center justify-start px-6 md:px-14 lg:px-20 py-28 border-t border-zinc-900/80">
        <div className="max-w-2xl w-full p-8 sm:p-10 rounded-3xl bg-black/75 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 font-mono-cinema text-[11px] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PLANET TECHNORA</span>
            <span className="text-zinc-600">/</span>
            <span>INT. CODEBASE & STACK MATRIX</span>
          </div>

          <h2 className="font-cinema text-4xl sm:text-6xl text-white mb-5">
            TECHNICAL ARSENAL
          </h2>

          <div className="space-y-4">
            {SKILLS_DATA.map((grp) => (
              <div key={grp.tier} className="space-y-2">
                <span className="font-mono-cinema text-[11px] uppercase text-zinc-400 font-bold block">
                  {grp.tier} LEVEL
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {grp.skills.map((s) => (
                    <div key={s.name} className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md">
                      <p className="font-bold text-white text-xs">{s.name}</p>
                      <p className="text-[10px] text-cyan-400 font-mono mt-0.5">{s.focus}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* STAGE 08: PLANET ACHIEVEMENTS (HONORS & MILESTONES) */}
      {/* Planet on Left (x = -8.5) -> Slate on Right */}
      <section className="min-h-screen flex items-center justify-end px-6 md:px-14 lg:px-20 py-28 border-t border-zinc-900/80">
        <div className="max-w-2xl w-full p-8 sm:p-10 rounded-3xl bg-black/75 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-amber-950/60 border border-amber-400/40 text-amber-300 font-mono-cinema text-[11px] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PLANET ACHIEVEMENTS</span>
            <span className="text-zinc-600">/</span>
            <span>INT. ARCHIVE OF HONORS</span>
          </div>

          <h2 className="font-cinema text-4xl sm:text-6xl text-white mb-5">
            HONORS & MILESTONES
          </h2>

          <div className="space-y-2.5">
            {ACHIEVEMENTS_DATA.map((ach) => (
              <div
                key={ach.id}
                className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-400/50 backdrop-blur-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Trophy className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                    <div>
                      <h3 className="font-bold text-white text-xs sm:text-sm">{ach.title}</h3>
                      <p className="font-mono-cinema text-[10px] text-amber-400/90 mt-0.5">
                        {ach.category}
                      </p>
                      <p className="text-xs text-zinc-400 font-light mt-1">
                        {ach.description}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono-cinema text-[10px] text-amber-300/80 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30 whitespace-nowrap ml-2">
                    {ach.highlight}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* STAGE 09: PLANET CONTACT (TRANSMISSION GATEWAY) */}
      {/* Centered with Planet CONTACT in background */}
      <section className="min-h-screen flex items-center justify-center px-6 md:px-14 lg:px-20 py-28 border-t border-zinc-900/80">
        <div className="max-w-2xl w-full p-8 sm:p-10 rounded-3xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 font-mono-cinema text-[11px] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PLANET CONTACT</span>
            <span className="text-zinc-600">/</span>
            <span>INT. COMM GATEWAY — NIGHT</span>
          </div>

          <h2 className="font-cinema text-4xl sm:text-6xl text-white mb-2">
            DIRECT TRANSMISSION
          </h2>

          <p className="text-xs sm:text-sm text-zinc-300 font-light mb-6">
            Have a technical inquiry, engineering internship opportunity, or project collaboration? Compose a message directly below or reach out via official handles.
          </p>

          <form onSubmit={handleSendEmail} className="space-y-3.5 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-mono-cinema uppercase text-zinc-400 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Alex Mercer"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 font-mono-cinema text-xs focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono-cinema uppercase text-zinc-400 mb-1">
                  Organization / Team
                </label>
                <input
                  type="text"
                  value={senderOrg}
                  onChange={(e) => setSenderOrg(e.target.value)}
                  placeholder="e.g. Tech Studio / University"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 font-mono-cinema text-xs focus:outline-none focus:border-cyan-400 transition-colors"
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
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 font-sans text-xs focus:outline-none focus:border-cyan-400 transition-colors resize-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono-cinema text-xs transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] cursor-pointer active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>SEND VIA DEFAULT EMAIL CLIENT</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono-cinema text-xs transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'NOTE COPIED' : 'COPY NOTE'}</span>
              </button>
            </div>
          </form>

          {/* Direct channels */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-cinema text-zinc-400">
            <div className="flex items-center space-x-4">
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors flex items-center space-x-1"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors"
              >
                LinkedIn
              </a>
            </div>

            <span className="text-[11px] text-zinc-500">
              deepakvitian30@gmail.com
            </span>
          </div>

        </div>
      </section>

    </div>
  );
};
