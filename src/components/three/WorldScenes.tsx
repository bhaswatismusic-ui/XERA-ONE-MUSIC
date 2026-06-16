// ============================================
// World-Specific 3D Scenes
// Complete 3D environments for each X-ERA world
// ============================================

import { ReactNode } from 'react';
import { Scene3D } from './Scene3D';
import {
  ParticleSystem,
  FloatingGeometry,
  NeuralNetwork,
  DataStreams,
  defaultParticleConfigs,
} from './Particles';

// ============================================
// Studios World Scene (Red Cinematic)
// ============================================

interface StudiosSceneProps {
  className?: string;
  showFloatingGeometry?: boolean;
}

export function StudiosScene({ className, showFloatingGeometry = true }: StudiosSceneProps) {
  const config = defaultParticleConfigs.studios;

  return (
    <Scene3D worldId="studios" className={className}>
      {/* Particle System */}
      <ParticleSystem config={config} worldId="studios" />

      {/* Floating Geometry */}
      {showFloatingGeometry && (
        <FloatingGeometry worldId="studios" count={15} spread={12} />
      )}
    </Scene3D>
  );
}

// ============================================
// Max World Scene (Blue Digital Media)
// ============================================

interface MaxSceneProps {
  className?: string;
  showDataStreams?: boolean;
  showFloatingGeometry?: boolean;
}

export function MaxScene({
  className,
  showDataStreams = true,
  showFloatingGeometry = true,
}: MaxSceneProps) {
  const config = defaultParticleConfigs.max;

  return (
    <Scene3D worldId="max" className={className}>
      {/* Particle System */}
      <ParticleSystem config={config} worldId="max" />

      {/* Data Streams */}
      {showDataStreams && <DataStreams streamCount={10} color="#00BFFF" />}

      {/* Floating Geometry */}
      {showFloatingGeometry && (
        <FloatingGeometry worldId="max" count={20} spread={15} />
      )}
    </Scene3D>
  );
}

// ============================================
// Infinity World Scene (Green AI Research)
// ============================================

interface InfinitySceneProps {
  className?: string;
  showNeuralNetwork?: boolean;
  showFloatingGeometry?: boolean;
}

export function InfinityScene({
  className,
  showNeuralNetwork = true,
  showFloatingGeometry = true,
}: InfinitySceneProps) {
  const config = defaultParticleConfigs.infinity;

  return (
    <Scene3D worldId="infinity" className={className}>
      {/* Particle System */}
      <ParticleSystem config={config} worldId="infinity" />

      {/* Neural Network */}
      {showNeuralNetwork && (
        <NeuralNetwork nodeCount={40} connectionDensity={0.08} color="#39FF88" />
      )}

      {/* Floating Geometry */}
      {showFloatingGeometry && (
        <FloatingGeometry worldId="infinity" count={18} spread={14} />
      )}
    </Scene3D>
  );
}

// ============================================
// Dynamic World Scene Selector
// ============================================

interface WorldSceneProps {
  worldId: 'studios' | 'max' | 'infinity';
  className?: string;
  children?: ReactNode;
}

export function WorldScene({ worldId, className, children }: WorldSceneProps) {
  switch (worldId) {
    case 'studios':
      return <StudiosScene className={className} />;
    case 'max':
      return <MaxScene className={className} />;
    case 'infinity':
      return <InfinityScene className={className} />;
    default:
      return null;
  }
}

export default WorldScene;
