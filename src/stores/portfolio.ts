import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import * as enData from '../data/resume';
import * as jaData from '../data/resume.ja';
import type { PortfolioData } from '../types/portfolio';

export const usePortfolioStore = defineStore('portfolio', () => {
  const { locale } = useI18n();

  // Dynamic data based on locale
  const portfolioData = computed<PortfolioData>(() => {
    const data = locale.value === 'ja' ? jaData : enData;
    return {
      profile: data.profile,
      skills: data.skills,
      projects: data.projects,
      experience: data.experience,
      education: data.education,
    };
  });

  const skillsByCategory = computed(() => {
    // Dynamically get unique categories from the current skills data
    const categories = Array.from(new Set(portfolioData.value.skills.map(s => s.category)));
    
    return categories.map(category => ({
      category,
      skills: portfolioData.value.skills.filter(skill => skill.category === category),
    }));
  });

  const sortedExperience = computed(() => {
    return [...portfolioData.value.experience].sort((a, b) => {
      const dateA = a.endDate === 'Present' || a.endDate === '現在' ? new Date() : new Date(a.endDate);
      const dateB = b.endDate === 'Present' || b.endDate === '現在' ? new Date() : new Date(b.endDate);
      return dateB.getTime() - dateA.getTime();
    });
  });

  const sortedProjects = computed(() => {
    return [...portfolioData.value.projects].sort((a, b) => b.year - a.year);
  });

  function getProjectById(id: string) {
    return portfolioData.value.projects.find(project => project.id === id);
  }

  function filterSkills(category: string) {
    return portfolioData.value.skills.filter(skill => skill.category === category);
  }

  return {
    portfolioData,
    skillsByCategory,
    sortedExperience,
    sortedProjects,
    getProjectById,
    filterSkills,
  };
});
