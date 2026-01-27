<script setup>
import { useI18n } from "vue-i18n";
import { changeLanguage } from "../../i18n";

const { locale } = useI18n();

const toggleLanguage = () => {
  const newLocale = locale.value === "en" ? "ja" : "en";
  changeLanguage(newLocale);
};
</script>

<template>
  <button
    @click="toggleLanguage"
    class="flex items-center gap-2 text-nord-4 hover:text-terminal-green transition-all duration-200 text-xs font-mono focus:outline-none border border-nord-3/50 px-3 py-1.5 rounded-full hover:border-terminal-green/50 hover:bg-nord-3/30 backdrop-blur-sm hover:shadow-glow-sm group"
    :aria-label="locale === 'en' ? 'Switch to Japanese' : '日本語から英語に切り替え'"
  >
    <!-- Language Code -->
    <span class="font-bold">
      {{ locale === 'en' ? 'EN' : 'JP' }}
    </span>
    <span class="opacity-50">/</span>
    <span class="opacity-70 group-hover:opacity-100 transition-opacity">
      {{ locale === 'en' ? 'JP' : 'EN' }}
    </span>
  </button>
</template>

<style scoped>
/* Styles handled by Tailwind classes to match header */
</style>
