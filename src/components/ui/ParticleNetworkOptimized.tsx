import React, { useRef, useEffect, useState } from 'react';

interface ParticleNetworkProps {
  particleCount?: number;
  particleSpeed?: number;
  connectionDistance?: number;
  mouseRadius?: number;
  colors?: string[];
  lineOpacity?: number;
  particleSize?: number;
}

export const ParticleNetworkOptimized: React.FC<ParticleNetworkProps> = ({
  particleCount = 40,
  particleSpeed = 0.3,
  connectionDistance = 100,
  mouseRadius = 150,
  colors = ['#88C0D0', '#81A1C1', '#5E81AC'],
  lineOpacity = 0.15,
  particleSize = 2,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  useEffect(() => {
    if (isMobile || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    let ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true,
    });
    
    if (!ctx) return;

    let animationId: number;
    let particles: any[] = [];
    let mouse = { x: -1000, y: -1000 };
    let lastMouseUpdate = 0;
    const MOUSE_THROTTLE = 16;
    const grid = new Map<string, any[]>();
    const GRID_CELL_SIZE = 100;

    const createParticle = (width: number, height: number, colors: string[], size: number, speed: number) => {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: size,
        gridKey: '',
        
        update(w: number, h: number) {
          this.x += this.vx;
          this.y += this.vy;

          if (this.x < 0 || this.x > w) this.vx *= -1;
          if (this.y < 0 || this.y > h) this.vy *= -1;

          this.x = Math.max(0, Math.min(w, this.x));
          this.y = Math.max(0, Math.min(h, this.y));
          
          const col = Math.floor(this.x / GRID_CELL_SIZE);
          const row = Math.floor(this.y / GRID_CELL_SIZE);
          this.gridKey = `${col},${row}`;
        },
        
        draw(context: CanvasRenderingContext2D) {
          context.fillStyle = this.color || '#88C0D0';
          context.beginPath();
          context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          context.fill();
        }
      };
    };

    const buildSpatialGrid = () => {
      grid.clear();
      particles.forEach(particle => {
        if (!grid.has(particle.gridKey)) {
          grid.set(particle.gridKey, []);
        }
        grid.get(particle.gridKey)!.push(particle);
      });
    };

    const getNearbyParticles = (particle: any) => {
      const nearby: any[] = [];
      const [col, row] = particle.gridKey.split(',').map(Number);
      
      for (let dc = -1; dc <= 1; dc++) {
        for (let dr = -1; dr <= 1; dr++) {
          const key = `${col + dc},${row + dr}`;
          const cellParticles = grid.get(key);
          if (cellParticles) {
            nearby.push(...cellParticles);
          }
        }
      }
      return nearby;
    };

    const initCanvas = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx!.scale(dpr, dpr);

      const count = window.innerWidth < 768 ? Math.floor(particleCount / 2) : particleCount;
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(createParticle(window.innerWidth, window.innerHeight, colors, particleSize, particleSpeed));
      }
    };

    const drawConnections = () => {
      buildSpatialGrid();

      for (const particle of particles) {
        const nearby = getNearbyParticles(particle);
        
        for (const other of nearby) {
          if (particle === other) continue;
          
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * lineOpacity;
            ctx!.strokeStyle = `rgba(136, 192, 208, ${opacity})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(particle.x, particle.y);
            ctx!.lineTo(other.x, other.y);
            ctx!.stroke();
          }
        }

        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius) {
          const opacity = (1 - distance / mouseRadius) * lineOpacity * 2;
          ctx!.strokeStyle = `rgba(136, 192, 208, ${opacity})`;
          ctx!.lineWidth = 2;
          ctx!.beginPath();
          ctx!.moveTo(particle.x, particle.y);
          ctx!.lineTo(mouse.x, mouse.y);
          ctx!.stroke();
        }
      }
    };

    const animate = () => {
      if (!isVisible) return;
      
      ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particles.forEach(particle => {
        particle.update(window.innerWidth, window.innerHeight);
        particle.draw(ctx!);
      });

      drawConnections();
      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const now = Date.now();
      if (now - lastMouseUpdate < MOUSE_THROTTLE) return;
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      lastMouseUpdate = now;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      initCanvas();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false);
        if (animationId) cancelAnimationFrame(animationId);
      } else {
        setIsVisible(true);
        animate();
      }
    };

    initCanvas();
    animate();

    window.addEventListener('mousemove', handleMouseMove as any, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove as any);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      particles = [];
      grid.clear();
    };
  }, [isVisible, isMobile, particleCount, particleSpeed, connectionDistance, mouseRadius, colors, lineOpacity, particleSize]);

  if (isMobile) {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle at 30% 50%, rgba(136, 192, 208, 0.1) 0%, transparent 50%)' }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6, willChange: 'contents' }}
    />
  );
};
