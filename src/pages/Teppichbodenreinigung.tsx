import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  MessageCircle,
  Check,
  Phone,
  Home,
  Building2,
  Search,
  Droplets,
  Sparkles,
  Wind,
  Waves,
  ShieldCheck,
  Euro,
  UserCheck,
  Truck,
  Upload,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Footer } from '@/components/Footer';
import { toast } from '@/hooks/use-toast';
import { trackGoogleAdsConversion } from '@/lib/google-ads';
import { trackLead, trackContact } from '@/lib/meta-pixel';
import heroImg from '@/assets/teppichbodenreinigung-hero.jpg';
import problemImg from '@/assets/teppichreinigung-problem.jpeg';
import wohnraumImg from '@/assets/teppichboden-dresden.jpeg';
import gewerbeImg from '@/assets/teppichboden-buero.jpeg';
import reinwerkLogo from '@/assets/reinwerk-logo.jpg';

const WHATSAPP_URL = 'https://wa.me/491636986317';
const PHONE = '+491632373108';
const PHONE_DISPLAY = '+49 163 237 3108';
const PAGE_URL = 'https://reinwerk-service.de/teppichbodenreinigung';
const OG_IMAGE = 'https://reinwerk-service.de/og-image.png';
const WEBHOOK_URL = 'https://hook.eu1.make.com/81hzpicl2zd6d8qsoh5ki43wbw62if58';

const heroBenefits = [
  { title: 'Tiefenreinigung vor Ort', sub: 'ohne Ausbau des Teppichbodens' },
  { title: 'Flecken- & Geruchsbehandlung', sub: 'gezielte Vorbehandlung' },
  { title: 'Für Privat & Gewerbe', sub: 'Auch größere Flächen' },
  { title: 'Kostenlose Anfahrt', sub: 'im Einsatzgebiet' },
];

const problems = [
  'Stark beanspruchte Laufwege und dunkle Trittspuren',
  'Flecken und Verschmutzungen durch Alltag, Kaffee oder Haustiere',
  'Unangenehme Gerüche, die sich in den Fasern festsetzen',
  'Staub und tief sitzender Schmutz, den der Staubsauger nicht erreicht',
  'Verschmutzte Teppichböden in Büros, Praxen und Geschäftsräumen',
];

const steps = [
  { icon: Search, title: 'Teppichboden prüfen', desc: 'Material, Verschmutzung und Flecken einschätzen.' },
  { icon: Droplets, title: 'Vorbehandlung', desc: 'Flecken und stark beanspruchte Laufwege gezielt vorbehandeln.' },
  { icon: Sparkles, title: 'Tiefenreinigung', desc: 'Professionelle Reinigung der Teppichbodenfasern vor Ort.' },
  { icon: Waves, title: 'Extraktion', desc: 'Gelöster Schmutz und Reinigungsmittel werden abgesaugt.' },
  { icon: Wind, title: 'Trocknung', desc: 'Beschleunigte Trocknung mit professioneller Technik.' },
];

const trustItems = [
  { icon: ShieldCheck, title: 'Professionelle Ausrüstung' },
  { icon: Euro, title: 'Transparente Preise' },
  { icon: UserCheck, title: 'Persönlicher Ansprechpartner' },
  { icon: Truck, title: 'Kostenlose Anfahrt im Einsatzgebiet' },
  { icon: Home, title: 'Reinigung direkt beim Kunden' },
];


const faqs = [
  {
    q: 'Wie lange dauert die Teppichbodenreinigung?',
    a: 'Das hängt von der Fläche und dem Verschmutzungsgrad ab. Ein durchschnittliches Zimmer dauert meist 1–2 Stunden, größere Büroflächen entsprechend länger. Den zeitlichen Rahmen nennen wir Ihnen vorab bei der Angebotserstellung.',
  },
  {
    q: 'Wie lange muss der Teppichboden trocknen?',
    a: 'Nach der Extraktion ist der Teppichboden nur noch leicht feucht. Je nach Material, Raumtemperatur und Belüftung dauert die Trocknung in der Regel einige Stunden. Mit unserer beschleunigten Trocknung sind die Räume meist noch am selben Tag wieder nutzbar.',
  },
  {
    q: 'Können alte Flecken entfernt werden?',
    a: 'Viele ältere Flecken lassen sich durch gezielte Vorbehandlung und Tiefenreinigung deutlich reduzieren oder vollständig lösen. Eine pauschale Garantie geben wir bewusst nicht – das Ergebnis hängt von Art, Alter und Material ab. Nach einer kurzen Einschätzung sagen wir Ihnen ehrlich, was realistisch möglich ist.',
  },
  {
    q: 'Reinigen Sie auch große Büroflächen?',
    a: 'Ja. Wir reinigen Teppichböden in Büros, Praxen, Kanzleien, Hotels und Verkaufsräumen – auch großflächig. Auf Wunsch arbeiten wir nach Absprache abends oder am Wochenende, damit Ihr Betrieb nicht unterbrochen wird.',
  },
  {
    q: 'Muss der Raum vorher leergeräumt werden?',
    a: 'Nicht komplett. Leichte Möbel und Gegenstände räumen wir gemeinsam zur Seite. Am besten ist es, wenn Kleinteile und empfindliche Gegenstände vorher entfernt sind – alles Weitere klären wir beim Termin.',
  },
  {
    q: 'Reinigen Sie auch lose Teppiche?',
    a: 'Der Schwerpunkt dieser Leistung liegt auf fest verlegtem Teppichboden, der direkt bei Ihnen vor Ort gereinigt wird. Eine Teppichwäsche mit Abholung loser Teppiche ist nicht Teil dieses Angebots – sprechen Sie uns bei Bedarf gerne an, dann prüfen wir Ihre Anfrage individuell.',
  },
];

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['ProfessionalService', 'LocalBusiness'],
  '@id': PAGE_URL,
  name: 'ReinWerk – Teppichbodenreinigung Chemnitz',
  description:
    'Professionelle Teppichbodenreinigung in Chemnitz für Privat und Gewerbe. Tiefenreinigung fest verlegter Teppichböden direkt vor Ort.',
  url: PAGE_URL,
  telephone: PHONE,
  email: 'info@reinwerk-service.de',
  image: OG_IMAGE,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Matthesstraße 48',
    addressLocality: 'Chemnitz',
    postalCode: '09113',
    addressRegion: 'Sachsen',
    addressCountry: 'DE',
  },
  areaServed: [
    { '@type': 'City', name: 'Chemnitz' },
    { '@type': 'City', name: 'Dresden' },
    { '@type': 'City', name: 'Leipzig' },
    { '@type': 'State', name: 'Sachsen' },
  ],
  priceRange: '€€',
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Teppichbodenreinigung',
  name: 'Teppichbodenreinigung Chemnitz – Privat & Gewerbe',
  description:
    'Tiefenreinigung fest verlegter Teppichböden in Wohnungen, Büros, Praxen und Gewerberäumen in Chemnitz und Sachsen.',
  provider: { '@type': 'LocalBusiness', name: 'ReinWerk', '@id': PAGE_URL },
  areaServed: [
    { '@type': 'City', name: 'Chemnitz' },
    { '@type': 'State', name: 'Sachsen' },
  ],
  url: PAGE_URL,
  offers: {
    '@type': 'Offer',
    price: '8',
    priceCurrency: 'EUR',
    description: 'Teppichbodenreinigung ab 8 € pro m², abhängig von Fläche und Verschmutzungsgrad.',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://reinwerk-service.de/' },
    { '@type': 'ListItem', position: 2, name: 'Teppichbodenreinigung Chemnitz', item: PAGE_URL },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const MAX_FILES = 3;
const MAX_FILE_SIZE = 4 * 1024 * 1024;

const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export default function Teppichbodenreinigung() {
  const [form, setForm] = useState({
    name: '',
    telefon: '',
    ort: '',
    kundentyp: 'Privat',
    flaeche: '',
    nachricht: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const scrollToContact = () => {
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    const valid = selected.filter((f) => f.size <= MAX_FILE_SIZE).slice(0, MAX_FILES);
    if (selected.length > valid.length) {
      toast({
        title: 'Einige Fotos wurden nicht übernommen.',
        description: `Maximal ${MAX_FILES} Fotos mit je bis zu 4 MB.`,
      });
    }
    setFiles(valid);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.telefon.trim() || !form.ort.trim()) {
      toast({ title: 'Bitte füllen Sie die Pflichtfelder aus.', variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    try {
      const fotos = await Promise.all(
        files.map(async (file) => ({
          name: file.name,
          type: file.type,
          data: await fileToBase64(file),
        })),
      );

      const payload = {
        source: 'teppichbodenreinigung',
        page: '/teppichbodenreinigung',
        name: form.name,
        telefon: form.telefon,
        ort: form.ort,
        kundentyp: form.kundentyp,
        flaeche_qm: form.flaeche,
        nachricht: form.nachricht,
        fotos,
      };

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Request failed');

      trackGoogleAdsConversion();
      trackLead();

      toast({ title: 'Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet.' });
      setForm({ name: '', telefon: '', ort: '', kundentyp: 'Privat', flaeche: '', nachricht: '' });
      setFiles([]);
    } catch {
      toast({ title: 'Fehler beim Senden. Bitte versuchen Sie es erneut.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Teppichbodenreinigung Chemnitz | ReinWerk</title>
        <meta
          name="description"
          content="Professionelle Teppichbodenreinigung in Chemnitz für Privat & Gewerbe. Tiefenreinigung, Fleckenbehandlung und kostenlose Anfahrt. Jetzt Angebot anfragen."
        />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content="Teppichbodenreinigung Chemnitz | ReinWerk" />
        <meta
          property="og:description"
          content="Tiefenreinigung fest verlegter Teppichböden in Wohnungen, Büros und Praxen – direkt vor Ort in Chemnitz und Sachsen."
        />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:image" content={OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Teppichbodenreinigung Chemnitz | ReinWerk" />
        <meta
          name="twitter:description"
          content="Tiefenreinigung fest verlegter Teppichböden für Privat & Gewerbe in Chemnitz."
        />
        <meta name="twitter:image" content={OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between py-3">
          <div className="flex items-center gap-2.5">
            <img src={reinwerkLogo} alt="ReinWerk Logo" className="h-8 w-8 md:h-10 md:w-10 object-contain" />
            <span className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
              Rein<span className="text-primary">Werk</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="hero" size="sm" asChild>
              <a href={`tel:${PHONE}`} onClick={() => trackContact()} aria-label="ReinWerk anrufen">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
                <span className="sm:hidden">Anrufen</span>
              </a>
            </Button>
            <Button size="sm" className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold" asChild>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContact()}
                aria-label="ReinWerk per WhatsApp kontaktieren"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="pb-20 md:pb-0">
        {/* HERO */}
        <section className="relative w-full min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-64px)] mt-14 md:mt-16 overflow-hidden flex items-center">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImg})`, backgroundPosition: 'center center' }}
            aria-label="Teppichbodenreinigung Chemnitz – Tiefenreinigung eines Teppichbodens im Büro"
            role="img"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/50 md:from-background md:via-background/60 md:to-transparent" />
          <div className="container mx-auto relative z-10 px-4">
            <div className="max-w-xl md:max-w-2xl w-full">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-[1.1] text-left">
                Professionelle
                <br />
                <span className="text-primary">Teppichbodenreinigung</span> in
                <br />
                Chemnitz
              </h1>
              <p className="mt-2 md:mt-4 text-base md:text-xl text-foreground font-semibold text-left">
                Tiefenreinigung für Teppichböden in Wohnungen, Büros, Praxen und Gewerberäumen – direkt bei Ihnen vor
                Ort.
              </p>

              <div className="mt-3 md:mt-5 grid grid-cols-2 gap-2 md:gap-2.5">
                {heroBenefits.map((b) => (
                  <div
                    key={b.title}
                    className="flex items-center gap-2.5 px-2.5 py-1.5 md:px-4 md:py-3 rounded-xl bg-white/80 backdrop-blur-md border border-border/60 shadow-soft"
                  >
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-foreground leading-tight">{b.title}</span>
                      <span className="text-xs text-muted-foreground leading-tight">{b.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 md:mt-5 flex flex-col sm:flex-row gap-3">
                <Button size="lg" onClick={scrollToContact} className="font-semibold h-11 md:h-14">
                  Kostenloses Angebot erhalten
                </Button>
                <Button
                  size="lg"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl shadow-lg font-semibold h-11 md:h-14"
                  asChild
                >
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackContact()}
                    aria-label="Teppichbodenreinigung per WhatsApp anfragen"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp-Anfrage
                  </a>
                </Button>
              </div>

              <p className="mt-2 md:mt-3 text-sm text-muted-foreground text-left">
                Oder direkt anrufen:{' '}
                <a href={`tel:${PHONE}`} className="font-semibold text-foreground hover:text-primary transition-colors">
                  {PHONE_DISPLAY}
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* PROBLEM / NUTZEN */}
        <section className="py-8 md:py-12 bg-secondary/30">
          <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">
                Wenn der Teppichboden nicht mehr sauber wirkt
              </h2>
              <ul className="mt-5 space-y-2.5">
                {problems.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-base text-foreground">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" /> {p}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-muted-foreground">
                ReinWerk behandelt Ihren Teppichboden professionell vor Ort: Wir lösen tief sitzende Verschmutzungen aus
                den Fasern, behandeln Flecken gezielt vor und saugen Schmutz und Reinigungsmittel wieder ab. Das
                Ergebnis ist ein sichtbar frischerer, hygienisch gereinigter Teppichboden – ohne Ausbau und ohne
                Abtransport.
              </p>
            </div>
            <img
              src={problemImg}
              alt="Professionelle Teppichbodenreinigung im Büro mit Extraktionsmaschine"
              title="Teppichboden Tiefenreinigung Chemnitz"
              className="rounded-2xl shadow-soft w-full aspect-[4/3] object-cover"
              loading="lazy"
            />
          </div>
        </section>

        {/* PRIVAT & GEWERBE */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight text-center mb-8">
              Teppichbodenreinigung für Privat &amp; Gewerbe
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="overflow-hidden">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={wohnraumImg}
                    alt="Teppichbodenreinigung Privat – Wohnzimmer mit gereinigtem Teppichboden"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                    <Home className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Für Privatkunden</h3>
                  <p className="mt-2 text-muted-foreground">
                    Wohnungen, Häuser, Treppenbereiche, Flure, Schlaf- und Wohnzimmer. Wir reinigen Ihren Teppichboden
                    schonend direkt in Ihren Räumen – abgestimmt auf Material und Verschmutzung.
                  </p>
                </div>
              </Card>

              <Card className="overflow-hidden">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={gewerbeImg}
                    alt="Teppichbodenreinigung Büro und Gewerbe in Chemnitz"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Für Gewerbekunden</h3>
                  <p className="mt-2 text-muted-foreground">
                    Büros, Praxen, Kanzleien, Hotels, Ferienwohnungen, Verkaufsräume und weitere Gewerbeflächen. Auch
                    größere Flächen sind kein Problem – Termine außerhalb der üblichen Geschäftszeiten sind nach
                    Absprache möglich.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* ABLAUF */}
        <section className="py-8 md:py-12 bg-secondary/30">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight text-center mb-8">
              So läuft die Teppichbodenreinigung ab
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {steps.map((s, i) => (
                <div key={s.title} className="bg-background rounded-2xl p-5 shadow-soft text-center">
                  <div className="relative inline-flex">
                    <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center">
                      <s.icon className="w-6 h-6" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-foreground">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* PREISE */}
        <section className="py-8 md:py-12 bg-secondary/30">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight text-center mb-8">
              Preise für die Teppichbodenreinigung
            </h2>
            <Card className="p-6 md:p-8 text-center shadow-medium">
              <p className="text-lg text-muted-foreground">Teppichbodenreinigung</p>
              <p className="mt-1 text-4xl md:text-5xl font-bold text-primary">ab 8 € / m²</p>
              <p className="mt-3 text-base font-medium text-foreground">
                Für größere Flächen und Gewerbekunden erstellen wir ein individuelles Angebot.
              </p>
              <p className="mt-3 text-muted-foreground">
                Der endgültige Preis richtet sich nach Fläche, Verschmutzungsgrad und Aufwand. Kostenlose Anfahrt im
                Einsatzgebiet.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
                <Button size="lg" onClick={scrollToContact} className="font-semibold">
                  Kostenloses Angebot erhalten
                </Button>
                <Button
                  size="lg"
                  variant="heroOutline"
                  asChild
                >
                  <a href={`tel:${PHONE}`} onClick={() => trackContact()}>
                    <Phone className="w-5 h-5" />
                    {PHONE_DISPLAY}
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* VERTRAUEN */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight text-center mb-8">
              ReinWerk – Ihr lokaler Reinigungspartner in Sachsen
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {trustItems.map((t) => (
                <div key={t.title} className="bg-secondary/40 rounded-2xl p-5 text-center">
                  <div className="w-10 h-10 mx-auto rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <t.icon className="w-5 h-5" />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-foreground">{t.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KONTAKTFORMULAR */}
        <section id="kontakt" className="py-8 md:py-12 bg-secondary/30">
          <div className="container mx-auto max-w-2xl">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight text-center mb-3">
              Kostenloses Angebot für Ihre Teppichbodenreinigung
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              Kurz ausfüllen – wir melden uns zeitnah mit einem transparenten Angebot.
            </p>
            <Card className="p-6 md:p-8 shadow-medium">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="mt-1.5"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefon">Telefonnummer *</Label>
                    <Input
                      id="telefon"
                      type="tel"
                      inputMode="tel"
                      value={form.telefon}
                      onChange={(e) => setForm({ ...form, telefon: e.target.value })}
                      className="mt-1.5"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="ort">Ort / PLZ *</Label>
                    <Input
                      id="ort"
                      value={form.ort}
                      onChange={(e) => setForm({ ...form, ort: e.target.value })}
                      className="mt-1.5"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="kundentyp">Privat oder Gewerbe</Label>
                    <select
                      id="kundentyp"
                      value={form.kundentyp}
                      onChange={(e) => setForm({ ...form, kundentyp: e.target.value })}
                      className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-base md:text-sm text-input-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="Privat">Privat</option>
                      <option value="Gewerbe">Gewerbe</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="flaeche">Ungefähre Fläche in m²</Label>
                    <Input
                      id="flaeche"
                      inputMode="numeric"
                      placeholder="z. B. 45"
                      value={form.flaeche}
                      onChange={(e) => setForm({ ...form, flaeche: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="nachricht">Nachricht</Label>
                  <textarea
                    id="nachricht"
                    rows={3}
                    value={form.nachricht}
                    onChange={(e) => setForm({ ...form, nachricht: e.target.value })}
                    className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm text-input-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>

                <div>
                  <Label htmlFor="fotos" className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-primary" />
                    Fotos hochladen (optional)
                  </Label>
                  <Input
                    id="fotos"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFiles}
                    className="sr-only"
                  />
                  <label
                    htmlFor="fotos"
                    className="mt-1.5 inline-flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <Upload className="w-4 h-4" />
                    Fotos auswählen
                  </label>
                  {files.length === 0 && (
                    <span className="ml-3 text-xs text-muted-foreground">Keine Datei ausgewählt</span>
                  )}
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    Bis zu {MAX_FILES} Fotos, je max. 4 MB. Fotos helfen uns bei einer genaueren Einschätzung.
                  </p>
                  {files.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {files.map((f) => (
                        <li key={f.name} className="text-xs text-muted-foreground truncate">
                          • {f.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <p className="text-[13px] text-muted-foreground text-left leading-relaxed">
                  Mit dem Absenden des Formulars erkläre ich mich damit einverstanden, dass meine angegebenen Daten zum
                  Zweck der Kontaktaufnahme und Bearbeitung meiner Anfrage verarbeitet werden. Ich kann diese
                  Einwilligung jederzeit mit Wirkung für die Zukunft per E-Mail an{' '}
                  <a href="mailto:info@reinwerk-service.de" className="underline hover:text-foreground transition-colors">
                    info@reinwerk-service.de
                  </a>{' '}
                  widerrufen.
                </p>

                <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? 'Wird gesendet…' : 'Kostenloses Angebot anfragen'}
                </Button>
              </form>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight text-center mb-8">
              Häufige Fragen zur Teppichbodenreinigung
            </h2>
            <Accordion type="single" collapsible className="bg-background border border-border rounded-2xl px-6 shadow-soft">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border last:border-0">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-8 md:py-12 bg-secondary/30">
          <div className="container mx-auto text-center max-w-2xl">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">
              Jetzt Teppichbodenreinigung in Chemnitz anfragen
            </h2>
            <p className="mt-3 text-base md:text-lg text-muted-foreground">
              Kostenlose Einschätzung für Privat- und Gewerbeflächen.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
              <Button size="lg" onClick={scrollToContact} className="font-semibold">
                Kostenloses Angebot erhalten
              </Button>
              <Button
                size="lg"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl shadow-lg font-semibold"
                asChild
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackContact()}>
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp-Anfrage
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* MOBILE STICKY CTA (right side kept free for the floating WhatsApp button) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/95 backdrop-blur pl-3 pr-24 py-2.5 pb-[calc(env(safe-area-inset-bottom,0px)+10px)]">
        <Button className="w-full font-semibold" onClick={scrollToContact}>
          Kostenloses Angebot erhalten
        </Button>
      </div>

      <Footer />
    </>
  );
}
