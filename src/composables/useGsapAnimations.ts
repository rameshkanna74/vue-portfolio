import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsapAnimations() {
  // Existing basic animations
  const fadeIn = (element: HTMLElement | string, options = {}) => {
    return gsap.from(element, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      ...options,
    });
  };

  const slideUp = (element: HTMLElement | string, options = {}) => {
    return gsap.from(element, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      ...options,
    });
  };

  const slideDown = (element: HTMLElement | string, options = {}) => {
    return gsap.from(element, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      ...options,
    });
  };

  const staggerReveal = (elements: HTMLElement[] | string, options = {}) => {
    return gsap.from(elements, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      ...options,
    });
  };

  const scaleIn = (element: HTMLElement | string, options = {}) => {
    return gsap.from(element, {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: 'back.out(1.7)',
      ...options,
    });
  };

  const typeWriter = (element: HTMLElement, text: string, options: { speed?: number } = {}) => {
    const speed = options.speed || 50;
    const chars = text.split('');
    element.textContent = '';
    
    return gsap.to({}, {
      duration: (chars.length * speed) / 1000,
      onUpdate: function() {
        const progress = Math.floor(this.progress() * chars.length);
        element.textContent = chars.slice(0, progress).join('');
      },
      ease: 'none',
    });
  };

  const glitchEffect = (element: HTMLElement | string, options = {}) => {
    return gsap.to(element, {
      x: () => gsap.utils.random(-5, 5),
      y: () => gsap.utils.random(-5, 5),
      duration: 0.1,
      repeat: 5,
      yoyo: true,
      ease: 'power1.inOut',
      ...options,
    });
  };

  const scrollTriggerAnimation = (
    element: HTMLElement | string,
    animation: gsap.TweenVars,
    triggerOptions = {}
  ) => {
    return gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        ...triggerOptions,
      },
      ...animation,
    });
  };

  // --- Advanced Animations ---

  // Magnetic button effect
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

  // Parallax scroll effect
  const parallaxScroll = (element: HTMLElement | string, speed = 0.5) => {
    return gsap.to(element, {
      y: () => window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  };

  // Reveal on scroll with stagger
  const revealOnScroll = (elements: any, options: any = {}) => {
    return gsap.from(elements, {
      y: 50,
      autoAlpha: 0, // Use autoAlpha for better performance (sets visibility: hidden)
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: elements,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      ...options,
    });
  };

  // Page transition
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
    }, '-=0.2'); // Overlap slightly for continuity

    return tl;
  };

  // Counter animation
  const animateCounter = (element: HTMLElement, target: number, duration = 2) => {
    const obj = { value: 0 };
    return gsap.to(obj, {
      value: target,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        element.textContent = Math.round(obj.value).toString();
      },
    });
  };

  return {
    fadeIn,
    slideUp,
    slideDown,
    staggerReveal,
    scaleIn,
    typeWriter,
    glitchEffect,
    scrollTriggerAnimation,
    magneticButton,
    parallaxScroll,
    revealOnScroll,
    pageTransition,
    animateCounter,
  };
}
