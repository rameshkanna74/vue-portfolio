import { onMounted, onUnmounted, type Ref } from 'vue';

export function useIntersectionObserver(
  target: Ref<HTMLElement | null>,
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = { threshold: 0.1 }
) {
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    if (!target.value) return;
    
    observer = new IntersectionObserver(callback, options);
    observer.observe(target.value);
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  });

  return {
    observer
  };
}
