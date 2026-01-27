import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import GlowButton from '../components/ui/GlowButton.vue';

describe('GlowButton', () => {
  it('renders slot content', () => {
    const wrapper = mount(GlowButton, {
      slots: {
        default: 'Click Me'
      }
    });
    
    expect(wrapper.text()).toContain('Click Me');
  });

  it('renders as a button element', () => {
    const wrapper = mount(GlowButton, {
      slots: {
        default: 'Test'
      }
    });
    
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('emits click event when clicked', async () => {
    const wrapper = mount(GlowButton, {
      slots: {
        default: 'Click Me'
      }
    });
    
    await wrapper.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });
});
