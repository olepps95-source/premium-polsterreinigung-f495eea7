import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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

function GermanyMap() {
  return (
    <svg
      viewBox="0 0 320 400"
      className="w-full h-auto"
      role="img"
      aria-label="Karte von Deutschland mit hervorgehobenem Einsatzgebiet Sachsen"
    >
      {/* Germany outline (simplified, decorative) */}
      <path
        d="M120 18 L150 12 L163 26 L186 22 L196 36 L214 40 L210 60 L226 72 L246 70 L254 88 L242 104 L252 120 L246 140 L262 152 L280 150 L286 168 L272 186 L282 204 L268 218 L276 238 L262 252 L268 272 L250 286 L252 306 L232 316 L226 336 L206 342 L192 360 L172 352 L156 366 L140 352 L124 358 L112 342 L94 340 L86 322 L68 316 L62 296 L46 288 L52 268 L38 254 L48 236 L36 220 L46 200 L34 184 L46 166 L38 146 L54 132 L48 112 L64 100 L60 80 L78 70 L82 50 L100 44 Z"
        fill="hsl(var(--secondary))"
        stroke="hsl(var(--border))"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Internal state borders (decorative, very light) */}
      <g stroke="hsl(var(--border))" strokeWidth="1" fill="none" opacity="0.7">
        <path d="M60 110 L150 96 L226 118" />
        <path d="M150 96 L146 200" />
        <path d="M46 200 L146 200 L246 186" />
        <path d="M146 200 L160 300" />
        <path d="M62 296 L160 300 L252 306" />
        <path d="M226 118 L246 186" />
      </g>
      {/* Sachsen highlighted */}
      <path
        d="M212 196 L246 186 L272 200 L282 224 L262 248 L232 254 L204 244 L196 220 Z"
        fill="hsl(var(--primary))"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Cities */}
      <g>
        <circle cx="222" cy="212" r="4" fill="hsl(var(--primary-foreground))" opacity="0.95" />
        <circle cx="252" cy="216" r="4" fill="hsl(var(--primary-foreground))" opacity="0.95" />
        <circle cx="232" cy="236" r="6.5" fill="hsl(var(--primary-foreground))" />
        <circle cx="232" cy="236" r="3" fill="hsl(var(--primary))" />
      </g>
    </svg>
  );
}

export function EinsatzgebietSachsen() {
  const [open, setOpen] = useState(false);

  return (
    <section id="einsatzgebiet-sachsen" className="py-8 md:py-14 bg-background">
      <div className="container">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground">
            Unser Einsatzgebiet in Sachsen
          </h2>
          <p className="mt-2 text-muted-foreground text-sm md:text-lg">
            Professionelle Reinigung direkt bei Ihnen vor Ort
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
          {/* Map */}
          <div className="flex justify-center">
            <div className="w-[75%] md:w-full max-w-[380px]">
              <GermanyMap />
              <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="font-semibold text-primary">Chemnitz</span>
                <span>Dresden</span>
                <span>Leipzig</span>
              </div>
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
