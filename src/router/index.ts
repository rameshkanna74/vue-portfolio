import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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

// Update document title on route change
router.beforeEach((to, _from, next) => {
  document.title = (to.meta.title as string) || 'Ramesh Kanna - Python Backend Developer';
  next();
});

export default router;
