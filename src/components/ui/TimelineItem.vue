<script setup lang="ts">
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import { Icon } from '@iconify/vue';
import type { Experience } from '../../types/portfolio';
import { useGsapAnimations } from '../../composables/useGsapAnimations';

interface Props {
  experience: Experience;
  index: number;
  isLast?: boolean;
}

const props = defineProps<Props>();
const { scrollTriggerAnimation } = useGsapAnimations();

const itemRef = ref<HTMLElement | null>(null);
const dotRef = ref<HTMLElement | null>(null);
const lineRef = ref<HTMLElement | null>(null);
const isExpanded = ref(false);

onMounted(() => {
  if (itemRef.value) {
    scrollTriggerAnimation(itemRef.value, {
      x: -30,
      opacity: 0,
      duration: 0.6,
      delay: props.index * 0.1,
    });
  }

  // Animate timeline dot
  if (dotRef.value) {
    gsap.fromTo(
      dotRef.value,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: itemRef.value,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }

  // Animate timeline line
  if (lineRef.value && !props.isLast) {
    gsap.fromTo(
      lineRef.value,
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: itemRef.value,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );
  }
});

function formatDate(date: string | 'Present'): string {
  if (date === 'Present') return 'Present';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function toggleExpand() {
  isExpanded.value = !isExpanded.value;
  
  // Animate achievements when expanding
  if (isExpanded.value && itemRef.value) {
    setTimeout(() => {
      const achievements = itemRef.value?.querySelectorAll('.achievement-item');
      if (achievements) {
        gsap.fromTo(
          achievements,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' }
        );
      }
    }, 50);
  }
}
</script>

<template>
  <div ref="itemRef" class="timeline-item relative flex gap-6 pb-12">
    <!-- Timeline Connector -->
    <div class="flex flex-col items-center flex-shrink-0">
      <!-- Dot -->
      <div 
        ref="dotRef"
        class="relative z-10 w-4 h-4 rounded-full bg-gradient-to-br from-nord-8 to-nord-9 shadow-glow-sm ring-4 ring-nord-0 group-hover:scale-125 transition-transform duration-300"
      >
        <div class="absolute inset-0 rounded-full bg-gradient-to-br from-nord-8 to-nord-9 animate-pulse-slow opacity-50"></div>
      </div>
      
      <!-- Gradient Line -->
      <div 
        v-if="!isLast"
        ref="lineRef"
        class="w-0.5 flex-1 bg-gradient-to-b from-nord-8 via-nord-9 to-nord-10 origin-top relative overflow-hidden"
      >
        <!-- Animated shimmer -->
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-shimmer"></div>
      </div>
    </div>

    <!-- Content Card -->
    <div class="flex-1 group">
      <div class="relative overflow-hidden rounded-lg bg-nord-1/80 backdrop-blur-md border border-nord-3/50 p-6 transition-all duration-300 hover:bg-nord-1/90 hover:border-nord-8/70 hover:shadow-glow-md hover:-translate-y-1">
        <!-- Gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-br from-nord-8/5 to-nord-10/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div class="relative z-10">
          <!-- Header -->
          <div class="flex items-start justify-between mb-3 gap-4">
            <div class="flex-1">
              <h3 class="text-xl font-bold text-nord-6 group-hover:text-nord-8 transition-colors flex items-center gap-2">
                <Icon icon="mdi:briefcase" class="w-5 h-5 text-nord-8" />
                {{ experience.position }}
              </h3>
              <p class="text-nord-8 font-medium flex items-center gap-2 mt-1">
                <Icon icon="mdi:domain" class="w-4 h-4" />
                {{ experience.company }}
              </p>
              <p class="text-sm text-nord-3 font-mono flex items-center gap-2 mt-1">
                <Icon icon="mdi:map-marker" class="w-4 h-4" />
                {{ experience.location }}
              </p>
            </div>
            <span class="text-xs text-nord-3 font-mono bg-nord-2/50 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-nord-3/30 whitespace-nowrap">
              <Icon icon="mdi:calendar-range" class="w-3 h-3 inline mr-1" />
              {{ formatDate(experience.startDate) }} - {{ formatDate(experience.endDate) }}
            </span>
          </div>
          
          <!-- Description -->
          <p class="text-nord-4 text-sm mb-4 leading-relaxed">{{ experience.description }}</p>
          
          <!-- Toggle Button -->
          <button
            @click="toggleExpand"
            class="group/btn flex items-center gap-2 text-nord-8 text-sm font-mono hover:text-nord-10 transition-all duration-200 mb-3 px-3 py-1.5 rounded-lg hover:bg-nord-2/50"
          >
            <Icon 
              :icon="isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'" 
              class="w-4 h-4 group-hover/btn:scale-110 transition-transform" 
            />
            {{ isExpanded ? 'Hide Details' : 'Show Details' }}
          </button>
          
          <!-- Expandable Content -->
          <Transition name="expand">
            <div v-if="isExpanded" class="space-y-4 pt-2">
              <!-- Achievements -->
              <div>
                <h4 class="text-sm font-semibold text-nord-6 mb-3 flex items-center gap-2">
                  <Icon icon="mdi:star" class="w-4 h-4 text-nord-13" />
                  Key Achievements:
                </h4>
                <ul class="space-y-2">
                  <li
                    v-for="(achievement, idx) in experience.achievements"
                    :key="idx"
                    class="achievement-item text-sm text-nord-4 flex gap-2 group/item"
                  >
                    <span class="text-nord-8 flex-shrink-0 group-hover/item:scale-125 transition-transform">▸</span>
                    <span class="group-hover/item:text-nord-6 transition-colors">{{ achievement }}</span>
                  </li>
                </ul>
              </div>
              
              <!-- Technologies -->
              <div>
                <h4 class="text-sm font-semibold text-nord-6 mb-3 flex items-center gap-2">
                  <Icon icon="mdi:code-tags" class="w-4 h-4 text-nord-9" />
                  Technologies:
                </h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tech in experience.tech"
                    :key="tech"
                    class="px-3 py-1 text-xs font-mono bg-nord-2/50 backdrop-blur-sm text-nord-8 rounded-full border border-nord-3/30 hover:border-nord-8/50 hover:bg-nord-2 transition-all duration-200 hover:scale-105"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 600px;
}
</style>
