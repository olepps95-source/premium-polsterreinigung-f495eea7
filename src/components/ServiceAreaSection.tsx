import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const defaultCities = [
  'Chemnitz',
  'Dresden',
  'Leipzig',
  'Zwickau',
  'Plauen',
  'Freiberg',
];

export function ServiceAreaSection({ heading, description, cities = defaultCities, cityLinks = {}, currentPath }: { heading?: string; description?: string; cities?: string[]; cityLinks?: Record<string, string>; currentPath?: string } = {}) {
  const pill = (city: string, base: string, inner: React.ReactNode) => {
    const to = cityLinks[city];
    if (!to) return <span key={city} className={base}>{inner}</span>;
    const active = to === currentPath;
    return (
      <Link key={city} to={to} aria-current={active ? 'page' : undefined} className={`${base} transition-colors hover:text-primary hover:ring-1 hover:ring-primary/40 ${active ? 'ring-1 ring-primary/40 text-primary' : ''}`}>
        {inner}
      </Link>
    );
  };
  return (
    <section id="einsatzgebiet" className="py-10">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary/10 via-accent to-primary/5 rounded-3xl p-10 md:p-16 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
              <MapPin className="w-10 h-10 text-primary" />
            </div>
            
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">Einsatzgebiet</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {heading ?? 'Wir kommen zu Ihnen'}
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              {description ?? 'Unser mobiler Reinigungsservice ist in ganz Sachsen für Sie unterwegs. Wir reinigen Ihre Polster direkt bei Ihnen zu Hause – bequem und ohne Transport.'}
            </p>
            
            {/* Mobile: 2-column grid, Desktop: flex wrap */}
            <div className="max-w-2xl mx-auto">
              {/* Mobile grid */}
              <div className="grid grid-cols-2 gap-2.5 md:hidden">
                {cities.map((city) =>
                  pill(city, 'flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-card shadow-soft text-foreground font-medium text-sm whitespace-nowrap', (
                    <><MapPin className="w-4 h-4 text-primary flex-shrink-0" /><span>{city}</span></>
                  )),
                )}
              </div>
              {/* "und Umgebung" centered below grid on mobile */}
              <div className="flex justify-center mt-2.5 md:hidden">
                <span className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-card shadow-soft text-foreground font-medium text-sm whitespace-nowrap">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>und Umgebung</span>
                </span>
              </div>
              
              {/* Desktop: flex layout */}
              <div className="hidden md:flex md:flex-wrap md:justify-center md:gap-3">
                {cities.map((city) =>
                  pill(city, 'inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card shadow-soft text-foreground font-medium', (
                    <><MapPin className="w-4 h-4 text-primary flex-shrink-0" />{city}</>
                  )),
                )}
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card shadow-soft text-foreground font-medium">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  und Umgebung
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
