import { create } from 'zustand';
import * as enData from '../data/resume';
import * as jaData from '../data/resume.ja';
import type { PortfolioData } from '../types/portfolio';

interface PortfolioState {
  portfolioData: PortfolioData;
  skillsByCategory: { category: string; skills: any[] }[];
  sortedExperience: any[];
  sortedProjects: any[];
  getProjectById: (id: string) => any;
  filterSkills: (category: string) => any[];
  updateDataForLocale: (locale: string) => void;
}

export const usePortfolioStore = create<PortfolioState>((set, get) => {
  const getInitialLocale = () => {
    const saved = localStorage.getItem('portfolio-language');
    if (saved) return saved;
    return navigator.language.toLowerCase().startsWith('ja') ? 'ja' : 'en';
  };
  const getInitialData = () => getInitialLocale() === 'ja' ? jaData : enData;

  const computeDerivedData = (data: PortfolioData) => {
    const categories = Array.from(new Set(data.skills.map(s => s.category)));
    const skillsByCategory = categories.map(category => ({
      category,
      skills: data.skills.filter(skill => skill.category === category),
    }));

    const sortedExperience = [...data.experience].sort((a, b) => {
      const dateA = a.endDate === 'Present' || a.endDate === '現在' ? new Date() : new Date(a.endDate);
      const dateB = b.endDate === 'Present' || b.endDate === '現在' ? new Date() : new Date(b.endDate);
      return dateB.getTime() - dateA.getTime();
    });

    const sortedProjects = [...data.projects].sort((a, b) => b.year - a.year);

    return { skillsByCategory, sortedExperience, sortedProjects };
  };

  const initialData = getInitialData();
  const initialDerived = computeDerivedData(initialData);

  return {
    portfolioData: initialData,
    ...initialDerived,

    getProjectById: (id: string) => {
      return get().portfolioData.projects.find((project: any) => project.id === id);
    },

    filterSkills: (category: string) => {
      return get().portfolioData.skills.filter((skill: any) => skill.category === category);
    },

    updateDataForLocale: (locale: string) => {
      const newData = locale === 'ja' ? jaData : enData;
      const newDerived = computeDerivedData(newData);
      set({
        portfolioData: newData,
        ...newDerived
      });
    }
  };
});
