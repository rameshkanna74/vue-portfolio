<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import type { Project } from '../../types/portfolio';
import { Icon } from '@iconify/vue';

interface Props {
  project: Project | null;
  isOpen: boolean;
}

defineProps<Props>();
const emit = defineEmits<{
  close: [];
}>();

function handleClose() {
  emit('close');
}

function handleEscape(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    handleClose();
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape);
});
</script>

<template>
  <Transition name="modal">
    <div
      v-if="isOpen && project"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-nord-0/90 backdrop-blur-sm"
      @click.self="handleClose"
    >
      <div class="terminal-window max-w-3xl w-full max-h-[90vh] overflow-hidden">
        <div class="terminal-header">
          <div class="flex items-center gap-2">
            <div class="terminal-controls">
              <div
                class="terminal-control terminal-control-close cursor-pointer hover:scale-125"
                @click="handleClose"
              ></div>
              <div class="terminal-control terminal-control-minimize"></div>
              <div class="terminal-control terminal-control-maximize"></div>
            </div>
            <span class="terminal-title">{{ project.title }}</span>
          </div>
        </div>
        
        <div class="terminal-content overflow-y-auto max-h-[calc(90vh-60px)] scrollbar-hide">
          <div class="space-y-6">
            <!-- Header -->
            <div class="flex items-start justify-between">
              <h2 class="text-3xl font-bold text-nord-6">{{ project.title }}</h2>
              <span class="text-sm text-nord-3 font-mono bg-nord-2 px-3 py-1 rounded">
                {{ project.year }}
              </span>
            </div>
            
            <!-- Description -->
            <div>
              <h3 class="text-lg font-semibold text-nord-8 mb-2">Overview</h3>
              <p class="text-nord-4 leading-relaxed">{{ project.longDescription }}</p>
            </div>
            
            <!-- Highlights -->
            <div>
              <h3 class="text-lg font-semibold text-nord-8 mb-3">Key Highlights</h3>
              <ul class="space-y-2">
                <li
                  v-for="(highlight, idx) in project.highlights"
                  :key="idx"
                  class="text-nord-4 flex gap-3"
                >
                  <span class="text-nord-8 flex-shrink-0 mt-1">✓</span>
                  <span>{{ highlight }}</span>
                </li>
              </ul>
            </div>
            
            <!-- Tech Stack -->
            <div>
              <h3 class="text-lg font-semibold text-nord-8 mb-3">Tech Stack</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in project.tech"
                  :key="tech"
                  class="badge badge-tech"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
            
            <!-- Links -->
            <div v-if="project.links" class="flex gap-4">
              <a
                v-if="project.links.github"
                :href="project.links.github"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-nord-8 hover:text-nord-10 transition-colors"
              >
                <Icon icon="mdi:github" class="w-5 h-5" />
                <span class="font-mono text-sm">View on GitHub</span>
              </a>
              <a
                v-if="project.links.demo"
                :href="project.links.demo"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-nord-8 hover:text-nord-10 transition-colors"
              >
                <Icon icon="mdi:open-in-new" class="w-5 h-5" />
                <span class="font-mono text-sm">Live Demo</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
