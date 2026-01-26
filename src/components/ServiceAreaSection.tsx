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
    <section id="einsatzgebiet" className="py-16">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary/10 via-accent to-primary/5 rounded-3xl p-10 md:p-16 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
              <MapPin className="w-10 h-10 text-primary" />
            </div>
            
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">Einsatzgebiet</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Wir kommen zu Ihnen
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Unser mobiler Reinigungsservice ist in ganz Sachsen für Sie unterwegs. 
              Wir reinigen Ihre Polster direkt bei Ihnen zu Hause – bequem und ohne Transport.
            </p>
            
            {/* Mobile: 3-column grid, Desktop: flex wrap */}
            <div className="max-w-2xl mx-auto">
              <div className="grid grid-cols-3 gap-2 md:hidden">
                {cities.map((city) => (
                  <span
                    key={city}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-card shadow-soft text-foreground font-medium text-sm"
                  >
                    <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    {city}
                  </span>
                ))}
              </div>
              {/* "und Umgebung" centered below grid on mobile */}
              <div className="mt-2 md:hidden">
                <span className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-card shadow-soft text-foreground font-medium text-sm">
                  <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  und Umgebung
                </span>
              </div>
              
              {/* Desktop: original flex layout */}
              <div className="hidden md:flex md:flex-wrap md:justify-center md:gap-3">
                {cities.map((city) => (
                  <span
                    key={city}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card shadow-soft text-foreground font-medium"
                  >
                    <MapPin className="w-4 h-4 text-primary" />
                    {city}
                  </span>
                ))}
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card shadow-soft text-foreground font-medium">
                  <MapPin className="w-4 h-4 text-primary" />
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
