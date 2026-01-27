import { ref, onMounted, onUnmounted, type Ref } from 'vue';

export interface TiltOptions {
  max?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  easing?: string;
  glare?: boolean;
  maxGlare?: number;
  reset?: boolean;
}

export function useTilt(elementRef: Ref<HTMLElement | null>, options: TiltOptions = {}) {
  const {
    max = 15,
    perspective = 1000,
    scale = 1.05,
    speed = 400,
    easing = 'cubic-bezier(.03,.98,.52,.99)',
    glare = false,
    maxGlare = 0.5,
    reset = true,
  } = options;

  const tiltX = ref(0);
  const tiltY = ref(0);
  const glareOpacity = ref(0);
  const glarePosition = ref({ x: 50, y: 50 });

  let transitionTimeout: number | null = null;

  const updateTransform = () => {
    if (!elementRef.value) return;

    const element = elementRef.value;
    element.style.transform = `
      perspective(${perspective}px)
      rotateX(${tiltY.value}deg)
      rotateY(${tiltX.value}deg)
      scale3d(${scale}, ${scale}, ${scale})
    `;
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!elementRef.value) return;

    const element = elementRef.value;
    const rect = element.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const percentageX = (x / rect.width) * 100;
    const percentageY = (y / rect.height) * 100;

    const tiltXValue = ((percentageX - 50) / 50) * max;
    const tiltYValue = ((percentageY - 50) / 50) * -max;

    tiltX.value = tiltXValue;
    tiltY.value = tiltYValue;

    if (glare) {
      glarePosition.value = { x: percentageX, y: percentageY };
      glareOpacity.value = maxGlare;
    }

    if (transitionTimeout) {
      clearTimeout(transitionTimeout);
    }

    element.style.transition = `transform ${speed}ms ${easing}`;
    updateTransform();
  };

  const handleMouseEnter = () => {
    if (!elementRef.value) return;
    elementRef.value.style.willChange = 'transform';
  };

  const handleMouseLeave = () => {
    if (!elementRef.value) return;

    const element = elementRef.value;

    if (reset) {
      element.style.transition = `transform ${speed}ms ${easing}`;
      tiltX.value = 0;
      tiltY.value = 0;
      glareOpacity.value = 0;
      updateTransform();

      transitionTimeout = window.setTimeout(() => {
        element.style.transition = '';
        element.style.willChange = '';
      }, speed);
    }
  };

  onMounted(() => {
    if (!elementRef.value) return;

    const element = elementRef.value;
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
  });

  onUnmounted(() => {
    if (!elementRef.value) return;

    const element = elementRef.value;
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseenter', handleMouseEnter);
    element.removeEventListener('mouseleave', handleMouseLeave);

    if (transitionTimeout) {
      clearTimeout(transitionTimeout);
    }
  });

  return {
    tiltX,
    tiltY,
    glareOpacity,
    glarePosition,
  };
}
