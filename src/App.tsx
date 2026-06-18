import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useUniverseStore } from '@/store';
import { BufferLoader } from '@/components/effects';
import { SuperHeader } from '@/components/layout';
import { StudiosWorld } from './worlds/studios';
import { MaxWorld } from './worlds/max';
import { InfinityWorld } from './worlds/infinity';
import { MaxAdminPanel } from './components/admin';

function MainApp() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SuperHeader />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Navigate to="/max" replace />} />
          <Route path="/studios/*" element={<StudiosWorld />} />
          <Route path="/max/*" element={<MaxWorld />} />
          <Route path="/max-admin" element={<MaxAdminPanel />} />
          <Route path="/infinity/*" element={<InfinityWorld />} />
          <Route path="*" element={<Navigate to="/max" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const theme = useUniverseStore((state) => state.theme);
  const reducedMotion = useUniverseStore((state) => state.reducedMotion);
  const hasEntered = useUniverseStore((state) => state.hasEntered);
  const enterUniverse = useUniverseStore((state) => state.enterUniverse);
  const setCurrentWorld = useUniverseStore((state) => state.setCurrentWorld);

  const pathWorld = location.pathname.split('/')[1] as 'studios' | 'max' | 'infinity' | '';

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches && !reducedMotion) {
      useUniverseStore.getState().setReducedMotion(true);
    }
    const handleChange = (e: MediaQueryListEvent) => {
      useUniverseStore.getState().setReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [reducedMotion]);

  useEffect(() => {
    if (hasEntered && (pathWorld === 'studios' || pathWorld === 'max' || pathWorld === 'infinity')) {
      setCurrentWorld(pathWorld);
    }
  }, [pathWorld, hasEntered, setCurrentWorld]);

  return (
    <>
      {/* Main site always mounted — loader overlays it via fixed positioning */}
      <MainApp />

      {/* Overlay loader — curtains reveal the site beneath on completion */}
      {!hasEntered && (
        <BufferLoader onComplete={enterUniverse} />
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
