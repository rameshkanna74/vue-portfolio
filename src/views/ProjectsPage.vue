<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import gsap from 'gsap';
import { Icon } from '@iconify/vue';
import { usePortfolioStore } from '../stores/portfolio';
import { useGsapAnimations } from '../composables/useGsapAnimations';
import { useSEO } from '../composables/useSEO';
import ProjectCard from '../components/ui/ProjectCard.vue';
import ModalPreview from '../components/ui/ModalPreview.vue';
import type { Project } from '../types/portfolio';

const portfolioStore = usePortfolioStore();
const { slideUp } = useGsapAnimations();

useSEO({
  title: 'Projects | Ramesh Kanna',
  description: 'Explore my portfolio of web applications, 3D experiments, and open source contributions.',
});

const headerRef = ref<HTMLElement | null>(null);
const selectedProject = ref<Project | null>(null);
const isModalOpen = ref(false);
const selectedCategory = ref<string>('All');
const gridRef = ref<HTMLElement | null>(null);

// Extract unique categories from projects
const categories = computed(() => {
  const cats = new Set<string>();
  cats.add('All');
  portfolioStore.portfolioData.projects.forEach(project => {
    if (project.category) {
      cats.add(project.category);
    }
  });
  return Array.from(cats);
});

// Filter projects by category
const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') {
    return portfolioStore.sortedProjects;
  }
  return portfolioStore.sortedProjects.filter(
    project => project.category === selectedCategory.value
  );
});

function filterProjects(category: string) {
  // Animate out current projects
  if (gridRef.value) {
    const cards = gridRef.value.querySelectorAll('.project-card-wrapper');
    gsap.to(cards, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      stagger: 0.03,
      onComplete: () => {
        selectedCategory.value = category;
        // Animate in new projects
        setTimeout(() => {
          const newCards = gridRef.value?.querySelectorAll('.project-card-wrapper');
          if (newCards) {
            gsap.fromTo(
              newCards,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
            );
          }
        }, 50);
      },
    });
  } else {
    selectedCategory.value = category;
  }
}

function openModal(project: Project) {
  selectedProject.value = project;
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
  setTimeout(() => {
    selectedProject.value = null;
  }, 300);
}

onMounted(() => {
  if (headerRef.value) {
    slideUp(headerRef.value);
  }

  // Initial animation for project cards
  if (gridRef.value) {
    const cards = gridRef.value.querySelectorAll('.project-card-wrapper');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out', delay: 0.3 }
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
          <span class="text-gradient-premium">Featured Projects</span>
        </h1>
        <p class="text-nord-4 font-mono text-lg flex items-center justify-center gap-2">
          <Icon icon="mdi:folder-multiple" class="w-5 h-5 text-nord-8" />
          <span class="text-terminal-green">$</span> ls -la ~/projects/
        </p>
      </div>
      
      <!-- Category Filter -->
      <div class="flex flex-wrap justify-center gap-3 mb-12">
        <button
          v-for="category in categories"
          :key="category"
          @click="filterProjects(category)"
          class="group relative px-6 py-2.5 rounded-lg font-mono text-sm transition-all duration-300 overflow-hidden"
          :class="
            selectedCategory === category
              ? 'bg-nord-8/90 backdrop-blur-md text-nord-0 shadow-glow-md border border-nord-8 scale-105'
              : 'bg-nord-2/50 backdrop-blur-sm text-nord-4 hover:bg-nord-3/50 border border-nord-3/50 hover:border-nord-8/50 hover:scale-105'
          "
        >
          <!-- Shimmer effect on active -->
          <span 
            v-if="selectedCategory === category"
            class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"
          ></span>
          <span class="relative z-10 flex items-center gap-2">
            <Icon 
              v-if="selectedCategory === category" 
              icon="mdi:check-circle" 
              class="w-4 h-4" 
            />
            {{ category }}
          </span>
        </button>
      </div>

      <!-- Project Count -->
      <div class="text-center mb-8">
        <p class="text-nord-4 font-mono text-sm">
          Showing <span class="text-nord-8 font-bold">{{ filteredProjects.length }}</span> 
          {{ filteredProjects.length === 1 ? 'project' : 'projects' }}
        </p>
      </div>
      
      <!-- Projects Grid -->
      <div 
        ref="gridRef"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
      >
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="project-card-wrapper"
        >
          <ProjectCard
            :project="project"
            @open-modal="openModal"
          />
        </div>
      </div>

      <!-- Empty State -->
      <div 
        v-if="filteredProjects.length === 0"
        class="text-center py-20"
      >
        <Icon icon="mdi:folder-open-outline" class="w-24 h-24 mx-auto mb-4 text-nord-3 opacity-50" />
        <p class="text-nord-4 font-mono text-lg mb-2">No projects found</p>
        <p class="text-nord-3 text-sm">Try selecting a different category</p>
      </div>
      
      <!-- Project Modal -->
      <ModalPreview
        :project="selectedProject"
        :is-open="isModalOpen"
        @close="closeModal"
      />
    </div>
  </div>
</template>
