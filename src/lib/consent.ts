// Central consent handling. Google Ads (gtag.js) is loaded ONLY after "Alle akzeptieren".
// Until then window.gtag is undefined, so every existing (guarded) conversion call is a no-op.

const GOOGLE_ADS_ID = 'AW-18104648983';
export const CONSENT_KEY = 'cookie-consent';
export const OPEN_SETTINGS_EVENT = 'open-cookie-settings';

let adsLoaded = false;

export const getConsent = (): string | null => {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
};

export const loadGoogleAds = (): void => {
  if (adsLoaded || typeof window === 'undefined' || getConsent() !== 'all') return;
  adsLoaded = true;
  const w = window as unknown as { dataLayer: unknown[]; gtag: (...a: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  w.gtag = function () { w.dataLayer.push(arguments); };
  w.gtag('consent', 'default', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'denied',
  });
  w.gtag('js', new Date());
  w.gtag('config', GOOGLE_ADS_ID);
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
  document.head.appendChild(s);
};

/** Withdraw consent: store "necessary", signal denial, reload so loaded scripts are gone. */
export const revokeConsent = (): void => {
  const w = window as unknown as { gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void };
  try {
    w.gtag?.('consent', 'update', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    w.fbq?.('consent', 'revoke');
  } catch { /* ignore */ }
  localStorage.setItem(CONSENT_KEY, 'necessary');
  window.location.reload();
};

export const openCookieSettings = (): void => {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
};
