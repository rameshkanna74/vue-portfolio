// Extend Window interface for Umami
declare global {
  interface Window {
    umami?: {
      track: (event: string | ((props: any) => any), data?: Record<string, unknown>) => void;
    };
  }
}

/**
 * Analytics composable for Umami integration
 * Handles event tracking and pageview tracking
 */
export const useAnalytics = () => {
  // Load Umami script dynamically if configured
  const loadUmamiScript = () => {
    const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID;
    const scriptSrc = import.meta.env.VITE_UMAMI_SRC;

    // Only load if both env vars are set
    if (!websiteId || !scriptSrc) {
      if (import.meta.env.DEV) {
        console.log('[Analytics] Umami not configured - skipping script load');
      }
      return;
    }

    // Check if script already loaded
    if (document.querySelector(`script[data-website-id="${websiteId}"]`)) {
      return;
    }

    // Create and inject script
    const script = document.createElement('script');
    script.defer = true;
    script.src = scriptSrc;
    script.setAttribute('data-website-id', websiteId);
    document.head.appendChild(script);

    if (import.meta.env.DEV) {
      console.log('[Analytics] Umami script loaded');
    }
  };

  // Load script on first use
  if (typeof window !== 'undefined') {
    loadUmamiScript();
  }

  /**
   * Track a custom event
   */
  const trackEvent = (event: string, data?: Record<string, unknown>) => {
    if (window.umami) {
      window.umami.track(event, data);
    } else if (import.meta.env.DEV) {
      console.log(`[Analytics] Event: ${event}`, data);
    }
  };

  /**
   * Track a pageview
   */
  const trackPageview = (url?: string) => {
    if (window.umami) {
      window.umami.track(props => ({ ...props, url: url || window.location.pathname }));
    } else if (import.meta.env.DEV) {
      console.log(`[Analytics] Pageview: ${url || window.location.pathname}`);
    }
  };

  return {
    trackEvent,
    trackPageview,
  };
};
