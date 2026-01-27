import { describe, it, expect } from 'vitest';
import { useGsapAnimations } from '../composables/useGsapAnimations';

describe('useGsapAnimations', () => {
  it('exports animation functions', () => {
    const animations = useGsapAnimations();
    
    expect(animations).toHaveProperty('fadeIn');
    expect(animations).toHaveProperty('slideUp');
    expect(animations).toHaveProperty('slideDown');
    expect(animations).toHaveProperty('staggerReveal');
    expect(animations).toHaveProperty('scaleIn');
    expect(animations).toHaveProperty('typeWriter');
    expect(animations).toHaveProperty('glitchEffect');
    expect(animations).toHaveProperty('scrollTriggerAnimation');
    expect(animations).toHaveProperty('magneticButton');
    expect(animations).toHaveProperty('parallaxScroll');
    expect(animations).toHaveProperty('revealOnScroll');
    expect(animations).toHaveProperty('pageTransition');
    expect(animations).toHaveProperty('animateCounter');
  });

  it('all animation functions are callable', () => {
    const animations = useGsapAnimations();
    
    expect(typeof animations.fadeIn).toBe('function');
    expect(typeof animations.slideUp).toBe('function');
    expect(typeof animations.typeWriter).toBe('function');
    expect(typeof animations.pageTransition).toBe('function');
  });
});
