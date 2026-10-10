import FensterRegionalPage from '@/components/regional/FensterRegionalPage';
import PolsterRegionalPage from '@/components/regional/PolsterRegionalPage';
import TeppichRegionalPage from '@/components/regional/TeppichRegionalPage';
import GewerbeRegionalPage from '@/components/regional/GewerbeRegionalPage';
import { RegionalPage } from '@/lib/regionalPages';

/** Each regional page renders the layout of its original service page with city texts. */
export default function RegionalServicePage({ page }: { page: RegionalPage }) {
  const k = page.service.key;
  if (k === 'fenster') return <FensterRegionalPage key={page.path} page={page} />;
  if (k === 'polster') return <PolsterRegionalPage key={page.path} page={page} />;
  if (k === 'teppich') return <TeppichRegionalPage key={page.path} page={page} />;
  return <GewerbeRegionalPage key={page.path} page={page} />;
}
