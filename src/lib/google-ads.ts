// Google Ads conversion tracking helper

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const CONVERSION_ID = 'AW-18104648983';
const DEFAULT_CONVERSION_LABEL = 'Y5YPCM_pwZ8cEJeK_LhD';

/**
 * Fires a Google Ads conversion event.
 * Safely no-ops if gtag is unavailable.
 * @param label Optional conversion label. Defaults to the site-wide label.
 */
export function trackGoogleAdsConversion(label = DEFAULT_CONVERSION_LABEL) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: `${CONVERSION_ID}/${label}`,
    });
  }
}

