import * as Sentry from '@sentry/vue';
import type { App } from 'vue';
import type { Router } from 'vue-router';

export function initSentry(app: App, router: Router) {
  // Only initialize Sentry in production with valid DSN
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  
  if (!dsn || import.meta.env.DEV) {
    console.log('Sentry: Disabled in development or DSN not configured');
    return;
  }

  Sentry.init({
    app,
    dsn,
    integrations: [
      Sentry.browserTracingIntegration({
        router,
      }),
    ],
    
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of transactions
    
    // Environment
    environment: import.meta.env.MODE,
    
    // Release tracking
    release: import.meta.env.VITE_APP_VERSION || 'development',
    
    // Error filtering
    beforeSend(event, hint) {
      // Don't send errors in development
      if (import.meta.env.DEV) {
        return null;
      }
      
      // Filter out known non-critical errors
      const error = hint.originalException;
      if (error && typeof error === 'object' && 'message' in error) {
        const message = String(error.message);
        
        // Ignore network errors (user's connection issue)
        if (message.includes('NetworkError') || message.includes('Failed to fetch')) {
          return null;
        }
        
        // Ignore ResizeObserver errors (browser quirk)
        if (message.includes('ResizeObserver')) {
          return null;
        }
      }
      
      return event;
    },
  });

  console.log('Sentry: Initialized successfully');
}

// Manual error capture helper
export function captureError(error: Error, context?: Record<string, any>) {
  if (import.meta.env.DEV) {
    console.error('Error captured:', error, context);
    return;
  }
  
  Sentry.captureException(error, {
    extra: context,
  });
}

// Manual message capture
export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
  if (import.meta.env.DEV) {
    console.log(`[${level}] ${message}`);
    return;
  }
  
  Sentry.captureMessage(message, level);
}
