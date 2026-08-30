import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls the window to the top on every route change.
 * - Disables the browser's native scroll restoration (which would otherwise
 *   restore the previous scroll position for a URL and override our reset).
 * - Only triggers when the pathname changes (not on hash-only changes),
 *   so in-page anchor links (#section) still scroll to their target.
 * - Uses "instant" behavior so the new page starts at top without animation.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
