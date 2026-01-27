<script setup lang="ts">
import { ref, onMounted } from 'vue';

const particles = ref<Array<{ x: number; y: number; size: number; duration: number; delay: number }>>([]);

onMounted(() => {
  // Generate 50 particles with random properties
  particles.value = Array.from({ length: 50 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));
});
</script>

<template>
  <div class="hero-background">
    <!-- Animated mesh gradient -->
    <div class="gradient-mesh"></div>
    
    <!-- Geometric grid overlay -->
    <div class="grid-overlay"></div>
    
    <!-- Floating particles with glow -->
    <div class="particles-container">
      <div
        v-for="(particle, i) in particles"
        :key="i"
        class="particle"
        :style="{
          left: `${particle.x}%`,
          top: `${particle.y}%`,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          animationDuration: `${particle.duration}s`,
          animationDelay: `${particle.delay}s`,
        }"
      ></div>
    </div>
    
    <!-- Animated light beams -->
    <div class="light-beam beam-1"></div>
    <div class="light-beam beam-2"></div>
    <div class="light-beam beam-3"></div>
    
    <!-- Scanline effect -->
    <div class="scanline"></div>
  </div>
</template>

<style scoped>
.hero-background {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(135deg, #2e3440 0%, #3b4252 50%, #434c5e 100%);
}

/* Animated mesh gradient */
.gradient-mesh {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 20% 50%, rgba(136, 192, 208, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(143, 188, 187, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 40% 20%, rgba(129, 161, 193, 0.15) 0%, transparent 50%);
  animation: meshMove 20s ease-in-out infinite;
}

@keyframes meshMove {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(5%, -5%) scale(1.05);
  }
  66% {
    transform: translate(-5%, 5%) scale(0.95);
  }
}

/* Geometric grid overlay */
.grid-overlay {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(136, 192, 208, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(136, 192, 208, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridScroll 30s linear infinite;
}

@keyframes gridScroll {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50px, 50px);
  }
}

/* Particles container */
.particles-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.particle {
  position: absolute;
  background: radial-gradient(circle, rgba(136, 192, 208, 0.8) 0%, rgba(136, 192, 208, 0) 70%);
  border-radius: 50%;
  filter: blur(1px);
  animation: particleFloat linear infinite;
  box-shadow: 0 0 10px rgba(136, 192, 208, 0.5);
}

@keyframes particleFloat {
  0% {
    transform: translateY(0) translateX(0) scale(1);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) translateX(50px) scale(1.5);
    opacity: 0;
  }
}

/* Light beams */
.light-beam {
  position: absolute;
  width: 2px;
  height: 100%;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(136, 192, 208, 0.4) 50%,
    transparent 100%
  );
  filter: blur(2px);
  opacity: 0;
}

.beam-1 {
  left: 20%;
  animation: beamPulse 8s ease-in-out infinite;
}

.beam-2 {
  left: 50%;
  animation: beamPulse 8s ease-in-out infinite 2.6s;
}

.beam-3 {
  left: 80%;
  animation: beamPulse 8s ease-in-out infinite 5.2s;
}

@keyframes beamPulse {
  0%, 100% {
    opacity: 0;
    transform: scaleY(0);
  }
  50% {
    opacity: 1;
    transform: scaleY(1);
  }
}

/* Scanline effect */
.scanline {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(136, 192, 208, 0.05) 2%,
    transparent 4%
  );
  background-size: 100% 50px;
  animation: scanlineMove 3s linear infinite;
  pointer-events: none;
}

@keyframes scanlineMove {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(50px);
  }
}

/* Add some depth with pseudo-elements */
.hero-background::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    rgba(46, 52, 64, 0.8) 100%
  );
  pointer-events: none;
}

.hero-background::after {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    linear-gradient(45deg, transparent 48%, rgba(136, 192, 208, 0.02) 50%, transparent 52%),
    linear-gradient(-45deg, transparent 48%, rgba(136, 192, 208, 0.02) 50%, transparent 52%);
  background-size: 100px 100px;
  animation: diagonalMove 20s linear infinite;
  pointer-events: none;
}

@keyframes diagonalMove {
  0% {
    background-position: 0 0, 0 0;
  }
  100% {
    background-position: 100px 100px, -100px -100px;
  }
}
</style>
