import { useEffect, useRef, useCallback } from 'react';
import { useUniverseStore } from '@/store';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

interface ParticleFieldProps {
  particleCount?: number;
  colors?: string[];
  speed?: number;
  className?: string;
}

export function ParticleField({
  particleCount = 80,
  colors = ['#ffffff', '#6366f1', '#8b5cf6', '#ec4899', '#00d4ff'],
  speed = 0.3,
  className = '',
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const reducedMotion = useUniverseStore((state) => state.reducedMotion);

  const createParticle = useCallback((width: number, height: number): Particle => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      color,
      life: 0,
      maxLife: Math.random() * 200 + 100,
    };
  }, [colors, speed]);

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

    // Initialize particles
    particlesRef.current = Array.from({ length: particleCount }, () =>
      createParticle(canvas.width, canvas.height)
    );

    // Mouse tracking for interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 16.67; // Normalize to ~60fps
      lastTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx * deltaTime;
        particle.y += particle.vy * deltaTime;
        particle.life++;

        // Mouse interaction - particles are slightly attracted to mouse
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 0) {
          const force = 0.0001 * (200 - dist);
          particle.vx += (dx / dist) * force;
          particle.vy += (dy / dist) * force;
        }

        // Soft boundary bounce
        if (particle.x < 0) {
          particle.x = 0;
          particle.vx *= -0.5;
        } else if (particle.x > canvas.width) {
          particle.x = canvas.width;
          particle.vx *= -0.5;
        }
        if (particle.y < 0) {
          particle.y = 0;
          particle.vy *= -0.5;
        } else if (particle.y > canvas.height) {
          particle.y = canvas.height;
          particle.vy *= -0.5;
        }

        // Fade in/out based on life
        let alpha = particle.opacity;
        if (particle.life < 20) {
          alpha *= particle.life / 20;
        } else if (particle.life > particle.maxLife - 20) {
          alpha *= (particle.maxLife - particle.life) / 20;
        }

        // Draw particle as a soft glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(0.5, particle.color.replace(')', `, ${alpha * 0.5})`).replace('rgb', 'rgba'));
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba').replace('#', '');
        ctx.fill();

        // Reset dead particles
        if (particle.life >= particle.maxLife) {
          particlesRef.current[index] = createParticle(canvas.width, canvas.height);
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, createParticle, reducedMotion]);

  if (reducedMotion) {
    return <div className={`absolute inset-0 pointer-events-none ${className}`} />;
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity: 0.7 }}
    />
  );
}

export default ParticleField;
