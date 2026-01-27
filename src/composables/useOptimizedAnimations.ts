import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onUnmounted } from 'vue';

gsap.registerPlugin(ScrollTrigger);

export function useOptimizedAnimations() {
  // Track all animations for cleanup
  const scrollTriggers: ScrollTrigger[] = [];
  const timelines: gsap.core.Timeline[] = [];
  const tweens: gsap.core.Tween[] = [];

  // Auto-cleanup on component unmount
  onUnmounted(() => {
    scrollTriggers.forEach(st => st.kill());
    timelines.forEach(tl => tl.kill());
    tweens.forEach(t => t.kill());
    
    scrollTriggers.length = 0;
    timelines.length = 0;
    tweens.length = 0;
  });

  const fadeIn = (element: HTMLElement | string, options = {}) => {
    const tween = gsap.from(element, {
      autoAlpha: 0, // Better than opacity - sets visibility: hidden
      duration: 0.6,
      ease: 'power2.out',
      ...options,
    });
    tweens.push(tween);
    return tween;
  };

  const slideUp = (element: HTMLElement | string, options = {}) => {
    const tween = gsap.from(element, {
      y: 50,
      autoAlpha: 0,
      duration: 0.8,
      ease: 'power3.out',
      ...options,
    });
    tweens.push(tween);
    return tween;
  };

  const slideDown = (element: HTMLElement | string, options = {}) => {
    const tween = gsap.from(element, {
      y: -50,
      autoAlpha: 0,
      duration: 0.8,
      ease: 'power3.out',
      ...options,
    });
    tweens.push(tween);
    return tween;
  };

  const staggerReveal = (elements: HTMLElement[] | string, options = {}) => {
    const tween = gsap.from(elements, {
      y: 30,
      autoAlpha: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      ...options,
    });
    tweens.push(tween);
    return tween;
  };

  const scaleIn = (element: HTMLElement | string, options = {}) => {
    const tween = gsap.from(element, {
      scale: 0.8,
      autoAlpha: 0,
      duration: 0.5,
      ease: 'back.out(1.7)',
      ...options,
    });
    tweens.push(tween);
    return tween;
  };

  const typeWriter = (element: HTMLElement, text: string, options: { speed?: number } = {}) => {
    const speed = options.speed || 50;
    const chars = text.split('');
    element.textContent = '';
    
    const tween = gsap.to({}, {
      duration: (chars.length * speed) / 1000,
      onUpdate: function() {
        const progress = Math.floor(this.progress() * chars.length);
        element.textContent = chars.slice(0, progress).join('');
      },
      ease: 'none',
    });
    tweens.push(tween);
    return tween;
  };

  const glitchEffect = (element: HTMLElement | string, options = {}) => {
    const tween = gsap.to(element, {
      x: () => gsap.utils.random(-5, 5),
      y: () => gsap.utils.random(-5, 5),
      duration: 0.1,
      repeat: 5,
      yoyo: true,
      ease: 'power1.inOut',
      ...options,
    });
    tweens.push(tween);
    return tween;
  };

  const revealOnScroll = (elements: any, options: any = {}) => {
    const st = ScrollTrigger.create({
      trigger: elements,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
      onEnter: () => {
        gsap.from(elements, {
          y: 50,
          autoAlpha: 0,
          stagger: 0.2,
          duration: 1,
          ease: 'power3.out',
          ...options,
        });
      },
    });
    
    scrollTriggers.push(st);
    return st;
  };

  const parallaxScroll = (element: HTMLElement | string, speed = 0.5) => {
    const st = ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        gsap.set(element, {
          y: self.progress * window.innerHeight * speed,
        });
      },
    });
    
    scrollTriggers.push(st);
    return st;
  };

  const magneticButton = (element: HTMLElement, strength = 0.3) => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  };

  const pageTransition = (onComplete?: () => void) => {
    const tl = gsap.timeline({
      onComplete,
    });

    // Reset bars
    gsap.set('.page-transition-bar', {
      scaleY: 0,
      transformOrigin: 'top',
    });

    // Animate in (cover screen)
    tl.to('.page-transition-bar', {
      scaleY: 1,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.inOut',
    });

    // Animate out (reveal new page)
    tl.to('.page-transition-bar', {
      scaleY: 0,
      transformOrigin: 'bottom',
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.inOut',
    }, '-=0.2');

    timelines.push(tl);
    return tl;
  };

  const animateCounter = (element: HTMLElement, target: number, duration = 2) => {
    const obj = { value: 0 };
    const tween = gsap.to(obj, {
      value: target,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        element.textContent = Math.round(obj.value).toString();
      },
    });
    tweens.push(tween);
    return tween;
  };

  // Frame budget management
  const safeAnimate = (callback: () => void) => {
    const startTime = performance.now();
    callback();
    const duration = performance.now() - startTime;
    
    if (duration > 16 && import.meta.env.DEV) {
      console.warn(`⚠️ [Performance] Animation took ${duration.toFixed(2)}ms (> 16ms frame budget)`);
    }
  };

  return {
    fadeIn,
    slideUp,
    slideDown,
    staggerReveal,
    scaleIn,
    typeWriter,
    glitchEffect,
    revealOnScroll,
    parallaxScroll,
    magneticButton,
    pageTransition,
    animateCounter,
    safeAnimate,
  };
}
