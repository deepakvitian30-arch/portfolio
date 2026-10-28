import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './GithubIcon';

export const HeaderNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Works', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Milestones', href: '#achievements' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#05060a]/85 backdrop-blur-xl border-b border-zinc-800/80 py-3.5 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Brand Monogram */}
          <a
            href="#"
            className="flex items-center space-x-3 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-400/40 flex items-center justify-center text-cyan-300 font-mono font-bold text-sm shadow-[0_0_15px_rgba(56,189,248,0.2)] group-hover:scale-105 transition-transform">
              D
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                {PERSONAL_INFO.name.toUpperCase()}
              </span>
              <span className="text-[10px] font-mono text-zinc-400">
                VIT Vellore • Information Technology
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 p-1 rounded-full bg-zinc-950/60 border border-zinc-800/80 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-4 py-1.5 rounded-full text-xs font-mono text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Socials & Contact Action */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-cyan-400/50 text-zinc-300 hover:text-white transition-all shadow-sm"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-cyan-400/50 text-zinc-300 hover:text-white transition-all shadow-sm"
              title="LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.95 0-1.72-.77-1.72-1.72s.77-1.72 1.72-1.72 1.73.77 1.73 1.72-.78 1.72-1.73 1.72m1.39 9.74v-8.37H5.07v8.37h2.78z" />
              </svg>
            </a>

            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)] active:scale-95 cursor-pointer"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
            className="md:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#05060a]/95 backdrop-blur-2xl p-6 pt-24 md:hidden flex flex-col justify-between animate-fade-in">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-4 py-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-base font-medium text-zinc-200 hover:text-cyan-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
            <div className="flex space-x-3">
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-blue-400"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.95 0-1.72-.77-1.72-1.72s.77-1.72 1.72-1.72 1.73.77 1.73 1.72-.78 1.72-1.73 1.72m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                </svg>
              </a>
            </div>

            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-semibold text-xs"
            >
              Contact Me
            </a>
          </div>
        </div>
      )}
    </>
  );
};
