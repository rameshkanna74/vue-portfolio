<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Icon } from '@iconify/vue';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
}

const repos = ref<GitHubRepo[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const languageColors: Record<string, string> = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Vue: '#41b883',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  // Add more as needed
};

async function fetchGitHubRepos() {
  try {
    loading.value = true;
    // Fetch user's public repos (sorted by stars/updated)
    const response = await fetch('https://api.github.com/users/rameshkanna74/repos?sort=updated&per_page=6');
    
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repositories');
    }
    
    const data = await response.json();
    repos.value = data;
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error occurred';
    console.error('GitHub API error:', err);
  } finally {
    loading.value = false;
  }
}

function getLanguageColor(language: string | null): string {
  if (!language) return '#6c757d';
  return languageColors[language] || '#6c757d';
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 30) {
    return `Updated ${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `Updated ${months} month${months > 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `Updated ${years} year${years > 1 ? 's' : ''} ago`;
  }
}

onMounted(() => {
  fetchGitHubRepos();
});
</script>

<template>
  <div class="github-showcase mb-16">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-nord-6 mb-4 flex items-center justify-center gap-3">
        <Icon icon="mdi:github" class="w-8 h-8 text-nord-8" />
        <span>Open Source Contributions</span>
      </h2>
      <p class="text-nord-4 font-mono text-sm">
        Explore my latest GitHub projects showcasing code quality and technical expertise
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="i in 6" 
        :key="i"
        class="glassmorphism-card rounded-xl p-6 border border-nord-3/30 animate-pulse"
      >
        <div class="h-6 bg-nord-3/30 rounded mb-3"></div>
        <div class="h-4 bg-nord-3/20 rounded mb-2"></div>
        <div class="h-4 bg-nord-3/20 rounded w-3/4"></div>
      </div>
    </div>

    <!-- Error State -->
    <div 
      v-else-if="error" 
      class="glassmorphism-card rounded-xl p-8 border border-nord-11/30 text-center"
    >
      <Icon icon="mdi:alert-circle" class="w-12 h-12 text-nord-11 mx-auto mb-4" />
      <p class="text-nord-11 font-mono text-sm">{{ error }}</p>
      <button 
        @click="fetchGitHubRepos"
        class="mt-4 px-4 py-2 bg-nord-8 text-nord-0 rounded-lg hover:bg-nord-9 transition-colors font-mono text-sm"
      >
        Retry
      </button>
    </div>

    <!-- GitHub Repos Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <a
        v-for="repo in repos"
        :key="repo.id"
        :href="repo.html_url"
        target="_blank"
        rel="noopener noreferrer"
        class="group glassmorphism-card rounded-xl p-6 border border-nord-3/30 hover:border-nord-8/50 transition-all duration-300 hover:shadow-glow-md hover:-translate-y-1"
      >
        <!-- Repo Header -->
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-2">
            <Icon icon="mdi:source-repository" class="w-5 h-5 text-nord-8" />
            <h3 class="text-nord-6 font-semibold group-hover:text-terminal-green transition-colors">
              {{ repo.name }}
            </h3>
          </div>
          <Icon 
            icon="mdi:open-in-new" 
            class="w-4 h-4 text-nord-4 opacity-0 group-hover:opacity-100 transition-opacity" 
          />
        </div>

        <!-- Description -->
        <p class="text-nord-4 text-sm mb-4 line-clamp-2 min-h-[40px]">
          {{ repo.description || 'No description provided' }}
        </p>

        <!-- Topics/Tags -->
        <div v-if="repo.topics && repo.topics.length > 0" class="flex flex-wrap gap-2 mb-4">
          <span
            v-for="topic in repo.topics.slice(0, 3)"
            :key="topic"
            class="px-2 py-1 bg-nord-3/30 text-nord-8 text-xs rounded-full font-mono"
          >
            {{ topic }}
          </span>
        </div>

        <!-- Stats -->
        <div class="flex items-center gap-4 text-xs text-nord-4 font-mono pt-4 border-t border-nord-3/30">
          <!-- Language -->
          <div v-if="repo.language" class="flex items-center gap-1.5">
            <span 
              class="w-3 h-3 rounded-full" 
              :style="{ backgroundColor: getLanguageColor(repo.language) }"
            ></span>
            <span>{{ repo.language }}</span>
          </div>

          <!-- Stars -->
          <div class="flex items-center gap-1">
            <Icon icon="mdi:star" class="w-4 h-4" />
            <span>{{ repo.stargazers_count }}</span>
          </div>

          <!-- Forks -->
          <div class="flex items-center gap-1">
            <Icon icon="mdi:source-fork" class="w-4 h-4" />
            <span>{{ repo.forks_count }}</span>
          </div>
        </div>

        <!-- Last Updated -->
        <div class="mt-2 text-xs text-nord-4/60 font-mono">
          {{ formatDate(repo.updated_at) }}
        </div>
      </a>
    </div>

    <!-- View All GitHub Link -->
    <div class="text-center mt-8">
      <a
        href="https://github.com/rameshkanna74"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-6 py-3 bg-nord-3/30 hover:bg-nord-3/50 text-nord-6 rounded-lg transition-all duration-300 font-mono text-sm border border-nord-3/50 hover:border-nord-8/50 hover:shadow-glow-sm group"
      >
        <Icon icon="mdi:github" class="w-5 h-5" />
        <span>View All Repositories</span>
        <Icon icon="mdi:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
