<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

interface Props {
  particleCount?: number;
  particleSpeed?: number;
  connectionDistance?: number;
  mouseRadius?: number;
  colors?: string[];
  lineOpacity?: number;
  particleSize?: number;
}

const props = withDefaults(defineProps<Props>(), {
  particleCount: 40,
  particleSpeed: 0.3,
  connectionDistance: 100,
  mouseRadius: 150,
  colors: () => ['#88C0D0', '#81A1C1', '#5E81AC'],
  lineOpacity: 0.15,
  particleSize: 2,
});

const canvasRef = ref<HTMLCanvasElement | null>(null);
const isVisible = ref(true);
const isMobile = computed(() => window.innerWidth < 768);

let ctx: CanvasRenderingContext2D | null = null;
let animationId: number | null = null;
let particles: any[] = [];
let mouse = { x: -1000, y: -1000 };
let lastMouseUpdate = 0;
const MOUSE_THROTTLE = 16;

// Spatial partitioning grid
const grid = new Map<string, any[]>();
const GRID_CELL_SIZE = 100;

// Particle factory function instead of class
function createParticle(width: number, height: number, colors: string[], size: number, speed: number) {
  const particle = {
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
      
      // Update grid key
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
  
  return particle;
}

function buildSpatialGrid() {
  grid.clear();
  particles.forEach(particle => {
    if (!grid.has(particle.gridKey)) {
      grid.set(particle.gridKey, []);
    }
    grid.get(particle.gridKey)!.push(particle);
  });
}

function getNearbyParticles(particle: any) {
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
}

function initCanvas() {
  if (!canvasRef.value) return;

  const canvas = canvasRef.value;
  const dpr = window.devicePixelRatio || 1;
  
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;

  ctx = canvas.getContext('2d', {
    alpha: true,
    desynchronized: true,
  });
  
  if (!ctx) return;
  ctx.scale(dpr, dpr);

  // Initialize particles
  const count = isMobile.value ? Math.floor(props.particleCount / 2) : props.particleCount;
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push(createParticle(
      window.innerWidth,
      window.innerHeight,
      props.colors,
      props.particleSize,
      props.particleSpeed
    ));
  }
}

function drawConnections() {
  if (!ctx) return;

  buildSpatialGrid();

  for (const particle of particles) {
    const nearby = getNearbyParticles(particle);
    
    for (const other of nearby) {
      if (particle === other) continue;
      
      const dx = particle.x - other.x;
      const dy = particle.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < props.connectionDistance) {
        const opacity = (1 - distance / props.connectionDistance) * props.lineOpacity;
        ctx.strokeStyle = `rgba(136, 192, 208, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      }
    }

    // Connect to mouse (throttled)
    const dx = particle.x - mouse.x;
    const dy = particle.y - mouse.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < props.mouseRadius) {
      const opacity = (1 - distance / props.mouseRadius) * props.lineOpacity * 2;
      ctx.strokeStyle = `rgba(136, 192, 208, ${opacity})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(particle.x, particle.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }
  }
}

function animate() {
  if (!ctx || !canvasRef.value || !isVisible.value) {
    return;
  }

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach(particle => {
    particle.update(window.innerWidth, window.innerHeight);
    particle.draw(ctx!);
  });

  drawConnections();

  animationId = requestAnimationFrame(animate);
}

function handleMouseMove(event: MouseEvent) {
  const now = Date.now();
  if (now - lastMouseUpdate < MOUSE_THROTTLE) return;
  
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  lastMouseUpdate = now;
}

function handleMouseLeave() {
  mouse.x = -1000;
  mouse.y = -1000;
}

function handleResize() {
  initCanvas();
}

// Visibility API to pause when tab not visible
function handleVisibilityChange() {
  if (document.hidden) {
    isVisible.value = false;
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  } else {
    isVisible.value = true;
    animate();
  }
}

onMounted(() => {
  if (isMobile.value) {
    return;
  }

  initCanvas();
  animate();

  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  window.addEventListener('mouseleave', handleMouseLeave);
  window.addEventListener('resize', handleResize);
  document.addEventListener('visibilitychange', handleVisibilityChange);
});

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }

  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('mouseleave', handleMouseLeave);
  window.removeEventListener('resize', handleResize);
  document.removeEventListener('visibilitychange', handleVisibilityChange);
  
  // Clear memory
  particles = [];
  grid.clear();
});
</script>

<template>
  <canvas
    v-if="!isMobile"
    ref="canvasRef"
    class="fixed inset-0 pointer-events-none z-0"
    style="opacity: 0.6; will-change: contents;"
  />
  <div
    v-else
    class="fixed inset-0 pointer-events-none z-0"
    style="background: radial-gradient(circle at 30% 50%, rgba(136, 192, 208, 0.1) 0%, transparent 50%);"
  />
</template>
