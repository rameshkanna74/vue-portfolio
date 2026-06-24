import { create } from 'zustand';

export type Theme = 'night-owl';

export const availableThemes: { id: Theme; name: string }[] = [
  { id: 'night-owl', name: 'Production Dark' },
];

interface ThemeState {
  currentTheme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  initTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  currentTheme: 'night-owl',
  isDark: true,

  setTheme: (theme: Theme) => {
    set({ currentTheme: theme });
    document.documentElement.setAttribute('data-theme', theme);
  },

  initTheme: () => {
    document.documentElement.setAttribute('data-theme', 'night-owl');
    document.documentElement.classList.add('dark');
  },
}));

