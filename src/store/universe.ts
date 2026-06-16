import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { WorldId, WorldConfig, UniverseStore } from '@/types';
import { worldConfigs } from '@/data';

type ViewState = 'loading' | 'gateway' | 'transitioning' | 'world';

export const useUniverseStore = create<UniverseStore & {
  viewState: ViewState;
  transitionProgress: number;
  hasEntered: boolean;
  enterUniverse: () => void;
  enterWorld: (worldId: WorldId) => void;
  exitWorld: () => void;
  setTransitionComplete: () => void;
  updateTransitionProgress: (progress: number) => void;
}>()(
  persist(
    (set, get) => ({
      // State
      currentWorld: null,
      isLoading: false,
      isTransitioning: false,
      theme: 'dark',
      reducedMotion: false,
      worldConfigs,
      viewState: 'loading',
      transitionProgress: 0,
      hasEntered: false,

      // Actions
      setCurrentWorld: (worldId: WorldId | null) => set({ currentWorld: worldId }),

      setLoading: (isLoading: boolean) => set({ isLoading }),

      setTransitioning: (isTransitioning: boolean) => set({ isTransitioning }),

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'dark' ? 'light' : 'dark',
        })),

      setReducedMotion: (reducedMotion: boolean) => set({ reducedMotion }),

      getWorldConfig: (worldId: WorldId): WorldConfig | undefined => {
        return get().worldConfigs[worldId];
      },

      // Enter the universe (after buffer loading)
      enterUniverse: () => {
        set({
          hasEntered: true,
          viewState: 'world',
          currentWorld: 'max',
        });
      },

      // New world management actions
      enterWorld: (worldId: WorldId) => {
        set({
          isTransitioning: false,
          viewState: 'world',
          transitionProgress: 1,
          currentWorld: worldId,
        });

        // Check for reduced motion preference
        const prefersReducedMotion =
          window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
          get().reducedMotion;

        if (prefersReducedMotion) {
          // Skip transition animation for reduced motion
          setTimeout(() => {
            set({
              viewState: 'world',
              isTransitioning: false,
              transitionProgress: 1,
            });
          }, 100);
        }
      },

      exitWorld: () => {
        set({
          isTransitioning: true,
          viewState: 'transitioning',
          transitionProgress: 0,
        });

        // Check for reduced motion preference
        const prefersReducedMotion =
          window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
          get().reducedMotion;

        if (prefersReducedMotion) {
          setTimeout(() => {
            set({
              currentWorld: null,
              viewState: 'gateway',
              isTransitioning: false,
              transitionProgress: 0,
            });
          }, 100);
        }
      },

      setTransitionComplete: () => {
        const { currentWorld } = get();
        const newViewState = currentWorld ? 'world' : 'gateway';
        set({
          viewState: newViewState,
          isTransitioning: false,
          transitionProgress: newViewState === 'world' ? 1 : 0,
        });
      },

      updateTransitionProgress: (progress: number) => {
        set({ transitionProgress: Math.max(0, Math.min(1, progress)) });
      },
    }),
    {
      name: 'x-era-universe',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        reducedMotion: state.reducedMotion,
      }),
    }
  )
);

// Initialize reduced motion from system preference
if (typeof window !== 'undefined') {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    useUniverseStore.getState().setReducedMotion(true);
  }
}

export default useUniverseStore;
