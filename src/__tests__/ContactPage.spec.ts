import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import ContactPage from '../views/ContactPage.vue';

// Mock composables
vi.mock('../composables/useGsapAnimations', () => ({
  useGsapAnimations: () => ({
    slideUp: vi.fn(),
  }),
}));

vi.mock('../composables/useSEO', () => ({
  useSEO: vi.fn(),
}));

vi.mock('../composables/useAnalytics', () => ({
  useAnalytics: () => ({
    trackEvent: vi.fn(),
  }),
}));

vi.mock('../stores/portfolio', () => ({
  usePortfolioStore: () => ({
    portfolioData: {
      profile: {
        email: 'test@example.com',
        phone: '+91-1234567890',
        links: {
          github: 'https://github.com/test',
          linkedin: 'https://linkedin.com/in/test',
        },
      },
    },
  }),
}));

// Mock fetch
global.fetch = vi.fn();

describe('ContactPage', () => {
  const createWrapper = async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/contact', component: ContactPage }],
    });

    await router.push('/contact');
    await router.isReady();

    return mount(ContactPage, {
      global: {
        plugins: [router],
      },
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
    delete (import.meta.env as any).VITE_API_URL;
  });

  it('should render contact form', async () => {
    const wrapper = await createWrapper();
    
    expect(wrapper.find('form').exists()).toBe(true);
    expect(wrapper.find('input[name="name"]').exists()).toBe(true);
    expect(wrapper.find('input[name="email"]').exists()).toBe(true);
    expect(wrapper.find('input[name="subject"]').exists()).toBe(true);
    expect(wrapper.find('textarea[name="message"]').exists()).toBe(true);
  });

  it('should validate required fields', async () => {
    const wrapper = await createWrapper();
    
    const form = wrapper.find('form');
    await form.trigger('submit.prevent');
    await wrapper.vm.$nextTick();

    // Form should not submit without required fields
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should validate email format', async () => {
    const wrapper = await createWrapper();
    
    const emailInput = wrapper.find('input[name="email"]');
    await emailInput.setValue('invalid-email');
    await emailInput.trigger('blur');
    await wrapper.vm.$nextTick();

    // Should show validation error
    expect(wrapper.text()).toContain('valid email');
  });

  it('should submit form with valid data', async () => {
    (import.meta.env as any).VITE_API_URL = 'http://localhost:8000';
    
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Success' }),
    });

    const wrapper = await createWrapper();
    
    await wrapper.find('input[name="name"]').setValue('John Doe');
    await wrapper.find('input[name="email"]').setValue('john@example.com');
    await wrapper.find('input[name="subject"]').setValue('Test Subject');
    await wrapper.find('textarea[name="message"]').setValue('Test message');
    
    await wrapper.find('form').trigger('submit.prevent');
    await wrapper.vm.$nextTick();

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8000/api/contact/',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    );
  });

  it('should show success message after successful submission', async () => {
    (import.meta.env as any).VITE_API_URL = 'http://localhost:8000';
    
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Success' }),
    });

    const wrapper = await createWrapper();
    
    await wrapper.find('input[name="name"]').setValue('John Doe');
    await wrapper.find('input[name="email"]').setValue('john@example.com');
    await wrapper.find('input[name="subject"]').setValue('Test');
    await wrapper.find('textarea[name="message"]').setValue('Message');
    
    await wrapper.find('form').trigger('submit.prevent');
    await new Promise(resolve => setTimeout(resolve, 100));
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('Message sent successfully');
  });

  it('should show error message on submission failure', async () => {
    (import.meta.env as any).VITE_API_URL = 'http://localhost:8000';
    
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    const wrapper = await createWrapper();
    
    await wrapper.find('input[name="name"]').setValue('John Doe');
    await wrapper.find('input[name="email"]').setValue('john@example.com');
    await wrapper.find('input[name="subject"]').setValue('Test');
    await wrapper.find('textarea[name="message"]').setValue('Message');
    
    await wrapper.find('form').trigger('submit.prevent');
    await new Promise(resolve => setTimeout(resolve, 100));
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('error');
  });

  it('should clear form after successful submission', async () => {
    (import.meta.env as any).VITE_API_URL = 'http://localhost:8000';
    
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Success' }),
    });

    const wrapper = await createWrapper();
    
    const nameInput = wrapper.find('input[name="name"]');
    const emailInput = wrapper.find('input[name="email"]');
    
    await nameInput.setValue('John Doe');
    await emailInput.setValue('john@example.com');
    await wrapper.find('input[name="subject"]').setValue('Test');
    await wrapper.find('textarea[name="message"]').setValue('Message');
    
    await wrapper.find('form').trigger('submit.prevent');
    await new Promise(resolve => setTimeout(resolve, 100));
    await wrapper.vm.$nextTick();

    expect((nameInput.element as HTMLInputElement).value).toBe('');
    expect((emailInput.element as HTMLInputElement).value).toBe('');
  });

  it('should display contact information', async () => {
    const wrapper = await createWrapper();
    
    expect(wrapper.text()).toContain('test@example.com');
    expect(wrapper.text()).toContain('+91-1234567890');
  });

  it('should have social media links', async () => {
    const wrapper = await createWrapper();
    
    const links = wrapper.findAll('a[target="_blank"]');
    expect(links.length).toBeGreaterThan(0);
  });

  it('should show configuration error when API URL is missing', async () => {
    delete (import.meta.env as any).VITE_API_URL;

    const wrapper = await createWrapper();
    
    await wrapper.find('input[name="name"]').setValue('John Doe');
    await wrapper.find('input[name="email"]').setValue('john@example.com');
    await wrapper.find('input[name="subject"]').setValue('Test');
    await wrapper.find('textarea[name="message"]').setValue('Message');
    
    await wrapper.find('form').trigger('submit.prevent');
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('configuration');
  });
});
