import { describe, it, expect, beforeEach } from 'vitest';
import { createRouter, createMemoryHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import AboutPage from '../views/AboutPage.vue';
import SkillsPage from '../views/SkillsPage.vue';
import ProjectsPage from '../views/ProjectsPage.vue';
import ExperiencePage from '../views/ExperiencePage.vue';
import ServicesPage from '../views/ServicesPage.vue';
import ContactPage from '../views/ContactPage.vue';

describe('Router', () => {
  let router: ReturnType<typeof createRouter>;

  beforeEach(() => {
    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', name: 'home', component: HomePage, meta: { title: 'Home - Ramesh Kanna' } },
        { path: '/about', name: 'about', component: AboutPage, meta: { title: 'About - Ramesh Kanna' } },
        { path: '/skills', name: 'skills', component: SkillsPage, meta: { title: 'Skills - Ramesh Kanna' } },
        { path: '/projects', name: 'projects', component: ProjectsPage, meta: { title: 'Projects - Ramesh Kanna' } },
        { path: '/experience', name: 'experience', component: ExperiencePage, meta: { title: 'Experience - Ramesh Kanna' } },
        { path: '/services', name: 'services', component: ServicesPage, meta: { title: 'Services & Pricing - Ramesh Kanna' } },
        { path: '/contact', name: 'contact', component: ContactPage, meta: { title: 'Contact - Ramesh Kanna' } },
      ],
    });
  });

  it('should navigate to home page', async () => {
    await router.push('/');
    expect(router.currentRoute.value.path).toBe('/');
    expect(router.currentRoute.value.name).toBe('home');
  });

  it('should navigate to about page', async () => {
    await router.push('/about');
    expect(router.currentRoute.value.path).toBe('/about');
    expect(router.currentRoute.value.name).toBe('about');
  });

  it('should navigate to skills page', async () => {
    await router.push('/skills');
    expect(router.currentRoute.value.path).toBe('/skills');
    expect(router.currentRoute.value.name).toBe('skills');
  });

  it('should navigate to projects page', async () => {
    await router.push('/projects');
    expect(router.currentRoute.value.path).toBe('/projects');
    expect(router.currentRoute.value.name).toBe('projects');
  });

  it('should navigate to experience page', async () => {
    await router.push('/experience');
    expect(router.currentRoute.value.path).toBe('/experience');
    expect(router.currentRoute.value.name).toBe('experience');
  });

  it('should navigate to services page', async () => {
    await router.push('/services');
    expect(router.currentRoute.value.path).toBe('/services');
    expect(router.currentRoute.value.name).toBe('services');
  });

  it('should navigate to contact page', async () => {
    await router.push('/contact');
    expect(router.currentRoute.value.path).toBe('/contact');
    expect(router.currentRoute.value.name).toBe('contact');
  });

  it('should have correct meta title for each route', async () => {
    const routes = [
      { path: '/', title: 'Home - Ramesh Kanna' },
      { path: '/about', title: 'About - Ramesh Kanna' },
      { path: '/skills', title: 'Skills - Ramesh Kanna' },
      { path: '/projects', title: 'Projects - Ramesh Kanna' },
      { path: '/experience', title: 'Experience - Ramesh Kanna' },
      { path: '/services', title: 'Services & Pricing - Ramesh Kanna' },
      { path: '/contact', title: 'Contact - Ramesh Kanna' },
    ];

    for (const route of routes) {
      await router.push(route.path);
      expect(router.currentRoute.value.meta.title).toBe(route.title);
    }
  });

  it('should handle navigation between pages', async () => {
    await router.push('/');
    expect(router.currentRoute.value.path).toBe('/');

    await router.push('/about');
    expect(router.currentRoute.value.path).toBe('/about');

    await router.push('/services');
    expect(router.currentRoute.value.path).toBe('/services');

    await router.push('/contact');
    expect(router.currentRoute.value.path).toBe('/contact');
  });

  it('should support browser back navigation', async () => {
    await router.push('/');
    await router.push('/about');
    await router.push('/services');

    await router.back();
    expect(router.currentRoute.value.path).toBe('/about');

    await router.back();
    expect(router.currentRoute.value.path).toBe('/');
  });

  it('should support browser forward navigation', async () => {
    await router.push('/');
    await router.push('/about');
    await router.back();
    
    expect(router.currentRoute.value.path).toBe('/');

    await router.forward();
    expect(router.currentRoute.value.path).toBe('/about');
  });
});
