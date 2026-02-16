import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import ServicesPage from '../views/ServicesPage.vue';

// Mock composables
vi.mock('../composables/useGsapAnimations', () => ({
  useGsapAnimations: () => ({
    slideUp: vi.fn(),
  }),
}));

vi.mock('../composables/useSEO', () => ({
  useSEO: vi.fn(),
}));

describe('ServicesPage', () => {
  const createWrapper = async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/services', component: ServicesPage },
        { path: '/contact', component: { template: '<div>Contact</div>' } },
      ],
    });

    await router.push('/services');
    await router.isReady();

    return mount(ServicesPage, {
      global: {
        plugins: [router],
      },
    });
  };

  it('should render services page with title', async () => {
    const wrapper = await createWrapper();
    
    expect(wrapper.find('h1').text()).toContain('Services & Pricing');
  });

  it('should display all three main service packages', async () => {
    const wrapper = await createWrapper();
    
    expect(wrapper.text()).toContain('MVP Development');
    expect(wrapper.text()).toContain('Web Application');
    expect(wrapper.text()).toContain('Enterprise Solution');
  });

  it('should show pricing for each package', async () => {
    const wrapper = await createWrapper();
    
    expect(wrapper.text()).toContain('₹50,000 - ₹1,50,000');
    expect(wrapper.text()).toContain('₹1,50,000 - ₹5,00,000');
    expect(wrapper.text()).toContain('Custom Quote');
  });

  it('should display duration for each package', async () => {
    const wrapper = await createWrapper();
    
    expect(wrapper.text()).toContain('4-8 weeks');
    expect(wrapper.text()).toContain('8-16 weeks');
    expect(wrapper.text()).toContain('16+ weeks');
  });

  it('should mark Web Application as most popular', async () => {
    const wrapper = await createWrapper();
    
    expect(wrapper.text()).toContain('MOST POPULAR');
  });

  it('should display additional services', async () => {
    const wrapper = await createWrapper();
    
    expect(wrapper.text()).toContain('Performance Optimization');
    expect(wrapper.text()).toContain('Bug Fixes & Maintenance');
    expect(wrapper.text()).toContain('Technical Consulting');
    expect(wrapper.text()).toContain('API Development');
  });

  it('should show additional service pricing', async () => {
    const wrapper = await createWrapper();
    
    expect(wrapper.text()).toContain('₹30,000+');
    expect(wrapper.text()).toContain('₹15,000/month');
    expect(wrapper.text()).toContain('₹5,000/hour');
    expect(wrapper.text()).toContain('₹40,000+');
  });

  it('should display "Why Work With Me" section', async () => {
    const wrapper = await createWrapper();
    
    expect(wrapper.text()).toContain('Why Work With Me');
    expect(wrapper.text()).toContain('Fast Delivery');
    expect(wrapper.text()).toContain('Clean Code');
    expect(wrapper.text()).toContain('Full Transparency');
  });

  it('should have CTA buttons linking to contact page', async () => {
    const wrapper = await createWrapper();
    
    const ctaButtons = wrapper.findAll('a[href="/contact"]');
    expect(ctaButtons.length).toBeGreaterThan(0);
  });

  it('should display features for MVP package', async () => {
    const wrapper = await createWrapper();
    
    expect(wrapper.text()).toContain('Full-stack development');
    expect(wrapper.text()).toContain('Responsive design');
    expect(wrapper.text()).toContain('Database design');
    expect(wrapper.text()).toContain('User authentication');
  });

  it('should show ideal use cases for each package', async () => {
    const wrapper = await createWrapper();
    
    expect(wrapper.text()).toContain('Startups, Entrepreneurs');
    expect(wrapper.text()).toContain('Growing Businesses, SaaS');
    expect(wrapper.text()).toContain('Enterprises, Complex Systems');
  });

  it('should have consultation CTA at bottom', async () => {
    const wrapper = await createWrapper();
    
    expect(wrapper.text()).toContain('Schedule a Free Consultation');
  });
});
