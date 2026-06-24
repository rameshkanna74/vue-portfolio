import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ja from './locales/ja.json';
import { usePortfolioStore } from '../store/usePortfolioStore';

const getBrowserLanguage = (): string => {
  const saved = localStorage.getItem('portfolio-language');
  if (saved) return saved;
  
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('ja')) return 'ja';
  return 'en';
};

const initialLanguage = getBrowserLanguage();

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ja: { translation: ja }
    },
    lng: initialLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false 
    }
  });

// Subscribe to language changes to update the portfolio store
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('portfolio-language', lng);
  document.documentElement.lang = lng;
  usePortfolioStore.getState().updateDataForLocale(lng);
});

export const changeLanguage = (locale: 'en' | 'ja') => {
  i18n.changeLanguage(locale);
};

export default i18n;
