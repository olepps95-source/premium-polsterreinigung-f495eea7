import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls the window to the top on every route change.
 * - Only triggers when the pathname changes (not on hash-only changes),
 *   so in-page anchor links (#section) still scroll to their target.
 * - Uses useLayoutEffect + a synchronous positional scrollTo so the reset
 *   happens before the browser paints, beating any layout/scroll jitter.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
