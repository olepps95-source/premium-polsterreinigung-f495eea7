import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { ServiceKey, regionalPagesForService } from '@/lib/regionalPages';
import mapAsset from '@/assets/Teppichbodenreinigung_in_Leipzig.png';

const regions = [
  {
    title: 'Chemnitz & Umgebung',
    cities:
      'Chemnitz · Zwickau · Freiberg · Mittweida · Limbach-Oberfrohna · Glauchau · Hohenstein-Ernstthal · Stollberg · Frankenberg · Flöha · Marienberg · Annaberg-Buchholz · Aue-Bad Schlema · Schneeberg',
  },
  {
    title: 'Dresden & Umgebung',
    cities:
      'Dresden · Freital · Radebeul · Coswig · Meißen · Pirna · Heidenau · Radeberg · Dippoldiswalde · Riesa · Großenhain',
  },
  {
    title: 'Leipzig & Umgebung',
    cities:
      'Leipzig · Markkleeberg · Schkeuditz · Taucha · Wurzen · Grimma · Borna · Delitzsch · Eilenburg · Torgau',
  },
  {
    title: 'Weitere Regionen in Sachsen',
    cities: 'Plauen · Reichenbach · Bautzen · Görlitz · Zittau · Hoyerswerda · Kamenz · Weißwasser',
  },
];

const mobileMainCities = 'Chemnitz · Dresden · Leipzig · Zwickau · Freiberg · Plauen · Bautzen · Görlitz';


interface EinsatzgebietSachsenProps {
  heading?: string;
  subtitle?: string;
  description?: string;
  /** When set, the three city region titles link to that service's regional pages. */
  service?: ServiceKey;
  /** Path of the current page, marked as active. */
  currentPath?: string;
  /** When true, each city region lists links to all four regional service pages. */
  showServiceLinks?: boolean;
}

const serviceLinkItems = [
  { label: 'Polsterreinigung', slug: 'polsterreinigung' },
  { label: 'Fensterreinigung', slug: 'fensterreinigung' },
  { label: 'Teppichbodenreinigung', slug: 'teppichbodenreinigung' },
  { label: 'Gewerbereinigung', slug: 'gewerbereinigung' },
];

const ServiceLinks = ({ title }: { title: string }) => {
  const cityKey = title.split(' ')[0].toLowerCase();
  return (
    <ul className="flex flex-wrap gap-1.5 mt-2" aria-label={`Leistungen in ${title.split(' ')[0]}`}>
      {serviceLinkItems.map((s) => (
        <li key={s.slug}>
          <Link
            to={`/${s.slug}-${cityKey}`}
            className="inline-block rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {s.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export function EinsatzgebietSachsen({ heading, subtitle, description, service, currentPath, showServiceLinks }: EinsatzgebietSachsenProps = {}) {
  const [open, setOpen] = useState(false);
  const links = service ? regionalPagesForService(service) : [];
  const RegionTitle = ({ title }: { title: string }) => {
    const page = links.find((p) => title.startsWith(p.city.name));
    if (!page) return <p className="font-semibold text-foreground text-sm mb-1">{title}</p>;
    const active = page.path === currentPath;
    return (
      <p className="font-semibold text-sm mb-1">
        <Link
          to={page.path}
          aria-current={active ? 'page' : undefined}
          className={`group inline-flex items-center gap-1 transition-colors hover:text-primary ${active ? 'text-primary' : 'text-foreground'}`}
        >
          {title}
          <ArrowRight className="w-3.5 h-3.5 text-primary transition-transform group-hover:translate-x-0.5" />
        </Link>
      </p>
    );
  };

  return (
    <section id="einsatzgebiet-sachsen" className="py-8 md:py-14 bg-background">
      <div className="container">
        {(heading || subtitle) && (
          <div className="text-center mb-6 md:mb-10">
            {heading && (
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-2">{heading}</h2>
            )}
            {subtitle && (
              <p className="text-muted-foreground text-sm md:text-base">{subtitle}</p>
            )}
          </div>
        )}
        <div className="grid md:grid-cols-[11fr_9fr] gap-6 md:gap-12 items-center">
          {/* Map */}
          <div className="flex justify-center items-center h-full">
            <div className="w-full max-w-none flex items-center justify-center">
              <img
                src={mapAsset}
                alt="Karte von Deutschland mit hervorgehobenem Einsatzgebiet Sachsen"
                className="w-full md:w-[114%] h-auto object-contain max-w-none"
                loading="lazy"
              />
            </div>
          </div>

          {/* Text */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Rein<span className="text-rw-blue">Werk</span> in ganz Sachsen
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-5 text-sm md:text-base">
              {description ??
                'Wir sind in ganz Sachsen für Sie unterwegs. Professionelle Teppichbodenreinigung für Privat- und Gewerbekunden – von Chemnitz über Dresden und Leipzig bis in kleinere Städte und Gemeinden.'}
            </p>

            {/* Mobile short list */}
            <p className="md:hidden text-sm text-foreground leading-relaxed mb-4">
              {mobileMainCities}
            </p>

            {/* Desktop full region list */}
            <div className="hidden md:block space-y-4">
              {regions.slice(0, 3).map((r) => (
                <div key={r.title} className="border-t border-border pt-3">
                  <RegionTitle title={r.title} />
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.cities}</p>
                  {showServiceLinks && <ServiceLinks title={r.title} />}
                </div>
              ))}
            </div>

            {/* Expandable extra */}
            {open && (
              <div className="space-y-4 mt-4">
                <div className="md:hidden space-y-4">
                  {regions.slice(0, 3).map((r) => (
                    <div key={r.title} className="border-t border-border pt-3">
                      <RegionTitle title={r.title} />
                      <p className="text-sm text-muted-foreground leading-relaxed">{r.cities}</p>
                      {showServiceLinks && <ServiceLinks title={r.title} />}
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-3">
                  <p className="font-semibold text-foreground text-sm mb-1">{regions[3].title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{regions[3].cities}</p>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              {open ? 'Weniger anzeigen' : 'Alle Einsatzorte anzeigen'}
              <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            <div className="mt-6 rounded-xl border border-border p-4">
              <p className="font-semibold text-foreground text-sm">Ihr Ort ist nicht dabei?</p>
              <p className="text-sm text-muted-foreground mt-1">
                Fragen Sie uns einfach an – wir prüfen gerne, ob Ihr Standort in unserem
                Einsatzgebiet liegt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
