import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import GitHubShowcase from '../components/sections/GitHubShowcase.vue';

// Mock fetch globally
global.fetch = vi.fn();

describe('GitHubShowcase', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state initially', () => {
    const wrapper = mount(GitHubShowcase);
    
    // Should show loading skeleton
    expect(wrapper.find('.animate-pulse').exists()).toBe(true);
  });

  it('should fetch GitHub repos on mount', async () => {
    const mockRepos = [
      {
        id: 1,
        name: 'test-repo',
        description: 'Test repository',
        html_url: 'https://github.com/rameshkanna74/test-repo',
        stargazers_count: 10,
        forks_count: 5,
        language: 'Python',
        topics: ['django', 'python'],
        updated_at: '2024-01-01T00:00:00Z',
      },
    ];

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRepos,
    });

    const wrapper = mount(GitHubShowcase);
    
    // Wait for fetch to complete
    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.github.com/users/rameshkanna74/repos?sort=updated&per_page=6'
    );
  });

  it('should display repos after successful fetch', async () => {
    const mockRepos = [
      {
        id: 1,
        name: 'awesome-project',
        description: 'An awesome project',
        html_url: 'https://github.com/rameshkanna74/awesome-project',
        stargazers_count: 42,
        forks_count: 7,
        language: 'TypeScript',
        topics: ['vue', 'typescript'],
        updated_at: '2024-01-01T00:00:00Z',
      },
    ];

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRepos,
    });

    const wrapper = mount(GitHubShowcase);
    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 100));

    // Should display repo name
    expect(wrapper.text()).toContain('awesome-project');
    expect(wrapper.text()).toContain('An awesome project');
  });

  it('should display error state on fetch failure', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    const wrapper = mount(GitHubShowcase);
    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 100));

    // Should show error message
    expect(wrapper.find('.text-nord-11').exists()).toBe(true);
  });

  it('should display retry button on error', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    const wrapper = mount(GitHubShowcase);
    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 100));

    const retryButton = wrapper.find('button');
    expect(retryButton.exists()).toBe(true);
    expect(retryButton.text()).toContain('Retry');
  });

  it('should handle repos without description', async () => {
    const mockRepos = [
      {
        id: 1,
        name: 'no-desc-repo',
        description: null,
        html_url: 'https://github.com/rameshkanna74/no-desc-repo',
        stargazers_count: 0,
        forks_count: 0,
        language: 'JavaScript',
        topics: [],
        updated_at: '2024-01-01T00:00:00Z',
      },
    ];

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRepos,
    });

    const wrapper = mount(GitHubShowcase);
    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(wrapper.text()).toContain('No description provided');
  });

  it('should display language color indicator', async () => {
    const mockRepos = [
      {
        id: 1,
        name: 'python-repo',
        description: 'Python project',
        html_url: 'https://github.com/rameshkanna74/python-repo',
        stargazers_count: 5,
        forks_count: 2,
        language: 'Python',
        topics: [],
        updated_at: '2024-01-01T00:00:00Z',
      },
    ];

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRepos,
    });

    const wrapper = mount(GitHubShowcase);
    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 100));

    // Should have language indicator
    const languageIndicator = wrapper.find('.w-3.h-3.rounded-full');
    expect(languageIndicator.exists()).toBe(true);
  });

  it('should display stars and forks count', async () => {
    const mockRepos = [
      {
        id: 1,
        name: 'popular-repo',
        description: 'Popular project',
        html_url: 'https://github.com/rameshkanna74/popular-repo',
        stargazers_count: 100,
        forks_count: 25,
        language: 'Python',
        topics: [],
        updated_at: '2024-01-01T00:00:00Z',
      },
    ];

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRepos,
    });

    const wrapper = mount(GitHubShowcase);
    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(wrapper.text()).toContain('100');
    expect(wrapper.text()).toContain('25');
  });

  it('should limit topics display to 3', async () => {
    const mockRepos = [
      {
        id: 1,
        name: 'multi-topic-repo',
        description: 'Repo with many topics',
        html_url: 'https://github.com/rameshkanna74/multi-topic-repo',
        stargazers_count: 10,
        forks_count: 5,
        language: 'Python',
        topics: ['django', 'python', 'vue', 'typescript', 'docker'],
        updated_at: '2024-01-01T00:00:00Z',
      },
    ];

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRepos,
    });

    const wrapper = mount(GitHubShowcase);
    await wrapper.vm.$nextTick();
    await new Promise(resolve => setTimeout(resolve, 100));

    // Should only show first 3 topics
    const topics = wrapper.findAll('.px-2.py-1.bg-nord-3\\/30');
    expect(topics.length).toBeLessThanOrEqual(3);
  });
});
