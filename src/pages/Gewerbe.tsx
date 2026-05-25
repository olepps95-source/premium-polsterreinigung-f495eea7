import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MessageCircle, Phone, Check, FileText, CalendarClock, MapPin } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import heroGewerbe from '@/assets/hero-gewerbe.jpg';
import kitaReinigung from '@/assets/kita-reinigung.jpeg';
import teppichreinigungBuero from '@/assets/teppichreinigung-buero.jpg';
import hartbodenreinigung from '@/assets/hartbodenreinigung.jpg';
import kombipaket from '@/assets/kombipaket.jpeg';
import stuhlreinigung from '@/assets/stuhlreinigung.jpeg';
import matratzenreinigung from '@/assets/matratzenreinigung.jpg';
import polsterreinigung from '@/assets/polsterreinigung.jpeg';
import pflegeheime from '@/assets/pflegeheime.jpg';

const WHATSAPP_URL = 'https://wa.me/491636986317';
const TEL = 'tel:+491632373108';
const PHONE_DISPLAY = '+49 163 2373108';

const SERVICES = [
  'Teppichreinigung',
  'Polsterreinigung',
  'Matratzenreinigung',
  'Hartbodenreinigung',
  'Stuhlreinigung',
  'Kombipaket',
];

function useGewerbeHead() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Gewerbereinigung Sachsen — Teppich, Polster & Böden | ReinWerk';

    const tags: HTMLElement[] = [];

    const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      const created = !el;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      const prev = el.getAttribute('content');
      el.setAttribute('content', content);
      if (created) tags.push(el);
      else (el as any).__prev = prev;
    };

    setMeta(
      'name',
      'description',
      'Professionelle Reinigung für Hotels, Kitas, Arztpraxen & Büros in Sachsen. Teppiche, Polster, Matratzen & Hartböden. Vor-Ort Service in Dresden, Leipzig & Chemnitz. Angebot in 15 Min — ReinWerk.'
    );
    setMeta(
      'name',
      'keywords',
      'Gewerbereinigung Sachsen, Teppichreinigung Hotel Dresden, Polsterreinigung Büro Leipzig, Kita Reinigung Chemnitz, Arztpraxis Reinigung Sachsen, Stuhlreinigung Gewerbe, Hartbodenreinigung Büro, gewerbliche Reinigung Sachsen'
    );
    setMeta('property', 'og:title', 'ReinWerk — Gewerbereinigung in Sachsen');
    setMeta(
      'property',
      'og:description',
      'Professionelle Reinigung für Hotels, Kitas, Praxen & Büros. Teppiche, Polster, Matratzen & Böden. Vor-Ort in Dresden, Leipzig & Chemnitz.'
    );
    setMeta('property', 'og:url', 'https://reinwerk-service.de/gewerbe');

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const prevCanonical = canonical?.getAttribute('href') ?? null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
      tags.push(canonical);
    }
    canonical.setAttribute('href', 'https://reinwerk-service.de/gewerbe');

    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'ReinWerk',
      description:
        'Professionelle Polster-, Teppich- und Bodenreinigung für Gewerbekunden in Sachsen',
      url: 'https://reinwerk-service.de',
      telephone: '+491632373108',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Matthesstraße 48',
        addressLocality: 'Chemnitz',
        postalCode: '09113',
        addressCountry: 'DE',
      },
      areaServed: ['Dresden', 'Leipzig', 'Chemnitz', 'Sachsen'],
      serviceType: [
        'Teppichreinigung',
        'Polsterreinigung',
        'Matratzenreinigung',
        'Hartbodenreinigung',
        'Stuhlreinigung',
      ],
    });
    document.head.appendChild(ld);
    tags.push(ld);

    return () => {
      document.title = prevTitle;
      tags.forEach((t) => t.remove());
      if (canonical && prevCanonical !== null) canonical.setAttribute('href', prevCanonical);
    };
  }, []);
}

const ClientCard = ({
  photo,
  title,
  text,
  alt,
}: {
  photo: string;
  icon?: string;
  title: string;
  text: string;
  badge?: string;
  alt: string;
}) => (
  <div className="group h-full flex flex-col bg-card rounded-3xl shadow-soft border border-border overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-medium hover:-translate-y-1">
    <div className="overflow-hidden">
      <img
        src={photo}
        alt={alt}
        loading="lazy"
        className="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="p-7 flex-1 flex flex-col">
      <h3 className="text-xl font-bold text-foreground mb-2 tracking-tight">{title}</h3>
      <p className="text-muted-foreground leading-relaxed text-[15px]">{text}</p>
    </div>
  </div>

);


const ServiceCard = ({
  photo,
  title,
  items,
  alt,
}: {
  photo: string;
  icon?: string;
  title: string;
  items: string[];
  alt: string;
}) => (
  <div className="bg-white/[0.04] backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-primary/50 hover:bg-white/[0.06] transition-all duration-300">
    <img src={photo} alt={alt} loading="lazy" className="w-full h-[190px] object-cover" />
    <div className="p-7">
      <h3 className="text-xl font-bold text-white mb-5 tracking-tight">{title}</h3>
      <ul className="divide-y divide-white/10">
        {items.map((it) => (
          <li key={it} className="text-white/80 text-sm py-2.5 first:pt-0 last:pb-0 leading-relaxed">
            {it}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const Gewerbe = () => {
  useGewerbeHead();

  const [form, setForm] = useState({
    firma: '',
    name: '',
    phone: '',
    email: '',
    typ: '',
    nachricht: '',
  });
  const [services, setServices] = useState<string[]>([]);

  const toggleService = (s: string) =>
    setServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firma || !form.name || !form.phone || !form.email || !form.typ) {
      toast({ title: 'Bitte alle Pflichtfelder ausfüllen', variant: 'destructive' });
      return;
    }
    const text = `Neue Gewerbe-Anfrage:%0A%0AFirma: ${form.firma}%0AAnsprechpartner: ${form.name}%0ATelefon: ${form.phone}%0AE-Mail: ${form.email}%0AUnternehmensart: ${form.typ}%0ALeistungen: ${services.join(', ') || '-'}%0ANachricht: ${form.nachricht || '-'}`;
    window.open(`https://wa.me/491636986317?text=${text}`, '_blank');
    toast({ title: 'Anfrage wird an WhatsApp übergeben' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* HERO */}
        <section className="relative pt-24 lg:pt-32 pb-10 lg:pb-24 overflow-hidden bg-background">
          {/* Full-width background image, right-anchored (homepage style) */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroGewerbe}
              alt="Professionelle Gewerbereinigung — Teppichreinigung im Büro in Sachsen | ReinWerk"
              className="w-full h-full object-cover object-right"
              loading="eager"
            />
            {/* Left-to-right white fade — keeps text crisp, image visible on right */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
          </div>

          <div className="container relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <p className="text-xs sm:text-sm font-bold tracking-[0.25em] text-primary uppercase mb-3 lg:mb-5">
                Für Unternehmen & Gewerbe
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.05] tracking-tight mb-10 lg:mb-7">
                Professionelle<br />
                <span className="text-primary">Reinigung</span> für<br />
                <span className="whitespace-nowrap">Ihr Unternehmen</span>
              </h1>

              <p className="text-base sm:text-lg lg:text-lg font-semibold text-foreground mb-8 lg:mb-10 max-w-md leading-relaxed">
                Teppiche, Polster, Matratzen & Hartböden — professioneller Vor-Ort Service in ganz Sachsen.
              </p>



              <div className="grid grid-cols-3 gap-2 lg:gap-4 mb-6 lg:mb-10 max-w-xl">
                {[
                  { Icon: FileText, t: 'Rechnung', s: 'Professionell & transparent' },
                  { Icon: CalendarClock, t: 'Flexibel', s: 'Auch am Wochenende' },
                  { Icon: MapPin, t: 'Sachsen', s: 'Vor-Ort Service' },
                ].map(({ Icon, t, s }) => (
                  <div
                    key={t}
                    className="bg-card/90 backdrop-blur-sm border border-border rounded-xl lg:rounded-2xl p-3 lg:p-4 text-center shadow-medium hover:shadow-glow transition-shadow flex flex-col items-center justify-center min-h-[110px] lg:min-h-[130px] w-full"
                  >
                    <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-primary mb-1.5 lg:mb-2.5" strokeWidth={1.75} />
                    <p className="font-bold text-sm text-foreground leading-tight">{t}</p>
                    <p className="text-[11px] text-muted-foreground mt-1 leading-tight">{s}</p>
                  </div>
                ))}
              </div>


              <div className="flex flex-col lg:flex-row gap-2 lg:gap-3">
                <Button
                  size="lg"
                  className="h-12 lg:h-14 w-full lg:basis-3/5 bg-[#1E90FF] hover:bg-[#1878d4] hover:shadow-xl text-white rounded-xl shadow-lg font-semibold transition-all hover:-translate-y-0.5"
                  asChild
                >
                  <a
                    href="#angebot-anfordern"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('angebot-anfordern')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    📋 Angebot anfordern →
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 lg:h-14 w-full lg:basis-2/5 rounded-xl bg-white border-2 border-[#0A1628] text-[#0A1628] hover:bg-[#0A1628] hover:text-white font-semibold transition-all hover:-translate-y-0.5"
                  asChild
                >
                  <a href={TEL}>
                    📞 Anrufen
                  </a>
                </Button>
              </div>
            </div>

            {/* Right column intentionally empty — image is full-width background */}
            <div aria-hidden className="hidden lg:block" />
          </div>
        </section>



        {/* TARGET CLIENTS */}
        <section className="py-16 bg-background">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Wir reinigen für
              </h2>
              <p className="text-muted-foreground text-lg">
                Maßgeschneiderte Lösungen für jeden Unternehmenstyp
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
              <ClientCard
                photo="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80"
                alt="Hotelzimmer-Reinigung Dresden — Teppiche und Matratzen | ReinWerk"
                icon="🏨"
                title="Hotels & Pensionen"
                text="Zimmerteppiche, Matratzen, Lobby-Sofas & Sessel — diskret und zuverlässig zwischen den Saisons."
              />
              <ClientCard
                photo={kitaReinigung}
                alt="Kita-Reinigung Chemnitz — Spielteppiche und Matratzen | ReinWerk"
                icon="🏫"
                title="Kitas & Schulen"
                text="Spielteppiche, Schlafmatratzen & Sitzmöbel — ideal während der Ferien ohne Betriebsunterbrechung."
              />
              <ClientCard
                photo="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80"
                alt="Arztpraxis-Reinigung Sachsen — Wartezimmer hygienisch sauber | ReinWerk"
                icon="🏥"
                title="Arztpraxen & Praxen"
                text="Wartezimmer-Stühle, Teppiche & Hartböden — hygienisch sauber, mit Rechnung für Ihre Buchhaltung."
              />
              <ClientCard
                photo="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80"
                alt="Büroreinigung Leipzig — Bürostühle und Teppiche | ReinWerk"
                icon="🏢"
                title="Büros & Unternehmen"
                text="Bürostühle, Konferenzräume, Teppiche & Böden — Termine abends oder am Wochenende möglich."
              />
              <ClientCard
                photo={pflegeheime}
                alt="Pflegeheim-Reinigung Sachsen — Matratzen und Polstermöbel hygienisch | ReinWerk"
                icon="🏠"
                title="Pflegeheime & Seniorenresidenzen"
                text="Matratzen, Teppiche & Polstermöbel — hygienisch sauber und desinfiziert. Regelmäßige Servicetermine möglich."
              />
              <ClientCard
                photo="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80"
                alt="Restaurant-Reinigung Chemnitz — Stühle, Bänke und Teppiche | ReinWerk"
                icon="🍽️"
                title="Restaurants & Cafés"
                text="Stühle, Bänke & Teppiche — sauber und einladend für Ihre Gäste. Termine nach Schließungszeit möglich."
              />
            </div>

          </div>
        </section>

        {/* SERVICES */}
        <section className="py-20 bg-[#0F1E36]">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight">
                Unsere Leistungen für Gewerbekunden
              </h2>
              <p className="text-primary text-lg">Alle Reinigungsarten aus einer Hand</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard
                photo={teppichreinigungBuero}
                alt="Teppichreinigung für Büros und Hotels in Sachsen — ReinWerk"
                icon="🧹"
                title="Teppichreinigung"
                items={[
                  'Büro & Hotel bis 50m² — ab 149€',
                  'Büro & Hotel 50-100m² — ab 249€',
                  'Über 100m² — auf Anfrage',
                ]}
              />
              <ServiceCard
                photo={polsterreinigung}
                alt="Polsterreinigung Bürostühle und Sofas in Sachsen — ReinWerk"
                icon="🛋️"
                title="Polsterreinigung"
                items={[
                  'Bürostühle (10 Stück) — ab 149€',
                  'Wartezimmer-Sofas — ab 99€',
                  'Lobby-Sessel — ab 79€',
                ]}
              />
              <ServiceCard
                photo={matratzenreinigung}
                alt="Matratzenreinigung Hotel und Kita in Sachsen — ReinWerk"
                icon="🛏️"
                title="Matratzenreinigung"
                items={[
                  'Hotel (10 Stück) — ab 299€',
                  'Kita (alle Matratzen) — ab 199€',
                  'Einzeln — ab 39€',
                ]}
              />
              <ServiceCard
                photo={hartbodenreinigung}
                alt="Hartbodenreinigung Laminat Fliesen Vinyl in Sachsen — ReinWerk"
                icon="✨"
                title="Hartbodenreinigung"
                items={[
                  'Laminat bis 50m² — ab 79€',
                  'Fliesen bis 50m² — ab 89€',
                  'Vinyl & PVC — ab 79€',
                ]}
              />
              <ServiceCard
                photo={stuhlreinigung}
                alt="Stuhlreinigung Wartezimmer und Konferenz in Sachsen — ReinWerk"
                icon="🪑"
                title="Stuhlreinigung"
                items={[
                  'Wartezimmer-Stühle — ab 9€/Stück',
                  'Konferenzstühle — ab 9€/Stück',
                  'Mindeststückzahl: 10 Stühle',
                ]}
              />
              <ServiceCard
                photo={kombipaket}
                alt="Kombipaket Polster Teppich Boden Gewerbe Sachsen — ReinWerk"
                icon="📦"
                title="Kombipaket"
                items={[
                  'Polster + Teppich + Boden',
                  '15% Rabatt auf Gesamtpreis',
                  'Regelmäßiger Vertrag: -20%',
                ]}
              />
            </div>
          </div>
        </section>

        {/* WHY */}
        <section className="py-16 bg-background">
          <div className="container max-w-5xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-center mb-10">
              Warum ReinWerk für Ihr Unternehmen?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                ['Rechnung inklusive', 'Professionell & transparent'],
                ['Flexible Terminplanung', 'Abends, am Wochenende, in den Ferien'],
                ['Keine Betriebsunterbrechung', 'Wir arbeiten wenn Sie geschlossen haben'],
                ['Regelmäßige Serviceverträge', 'Monatlich oder quartalsweise'],
                ['Sachsen-weit verfügbar', 'Dresden, Leipzig, Chemnitz & Umgebung'],
                ['Schnelle Reaktionszeit', 'Angebot innerhalb von 15 Minuten'],
              ].map(([t, s]) => (
                <div key={t} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{t}</h3>
                    <p className="text-muted-foreground text-sm">{s}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT FORM */}
        <section id="angebot-anfordern" className="py-16 bg-[#F0F7FF]">
          <div className="container max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Jetzt Angebot anfordern
              </h2>
              <p className="text-muted-foreground text-lg">
                Kostenlos & unverbindlich — Antwort in 15 Minuten
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl p-6 md:p-8 shadow-medium border border-border space-y-5"
            >
              <div>
                <Label htmlFor="firma">Firmenname *</Label>
                <Input
                  id="firma"
                  required
                  value={form.firma}
                  onChange={(e) => setForm({ ...form, firma: e.target.value })}
                  className="mt-1.5"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Ansprechpartner *</Label>
                  <Input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefonnummer *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">E-Mail *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label>Unternehmensart *</Label>
                <Select value={form.typ} onValueChange={(v) => setForm({ ...form, typ: v })}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Bitte wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hotel / Pension">Hotel / Pension</SelectItem>
                    <SelectItem value="Kita / Schule">Kita / Schule</SelectItem>
                    <SelectItem value="Arztpraxis / Praxis">Arztpraxis / Praxis</SelectItem>
                    <SelectItem value="Büro / Unternehmen">Büro / Unternehmen</SelectItem>
                    <SelectItem value="Sonstiges">Sonstiges</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Gewünschte Leistung *</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  {SERVICES.map((s) => (
                    <label
                      key={s}
                      className="flex items-center gap-2 cursor-pointer text-sm text-foreground"
                    >
                      <Checkbox
                        checked={services.includes(s)}
                        onCheckedChange={() => toggleService(s)}
                      />
                      {s}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="nachricht">Nachricht</Label>
                <Textarea
                  id="nachricht"
                  rows={4}
                  placeholder="Beschreiben Sie kurz Ihre Anfrage (Fläche, Anzahl Stühle etc.)"
                  value={form.nachricht}
                  onChange={(e) => setForm({ ...form, nachricht: e.target.value })}
                  className="mt-1.5"
                />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full">
                Angebot anfordern →
              </Button>
              <div className="text-center text-sm text-muted-foreground pt-2 space-y-1">
                <p>Oder direkt kontaktieren:</p>
                <p>💬 WhatsApp: {PHONE_DISPLAY}</p>
                <p>📞 Telefon: {PHONE_DISPLAY}</p>
              </div>
            </form>
          </div>
        </section>

        {/* FOOTER CTA */}
        <section className="py-16 bg-[#0A1628] text-white">
          <div className="container text-center max-w-3xl">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              Bereit für saubere Geschäftsräume?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl shadow-lg font-semibold"
                asChild
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp schreiben
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0A1628]"
                asChild
              >
                <a href={TEL}>
                  <Phone className="w-5 h-5" />
                  {PHONE_DISPLAY}
                </a>
              </Button>
            </div>
            <p className="text-sm text-white/60 mt-8">
              reinwerk-service.de | Sachsen, Deutschland
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Gewerbe;
