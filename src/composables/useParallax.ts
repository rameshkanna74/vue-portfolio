import { ref, onMounted, onUnmounted, type Ref } from 'vue';

export interface ParallaxOptions {
  speed?: number;
  direction?: 'vertical' | 'horizontal' | 'both';
  min?: number;
  max?: number;
}

export function useParallax(elementRef: Ref<HTMLElement | null>, options: ParallaxOptions = {}) {
  const {
    speed = 0.5,
    direction = 'vertical',
    min = -100,
    max = 100,
  } = options;

  const offset = ref({ x: 0, y: 0 });
  let ticking = false;

  const clamp = (value: number, minVal: number, maxVal: number) => {
    return Math.min(Math.max(value, minVal), maxVal);
  };

  const updateParallax = () => {
    if (!elementRef.value) return;

    const element = elementRef.value;
    const rect = element.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollX = window.scrollX || window.pageXOffset;

    const elementTop = rect.top + scrollY;
    const elementLeft = rect.left + scrollX;
    const elementHeight = rect.height;
    const elementWidth = rect.width;

    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    // Calculate parallax offset
    let yOffset = 0;
    let xOffset = 0;

    if (direction === 'vertical' || direction === 'both') {
      const scrollProgress = (scrollY + windowHeight - elementTop) / (windowHeight + elementHeight);
      yOffset = clamp((scrollProgress - 0.5) * 100 * speed, min, max);
    }

    if (direction === 'horizontal' || direction === 'both') {
      const scrollProgress = (scrollX + windowWidth - elementLeft) / (windowWidth + elementWidth);
      xOffset = clamp((scrollProgress - 0.5) * 100 * speed, min, max);
    }

    offset.value = { x: xOffset, y: yOffset };

    // Apply transform
    element.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
    element.style.willChange = 'transform';

    ticking = false;
  };

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };

  onMounted(() => {
    if (!elementRef.value) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateParallax(); // Initial calculation
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    if (elementRef.value) {
      elementRef.value.style.willChange = '';
    }
  });

  return {
    offset,
  };
}

// Mouse-based parallax (for elements that follow cursor)
export function useMouseParallax(elementRef: Ref<HTMLElement | null>, options: { strength?: number } = {}) {
  const { strength = 20 } = options;
  const offset = ref({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent) => {
    if (!elementRef.value) return;

    const element = elementRef.value;
    const rect = element.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (event.clientX - centerX) / rect.width;
    const deltaY = (event.clientY - centerY) / rect.height;

    offset.value = {
      x: deltaX * strength,
      y: deltaY * strength,
    };

    element.style.transform = `translate3d(${offset.value.x}px, ${offset.value.y}px, 0)`;
  };

  onMounted(() => {
    if (!elementRef.value) return;
    window.addEventListener('mousemove', handleMouseMove);
  });

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove);
    if (elementRef.value) {
      elementRef.value.style.transform = '';
    }
  });

  return {
    offset,
  };
}
