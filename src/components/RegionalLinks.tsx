import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { ServiceKey, regionalPagesForService } from '@/lib/regionalPages';

export function RegionalLinks({ service }: { service: ServiceKey }) {
  const pages = regionalPagesForService(service);
  return (
    <section className="py-8 md:py-10 bg-background">
      <div className="container max-w-3xl text-center">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">Unsere Reinigungsleistungen in Ihrer Nähe</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {pages.map((p) => (
            <Link key={p.path} to={p.path} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-foreground font-medium hover:border-primary hover:text-primary transition-colors">
              <MapPin className="w-4 h-4 text-primary" /> {p.service.name} {p.city.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
