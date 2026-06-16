// ============================================
// 3D Scene Wrapper
// React Three Fiber Canvas wrapper with world-specific configs
// ============================================

import { Suspense, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import { useUniverseStore } from '@/store';

// ============================================
// Scene Configuration
// ============================================

export interface Scene3DConfig {
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  enableControls?: boolean;
  enableZoom?: boolean;
  enablePan?: boolean;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  background?: 'transparent' | 'dark' | 'gradient';
  ambientIntensity?: number;
  stars?: boolean;
  starsCount?: number;
  environment?: 'night' | 'city' | 'sunset' | 'dawn' | null;
  dpr?: number | [number, number];
  gl?: Partial<WebGLContextAttributes>;
}

export const defaultSceneConfigs: Record<string, Scene3DConfig> = {
  studios: {
    cameraPosition: [0, 0, 10],
    cameraFov: 60,
    enableControls: false,
    background: 'transparent',
    ambientIntensity: 0.5,
    stars: true,
    starsCount: 1000,
    dpr: [1, 2],
  },
  max: {
    cameraPosition: [0, 0, 12],
    cameraFov: 55,
    enableControls: false,
    background: 'transparent',
    ambientIntensity: 0.6,
    stars: true,
    starsCount: 1500,
    dpr: [1, 2],
  },
  infinity: {
    cameraPosition: [0, 0, 10],
    cameraFov: 60,
    enableControls: false,
    background: 'transparent',
    ambientIntensity: 0.5,
    stars: true,
    starsCount: 1200,
    dpr: [1, 2],
  },
};

// ============================================
// Scene3D Component
// ============================================

interface Scene3DProps {
  children?: ReactNode;
  config?: Scene3DConfig;
  worldId?: 'studios' | 'max' | 'infinity';
  className?: string;
  style?: React.CSSProperties;
}

export function Scene3D({
  children,
  config,
  worldId = 'studios',
  className = '',
  style,
}: Scene3DProps) {
  const reducedMotion = useUniverseStore((state) => state.reducedMotion);
  const sceneConfig = { ...defaultSceneConfigs[worldId], ...config };

  const dpr = Array.isArray(sceneConfig.dpr)
    ? sceneConfig.dpr
    : sceneConfig.dpr ?? 1.5;

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        pointerEvents: 'none',
        ...style,
      }}
    >
      <Canvas
        dpr={dpr}
        gl={{
          antialias: true,
          alpha: true,
          premultipliedAlpha: false,
          ...sceneConfig.gl,
        }}
        style={{ pointerEvents: sceneConfig.enableControls ? 'auto' : 'none' }}
      >
        <Suspense fallback={null}>
          {/* Camera */}
          <PerspectiveCamera
            makeDefault
            position={sceneConfig.cameraPosition}
            fov={sceneConfig.cameraFov}
          />

          {/* Ambient Lighting */}
          <ambientLight intensity={sceneConfig.ambientIntensity} />

          {/* Point Lights */}
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />

          {/* Stars Background */}
          {sceneConfig.stars && !reducedMotion && (
            <Stars
              radius={100}
              depth={50}
              count={sceneConfig.starsCount || 1000}
              factor={4}
              saturation={0}
              fade
              speed={reducedMotion ? 0 : 0.5}
            />
          )}

          {/* Environment */}
          {sceneConfig.environment && (
            <Environment preset={sceneConfig.environment} />
          )}

          {/* Controls */}
          {sceneConfig.enableControls && (
            <OrbitControls
              enableZoom={sceneConfig.enableZoom !== false}
              enablePan={sceneConfig.enablePan !== false}
              autoRotate={sceneConfig.autoRotate && !reducedMotion}
              autoRotateSpeed={sceneConfig.autoRotateSpeed ?? 1}
            />
          )}

          {/* Content */}
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}

// ============================================
// World-Specific Scene Exports
// ============================================

export function StudiosScene3D({ children, ...props }: Omit<Scene3DProps, 'worldId'>) {
  return (
    <Scene3D worldId="studios" {...props}>
      {children}
    </Scene3D>
  );
}

export function MaxScene3D({ children, ...props }: Omit<Scene3DProps, 'worldId'>) {
  return (
    <Scene3D worldId="max" {...props}>
      {children}
    </Scene3D>
  );
}

export function InfinityScene3D({ children, ...props }: Omit<Scene3DProps, 'worldId'>) {
  return (
    <Scene3D worldId="infinity" {...props}>
      {children}
    </Scene3D>
  );
}

export default Scene3D;
