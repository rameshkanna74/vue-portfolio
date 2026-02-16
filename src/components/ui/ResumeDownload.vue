<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useAnalytics } from '../../composables/useAnalytics';

const { trackEvent } = useAnalytics();

function downloadResume() {
  // Track download event
  trackEvent('resume_download');
  
  // Trigger download
  // The file should be placed in public/resume.pdf
  const link = document.createElement('a');
  link.href = '/resume.pdf';
  link.download = 'Ramesh_Kanna_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>

<template>
  <button
    @click="downloadResume"
    class="group inline-flex items-center gap-2 px-6 py-3 bg-nord-8 text-nord-0 rounded-lg transition-all duration-300 hover:bg-nord-9 hover:shadow-glow-md hover:-translate-y-0.5 font-mono text-sm"
  >
    <Icon icon="mdi:file-download" class="w-5 h-5" />
    <span>Download Resume</span>
    <Icon icon="mdi:arrow-down" class="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
  </button>
</template>
