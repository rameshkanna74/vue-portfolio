import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import LeadMagnet from '../components/sections/LeadMagnet.vue';

// Mock useAnalytics
vi.mock('../composables/useAnalytics', () => ({
  useAnalytics: () => ({
    trackEvent: vi.fn(),
  }),
}));

describe('LeadMagnet', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render lead magnet form', () => {
    const wrapper = mount(LeadMagnet);
    
    expect(wrapper.find('h3').text()).toContain('Free Developer Toolkit');
    expect(wrapper.find('input[type="email"]').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it('should validate email before submission', async () => {
    const wrapper = mount(LeadMagnet);
    
    const input = wrapper.find('input[type="email"]');
    const form = wrapper.find('form');

    // Try to submit with invalid email
    await input.setValue('invalid-email');
    await form.trigger('submit.prevent');

    // Should show error
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain('valid email');
  });

  it('should accept valid email format', async () => {
    const wrapper = mount(LeadMagnet);
    
    const input = wrapper.find('input[type="email"]');
    await input.setValue('test@example.com');

    // Valid email should be accepted
    expect((input.element as HTMLInputElement).value).toBe('test@example.com');
  });

  it('should show loading state during submission', async () => {
    const wrapper = mount(LeadMagnet);
    
    const input = wrapper.find('input[type="email"]');
    const form = wrapper.find('form');

    await input.setValue('test@example.com');
    await form.trigger('submit.prevent');

    // Should show loading state immediately
    await wrapper.vm.$nextTick();
    const button = wrapper.find('button[type="submit"]');
    expect(button.text()).toContain('Sending');
  });

  it('should show success message after submission', async () => {
    const wrapper = mount(LeadMagnet);
    
    const input = wrapper.find('input[type="email"]');
    const form = wrapper.find('form');

    await input.setValue('test@example.com');
    await form.trigger('submit.prevent');

    // Wait for async operation
    await new Promise(resolve => setTimeout(resolve, 1100));
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('Success');
  });

  it('should clear email input after successful submission', async () => {
    const wrapper = mount(LeadMagnet);
    
    const input = wrapper.find('input[type="email"]');
    const form = wrapper.find('form');

    await input.setValue('test@example.com');
    await form.trigger('submit.prevent');

    // Wait for async operation
    await new Promise(resolve => setTimeout(resolve, 1100));
    await wrapper.vm.$nextTick();

    expect((input.element as HTMLInputElement).value).toBe('');
  });

  it('should display all toolkit features', () => {
    const wrapper = mount(LeadMagnet);
    
    expect(wrapper.text()).toContain('50+ Essential VS Code Extensions');
    expect(wrapper.text()).toContain('Frontend & Backend boilerplate templates');
    expect(wrapper.text()).toContain('API testing & debugging tools');
    expect(wrapper.text()).toContain('Performance optimization resources');
    expect(wrapper.text()).toContain('Code snippet library');
  });

  it('should disable submit button during submission', async () => {
    const wrapper = mount(LeadMagnet);
    
    const input = wrapper.find('input[type="email"]');
    const form = wrapper.find('form');
    const button = wrapper.find('button[type="submit"]');

    await input.setValue('test@example.com');
    await form.trigger('submit.prevent');
    await wrapper.vm.$nextTick();

    expect((button.element as HTMLButtonElement).disabled).toBe(true);
  });

  it('should show privacy notice', () => {
    const wrapper = mount(LeadMagnet);
    
    expect(wrapper.text()).toContain('No spam');
    expect(wrapper.text()).toContain('Unsubscribe anytime');
  });
});
