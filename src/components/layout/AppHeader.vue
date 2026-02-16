<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { Icon } from '@iconify/vue';
import { onClickOutside } from '@vueuse/core';
import { useThemeStore, availableThemes } from '../../stores/theme';
import LanguageSwitcher from '../ui/LanguageSwitcher.vue';

import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const themeStore = useThemeStore();
const { t } = useI18n();

const route = useRoute();
const isMenuOpen = ref(false);
const isThemeMenuOpen = ref(false);
const themeMenuRef = ref(null);

onClickOutside(themeMenuRef, () => {
  isThemeMenuOpen.value = false;
});

const navLinks = computed(() => [
  { name: t('nav.home'), path: '/', icon: 'mdi:home' },
  { name: t('nav.about'), path: '/about', icon: 'mdi:account' },
  { name: t('nav.skills'), path: '/skills', icon: 'mdi:code-braces' },
  { name: t('nav.projects'), path: '/projects', icon: 'mdi:folder-multiple' },
  { name: t('nav.experience'), path: '/experience', icon: 'mdi:briefcase' },
  { name: 'Services', path: '/services', icon: 'mdi:shopping' },
  { name: t('nav.contact'), path: '/contact', icon: 'mdi:email' },
]);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
}

function toggleThemeMenu() {
  isThemeMenuOpen.value = !isThemeMenuOpen.value;
}

function selectTheme(themeId: any) {
  themeStore.setTheme(themeId);
  isThemeMenuOpen.value = false;
}
</script>

<template>
  <header 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-nord-3/30"
    :class="{ 'bg-nord-0/90 backdrop-blur-xl py-3 shadow-glass': true }"
  >
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <!-- Logo / Terminal Prompt -->
        <RouterLink to="/" class="flex items-center gap-2 group" aria-label="Navigate to home page">
          <div class="w-3 h-3 rounded-full bg-terminal-green animate-pulse" aria-hidden="true"></div>
          <span class="font-mono text-nord-4 font-bold text-lg group-hover:text-terminal-green transition-colors">
            ramesh@portfolio:~$
          </span>
        </RouterLink>
        
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-8" aria-label="Main navigation">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="relative font-mono text-sm text-nord-4 hover:text-terminal-green transition-all duration-200 py-1 group"
            :class="{ 'text-terminal-green': route.path === link.path }"
            :aria-label="`Navigate to ${link.name}`"
            :aria-current="route.path === link.path ? 'page' : undefined"
          >
            <span class="flex items-center gap-2">
              <span class="opacity-50 text-xs group-hover:opacity-100 transition-opacity">&lt;</span>
              <span class="group-hover:tracking-wide transition-all">{{ link.name }}</span>
              <span class="opacity-50 text-xs group-hover:opacity-100 transition-opacity">/&gt;</span>
            </span>
            <!-- Active Indicator -->
            <span 
              v-if="route.path === link.path"
              class="absolute -bottom-1 left-0 w-full h-0.5 bg-terminal-green shadow-terminal animate-pulse-slow"
            ></span>
            <!-- Hover Indicator -->
            <span 
              class="absolute -bottom-1 left-0 w-0 h-0.5 bg-nord-8 group-hover:w-full transition-all duration-300"
            ></span>
          </RouterLink>
        </nav>

        <div class="flex items-center gap-4">
          <!-- Theme Switcher -->
          <div class="relative hidden sm:block" ref="themeMenuRef">
            <button 
              @click="toggleThemeMenu"
              class="flex items-center gap-2 text-nord-4 hover:text-terminal-green transition-all duration-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-terminal-green/50 border border-nord-3/50 px-3 py-1.5 rounded-full hover:border-terminal-green/50 hover:bg-nord-3/30 backdrop-blur-sm hover:shadow-glow-sm group"
              aria-label="Theme selector"
              :aria-expanded="isThemeMenuOpen"
              aria-haspopup="true"
            >
              <Icon icon="mdi:palette" class="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span>{{ themeStore.currentTheme }}</span>
              <Icon :icon="isThemeMenuOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'" class="w-3 h-3 transition-transform" />
            </button>
            
            <!-- Dropdown -->
            <div 
              v-if="isThemeMenuOpen"
              class="absolute top-full right-0 mt-2 w-40 bg-nord-1/95 backdrop-blur-xl border border-nord-3 rounded-lg shadow-glass py-1 z-50 animate-slide-down"
              role="menu"
              aria-label="Theme options"
            >
              <button
                v-for="theme in availableThemes"
                :key="theme.id"
                @click="selectTheme(theme.id)"
                class="w-full text-left px-4 py-2 text-xs font-mono hover:bg-nord-2 focus:outline-none focus:bg-nord-2 transition-all duration-200 flex items-center justify-between group"
                :class="themeStore.currentTheme === theme.id ? 'text-terminal-green bg-nord-2/50' : 'text-nord-4'"
                role="menuitem"
                :aria-label="`Select ${theme.name} theme`"
                :aria-checked="themeStore.currentTheme === theme.id"
              >
                <span class="group-hover:translate-x-1 transition-transform">{{ theme.name }}</span>
                <Icon v-if="themeStore.currentTheme === theme.id" icon="mdi:check" class="w-3 h-3 animate-scale-in" />
              </button>
            </div>
          </div>

          <!-- Language Switcher -->
          <LanguageSwitcher class="hidden sm:block" />

          <!-- Mobile Menu Button -->
          <button
            @click="toggleMenu"
            class="md:hidden text-nord-4 hover:text-terminal-green transition-colors p-2 focus:outline-none focus:ring-2 focus:ring-terminal-green/50 rounded"
            aria-label="Toggle mobile menu"
            :aria-expanded="isMenuOpen"
          >
            <Icon :icon="isMenuOpen ? 'mdi:close' : 'mdi:menu'" class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <Transition name="slide-down">
      <nav
        v-if="isMenuOpen"
        class="md:hidden absolute top-full left-0 right-0 bg-nord-1/98 backdrop-blur-xl border-b border-nord-3/50 shadow-glass"
        aria-label="Mobile navigation"
      >
        <div class="flex flex-col p-4 gap-2">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="flex items-center gap-3 text-nord-4 hover:text-terminal-green hover:bg-nord-2/50 transition-all duration-200 font-mono text-sm py-3 px-4 rounded-lg border border-transparent hover:border-nord-3/30 group relative overflow-hidden"
            :class="{ 'text-terminal-green bg-nord-2/50 border-nord-3/30': route.path === link.path }"
            @click="closeMenu"
          >
            <!-- Gradient overlay on hover -->
            <div class="absolute inset-0 bg-gradient-to-r from-terminal-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <Icon :icon="link.icon" class="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" />
            <span class="relative z-10">{{ link.name }}</span>
          </RouterLink>
          
          <!-- Mobile Theme Switcher -->
          <div class="mt-2 pt-2 border-t border-nord-3/30">
            <p class="text-xs text-nord-4/50 px-4 mb-2 font-mono">SELECT THEME</p>
            <div class="grid grid-cols-3 gap-2 px-2">
              <button
                v-for="theme in availableThemes"
                :key="theme.id"
                @click="selectTheme(theme.id)"
                class="text-xs font-mono py-2 rounded border transition-colors text-center"
                :class="themeStore.currentTheme === theme.id ? 'border-terminal-green text-terminal-green bg-nord-3/30' : 'border-nord-3/30 text-nord-4 hover:border-nord-3'"
              >
                {{ theme.name }}
              </button>
            </div>
          </div>
          
          <!-- Mobile Language Switcher -->
          <div class="mt-2 pt-2 border-t border-nord-3/30">
            <LanguageSwitcher class="w-full" />
          </div>
        </div>
      </nav>
    </Transition>
  </header>

  <!-- Spacer to prevent content from going under fixed header -->
  <!-- <div class="h-[70px]"></div> -->
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
