import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls the window to the top on every route change.
 * - Only triggers when the pathname changes (not on hash-only changes),
 *   so in-page anchor links (#section) still scroll to their target.
 * - Uses useLayoutEffect so the reset runs before the browser paints.
 * - Uses behavior: 'instant', which overrides the global CSS
 *   `scroll-behavior: smooth` on <html> so the reset is immediate
 *   and cannot race with post-navigation layout/image reflow.
 * - Native scroll restoration is disabled in main.tsx.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
