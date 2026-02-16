import { onMounted } from 'vue';

interface PerformanceMetrics {
  fcp?: number;
  lcp?: number;
  cls?: number;
  ttfb?: number;
  inp?: number;
}

export function usePerformanceMonitor() {
  const metrics: PerformanceMetrics = {};

  onMounted(() => {
    if (typeof window === 'undefined') return;

    // Import web-vitals dynamically to reduce initial bundle
    (async () => {
      try {
        const { onCLS, onLCP, onFCP, onTTFB, onINP } = await import('web-vitals');
        
        onCLS((metric: any) => {
          metrics.cls = metric.value;
          logMetric('CLS', metric.value, 0.1);
        });

        onLCP((metric: any) => {
          metrics.lcp = metric.value;
          logMetric('LCP', metric.value, 2500);
        });

        onFCP((metric: any) => {
          metrics.fcp = metric.value;
          logMetric('FCP', metric.value, 1800);
        });

        onTTFB((metric: any) => {
          metrics.ttfb = metric.value;
          logMetric('TTFB', metric.value, 600);
        });

        onINP((metric: any) => {
          metrics.inp = metric.value;
          logMetric('INP', metric.value, 200);
        });
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn('Failed to load web-vitals:', error);
        }
      }
    })();

    // Custom metrics
    trackCustomMetrics();
  });

  function logMetric(name: string, value: number, threshold: number) {
    const status = value <= threshold ? '✅' : '⚠️';
    
    if (import.meta.env.DEV) {
      console.log(`[Performance] ${status} ${name}: ${value.toFixed(2)}${name === 'CLS' ? '' : 'ms'} (threshold: ${threshold}${name === 'CLS' ? '' : 'ms'})`);
    }

    // Send to analytics in production
    if (import.meta.env.PROD && window.gtag) {
      window.gtag('event', 'web_vitals', {
        event_category: 'Performance',
        event_label: name,
        value: Math.round(value),
        non_interaction: true,
      });
    }
  }

  function trackCustomMetrics() {
    // Route change performance
    let routeChangeStart = 0;
    
    window.addEventListener('popstate', () => {
      routeChangeStart = performance.now();
    });

    // Track when route change completes
    const observer = new MutationObserver(() => {
      if (routeChangeStart > 0) {
        const duration = performance.now() - routeChangeStart;
        logMetric('Route Change', duration, 300);
        routeChangeStart = 0;
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Long task detection
    if ('PerformanceObserver' in window) {
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50 && import.meta.env.DEV) {
              console.warn(`⚠️ [Performance] Long task detected: ${entry.duration.toFixed(2)}ms`, entry);
            }
          }
        });

        longTaskObserver.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        // longtask may not be supported in all browsers
        if (import.meta.env.DEV) {
          console.log('[Performance] Long task monitoring not supported in this browser');
        }
      }
    }

    // Layout shift detection (additional to CLS)
    if ('PerformanceObserver' in window) {
      try {
        const layoutShiftObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if ((entry as any).value > 0.1 && import.meta.env.DEV) {
              console.warn(`⚠️ [Performance] Layout shift detected: ${(entry as any).value.toFixed(4)}`, entry);
            }
          }
        });

        layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        // Ignore if not supported
      }
    }
  }

  return { metrics };
}

// Global type augmentation
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
