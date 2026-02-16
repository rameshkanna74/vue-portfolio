import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useThemeStore } from '../stores/theme';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock document methods
Object.defineProperty(globalThis.document, 'documentElement', {
  value: {
    setAttribute: vi.fn(),
    classList: {
      toggle: vi.fn(),
      add: vi.fn(),
      remove: vi.fn(),
    },
  },
  writable: true,
});

describe('Theme Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('initializes with default theme', () => {
    const store = useThemeStore();
    expect(store.currentTheme).toBe('night-owl');
  });

  it('changes theme correctly', () => {
    const store = useThemeStore();
    
    store.setTheme('catppuccin');
    expect(store.currentTheme).toBe('catppuccin');
    
    store.setTheme('atom-one-dark');
    expect(store.currentTheme).toBe('atom-one-dark');
  });

  it('has available themes', () => {
    const store = useThemeStore();
    expect(['nord', 'catppuccin', 'atom-one-dark', 'night-owl']).toContain(store.currentTheme);
  });
});
