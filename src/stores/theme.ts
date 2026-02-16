import { defineStore } from 'pinia';
import { ref } from 'vue';

export type Theme = 'nord' | 'nord-light' | 'catppuccin' | 'atom-one-dark' | 'night-owl';

export const availableThemes: { id: Theme; name: string }[] = [
  { id: 'nord', name: 'Nord Dark' },
  { id: 'nord-light', name: 'Nord Light' },
  { id: 'catppuccin', name: 'Catppuccin' },
  { id: 'atom-one-dark', name: 'Atom One Dark' },
  { id: 'night-owl', name: 'Night Owl' },
];

export const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref<Theme>('night-owl');
  const isDark = ref(true);
  const terminalMode = ref(false);
  const desktopMode = ref(false);

  function setTheme(theme: Theme) {
    currentTheme.value = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }

  function toggleDarkMode() {
    isDark.value = !isDark.value;
    document.documentElement.classList.toggle('dark', isDark.value);
    localStorage.setItem('portfolio-dark-mode', String(isDark.value));
  }

  function toggleTerminalMode() {
    terminalMode.value = !terminalMode.value;
    localStorage.setItem('portfolio-terminal-mode', String(terminalMode.value));
  }

  function toggleDesktopMode() {
    desktopMode.value = !desktopMode.value;
    localStorage.setItem('portfolio-desktop-mode', String(desktopMode.value));
  }

  function initTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
    const savedDarkMode = localStorage.getItem('portfolio-dark-mode');
    const savedTerminalMode = localStorage.getItem('portfolio-terminal-mode');
    const savedDesktopMode = localStorage.getItem('portfolio-desktop-mode');

    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme(currentTheme.value);
    }
    
    if (savedDarkMode !== null) {
      isDark.value = savedDarkMode === 'true';
    } else {
      // Default to dark mode or system preference
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches || true;
    }
    document.documentElement.classList.toggle('dark', isDark.value);

    if (savedTerminalMode) {
      terminalMode.value = savedTerminalMode === 'true';
    }
    if (savedDesktopMode) {
      desktopMode.value = savedDesktopMode === 'true';
    }
  }

  return {
    currentTheme,
    isDark,
    terminalMode,
    desktopMode,
    setTheme,
    toggleDarkMode,
    toggleTerminalMode,
    toggleDesktopMode,
    initTheme,
  };
});
