import { ref, onUnmounted } from 'vue';
import { gsap } from 'gsap';

export interface LazyGsapOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useLazyGsap() {
  const observers = ref<IntersectionObserver[]>([]);
  const animatedElements = new WeakSet<Element>();

  // Cleanup on unmount
  onUnmounted(() => {
    observers.value.forEach(observer => observer.disconnect());
    observers.value = [];
  });

  /**
   * Lazy load GSAP animation when element enters viewport
   * Automatically manages will-change property for performance
   */
  const lazyAnimate = (
    element: HTMLElement | string,
    animation: () => gsap.core.Tween | gsap.core.Timeline,
    options: LazyGsapOptions = {}
  ) => {
    const {
      threshold = 0.1,
      rootMargin = '50px',
      triggerOnce = true,
    } = options;

    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;

    // Skip if already animated
    if (animatedElements.has(el)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add will-change before animation
            (entry.target as HTMLElement).style.willChange = 'transform, opacity';

            // Run animation
            const tween = animation();

            // Remove will-change after animation completes
            if (tween) {
              tween.eventCallback('onComplete', () => {
                (entry.target as HTMLElement).style.willChange = 'auto';
              });
            }

            // Mark as animated
            animatedElements.add(entry.target);

            // Disconnect if triggerOnce
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    observers.value.push(observer);

    return observer;
  };

  /**
   * Lazy load GSAP ScrollTrigger animation
   * Only initializes when element is near viewport
   */
  const lazyScrollTrigger = async (
    element: HTMLElement | string,
    animation: () => void,
    options: LazyGsapOptions = {}
  ) => {
    const {
      threshold = 0.1,
      rootMargin = '200px',
    } = options;

    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;

    // Skip if already animated
    if (animatedElements.has(el)) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Lazy load ScrollTrigger plugin
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            // Run animation
            animation();

            // Mark as animated
            animatedElements.add(entry.target);

            // Disconnect observer
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    observers.value.push(observer);

    return observer;
  };

  /**
   * Batch lazy animations for multiple elements
   */
  const lazyBatchAnimate = (
    elements: NodeListOf<Element> | Element[],
    animation: (el: Element, index: number) => gsap.core.Tween | gsap.core.Timeline,
    options: LazyGsapOptions = {}
  ) => {
    const elementsArray = Array.from(elements);
    
    elementsArray.forEach((el, index) => {
      lazyAnimate(
        el as HTMLElement,
        () => animation(el, index),
        options
      );
    });
  };

  /**
   * Optimize element for animation with contain and will-change
   */
  const optimizeForAnimation = (element: HTMLElement, properties: string[] = ['transform', 'opacity']) => {
    element.style.contain = 'layout style paint';
    element.style.willChange = properties.join(', ');

    return () => {
      element.style.contain = '';
      element.style.willChange = 'auto';
    };
  };

  return {
    lazyAnimate,
    lazyScrollTrigger,
    lazyBatchAnimate,
    optimizeForAnimation,
  };
}
