import { MapPin } from 'lucide-react';

const cities = [
  'Chemnitz',
  'Dresden',
  'Leipzig',
  'Zwickau',
  'Plauen',
  'Freiberg',
];

export function ServiceAreaSection() {
  return (
    <section id="einsatzgebiet" className="py-12 md:py-16">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary/10 via-accent to-primary/5 rounded-2xl md:rounded-3xl p-6 md:p-16 text-center">
            <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 md:mb-8">
              <MapPin className="w-7 h-7 md:w-10 md:h-10 text-primary" />
            </div>
            
            <p className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wider mb-2 md:mb-4">Einsatzgebiet</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 md:mb-6">
              Wir kommen zu Ihnen
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground mb-6 md:mb-10 max-w-2xl mx-auto">
              Unser mobiler Reinigungsservice ist in ganz Sachsen für Sie unterwegs.
            </p>
            
            {/* Mobile: 2-column grid, Desktop: flex wrap */}
            <div className="max-w-2xl mx-auto">
              {/* Mobile grid */}
              <div className="grid grid-cols-2 gap-2 md:hidden">
                {cities.map((city) => (
                  <span
                    key={city}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-card shadow-soft text-foreground font-medium text-xs whitespace-nowrap"
                  >
                    <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span>{city}</span>
                  </span>
                ))}
              </div>
              {/* "und Umgebung" centered below grid on mobile */}
              <div className="flex justify-center mt-2 md:hidden">
                <span className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-card shadow-soft text-foreground font-medium text-xs whitespace-nowrap">
                  <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span>und Umgebung</span>
                </span>
              </div>
              
              {/* Desktop: flex layout */}
              <div className="hidden md:flex md:flex-wrap md:justify-center md:gap-3">
                {cities.map((city) => (
                  <span
                    key={city}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card shadow-soft text-foreground font-medium"
                  >
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                    {city}
                  </span>
                ))}
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
