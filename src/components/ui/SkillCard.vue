<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import gsap from 'gsap';
import type { Skill } from '../../types/portfolio';
import { useGsapAnimations } from '../../composables/useGsapAnimations';

interface Props {
  skill: Skill;
}

const props = defineProps<Props>();
const { scrollTriggerAnimation } = useGsapAnimations();

const cardRef = ref<HTMLElement | null>(null);
const progressRef = ref<HTMLElement | null>(null);
const counterRef = ref<HTMLElement | null>(null);
const displayLevel = ref(0);

onMounted(() => {
  if (cardRef.value) {
    scrollTriggerAnimation(cardRef.value, {
      y: 30,
      opacity: 0,
      duration: 0.6,
    });
  }
  
  // Animate progress bar
  if (progressRef.value) {
    gsap.fromTo(
      progressRef.value,
      { width: '0%' },
      {
        width: `${props.skill.level}%`,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.value,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }

  // Animate counter
  if (counterRef.value) {
    gsap.to(displayLevel, {
      value: props.skill.level,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: cardRef.value,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        displayLevel.value = Math.round(displayLevel.value);
      },
    });
  }
});
</script>

<template>
  <div 
    ref="cardRef" 
    class="group relative overflow-hidden rounded-lg bg-nord-1/80 backdrop-blur-md border border-nord-3/50 p-6 transition-all duration-300 hover:bg-nord-1/90 hover:border-nord-8/70 hover:shadow-glow-md hover:-translate-y-1"
  >
    <!-- Gradient overlay on hover -->
    <div class="absolute inset-0 bg-gradient-to-br from-nord-8/5 to-nord-10/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    
    <div class="relative z-10">
      <!-- Header with Icon and Name -->
      <div class="flex items-center gap-4 mb-4">
        <div class="text-4xl text-nord-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
          <Icon :icon="skill.icon" />
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-nord-6 group-hover:text-nord-8 transition-colors">
            {{ skill.name }}
          </h3>
          <p class="text-xs text-nord-3 font-mono">{{ skill.category }}</p>
        </div>
        <!-- Animated Percentage Counter -->
        <div 
          ref="counterRef"
          class="text-2xl font-bold text-nord-8 font-mono tabular-nums"
        >
          {{ displayLevel }}%
        </div>
      </div>
      
      <!-- Progress Bar Container -->
      <div class="relative h-3 bg-nord-2/50 rounded-full overflow-hidden backdrop-blur-sm">
        <!-- Animated Progress Bar with Gradient -->
        <div
          ref="progressRef"
          class="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-nord-8 via-nord-9 to-nord-10 shadow-inner-glow"
          :style="{ width: '0%' }"
        >
          <!-- Shimmer effect -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
      </div>
      
      <!-- Footer Info -->
      <div class="mt-3 flex justify-between items-center text-xs text-nord-4/70">
        <span class="font-mono">Proficiency</span>
        <span v-if="skill.yearsOfExperience" class="font-mono flex items-center gap-1">
          <Icon icon="mdi:clock-outline" class="w-3 h-3" />
          {{ skill.yearsOfExperience }}+ years
        </span>
      </div>
    </div>
  </div>
</template>
