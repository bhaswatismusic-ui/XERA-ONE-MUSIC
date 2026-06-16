// ============================================
// Shared Particle Engine
// High-performance, configurable particle system
// ============================================

import { useRef, useEffect, useMemo, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useUniverseStore } from '@/store';
import { getAdaptiveQuality, getDeviceCapabilities } from '@/utils/performance';

// ============================================
// Particle Configuration
// ============================================

export interface ParticleConfig {
  count: number;
  colors: string[];
  size: number;
  sizeVariation: number;
  speed: number;
  speedVariation: number;
  opacity: number;
  opacityVariation: number;
  spread: number;
  lifetime: number;
  blending?: THREE.Blending;
  transparent?: boolean;
  depthWrite?: boolean;
  frustumCulled?: boolean;
  enableFrustumCulling?: boolean;
  enableLod?: boolean;
}

export interface ParticleWorldConfig {
  studios: ParticleConfig;
  max: ParticleConfig;
  infinity: ParticleConfig;
}

// Default world configurations
export const defaultParticleConfigs: ParticleWorldConfig = {
  studios: {
    count: 200,
    colors: ['#FF2A2A', '#FF5C5C', '#ffffff', '#f5c518'],
    size: 0.05,
    sizeVariation: 0.03,
    speed: 0.2,
    speedVariation: 0.1,
    opacity: 0.8,
    opacityVariation: 0.3,
    spread: 15,
    lifetime: 4,
    blending: THREE.AdditiveBlending,
    enableFrustumCulling: true,
    enableLod: true,
  },
  max: {
    count: 300,
    colors: ['#00BFFF', '#59D6FF', '#ffffff', '#00ff88'],
    size: 0.04,
    sizeVariation: 0.02,
    speed: 0.3,
    speedVariation: 0.15,
    opacity: 0.7,
    opacityVariation: 0.4,
    spread: 20,
    lifetime: 3,
    blending: THREE.AdditiveBlending,
    enableFrustumCulling: true,
    enableLod: true,
  },
  infinity: {
    count: 250,
    colors: ['#39FF88', '#76FFB4', '#ffffff', '#00d4ff'],
    size: 0.04,
    sizeVariation: 0.02,
    speed: 0.25,
    speedVariation: 0.1,
    opacity: 0.75,
    opacityVariation: 0.35,
    spread: 18,
    lifetime: 3.5,
    blending: THREE.AdditiveBlending,
    enableFrustumCulling: true,
    enableLod: true,
  },
};

// ============================================
// Performance Scaling
// ============================================

export function getScaledParticleCount(baseCount: number): number {
  const caps = getDeviceCapabilities();
  const quality = getAdaptiveQuality();

  if (caps.prefersReducedMotion) return 0;

  if (!quality.enableParticles) return 0;

  const scale = quality.particleCount / 300;
  const scaled = Math.floor(baseCount * scale);

  if (caps.isMobile) return Math.min(scaled, 100);
  if (caps.isTablet) return Math.min(scaled, 200);

  return scaled;
}

// ============================================
// Particle Shader
// ============================================

const particleVertexShader = `
  attribute float size;
  attribute vec3 customColor;
  attribute float opacity;

  varying vec3 vColor;
  varying float vOpacity;

  void main() {
    vColor = customColor;
    vOpacity = opacity;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const particleFragmentShader = `
  varying vec3 vColor;
  varying float vOpacity;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    float alpha = smoothstep(0.5, 0.0, dist) * vOpacity;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

// ============================================
// Particle System Component
// ============================================

interface ParticleSystemProps {
  config: ParticleConfig;
  worldId?: 'studios' | 'max' | 'infinity';
  position?: [number, number, number];
}

export function ParticleSystem({
  config,
  worldId = 'studios',
  position = [0, 0, 0],
}: ParticleSystemProps) {
  const meshRef = useRef<THREE.Points>(null);
  const { size, viewport } = useThree();
  const reducedMotion = useUniverseStore((state) => state.reducedMotion);

  // Scale particle count based on device performance
  const scaledCount = useMemo(
    () => getScaledParticleCount(config.count),
    [config.count]
  );

  // Parse colors to THREE.Color
  const colors = useMemo(() => {
    return config.colors.map((c) => new THREE.Color(c));
  }, [config.colors]);

  // Create geometry and attributes
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(scaledCount * 3);
    const colorAttr = new Float32Array(scaledCount * 3);
    const sizes = new Float32Array(scaledCount);
    const opacities = new Float32Array(scaledCount);

    const spread = config.spread;

    for (let i = 0; i < scaledCount; i++) {
      // Random position
      positions[i * 3] = (Math.random() - 0.5) * spread * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread * 2;

      // Random color from palette
      const color = colors[Math.floor(Math.random() * colors.length)];
      colorAttr[i * 3] = color.r;
      colorAttr[i * 3 + 1] = color.g;
      colorAttr[i * 3 + 2] = color.b;

      // Random size
      sizes[i] = config.size + (Math.random() - 0.5) * config.sizeVariation * 2;

      // Random opacity
      opacities[i] = config.opacity + (Math.random() - 0.5) * config.opacityVariation * 2;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('customColor', new THREE.BufferAttribute(colorAttr, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));

    return geo;
  }, [scaledCount, colors, config]);

  // Create shader material
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      blending: config.blending || THREE.AdditiveBlending,
      transparent: config.transparent !== false,
      depthWrite: config.depthWrite !== false,
    });
  }, [config]);

  // Animation
  useFrame((state, delta) => {
    if (!meshRef.current || reducedMotion) return;

    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    const speed = config.speed;

    for (let i = 0; i < scaledCount; i++) {
      const i3 = i * 3;

      // Move particles
      positions[i3 + 1] += delta * speed * (0.5 + Math.random() * 0.5);

      // Wrap around
      if (positions[i3 + 1] > config.spread) {
        positions[i3 + 1] = -config.spread;
      }
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y += delta * 0.02;
  });

  if (reducedMotion) return null;

  return (
    <points ref={meshRef} geometry={geometry} material={material} position={position} />
  );
}

// ============================================
// Floating Geometric Shapes
// ============================================

interface GeometricShape {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  shape: 'cube' | 'octahedron' | 'tetrahedron' | 'icosahedron' | 'torus';
}

interface FloatingGeometryProps {
  worldId: 'studios' | 'max' | 'infinity';
  count?: number;
  spread?: number;
}

const worldShapeConfigs: Record<string, { colors: string[]; shapes: GeometricShape['shape'][] }> = {
  studios: {
    colors: ['#FF2A2A', '#FF5C5C', '#f5c518'],
    shapes: ['cube', 'tetrahedron', 'octahedron'],
  },
  max: {
    colors: ['#00BFFF', '#59D6FF', '#00ff88'],
    shapes: ['octahedron', 'icosahedron', 'cube'],
  },
  infinity: {
    colors: ['#39FF88', '#76FFB4', '#00d4ff'],
    shapes: ['icosahedron', 'tetrahedron', 'octahedron'],
  },
};

function ShapeMesh({ shape, args }: { shape: GeometricShape['shape']; args?: number[] }) {
  switch (shape) {
    case 'cube':
      return <boxGeometry args={args || [0.3, 0.3, 0.3]} />;
    case 'octahedron':
      return <octahedronGeometry args={args || [0.2]} />;
    case 'tetrahedron':
      return <tetrahedronGeometry args={args || [0.25]} />;
    case 'icosahedron':
      return <icosahedronGeometry args={args || [0.2]} />;
    case 'torus':
      return <torusGeometry args={args || [0.2, 0.08, 8, 16]} />;
    default:
      return <boxGeometry args={[0.3, 0.3, 0.3]} />;
  }
}

export function FloatingGeometry({ worldId, count = 20, spread = 10 }: FloatingGeometryProps) {
  const meshRef = useRef<THREE.Group>(null);
  const reducedMotion = useUniverseStore((state) => state.reducedMotion);

  const { colors, shapes } = worldShapeConfigs[worldId] || worldShapeConfigs.studios;

  const shapesData = useMemo<GeometricShape[]>(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * spread * 2,
        (Math.random() - 0.5) * spread * 2,
        (Math.random() - 0.5) * spread * 2,
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ] as [number, number, number],
      scale: 0.5 + Math.random() * 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));
  }, [count, spread, colors, shapes]);

  useFrame((state, delta) => {
    if (!meshRef.current || reducedMotion) return;

    meshRef.current.children.forEach((child, i) => {
      child.rotation.x += delta * 0.2 * (i % 2 === 0 ? 1 : -1);
      child.rotation.y += delta * 0.3 * (i % 2 === 0 ? 1 : -1);
      child.position.y += Math.sin(state.clock.elapsedTime + i) * delta * 0.2;
    });
  });

  if (reducedMotion) return null;

  return (
    <group ref={meshRef}>
      {shapesData.map((shape, i) => (
        <mesh
          key={i}
          position={shape.position}
          rotation={shape.rotation}
          scale={shape.scale}
        >
          <ShapeMesh shape={shape.shape} />
          <meshStandardMaterial
            color={shape.color}
            transparent
            opacity={0.3}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

// ============================================
// Neural Network Visualization (Infinity)
// ============================================

interface NeuralNetworkProps {
  nodeCount?: number;
  connectionDensity?: number;
  color?: string;
}

export function NeuralNetwork({
  nodeCount = 50,
  connectionDensity = 0.1,
  color = '#39FF88',
}: NeuralNetworkProps) {
  const groupRef = useRef<THREE.Group>(null);
  const lineRef = useRef<THREE.LineSegments>(null);
  const reducedMotion = useUniverseStore((state) => state.reducedMotion);

  // Create nodes
  const nodes = useMemo(() => {
    return Array.from({ length: nodeCount }, () => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
      ] as [number, number, number],
    }));
  }, [nodeCount]);

  // Create connections
  const connections = useMemo(() => {
    const linePositions: number[] = [];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() < connectionDensity) {
          linePositions.push(...nodes[i].position, ...nodes[j].position);
        }
      }
    }

    return new Float32Array(linePositions);
  }, [nodes, connectionDensity]);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(connections, 3));
    return geo;
  }, [connections]);

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;

    groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });

  if (reducedMotion) return null;

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* Connections */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color={color} transparent opacity={0.2} />
      </lineSegments>
    </group>
  );
}

// ============================================
// Data Stream Visualization (Max)
// ============================================

interface DataStreamProps {
  streamCount?: number;
  color?: string;
}

export function DataStreams({ streamCount = 8, color = '#00BFFF' }: DataStreamProps) {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = useUniverseStore((state) => state.reducedMotion);

  const streams = useMemo(() => {
    return Array.from({ length: streamCount }, (_, i) => ({
      x: (i / streamCount - 0.5) * 20,
      points: Array.from({ length: 50 }, (_, j) => [
        (i / streamCount - 0.5) * 20,
        (j / 50 - 0.5) * 20,
        (Math.random() - 0.5) * 2,
      ] as [number, number, number]),
      speed: 0.5 + Math.random() * 0.5,
    }));
  }, [streamCount]);

  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) return;
    // Animate streams
  });

  if (reducedMotion) return null;

  return (
    <group ref={groupRef}>
      {streams.map((stream, i) => (
        <group key={i} position={[stream.x, 0, 0]}>
          {stream.points.map((point, j) => (
            <mesh key={j} position={point}>
              <sphereGeometry args={[0.03, 4, 4]} />
              <meshStandardMaterial
                color={color}
                transparent
                opacity={0.5 + Math.sin(j * 0.2) * 0.3}
                emissive={color}
                emissiveIntensity={0.3}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

export default ParticleSystem;
