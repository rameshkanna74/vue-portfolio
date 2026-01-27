<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import gsap from 'gsap';
import { usePortfolioStore } from '../stores/portfolio';
import { useGsapAnimations } from '../composables/useGsapAnimations';
import { useSEO } from '../composables/useSEO';
import { Icon } from '@iconify/vue';

const portfolioStore = usePortfolioStore();
const { slideUp } = useGsapAnimations();

useSEO({
  title: 'About Me | Ramesh Kanna',
  description: 'Learn about my background, experience, and passion for creative development.',
});

const profile = computed(() => portfolioStore.portfolioData.profile);
const education = computed(() => portfolioStore.portfolioData.education[0]);

const headerRef = ref<HTMLElement | null>(null);
const summaryRef = ref<HTMLElement | null>(null);
const educationRef = ref<HTMLElement | null>(null);
const contactRef = ref<HTMLElement | null>(null);
const linksRef = ref<HTMLElement | null>(null);
const languagesRef = ref<HTMLElement | null>(null);
const interestsRef = ref<HTMLElement | null>(null);

// Language proficiency mapping
const languageLevels: Record<string, number> = {
  'Native': 100,
  'Professional': 90,
  'Intermediate': 70,
  'Basic': 50,
  // Japanese mappings
  'ネイティブ': 100,
  'ビジネスレベル': 90,
  '日常会話レベル': 60,
};

onMounted(() => {
  if (headerRef.value) {
    slideUp(headerRef.value);
  }

  // Scroll-triggered reveals for each section
  const sections = [
    summaryRef.value,
    educationRef.value,
    contactRef.value,
    linksRef.value,
    languagesRef.value,
    interestsRef.value,
  ].filter(Boolean);

  sections.forEach((section) => {
    gsap.fromTo(
      section,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // Animate language progress bars
  if (languagesRef.value) {
    const bars = languagesRef.value.querySelectorAll('.language-bar');
    bars.forEach((bar) => {
      gsap.fromTo(
        bar,
        { width: '0%' },
        {
          width: bar.getAttribute('data-width') + '%',
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: languagesRef.value,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }

  // Animate interests list items
  if (interestsRef.value) {
    const items = interestsRef.value.querySelectorAll('.interest-item');
    gsap.fromTo(
      items,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: interestsRef.value,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }
});
</script>

<template>
  <div class="min-h-screen py-20 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div ref="headerRef" class="text-center mb-16">
        <h1 class="text-5xl font-bold text-nord-6 mb-4">
          <span class="text-gradient-premium">About Me</span>
        </h1>
        <p class="text-nord-4 font-mono text-lg flex items-center justify-center gap-2">
          <Icon icon="mdi:account-circle" class="w-5 h-5 text-nord-8" />
          <span class="text-terminal-green">$</span> cat ~/profile.txt
        </p>
      </div>
      
      <!-- Profile Summary -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <!-- Main Info -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Professional Summary -->
          <div 
            ref="summaryRef"
            class="group relative overflow-hidden rounded-lg bg-nord-1/80 backdrop-blur-md border border-nord-3/50 p-8 transition-all duration-300 hover:bg-nord-1/90 hover:border-nord-8/70 hover:shadow-glow-md hover:-translate-y-1"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-nord-8/5 to-nord-10/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="relative z-10">
              <h2 class="text-2xl font-bold text-nord-6 mb-4 flex items-center gap-2">
                <Icon icon="mdi:briefcase" class="w-6 h-6 text-nord-8" />
                Professional Summary
              </h2>
              <p class="text-nord-4 leading-relaxed">{{ profile.summary }}</p>
            </div>
          </div>
          
          <!-- Education -->
          <div 
            v-if="education"
            ref="educationRef"
            class="group relative overflow-hidden rounded-lg bg-nord-1/80 backdrop-blur-md border border-nord-3/50 p-8 transition-all duration-300 hover:bg-nord-1/90 hover:border-nord-9/70 hover:shadow-glow-md hover:-translate-y-1"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-nord-9/5 to-nord-10/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="relative z-10">
              <h2 class="text-2xl font-bold text-nord-6 mb-4 flex items-center gap-2">
                <Icon icon="mdi:school" class="w-6 h-6 text-nord-9" />
                Education
              </h2>
              <div class="space-y-3">
                <h3 class="text-xl font-semibold text-nord-8">{{ education.degree }} in {{ education.field }}</h3>
                <p class="text-nord-4 flex items-center gap-2">
                  <Icon icon="mdi:bank" class="w-4 h-4 text-nord-8" />
                  {{ education.institution }}
                </p>
                <p class="text-sm text-nord-3 font-mono flex items-center gap-2">
                  <Icon icon="mdi:map-marker" class="w-4 h-4" />
                  {{ education.location }} | {{ education.startDate.substring(0, 4) }} - {{ education.endDate.substring(0, 4) }}
                </p>
                <div class="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-nord-8/10 border border-nord-8/30 rounded-lg">
                  <Icon icon="mdi:trophy" class="w-5 h-5 text-nord-8" />
                  <span class="text-nord-8 font-bold">CGPA: {{ education.gpa }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Contact & Links -->
        <div class="space-y-6">
          <!-- Contact -->
          <div 
            ref="contactRef"
            class="group relative overflow-hidden rounded-lg bg-nord-1/80 backdrop-blur-md border border-nord-3/50 p-6 transition-all duration-300 hover:bg-nord-1/90 hover:border-nord-8/70 hover:shadow-glow-md hover:-translate-y-1"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-nord-8/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="relative z-10">
              <h2 class="text-xl font-bold text-nord-6 mb-4 flex items-center gap-2">
                <Icon icon="mdi:email-outline" class="w-5 h-5 text-nord-8" />
                Contact
              </h2>
              <div class="space-y-3">
                <a :href="`mailto:${profile.email}`" class="group/link flex items-center gap-3 text-nord-4 hover:text-nord-8 transition-all duration-200 p-2 rounded-lg hover:bg-nord-2/50">
                  <Icon icon="mdi:email" class="w-5 h-5 text-nord-8 group-hover/link:scale-110 transition-transform" />
                  <span class="text-sm break-all">{{ profile.email }}</span>
                </a>
                <a :href="`tel:${profile.phone}`" class="group/link flex items-center gap-3 text-nord-4 hover:text-nord-8 transition-all duration-200 p-2 rounded-lg hover:bg-nord-2/50">
                  <Icon icon="mdi:phone" class="w-5 h-5 text-nord-8 group-hover/link:scale-110 transition-transform" />
                  <span class="text-sm">{{ profile.phone }}</span>
                </a>
                <div class="flex items-center gap-3 text-nord-4 p-2">
                  <Icon icon="mdi:map-marker" class="w-5 h-5 text-nord-8" />
                  <span class="text-sm">{{ profile.location }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Links -->
          <div 
            ref="linksRef"
            class="group relative overflow-hidden rounded-lg bg-nord-1/80 backdrop-blur-md border border-nord-3/50 p-6 transition-all duration-300 hover:bg-nord-1/90 hover:border-nord-10/70 hover:shadow-glow-md hover:-translate-y-1"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-nord-10/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="relative z-10">
              <h2 class="text-xl font-bold text-nord-6 mb-4 flex items-center gap-2">
                <Icon icon="mdi:link-variant" class="w-5 h-5 text-nord-10" />
                Links
              </h2>
              <div class="space-y-3">
                <a :href="profile.links.github" target="_blank" rel="noopener noreferrer" class="group/link flex items-center gap-3 text-nord-4 hover:text-nord-8 transition-all duration-200 p-2 rounded-lg hover:bg-nord-2/50">
                  <Icon icon="mdi:github" class="w-5 h-5 text-nord-8 group-hover/link:scale-110 group-hover/link:rotate-12 transition-all" />
                  <span class="text-sm">GitHub</span>
                  <Icon icon="mdi:open-in-new" class="w-3 h-3 ml-auto opacity-0 group-hover/link:opacity-100 transition-opacity" />
                </a>
                <a :href="profile.links.linkedin" target="_blank" rel="noopener noreferrer" class="group/link flex items-center gap-3 text-nord-4 hover:text-nord-8 transition-all duration-200 p-2 rounded-lg hover:bg-nord-2/50">
                  <Icon icon="mdi:linkedin" class="w-5 h-5 text-nord-8 group-hover/link:scale-110 group-hover/link:rotate-12 transition-all" />
                  <span class="text-sm">LinkedIn</span>
                  <Icon icon="mdi:open-in-new" class="w-3 h-3 ml-auto opacity-0 group-hover/link:opacity-100 transition-opacity" />
                </a>
                <a :href="profile.links.leetcode" target="_blank" rel="noopener noreferrer" class="group/link flex items-center gap-3 text-nord-4 hover:text-nord-8 transition-all duration-200 p-2 rounded-lg hover:bg-nord-2/50">
                  <Icon icon="mdi:code-braces-box" class="w-5 h-5 text-nord-8 group-hover/link:scale-110 group-hover/link:rotate-12 transition-all" />
                  <span class="text-sm">LeetCode (200+ problems)</span>
                  <Icon icon="mdi:open-in-new" class="w-3 h-3 ml-auto opacity-0 group-hover/link:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Languages & Interests -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Languages -->
        <div 
          ref="languagesRef"
          class="group relative overflow-hidden rounded-lg bg-nord-1/80 backdrop-blur-md border border-nord-3/50 p-8 transition-all duration-300 hover:bg-nord-1/90 hover:border-nord-14/70 hover:shadow-glow-md hover:-translate-y-1"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-nord-14/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <h2 class="text-2xl font-bold text-nord-6 mb-6 flex items-center gap-2">
              <Icon icon="mdi:translate" class="w-6 h-6 text-nord-14" />
              Languages
            </h2>
            <div class="space-y-5">
              <div v-for="lang in profile.languages" :key="lang.name" class="space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-nord-4 font-medium">{{ lang.name }}</span>
                  <span class="text-nord-8 text-sm font-semibold">{{ lang.level }}</span>
                </div>
                <!-- Progress bar -->
                <div class="relative h-2 bg-nord-2/50 rounded-full overflow-hidden backdrop-blur-sm">
                  <div
                    class="language-bar absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-nord-14 to-nord-13"
                    :data-width="languageLevels[lang.level] || 50"
                  >
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  </div>
                </div>
                <p v-if="lang.certification" class="text-xs text-nord-3 font-mono flex items-center gap-1">
                  <Icon icon="mdi:certificate" class="w-3 h-3" />
                  {{ lang.certification }}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Interests -->
        <div 
          ref="interestsRef"
          class="group relative overflow-hidden rounded-lg bg-nord-1/80 backdrop-blur-md border border-nord-3/50 p-8 transition-all duration-300 hover:bg-nord-1/90 hover:border-nord-13/70 hover:shadow-glow-md hover:-translate-y-1"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-nord-13/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative z-10">
            <h2 class="text-2xl font-bold text-nord-6 mb-6 flex items-center gap-2">
              <Icon icon="mdi:star" class="w-6 h-6 text-nord-13" />
              Interests
            </h2>
            <ul class="space-y-3">
              <li v-for="interest in profile.interests" :key="interest" class="interest-item text-nord-4 flex gap-3 items-center group/item">
                <span class="text-nord-8 text-lg group-hover/item:scale-125 transition-transform">▸</span>
                <span class="group-hover/item:text-nord-6 transition-colors">{{ interest }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
