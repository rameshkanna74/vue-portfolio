import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAnalytics } from '../composables/useAnalytics';

describe('useAnalytics', () => {
  beforeEach(() => {
    // Clear window.umami before each test
    delete (window as any).umami;
  });

  describe('trackEvent', () => {
    it('should track event when umami is available', () => {
      const mockTrack = vi.fn();
      (window as any).umami = { track: mockTrack };

      const { trackEvent } = useAnalytics();
      trackEvent('test_event', { key: 'value' });

      expect(mockTrack).toHaveBeenCalledWith('test_event', { key: 'value' });
    });

    it('should not throw error when umami is not available', () => {
      const { trackEvent } = useAnalytics();
      
      expect(() => {
        trackEvent('test_event', { key: 'value' });
      }).not.toThrow();
    });

    it('should track event without data parameter', () => {
      const mockTrack = vi.fn();
      (window as any).umami = { track: mockTrack };

      const { trackEvent } = useAnalytics();
      trackEvent('simple_event');

      expect(mockTrack).toHaveBeenCalledWith('simple_event', undefined);
    });

    it('should log to console in development mode when umami is not available', () => {
      const consoleSpy = vi.spyOn(console, 'log');
      const originalEnv = import.meta.env.DEV;
      
      // Simulate dev environment
      (import.meta.env as any).DEV = true;

      const { trackEvent } = useAnalytics();
      trackEvent('dev_event', { test: true });

      // In dev mode without umami, should log
      expect(consoleSpy).toHaveBeenCalled();

      (import.meta.env as any).DEV = originalEnv;
      consoleSpy.mockRestore();
    });
  });

  describe('trackPageview', () => {
    it('should track pageview with custom URL', () => {
      const mockTrack = vi.fn();
      (window as any).umami = { track: mockTrack };

      const { trackPageview } = useAnalytics();
      trackPageview('/custom-page');

      expect(mockTrack).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should track pageview with current pathname when no URL provided', () => {
      const mockTrack = vi.fn();
      (window as any).umami = { track: mockTrack };

      const { trackPageview } = useAnalytics();
      trackPageview();

      expect(mockTrack).toHaveBeenCalled();
    });

    it('should not throw when umami is unavailable', () => {
      const { trackPageview } = useAnalytics();
      
      expect(() => {
        trackPageview('/test');
      }).not.toThrow();
    });
  });
});
