import { ArrowRight, Calculator, CalendarClock, Check, FileText, MessageCircle, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import polsterDesktop from '@/assets/hero-living-room.jpg';
import polsterMobile from '@/assets/hero-sofa-mobile.jpg';
import fensterDesktop from '@/assets/fenster-hero.jpg';
import fensterMobile from '@/assets/fensterreinigung-hero-mobile.png';
import teppichDesktop from '@/assets/teppichbodenreinigung-hero.jpg';
import teppichMobile from '@/assets/teppichreinigung-kita.png';
import gewerbeHero from '@/assets/teppichboden-buero.jpeg';

// Regional heroes mirror the hero of their original service page; only text is city-specific.
export const REGIONAL_WHATSAPP_URL =
  'https://api.whatsapp.com/send/?phone=491636986317&text&type=phone_number&app_absent=0';

export interface RegionalHeroProps {
  serviceName: string;
  cityName: string;
  subtitle: string;
}

const scrollToContact = () => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });

function MobileCtas({ offerLabel }: { offerLabel: string }) {
  return (
    <div className="flex flex-col gap-2">
      <Button size="lg" onClick={scrollToContact} className="w-full min-h-[3.5rem] h-auto py-3 px-4 font-semibold justify-start gap-4 rounded-xl">
        <FileText className="w-6 h-6 text-white shrink-0" />
        <div className="flex flex-col items-start text-left">
          <span className="text-white font-bold text-base leading-tight">{offerLabel}</span>
          <span className="text-white/80 text-xs leading-tight">Unverbindlich anfragen</span>
        </div>
      </Button>
      <Button size="lg" className="w-full min-h-[3.5rem] h-auto py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white justify-start gap-4 rounded-xl shadow-lg font-semibold" asChild>
        <a href={REGIONAL_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="w-6 h-6 text-white shrink-0" />
          <div className="flex flex-col items-start text-left">
            <span className="text-white font-bold text-base leading-tight">WhatsApp schreiben</span>
            <span className="text-white/80 text-xs leading-tight">Direkt & unkompliziert</span>
          </div>
        </a>
      </Button>
    </div>
  );
}

function UspCards({ items, cols = 'sm:grid-cols-3' }: { items: { title: string; sub: string }[]; cols?: string }) {
  return (
    <>
      <div className={`mt-4 hidden md:grid grid-cols-1 ${cols} gap-3`}>
        {items.map((b) => (
          <div key={b.title} className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/80 backdrop-blur-md border border-border/60 shadow-soft">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-foreground leading-tight">{b.title}</span>
              <span className="text-xs text-muted-foreground leading-tight">{b.sub}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="md:hidden mt-3 space-y-0">
        {items.map((b, idx) => (
          <div key={b.title} className={`flex items-center gap-3 py-2 ${idx < items.length - 1 ? 'border-b border-white/10' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-slate-900/80 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white leading-tight">{b.title}</span>
              <span className="text-xs text-gray-300 leading-tight">{b.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/** Same layout as the hero of /polsterreinigung */
export function PolsterRegionalHero({ serviceName, cityName, subtitle }: RegionalHeroProps) {
  const isMobile = useIsMobile();
  const trust = [
    { big: 'Gratis', lines: ['Kostenlose', 'Anfahrt'] },
    { big: '0 €', lines: ['Keine', 'versteckten', 'Gebühren'] },
    { big: '500+', lines: ['Zufriedene', 'Kunden'] },
  ];

  if (isMobile) {
    return (
      <section className="relative flex flex-col pt-16 overflow-hidden bg-background">
        <div className="relative w-full">
          <img src={polsterMobile} alt={`${serviceName} ${cityName} – ReinWerk`} className="w-full h-auto" loading="eager" />
          <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent px-4 pt-4 pb-16">
            <h1 className="text-3xl font-extrabold text-white leading-tight">
              <span className="text-primary">{serviceName}</span> in {cityName}
            </h1>
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent pt-32 pb-12 px-4">
            <div className="mb-4"><MobileCtas offerLabel="Kostenloses Angebot" /></div>
            <div className="grid grid-cols-3 gap-3 w-full">
              {trust.map((t) => (
                <div key={t.big} className="flex flex-col text-center">
                  <p className="text-2xl font-bold text-primary">{t.big}</p>
                  {t.lines.map((l) => <p key={l} className="text-xs text-white leading-tight">{l}</p>)}
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="container pt-5 text-base text-foreground font-medium">{subtitle}</p>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-start pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={polsterDesktop} alt={`${serviceName} ${cityName} – sauberes Sofa im Wohnzimmer`} className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
      </div>
      <div className="container relative z-10 py-32">
        <div className="max-w-2xl text-left">
          <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-up">
            <span className="text-primary">{serviceName}</span> in {cityName} – direkt bei Ihnen vor Ort
          </h1>
          <p className="text-xl text-foreground mb-10 max-w-xl animate-fade-up">{subtitle}</p>
          <div className="flex gap-8 mb-8 animate-fade-up">
            {trust.map((t) => (
              <div key={t.big} className="flex flex-col text-left">
                <p className="text-3xl font-bold text-primary">{t.big}</p>
                {t.lines.map((l) => <p key={l} className="text-sm text-foreground leading-tight">{l}</p>)}
              </div>
            ))}
          </div>
          <div className="flex flex-row gap-4 animate-fade-up">
            <Button size="lg" className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl shadow-lg font-semibold" asChild>
              <a href={REGIONAL_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-6 h-6" />
                <span className="text-lg md:text-xl font-bold">WhatsApp schreiben</span>
              </a>
            </Button>
            <Button variant="hero" size="lg" asChild>
              <a href="#kontakt">Jetzt unverbindlich anfragen <ArrowRight className="w-5 h-5" /></a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Same layout as the hero of /fensterreinigung and /teppichbodenreinigung (background image + overlay) */
function ImageHero({
  serviceName, cityName, subtitle, desktop, mobile, mobilePos, usps, uspCols, offerLabel,
}: RegionalHeroProps & { desktop: string; mobile: string; mobilePos: string; usps: { title: string; sub: string }[]; uspCols?: string; offerLabel: string }) {
  return (
    <section className="relative min-h-[100svh] md:min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden">
      <div className={`absolute inset-0 md:hidden bg-cover bg-no-repeat ${mobilePos}`} style={{ backgroundImage: `url(${mobile})` }} aria-hidden="true" />
      <div className="absolute inset-0 hidden md:block bg-cover bg-no-repeat bg-top" style={{ backgroundImage: `url(${desktop})` }} role="img" aria-label={`${serviceName} ${cityName} – ReinWerk`} />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25 md:from-background/95 md:via-background/75 md:to-background/30" />
      <div className="container mx-auto relative z-10 px-4 pt-3 pb-6 md:py-10">
        <div className="max-w-xl md:max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold md:font-bold tracking-tight leading-[1.05] md:leading-[1.1] text-left text-white md:text-foreground">
            Professionelle <br className="md:hidden" />
            <span className="text-primary">{serviceName}</span>
            <br />
            in {cityName}
          </h1>
          <p className="mt-2 md:mt-3 text-base md:text-xl text-white md:text-foreground font-medium md:font-bold text-left max-w-[340px] sm:max-w-[420px] md:max-w-none leading-snug">
            {subtitle}
          </p>
          <UspCards items={usps} cols={uspCols} />
          <div className="hidden md:flex mt-5 md:mt-6 flex-row gap-3">
            <Button size="lg" className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl shadow-lg font-semibold" asChild>
              <a href={REGIONAL_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" /> WhatsApp schreiben
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" onClick={scrollToContact}>{offerLabel}</Button>
          </div>
          <div className="md:hidden mt-4"><MobileCtas offerLabel={offerLabel} /></div>
        </div>
      </div>
    </section>
  );
}

export function FensterRegionalHero(p: RegionalHeroProps) {
  return (
    <ImageHero
      {...p}
      desktop={fensterDesktop}
      mobile={fensterMobile}
      mobilePos="bg-center"
      offerLabel="Kostenloses Angebot"
      usps={[
        { title: '0 € Anfahrt', sub: 'im Einsatzgebiet' },
        { title: 'Festpreis möglich', sub: 'nach kurzer Einschätzung' },
        { title: 'Privat & Gewerbe', sub: 'flexible Termine' },
      ]}
    />
  );
}

export function TeppichRegionalHero(p: RegionalHeroProps) {
  return (
    <ImageHero
      {...p}
      desktop={teppichDesktop}
      mobile={teppichMobile}
      mobilePos="bg-[position:72%_center]"
      offerLabel="Kostenloses Angebot erhalten"
      usps={[
        { title: 'Tiefenreinigung vor Ort', sub: 'ohne Ausbau des Teppichbodens' },
        { title: 'Für Privat & Gewerbe', sub: 'Auch größere Flächen' },
        { title: 'Kostenlose Anfahrt', sub: 'im Einsatzgebiet' },
      ]}
    />
  );
}

/** Same layout as the hero of /gewerbe */
export function GewerbeRegionalHero({ serviceName, cityName, subtitle }: RegionalHeroProps) {
  return (
    <section className="relative pt-24 lg:pt-32 pb-10 lg:pb-24 overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <img src={gewerbeHero} alt={`${serviceName} ${cityName} – Teppichreinigung im Büro`} className="w-full h-full object-cover object-right" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
      </div>
      <div className="container relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div>
          <p className="text-xs sm:text-sm font-bold tracking-[0.25em] text-primary uppercase mb-3 lg:mb-5">
            Für Unternehmen in {cityName}
          </p>
          <h1 className="text-5xl sm:text-6xl xl:text-7xl font-bold text-foreground leading-[1.05] tracking-tight mb-8 lg:mb-7">
            <span className="text-primary">{serviceName}</span>
            <br />
            in {cityName}
          </h1>
          <p className="text-base sm:text-lg font-semibold text-foreground mb-8 lg:mb-10 max-w-md leading-relaxed">{subtitle}</p>
          <div className="grid grid-cols-3 gap-2 lg:gap-4 mb-6 lg:mb-10 max-w-xl">
            {[
              { Icon: Truck, t: '0€ Anfahrt', s: 'Keine versteckten Gebühren' },
              { Icon: CalendarClock, t: 'Flexibel', s: 'Termine nach Absprache' },
              { Icon: Calculator, t: 'Festpreis', s: 'Vorab kalkulierbar' },
            ].map(({ Icon, t, s }) => (
              <div key={t} className="bg-card/90 backdrop-blur-sm border border-border rounded-xl lg:rounded-2xl p-3 lg:p-4 text-center shadow-medium flex flex-col items-center justify-center min-h-[110px] lg:min-h-[130px] w-full">
                <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary mb-1.5 lg:mb-2.5" strokeWidth={1.75} />
                <p className="font-bold text-sm text-foreground leading-tight">{t}</p>
                <p className="text-[11px] text-muted-foreground mt-1 leading-tight">{s}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-3">
            <Button size="lg" onClick={scrollToContact} className="h-12 lg:h-14 w-full lg:basis-3/5 rounded-xl shadow-lg font-semibold">
              📋 Angebot anfordern →
            </Button>
            <Button size="lg" className="h-12 lg:h-14 w-full lg:basis-2/5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl shadow-lg font-semibold" asChild>
              <a href={REGIONAL_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" /> WhatsApp schreiben
              </a>
            </Button>
          </div>
        </div>
        <div aria-hidden className="hidden lg:block" />
      </div>
    </section>
  );
}
