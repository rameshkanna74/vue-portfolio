<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

interface Props {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  lazy?: boolean;
  sizes?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  placeholder?: string; // Blur placeholder (base64 or low-res image)
}

const props = withDefaults(defineProps<Props>(), {
  lazy: true,
  objectFit: 'cover',
  sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
});

const imgRef = ref<HTMLImageElement | null>(null);
const isLoaded = ref(false);
const isInView = ref(false);
const hasError = ref(false);

// Generate responsive image sources with srcset
const imageSources = computed(() => {
  const basePath = props.src.replace(/\.\w+$/, '');
  const ext = props.src.match(/\.\w+$/)?.[0] || '';
  
  return {
    webp: `${basePath}.webp`,
    avif: `${basePath}.avif`,
    original: props.src,
    // Generate srcset for different sizes
    srcset: props.width 
      ? `${basePath}-400w${ext} 400w, ${basePath}-800w${ext} 800w, ${basePath}-1200w${ext} 1200w`
      : undefined,
  };
});

// Lazy loading with Intersection Observer
onMounted(() => {
  if (!props.lazy || !imgRef.value) {
    isInView.value = true;
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        isInView.value = true;
        observer.disconnect();
      }
    },
    {
      rootMargin: '100px', // Start loading before visible for smoother UX
      threshold: 0.01,
    }
  );

  observer.observe(imgRef.value);
});

function handleLoad() {
  isLoaded.value = true;
}

function handleError() {
  hasError.value = true;
  console.warn(`Failed to load image: ${props.src}`);
}
</script>

<template>
  <picture ref="imgRef" class="optimized-image">
    <!-- Modern formats with fallback -->
    <source
      v-if="isInView && !hasError"
      :srcset="imageSources.avif"
      type="image/avif"
      :sizes="sizes"
    />
    <source
      v-if="isInView && !hasError"
      :srcset="imageSources.webp"
      type="image/webp"
      :sizes="sizes"
    />
    
    <img
      :src="isInView ? imageSources.original : placeholder"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="lazy ? 'lazy' : 'eager'"
      :srcset="imageSources.srcset"
      :sizes="sizes"
      :class="{ 'loaded': isLoaded, 'error': hasError }"
      :style="{ objectFit }"
      @load="handleLoad"
      @error="handleError"
      decoding="async"
    />
    
    <!-- Blur placeholder -->
    <div v-if="!isLoaded && !hasError && placeholder" class="placeholder" :style="{ backgroundImage: `url(${placeholder})` }"></div>
  </picture>
</template>

<style scoped>
.optimized-image {
  display: block;
  position: relative;
  overflow: hidden;
  background-color: #3b4252;
}

.optimized-image img {
  width: 100%;
  height: auto;
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
  /* Prevent layout shift */
  aspect-ratio: attr(width) / attr(height);
}

.optimized-image img.loaded {
  opacity: 1;
}

.optimized-image img.error {
  opacity: 0.5;
  filter: grayscale(100%);
}

.placeholder {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(10px);
  transform: scale(1.1);
  opacity: 0.6;
  transition: opacity 0.4s ease-in-out;
}

.optimized-image img.loaded + .placeholder {
  opacity: 0;
}
</style>
