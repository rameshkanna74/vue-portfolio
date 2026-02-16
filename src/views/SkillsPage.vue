<script setup lang="ts">
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import { Icon } from '@iconify/vue';
import { usePortfolioStore } from '../stores/portfolio';
import { useGsapAnimations } from '../composables/useGsapAnimations';
import { useSEO } from '../composables/useSEO';
import SkillCard from '../components/ui/SkillCard.vue';

const portfolioStore = usePortfolioStore();
const { slideUp } = useGsapAnimations();

useSEO({
  title: 'Skills & Expertise | Ramesh Kanna',
  description: 'Technical skills overview including Vue.js, TypeScript, Three.js, and more.',
});

const selectedCategory = ref<string>('All');
const headerRef = ref<HTMLElement | null>(null);
const statsRef = ref<HTMLElement[]>([]);

const categories = ['All', 'Frontend', 'Backend', 'ML/Data', 'Tools'];

const filteredSkills = ref(portfolioStore.portfolioData.skills);

function filterSkills(category: string) {
  selectedCategory.value = category;
  if (category === 'All') {
    filteredSkills.value = portfolioStore.portfolioData.skills;
  } else {
    filteredSkills.value = portfolioStore.filterSkills(category);
  }
}

onMounted(() => {
  if (headerRef.value) {
    slideUp(headerRef.value);
  }

  // Animate stats cards
  if (statsRef.value.length > 0) {
    gsap.fromTo(
      statsRef.value,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: statsRef.value[0],
          start: 'top 85%',
        },
      }
    );
  }
});
</script>

<template>
  <div class="min-h-screen py-20 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div ref="headerRef" class="text-center mb-12">
        <h1 class="text-5xl font-bold text-nord-6 mb-4">
          <span class="text-gradient-premium">Technical Skills</span>
        </h1>
        <p class="text-nord-4 font-mono text-lg flex items-center justify-center gap-2">
          <Icon icon="mdi:console" class="w-5 h-5 text-terminal-green" />
          <span class="text-terminal-green">$</span> ls -la ~/skills/
        </p>
      </div>
      
      <!-- Category Filter -->
      <div class="flex flex-wrap justify-center gap-3 mb-12">
        <button
          v-for="category in categories"
          :key="category"
          @click="filterSkills(category)"
          class="group relative px-6 py-2.5 rounded-lg font-mono text-sm transition-all duration-300 overflow-hidden"
          :class="
            selectedCategory === category
              ? 'bg-nord-8/90 backdrop-blur-md text-nord-0 shadow-glow-md border border-nord-8'
              : 'bg-nord-2/50 backdrop-blur-sm text-nord-4 hover:bg-nord-3/50 border border-nord-3/50 hover:border-nord-8/50'
          "
        >
          <!-- Shimmer effect on active -->
          <span 
            v-if="selectedCategory === category"
            class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"
          ></span>
          <span class="relative z-10">{{ category }}</span>
        </button>
      </div>
      
      <!-- Skills Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <SkillCard
          v-for="skill in filteredSkills"
          :key="skill.id"
          :skill="skill"
        />
      </div>
      
      <!-- Stats Section -->
      <div class="mt-20">
        <h2 class="text-3xl font-bold text-nord-6 text-center mb-8">
          <span class="text-nord-8">#</span> Statistics
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Total Skills -->
          <div 
            ref="statsRef"
            class="relative overflow-hidden rounded-lg bg-nord-1/80 backdrop-blur-md border border-nord-3/50 p-8 text-center transition-all duration-300 hover:bg-nord-1/90 hover:border-nord-8/70 hover:shadow-glow-md hover:-translate-y-1 group"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-nord-8/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="relative z-10">
              <Icon icon="mdi:code-braces" class="w-12 h-12 mx-auto mb-3 text-nord-8 group-hover:scale-110 transition-transform" />
              <div class="text-5xl font-bold text-nord-8 mb-2 font-mono">{{ portfolioStore.portfolioData.skills.length }}</div>
              <div class="text-nord-4 font-mono text-sm">Total Skills</div>
            </div>
          </div>

          <!-- Years Experience -->
          <div 
            class="relative overflow-hidden rounded-lg bg-nord-1/80 backdrop-blur-md border border-nord-3/50 p-8 text-center transition-all duration-300 hover:bg-nord-1/90 hover:border-nord-14/70 hover:shadow-glow-md hover:-translate-y-1 group"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-nord-14/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="relative z-10">
              <Icon icon="mdi:clock-outline" class="w-12 h-12 mx-auto mb-3 text-nord-14 group-hover:scale-110 transition-transform" />
              <div class="text-5xl font-bold text-nord-14 mb-2 font-mono">3+</div>
              <div class="text-nord-4 font-mono text-sm">Years Experience</div>
            </div>
          </div>

          <!-- LeetCode Problems -->
          <div 
            class="relative overflow-hidden rounded-lg bg-nord-1/80 backdrop-blur-md border border-nord-3/50 p-8 text-center transition-all duration-300 hover:bg-nord-1/90 hover:border-nord-13/70 hover:shadow-glow-md hover:-translate-y-1 group"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-nord-13/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="relative z-10">
              <Icon icon="mdi:trophy" class="w-12 h-12 mx-auto mb-3 text-nord-13 group-hover:scale-110 transition-transform" />
              <div class="text-5xl font-bold text-nord-13 mb-2 font-mono">200+</div>
              <div class="text-nord-4 font-mono text-sm">LeetCode Problems</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
