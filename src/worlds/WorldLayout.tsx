import { useParams, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import type { WorldId } from '@/types';
import { worldConfigs } from '@/data';
import { useUniverseStore } from '@/store';
import { WorldHero, FeaturesSection, StatsSection, CTASection } from '@/components/layout';

const validWorldIds: WorldId[] = ['studios', 'max', 'infinity'];

export function WorldPage() {
  const { worldId } = useParams<{ worldId: string }>();
  const setCurrentWorld = useUniverseStore((state) => state.setCurrentWorld);
  const setTransitioning = useUniverseStore((state) => state.setTransitioning);

  // Validate world ID
  if (!worldId || !validWorldIds.includes(worldId as WorldId)) {
    return <Navigate to="/" replace />;
  }

  const config = worldConfigs[worldId as WorldId];

  // Update store when entering world
  useEffect(() => {
    setCurrentWorld(worldId as WorldId);
    setTransitioning(false);

    return () => {
      setCurrentWorld(null);
    };
  }, [worldId, setCurrentWorld, setTransitioning]);

  // Set document metadata
  useEffect(() => {
    document.title = config.metadata.pageTitle;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', config.metadata.pageDescription);
    }
  }, [config]);

  return (
    <div className="min-h-screen">
      <WorldHero config={config} />
      <FeaturesSection config={config} />
      <StatsSection config={config} />
      <CTASection config={config} />
    </div>
  );
}

export default WorldPage;
