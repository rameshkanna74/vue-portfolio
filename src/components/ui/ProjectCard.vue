<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import type { Project } from '../../types/portfolio';
import { useGsapAnimations } from '../../composables/useGsapAnimations';
import { useTilt } from '../../composables/useTilt';
import BaseCard from './BaseCard.vue';

interface Props {
  project: Project;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  openModal: [project: Project];
}>();

const { scrollTriggerAnimation } = useGsapAnimations();
const cardRef = ref<HTMLElement | null>(null);
const isHovered = ref(false);

// Apply 3D tilt effect
useTilt(cardRef, {
  max: 8,
  scale: 1.02,
  speed: 400,
  glare: false,
});

onMounted(() => {
  if (cardRef.value) {
    scrollTriggerAnimation(cardRef.value, {
      y: 40,
      opacity: 0,
      duration: 0.7,
    });
  }
});

function handleClick() {
  emit('openModal', props.project);
}
</script>

<template>
  <div 
    ref="cardRef" 
    @click="handleClick"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    class="transform-3d"
  >
    <BaseCard 
      variant="glass" 
      class="h-full cursor-pointer group relative overflow-hidden"
      :class="{ 'gradient-border-animated': isHovered }"
    >
      <!-- Gradient overlay on hover -->
      <div 
        class="absolute inset-0 bg-gradient-to-br from-nord-8/5 to-nord-10/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />
      
      <div class="relative z-10">
        <div class="flex items-start justify-between mb-3">
          <h3 class="text-xl font-bold text-nord-6 group-hover:text-gradient-premium transition-all duration-300">
            {{ project.title }}
          </h3>
          <span class="text-xs text-nord-3 font-mono bg-nord-2/50 px-2 py-1 rounded backdrop-blur-sm">
            {{ project.year }}
          </span>
        </div>
        
        <p class="text-nord-4 text-sm mb-4 line-clamp-2">
          {{ project.description }}
        </p>
        
        <div class="flex flex-wrap gap-2 mb-4">
          <span
            v-for="(tech, index) in project.tech.slice(0, 4)"
            :key="tech"
            class="badge badge-tech transition-all duration-300 hover:scale-110"
            :style="{ transitionDelay: isHovered ? `${index * 50}ms` : '0ms' }"
          >
            {{ tech }}
          </span>
          <span v-if="project.tech.length > 4" class="badge badge-tech">
            +{{ project.tech.length - 4 }}
          </span>
        </div>
        
        <div class="flex items-center gap-2 text-xs text-nord-8 font-mono group-hover:text-nord-10 transition-colors">
          <span class="group-hover:text-glow transition-all">View Details</span>
          <Icon icon="mdi:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
