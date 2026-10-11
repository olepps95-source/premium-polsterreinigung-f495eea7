import { Link } from 'react-router-dom';
import { ServiceKey, regionalPagesForService } from '@/lib/regionalPages';

/** Inline, crawlable links to a service's regional pages, e.g. "Dresden, Leipzig, Chemnitz & Umgebung". */
export function InlineCityLinks({ service, currentPath, order = ['Dresden', 'Leipzig', 'Chemnitz'] }: { service: ServiceKey; currentPath?: string; order?: string[] }) {
  const pages = regionalPagesForService(service);
  const sorted = order.map((n) => pages.find((p) => p.city.name === n)).filter(Boolean) as typeof pages;
  return (
    <>
      {sorted.map((p, i) => (
        <span key={p.path}>
          <Link
            to={p.path}
            aria-current={p.path === currentPath ? 'page' : undefined}
            className={`underline-offset-2 hover:underline hover:text-primary transition-colors ${p.path === currentPath ? 'text-primary font-medium' : ''}`}
          >
            {p.city.name}
          </Link>
          {i < sorted.length - 2 ? ', ' : i === sorted.length - 2 ? ', ' : ''}
        </span>
      ))}
      {' '}& Umgebung
    </>
  );
}
