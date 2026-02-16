<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useThemeStore } from './stores/theme';
import AppHeader from './components/layout/AppHeader.vue';
import ParticleNetwork from './components/ui/ParticleNetworkOptimized.vue';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const themeStore = useThemeStore();

onMounted(() => {
  themeStore.initTheme();

  // Initialize Lenis for smooth scrolling
  const lenis = new Lenis({
    autoRaf: true,
  });
  
  // Optional: Log scroll events
  // lenis.on('scroll', (e) => {
  //   console.log(e);
  // });
  
  console.log('Lenis initialized', lenis);
});

// watch(() => route.path, () => {
//   pageTransition();
// });
</script>

<template>
  <div id="app" class="min-h-screen bg-background-light text-foreground-light dark:bg-background-dark dark:text-foreground-dark transition-colors duration-300">
    <!-- Particle Network Background (Site-wide) -->
    <ParticleNetwork 
      :particle-count="60" 
      :connection-distance="120" 
      :mouse-radius="150"
      :particle-speed="0.2"
    />
    
    <AppHeader />
    
    <!-- Page transition overlay -->
    <div class="page-transition-container fixed inset-0 z-50 pointer-events-none flex">
    <div class="page-transition-bar flex-1 bg-nord-1 border-r border-nord-3/20 last:border-r-0 transform scale-y-0 origin-top"></div>
    <div class="page-transition-bar flex-1 bg-nord-1 border-r border-nord-3/20 last:border-r-0 transform scale-y-0 origin-top"></div>
    <div class="page-transition-bar flex-1 bg-nord-1 border-r border-nord-3/20 last:border-r-0 transform scale-y-0 origin-top"></div>
    <div class="page-transition-bar flex-1 bg-nord-1 border-r border-nord-3/20 last:border-r-0 transform scale-y-0 origin-top"></div>
    <div class="page-transition-bar flex-1 bg-nord-1 border-r border-nord-3/20 last:border-r-0 transform scale-y-0 origin-top"></div>
  </div>
    
    <main class="relative">
      <RouterView v-slot="{ Component }">
        <!-- <Transition name="page" mode="out-in"> -->
          <component :is="Component" />
        <!-- </Transition> -->
      </RouterView>
    </main>
  </div>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
