// Google Ads conversion tracking helper

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const CONVERSION_SEND_TO = 'AW-18104648983/Y5YPCM_pwZ8cEJeK_LhD';

/**
 * Fires a Google Ads conversion event.
 * Safely no-ops if gtag is unavailable.
 */
export function trackGoogleAdsConversion() {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: CONVERSION_SEND_TO,
    });
  }
}
