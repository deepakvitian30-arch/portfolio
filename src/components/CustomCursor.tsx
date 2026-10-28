import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState('SCROLL');
  const [isHovered, setIsHovered] = useState(false);

  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  // Position references for smooth lerping
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrame = useRef<number | null>(null);

  useEffect(() => {
    // Check if device supports fine hover
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, textarea, [data-cursor]');
        if (interactive) {
          setIsHovered(true);
          const customText = interactive.getAttribute('data-cursor');
          setLabel(customText || 'VIEW');
        } else {
          setIsHovered(false);
          setLabel('SCROLL');
        }
      }
    };

    const loop = () => {
      // Smooth lerp for ring follower
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animFrame.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove);
    animFrame.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Outer Cursor Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 transition-[width,height,background-color] duration-300 flex items-center justify-center mix-blend-difference ${
          isHovered
            ? 'w-20 h-20 bg-white text-black font-bold'
            : 'w-14 h-14 bg-transparent text-white'
        }`}
        style={{ willChange: 'transform' }}
      >
        <span className="font-mono-cinema text-[8px] uppercase tracking-[0.2em] select-none">
          {label}
        </span>
      </div>

      {/* Center Micro Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[101] -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
    </>
  );
};
