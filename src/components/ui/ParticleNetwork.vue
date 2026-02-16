<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

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
  particleCount: 80,
  particleSpeed: 0.3,
  connectionDistance: 120,
  mouseRadius: 150,
  colors: () => ['#88C0D0', '#81A1C1', '#5E81AC'], // Nord 8, 9, 10
  lineOpacity: 0.15,
  particleSize: 2,
});

const canvasRef = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let animationId: number | null = null;
let particles: Particle[] = [];
let mouse = { x: -1000, y: -1000 };

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;

  constructor(width: number, height: number, colors: string[], size: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * props.particleSpeed;
    this.vy = (Math.random() - 0.5) * props.particleSpeed;
    this.color = colors[Math.floor(Math.random() * colors.length)] || '#88C0D0';
    this.size = size;
  }

  update(width: number, height: number) {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off edges
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    // Keep within bounds
    this.x = Math.max(0, Math.min(width, this.x));
    this.y = Math.max(0, Math.min(height, this.y));
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initCanvas() {
  if (!canvasRef.value) return;

  const canvas = canvasRef.value;
  const dpr = window.devicePixelRatio || 1;
  
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;

  ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.scale(dpr, dpr);

  // Initialize particles
  particles = [];
  for (let i = 0; i < props.particleCount; i++) {
    particles.push(new Particle(
      window.innerWidth,
      window.innerHeight,
      props.colors,
      props.particleSize
    ));
  }
}

function drawConnections() {
  if (!ctx) return;

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i]!.x - particles[j]!.x;
      const dy = particles[i]!.y - particles[j]!.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < props.connectionDistance) {
        const opacity = (1 - distance / props.connectionDistance) * props.lineOpacity;
        ctx.strokeStyle = `rgba(136, 192, 208, ${opacity})`; // Nord 8
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i]!.x, particles[i]!.y);
        ctx.lineTo(particles[j]!.x, particles[j]!.y);
        ctx.stroke();
      }
    }

    // Connect to mouse
    const dx = particles[i]!.x - mouse.x;
    const dy = particles[i]!.y - mouse.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < props.mouseRadius) {
      const opacity = (1 - distance / props.mouseRadius) * props.lineOpacity * 2;
      ctx.strokeStyle = `rgba(136, 192, 208, ${opacity})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(particles[i]!.x, particles[i]!.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }
  }
}

function animate() {
  if (!ctx || !canvasRef.value) return;

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  // Update and draw particles
  particles.forEach(particle => {
    particle.update(window.innerWidth, window.innerHeight);
    particle.draw(ctx!);
  });

  // Draw connections
  drawConnections();

  animationId = requestAnimationFrame(animate);
}

function handleMouseMove(event: MouseEvent) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
}

function handleMouseLeave() {
  mouse.x = -1000;
  mouse.y = -1000;
}

function handleResize() {
  initCanvas();
}

onMounted(() => {
  initCanvas();
  animate();

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseleave', handleMouseLeave);
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }

  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('mouseleave', handleMouseLeave);
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <canvas
    ref="canvasRef"
    class="fixed inset-0 pointer-events-none z-0"
    style="opacity: 0.6;"
  />
</template>
