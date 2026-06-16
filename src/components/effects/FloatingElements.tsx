import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useUniverseStore } from '@/store';

interface FloatingElement {
  id: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  floatOffset: number;
  floatSpeed: number;
  opacity: number;
  shape: 'triangle' | 'square' | 'circle' | 'diamond' | 'hexagon';
}

interface FloatingElementsProps {
  count?: number;
  className?: string;
}

const shapes = {
  triangle: (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x + size * 0.866, y + size * 0.5);
    ctx.lineTo(x - size * 0.866, y + size * 0.5);
    ctx.closePath();
  },
  square: (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.beginPath();
    ctx.rect(x - size / 2, y - size / 2, size, size);
  },
  circle: (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
  },
  diamond: (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.beginPath();
    ctx.moveTo(x, y - size / 2);
    ctx.lineTo(x + size / 2, y);
    ctx.lineTo(x, y + size / 2);
    ctx.lineTo(x - size / 2, y);
    ctx.closePath();
  },
  hexagon: (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      const px = x + (size / 2) * Math.cos(angle);
      const py = y + (size / 2) * Math.sin(angle);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
  },
};

export function FloatingElements({ count = 20, className = '' }: FloatingElementsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elementsRef = useRef<FloatingElement[]>([]);
  const animationRef = useRef<number>();
  const reducedMotion = useUniverseStore((state) => state.reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize floating elements
    const shapeTypes: FloatingElement['shape'][] = ['triangle', 'square', 'circle', 'diamond', 'hexagon'];
    elementsRef.current = Array.from({ length: count }, (_, i) => ({
      id: `element-${i}`,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 40 + 20,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.3,
      floatOffset: Math.random() * Math.PI * 2,
      floatSpeed: Math.random() * 0.01 + 0.005,
      opacity: Math.random() * 0.08 + 0.02,
      shape: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
    }));

    let startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      elementsRef.current.forEach((element) => {
        // Update animation values
        element.rotation += element.rotationSpeed;

        // Float offset
        const floatY = Math.sin(elapsed * element.floatSpeed + element.floatOffset) * 15;
        const floatX = Math.cos(elapsed * element.floatSpeed * 0.7 + element.floatOffset) * 10;

        ctx.save();
        ctx.translate(element.x + floatX, element.y + floatY);
        ctx.rotate((element.rotation * Math.PI) / 180);

        // Draw shape
        ctx.strokeStyle = `rgba(255, 255, 255, ${element.opacity})`;
        ctx.lineWidth = 1;

        const drawShape = shapes[element.shape];
        drawShape(ctx, 0, 0, element.size);
        ctx.stroke();

        // Subtle glow effect
        ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
        ctx.shadowBlur = 10;
        ctx.stroke();

        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [count, reducedMotion]);

  if (reducedMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
}

// Individual floating element for React-based animation
interface FloatingShapeProps {
  shape: 'triangle' | 'square' | 'circle' | 'diamond';
  size?: number;
  initialX: number;
  initialY: number;
  color?: string;
  delay?: number;
}

export function FloatingShape({
  shape,
  size = 40,
  initialX,
  initialY,
  color = 'rgba(255,255,255,0.1)',
  delay = 0,
}: FloatingShapeProps) {
  const shapePaths = {
    triangle: 'M20 0 L40 35 L0 35 Z',
    square: 'M0 0 H40 V40 H0 Z',
    circle: 'M20 20 m-18 0 a18 18 0 1,0 36 0 a18 18 0 1,0 -36 0',
    diamond: 'M20 0 L40 20 L20 40 L0 20 Z',
  };

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${initialX}%`,
        top: `${initialY}%`,
      }}
      initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
      animate={{
        opacity: [0, 0.3, 0.2, 0.3, 0],
        scale: [0.5, 1, 1.1, 1, 0.5],
        rotate: [-45, 0, 45, 90, 135],
        y: [0, -50, -30, -60, -100],
        x: [0, 20, -10, 30, 0],
      }}
      transition={{
        duration: 20,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg width={size} height={size} viewBox="0 0 40 40">
        <path d={shapePaths[shape]} fill="none" stroke={color} strokeWidth="1" />
      </svg>
    </motion.div>
  );
}

export default FloatingElements;
