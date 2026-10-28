import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { 
  Send, 
  ExternalLink, 
  Copy, 
  Check, 
  ArrowUp, 
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { GithubIcon } from './GithubIcon';

export const ContactSection: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderOrg, setSenderOrg] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const formattedNote = `Hello Deepak,\n\nName: ${senderName || '[Your Name]'}\nOrganization: ${senderOrg || '[Organization / Team]'}\n\nMessage:\n${senderMessage || 'I would like to connect regarding software engineering opportunities.'}`;

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto select-none border-t border-zinc-900">
      
      {/* Section Header */}
      <div className="mb-14">
        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>05 / INITIATE CONTACT</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Let's Build Something Exceptional
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-3 max-w-xl">
          Open for software engineering internships, open-source development, and hackathons.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
        
        {/* Left Column: Direct Links & Profile Cards */}
        <div className="lg:col-span-5 space-y-4">
          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-3xl bg-zinc-950/80 hover:bg-zinc-900/90 border border-zinc-800/90 hover:border-cyan-400/50 backdrop-blur-xl transition-all flex items-center justify-between group shadow-sm"
          >
            <div className="flex items-center space-x-3.5">
              <div className="p-3 rounded-2xl bg-black border border-zinc-800 group-hover:border-cyan-400/40 text-white">
                <GithubIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">GitHub Profile</p>
                <p className="text-xs font-mono text-zinc-400">@deepakvitian30-arch</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
          </a>

          <a
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-3xl bg-zinc-950/80 hover:bg-zinc-900/90 border border-zinc-800/90 hover:border-blue-400/50 backdrop-blur-xl transition-all flex items-center justify-between group shadow-sm"
          >
            <div className="flex items-center space-x-3.5">
              <div className="p-3 rounded-2xl bg-blue-950/40 border border-blue-500/30 group-hover:border-blue-400/40 text-blue-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.95 0-1.72-.77-1.72-1.72s.77-1.72 1.72-1.72 1.73.77 1.73 1.72-.78 1.72-1.73 1.72m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">LinkedIn Profile</p>
                <p className="text-xs font-mono text-zinc-400">Deepak Subramaniam</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 transition-colors" />
          </a>

          <div className="p-6 rounded-3xl bg-zinc-950/60 border border-zinc-800 text-xs text-zinc-400 space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs">
              <Sparkles className="w-4 h-4" />
              <span>Direct Transmission Inbox:</span>
            </div>
            <p className="text-white font-mono text-sm">{PERSONAL_INFO.socials.email}</p>
            <p className="text-[11px] text-zinc-500 font-mono">
              Vellore Institute of Technology • Response turnaround &lt; 24h
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Message Composer */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-zinc-950/85 border border-zinc-800 backdrop-blur-xl">
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-4">
            <MessageSquare className="w-4 h-4" />
            <span>DIRECT INQUIRY COMPOSER</span>
          </div>

          <form onSubmit={handleSendEmail} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-1.5">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Maya Chen"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-1.5">Organization / Team</label>
                <input
                  type="text"
                  placeholder="e.g. Engineering Lead @ Startup"
                  value={senderOrg}
                  onChange={(e) => setSenderOrg(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-200 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-zinc-400 block mb-1.5">Message / Role Opportunity</label>
              <textarea
                rows={4}
                placeholder="Share project details, internship invitations, or collaboration ideas..."
                value={senderMessage}
                onChange={(e) => setSenderMessage(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-xs text-zinc-200 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] cursor-pointer active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send via Email Client</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-medium transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Note!' : 'Copy Formatted Note'}</span>
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* Modern Footer Strip */}
      <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-mono gap-4">
        <p>© 2026 Deepak Subramaniam. Crafted with React, Three.js & Tailwind CSS.</p>

        <button
          onClick={scrollToTop}
          className="flex items-center space-x-1.5 text-zinc-400 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

    </footer>
  );
};
