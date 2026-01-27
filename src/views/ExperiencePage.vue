<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import { usePortfolioStore } from '../stores/portfolio';
import { useGsapAnimations } from '../composables/useGsapAnimations';
import { useSEO } from '../composables/useSEO';
import TimelineItem from '../components/ui/TimelineItem.vue';
import GlowButton from '../components/ui/GlowButton.vue';

const portfolioStore = usePortfolioStore();
const { slideUp } = useGsapAnimations();

useSEO({
  title: 'Experience | Ramesh Kanna',
  description: 'My professional journey and career milestones.',
});

const headerRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (headerRef.value) {
    slideUp(headerRef.value);
  }
});

function downloadResume() {
  // This will be implemented when you add the resume PDF to public folder
  window.open('/resume.pdf', '_blank');
}
</script>

<template>
  <div class="min-h-screen py-20 px-4">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div ref="headerRef" class="text-center mb-12">
        <h1 class="text-5xl font-bold text-nord-6 mb-4">
          <span class="text-gradient-premium">Professional Experience</span>
        </h1>
        <p class="text-nord-4 font-mono text-lg flex items-center justify-center gap-2">
          <Icon icon="mdi:timeline-text" class="w-5 h-5 text-nord-8" />
          <span class="text-terminal-green">$</span> cat ~/career/timeline.log
        </p>
      </div>
      
      <!-- Download Resume Button -->
      <div class="flex justify-center mb-16">
        <GlowButton @click="downloadResume" variant="primary" class="group">
          <Icon icon="mdi:download" class="w-5 h-5 inline mr-2 group-hover:animate-bounce-subtle" />
          Download Resume (PDF)
        </GlowButton>
      </div>
      
      <!-- Timeline -->
      <div class="relative">
        <TimelineItem
          v-for="(exp, index) in portfolioStore.sortedExperience"
          :key="exp.id"
          :experience="exp"
          :index="index"
          :is-last="index === portfolioStore.sortedExperience.length - 1"
        />
      </div>
      
      <!-- Education Section -->
      <div class="mt-20">
        <h2 class="text-3xl font-bold text-nord-6 mb-8 text-center flex items-center justify-center gap-2">
          <Icon icon="mdi:school" class="w-8 h-8 text-nord-9" />
          Education
        </h2>
        <div class="relative overflow-hidden rounded-lg bg-nord-1/80 backdrop-blur-md border border-nord-3/50 p-8 max-w-2xl mx-auto transition-all duration-300 hover:bg-nord-1/90 hover:border-nord-9/70 hover:shadow-glow-md hover:-translate-y-1 group">
          <!-- Gradient overlay -->
          <div class="absolute inset-0 bg-gradient-to-br from-nord-9/5 to-nord-10/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div
            v-for="edu in portfolioStore.portfolioData.education"
            :key="edu.institution"
            class="space-y-3 relative z-10"
          >
            <h3 class="text-2xl font-bold text-nord-8 flex items-center gap-2">
              <Icon icon="mdi:certificate" class="w-6 h-6" />
              {{ edu.degree }} in {{ edu.field }}
            </h3>
            <p class="text-lg text-nord-6 flex items-center gap-2">
              <Icon icon="mdi:bank" class="w-5 h-5 text-nord-8" />
              {{ edu.institution }}
            </p>
            <p class="text-sm text-nord-3 font-mono flex items-center gap-2">
              <Icon icon="mdi:map-marker" class="w-4 h-4" />
              {{ edu.location }} | {{ edu.startDate.substring(0, 4) }} - {{ edu.endDate.substring(0, 4) }}
            </p>
            <div class="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-nord-8/10 border border-nord-8/30 rounded-lg">
              <Icon icon="mdi:trophy" class="w-5 h-5 text-nord-8" />
              <span class="text-nord-8 font-bold text-lg">CGPA: {{ edu.gpa }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
