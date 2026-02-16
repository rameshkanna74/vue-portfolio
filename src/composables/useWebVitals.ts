import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from 'web-vitals';

export interface WebVitalsMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
}

export function useWebVitals() {
  const metrics: WebVitalsMetrics = {};

  const logMetric = (metric: Metric) => {
    metrics[metric.name.toLowerCase() as keyof WebVitalsMetrics] = metric.value;

    if (import.meta.env.DEV) {
      console.log(`[Web Vitals] ${metric.name}:`, {
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
      });
    }

    // You can send to analytics here
    // Example: sendToAnalytics(metric);
  };

  const initWebVitals = () => {
    // Largest Contentful Paint (LCP) - Target: < 2.5s
    onLCP(logMetric);

    // Interaction to Next Paint (INP) - Target: < 200ms (replaces FID in web-vitals v4)
    onINP(logMetric);

    // Cumulative Layout Shift (CLS) - Target: < 0.1
    onCLS(logMetric);

    // First Contentful Paint (FCP) - Target: < 1.8s
    onFCP(logMetric);

    // Time to First Byte (TTFB) - Target: < 600ms
    onTTFB(logMetric);
  };

  const getMetrics = () => metrics;

  return {
    initWebVitals,
    getMetrics,
  };
}
