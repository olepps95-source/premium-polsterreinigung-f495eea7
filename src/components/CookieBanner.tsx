import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { initializeMetaPixel } from '@/lib/meta-pixel';
import { CONSENT_KEY, OPEN_SETTINGS_EVENT, getConsent, loadGoogleAds, revokeConsent } from '@/lib/consent';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    if (!consent) {
      setIsVisible(true);
    } else if (consent === 'all') {
      loadGoogleAds();
    }
    const open = () => setIsVisible(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, open);
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(CONSENT_KEY, 'all');
    setIsVisible(false);
    loadGoogleAds();
    initializeMetaPixel();
  };

  const handleAcceptNecessary = () => {
    const previous = getConsent();
    setIsVisible(false);
    if (previous === 'all') {
      // Consent withdrawn: stop all further marketing processing
      revokeConsent();
      return;
    }
    localStorage.setItem(CONSENT_KEY, 'necessary');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-background border-t border-border shadow-xl">
      <div className="container py-4 md:py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground max-w-2xl">
            Diese Website verwendet Cookies, um Ihnen ein besseres Nutzererlebnis zu ermöglichen. 
            Sie können der Nutzung zustimmen oder nur notwendige Cookies erlauben.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAcceptNecessary}
              className="whitespace-nowrap"
            >
              Nur notwendige Cookies
            </Button>
            <Button
              variant="cta"
              size="sm"
              onClick={handleAcceptAll}
              className="whitespace-nowrap"
            >
              Alle akzeptieren
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
