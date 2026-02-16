import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue'),
      meta: { title: 'Home - Ramesh Kanna' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutPage.vue'),
      meta: { title: 'About - Ramesh Kanna' },
    },
    {
      path: '/skills',
      name: 'skills',
      component: () => import('../views/SkillsPage.vue'),
      meta: { title: 'Skills - Ramesh Kanna' },
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsPage.vue'),
      meta: { title: 'Projects - Ramesh Kanna' },
    },
    {
      path: '/experience',
      name: 'experience',
      component: () => import('../views/ExperiencePage.vue'),
      meta: { title: 'Experience - Ramesh Kanna' },
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('../views/ServicesPage.vue'),
      meta: { title: 'Services & Pricing - Ramesh Kanna' },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactPage.vue'),
      meta: { title: 'Contact - Ramesh Kanna' },
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  },
});

// Update document title and track pageview on route change
router.afterEach((to) => {
  document.title = (to.meta.title as string) || 'Ramesh Kanna - Python Backend Developer';
  
  // Track pageview in Umami (if analytics is configured)
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track(props => ({ ...props, url: to.path }));
  }
});

export default router;
