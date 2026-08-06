import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
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


export function EinsatzgebietSachsen() {
  const [open, setOpen] = useState(false);

  return (
    <section id="einsatzgebiet-sachsen" className="py-8 md:py-14 bg-background">
      <div className="container">
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
              ReinWerk in ganz Sachsen
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-5 text-sm md:text-base">
              Wir sind in ganz Sachsen für Sie unterwegs. Professionelle Teppichbodenreinigung für
              Privat- und Gewerbekunden – von Chemnitz über Dresden und Leipzig bis in kleinere
              Städte und Gemeinden.
            </p>

            {/* Mobile short list */}
            <p className="md:hidden text-sm text-foreground leading-relaxed mb-4">
              {mobileMainCities}
            </p>

            {/* Desktop full region list */}
            <div className="hidden md:block space-y-4">
              {regions.slice(0, 3).map((r) => (
                <div key={r.title} className="border-t border-border pt-3">
                  <p className="font-semibold text-foreground text-sm mb-1">{r.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.cities}</p>
                </div>
              ))}
            </div>

            {/* Expandable extra */}
            {open && (
              <div className="space-y-4 mt-4">
                <div className="md:hidden space-y-4">
                  {regions.slice(0, 3).map((r) => (
                    <div key={r.title} className="border-t border-border pt-3">
                      <p className="font-semibold text-foreground text-sm mb-1">{r.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{r.cities}</p>
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
