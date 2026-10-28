import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, imageSrc, title }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full bg-zinc-950 border border-cyan-500/40 rounded-3xl p-4 md:p-6 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
          <h3 className="text-sm md:text-base font-bold text-white tracking-wide">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close inspection window"
            className="p-1.5 rounded-full bg-zinc-900 border border-zinc-700 hover:border-cyan-400 text-zinc-300 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="rounded-2xl overflow-hidden bg-black flex items-center justify-center p-2">
          <img
            src={imageSrc}
            alt={title}
            className="max-h-[70vh] w-auto object-contain rounded-xl"
          />
        </div>

        <p className="text-[11px] font-mono text-zinc-400 text-center mt-3">
          Press [ESC] or click outside to dismiss
        </p>
      </div>
    </div>
  );
};
