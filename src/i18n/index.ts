import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import ja from './locales/ja.json';

// Detect user's preferred language
const getBrowserLanguage = (): string => {
  const saved = localStorage.getItem('portfolio-language');
  if (saved) return saved;
  
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('ja')) return 'ja';
  return 'en';
};

const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: getBrowserLanguage(),
  fallbackLocale: 'en',
  messages: {
    en,
    ja,
  },
  datetimeFormats: {
    en: {
      short: {
        year: 'numeric',
        month: 'short',
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
    },
    ja: {
      short: {
        year: 'numeric',
        month: 'short',
        era: 'long',
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        era: 'long',
      },
    },
  },
  numberFormats: {
    en: {
      currency: {
        style: 'currency',
        currency: 'USD',
      },
    },
    ja: {
      currency: {
        style: 'currency',
        currency: 'JPY',
      },
    },
  },
});

export default i18n;

// Helper to change language
export const changeLanguage = (locale: 'en' | 'ja') => {
  i18n.global.locale.value = locale;
  localStorage.setItem('portfolio-language', locale);
  document.documentElement.lang = locale;
};
