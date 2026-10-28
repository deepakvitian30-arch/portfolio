import { useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';
import { SpaceTravelEngine, DESTINATIONS_LIST } from './three/SpaceTravelScene';
import type { DestinationData } from './three/SpaceTravelScene';
import { FlightDeckHUD } from './components/FlightDeckHUD';
import { SpaceNavigationDock } from './components/SpaceNavigationDock';
import { PlanetDossierPanel } from './components/PlanetDossierPanel';
import { SystemOverviewCard } from './components/SystemOverviewCard';
import { Modal } from './components/Modal';
import { CustomCursor } from './components/CustomCursor';

export function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<SpaceTravelEngine | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);
  const scrollProgressRef = useRef(0);
  const [isTraveling, setIsTraveling] = useState(false);
  const [dossierVisible, setDossierVisible] = useState(true);
  const [isCinematicTour, setIsCinematicTour] = useState(false);
  const destinations: DestinationData[] = DESTINATIONS_LIST;

  // Modal inspection lightbox
  const [modalData, setModalData] = useState<{ isOpen: boolean; src: string; title: string }>({
    isOpen: false,
    src: '',
    title: ''
  });

  // Total number of destinations (1 to 9)
  const TOTAL_DESTINATIONS = 9;

  // Jump / Fly Spacecraft to Destination via Smooth Scroll
  const handleSelectDestination = useCallback((index: number) => {
    setCurrentDestinationIndex(index);
    setDossierVisible(true);
    setIsTraveling(true);

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) {
      if (engineRef.current) {
        engineRef.current.setScrollProgress(index / TOTAL_DESTINATIONS);
      }
      setIsTraveling(false);
      return;
    }

    const targetScroll = (index / TOTAL_DESTINATIONS) * maxScroll;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetScroll, {
        duration: 1.8,
        onComplete: () => setIsTraveling(false)
      });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      setTimeout(() => setIsTraveling(false), 1200);
    }
  }, []);

  // 1. Initialize Lenis Smooth Scroll Engine
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.6
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const progress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
      scrollProgressRef.current = progress;

      if (engineRef.current) {
        engineRef.current.setScrollProgress(progress);
      }

      // 10 waypoints: 0 = Overview, 1 to 9 = Destinations
      const activeIdx = Math.min(TOTAL_DESTINATIONS, Math.round(progress * TOTAL_DESTINATIONS));
      setCurrentDestinationIndex(activeIdx);
    };

    lenis.on('scroll', onScroll);

    // Support ?dest=X deep linking
    const params = new URLSearchParams(window.location.search);
    const destParam = params.get('dest');
    if (destParam) {
      const target = parseInt(destParam, 10);
      if (target >= 1 && target <= TOTAL_DESTINATIONS) {
        setTimeout(() => handleSelectDestination(target), 400);
      }
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [handleSelectDestination]);

  // 2. Initialize 3D Space Travel Engine
  useEffect(() => {
    if (canvasRef.current) {
      try {
        const engine = new SpaceTravelEngine(
          canvasRef.current,
          (selectedIndex) => {
            handleSelectDestination(selectedIndex);
          }
        );
        engineRef.current = engine;
      } catch (err) {
        console.warn('Three.js Space Travel initialization:', err);
      }
    }

    return () => {
      if (engineRef.current) {
        engineRef.current.destroy();
        engineRef.current = null;
      }
    };
  }, [handleSelectDestination]);

  const handleSkipTravel = () => {
    setIsTraveling(false);
  };

  const handleToggleCinematicTour = () => {
    setIsCinematicTour((prev) => !prev);
  };

  // Cinematic Auto-Tour timer: cruises to every planet + abyssal ocean sequentially
  useEffect(() => {
    if (!isCinematicTour) return;

    // If we've reached the last destination (Contact/Ocean), stop the tour
    if (currentDestinationIndex >= TOTAL_DESTINATIONS) {
      setIsCinematicTour(false);
      return;
    }

    const timer = setTimeout(() => {
      const nextIndex = currentDestinationIndex + 1;
      handleSelectDestination(nextIndex);
    }, 8500);

    return () => clearTimeout(timer);
  }, [isCinematicTour, currentDestinationIndex, handleSelectDestination]);

  const handleOpenImageModal = (src: string, title: string) => {
    setModalData({ isOpen: true, src, title });
  };

  const handleNextDestination = () => {
    const next = currentDestinationIndex >= TOTAL_DESTINATIONS ? 1 : currentDestinationIndex + 1;
    handleSelectDestination(next);
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-zinc-100 overflow-x-hidden font-sans select-none selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Custom Exploration Cursor */}
      <CustomCursor />

      {/* Full-Screen Pure Black 3D Space Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 w-full h-full z-0 pointer-events-auto"
      />

      {/* Real Scroll Track: 900vh provides smooth scroll navigation through all 9 destinations */}
      <div
        className="scroll-track pointer-events-none relative z-[-1] opacity-0"
        style={{ height: '900vh' }}
        aria-hidden="true"
      />

      {/* Top Flight Deck Telemetry & Commander Strip */}
      <FlightDeckHUD
        currentDestinationIndex={currentDestinationIndex}
        destinations={destinations}
        isTraveling={isTraveling}
        isCinematicTour={isCinematicTour}
        onToggleCinematicTour={handleToggleCinematicTour}
        onSelectDestination={handleSelectDestination}
      />

      {/* Welcome & Solar System Overview Card (when at destination 0) */}
      {currentDestinationIndex === 0 && (
        <SystemOverviewCard
          destinations={destinations}
          onSelectDestination={handleSelectDestination}
          onStartTour={() => {
            setIsCinematicTour(true);
            handleSelectDestination(1);
          }}
        />
      )}

      {/* Destination Portfolio Dossier (when in orbit at destination 1 to 8) */}
      <PlanetDossierPanel
        currentDestinationIndex={currentDestinationIndex}
        isOpen={dossierVisible && currentDestinationIndex > 0}
        onClose={() => setDossierVisible(false)}
        onOpenImageModal={handleOpenImageModal}
        onNavigateToNext={handleNextDestination}
      />

      {/* Bottom Spacecraft Planetary Navigation Dock */}
      <SpaceNavigationDock
        currentDestinationIndex={currentDestinationIndex}
        destinations={destinations}
        isTraveling={isTraveling}
        dossierVisible={dossierVisible}
        onToggleDossier={() => setDossierVisible(!dossierVisible)}
        onSelectDestination={handleSelectDestination}
        onSkipTravel={handleSkipTravel}
      />

      {/* Image Inspection Lightbox Modal */}
      <Modal
        isOpen={modalData.isOpen}
        onClose={() => setModalData({ isOpen: false, src: '', title: '' })}
        imageSrc={modalData.src}
        title={modalData.title}
      />

    </div>
  );
}

export default App;
