import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MessageCircle, Check, Camera, FileText, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EinsatzgebietSachsen } from '@/components/EinsatzgebietSachsen';
import { GoogleReviews } from '@/components/GoogleReviews';
import { toast } from '@/hooks/use-toast';
import { trackGoogleAdsConversion } from '@/lib/google-ads';
import heroDesktop from '@/assets/fenster-hero.jpg';
import heroMobile from '@/assets/fensterreinigung-hero-mobile.png';
import privatImg from '@/assets/fenster-privat.webp';
import gewerbeImg from '@/assets/fenster-gewerbe.jpg';
import gewerbeSectionImg from '@/assets/fenster-gewerbe-neu.jpg';
import ctaImg from '@/assets/fenster-cta.jpg';
import wintergartenImgAsset from '@/assets/Wintergartenreinigung_Dresden.png.asset.json';
import warumImg from '@/assets/fenster-warum.webp';
import schaufensterImg from '@/assets/fenster-schaufenster.jpg';

const wintergartenImg = wintergartenImgAsset.url;


const WHATSAPP_URL = 'https://wa.me/491636986317';
const PAGE_URL = 'https://reinwerk-service.de/fensterreinigung';
const OG_IMAGE = 'https://reinwerk-service.de/og-image.png';

const services = [
  {
    title: 'Fenster- & Glasreinigung',
    price: 'ab 49 €',
    desc: 'Fenster und Glasflächen gründlich und streifenfrei gereinigt',
    img: privatImg,
    alt: 'Fensterreinigung Privat in Chemnitz – Wohnhaus mit klaren Fenstern',
    imgTitle: 'Fensterreinigung Privat Chemnitz',
  },
  {
    title: 'Rahmen- & Falzreinigung',
    price: 'ab 29 €',
    desc: 'Fensterrahmen, Falze und Fensterbänke gründlich von Schmutz befreit',
    img: gewerbeImg,
    alt: 'Fensterreinigung Gewerbe Chemnitz – Bürogebäude mit gereinigten Fenstern',
    imgTitle: 'Fensterreinigung Gewerbe Chemnitz',
  },
  {
    title: 'Wintergartenreinigung',
    price: 'ab 99 €',
    desc: 'Fenster und Glasflächen gründlich und streifenfrei gereinigt',
    img: wintergartenImg,
    alt: 'Wintergarten Reinigung Sachsen – Glasdach und Rahmen professionell gereinigt',
    imgTitle: 'Wintergarten Reinigung Sachsen',
  },
  {
    title: 'Glasreinigung für Gewerbe',
    price: 'Preis auf Anfrage',
    desc: 'Schaufenster, Büros, Praxen und andere Gewerbeflächen – flexibel nach Absprache',
    img: schaufensterImg,
    alt: 'Schaufensterreinigung Chemnitz – klares Schaufenster nach Glasreinigung',
    imgTitle: 'Schaufensterreinigung Chemnitz',
  },
];

const faqs = [
  { q: 'Was kostet eine Fensterreinigung?', a: 'Die Kosten einer Fensterreinigung richten sich nach Anzahl, Größe und Zustand der Fenster. Nach kurzer Foto-Anfrage per WhatsApp erhalten Sie einen transparenten Festpreis – ohne versteckte Gebühren.' },
  { q: 'Wie oft sollte man Fenster reinigen lassen?', a: 'Für Privathaushalte empfehlen wir eine professionelle Fensterreinigung 2–4 Mal im Jahr. Gewerbliche Objekte, Schaufenster und Büros profitieren von einer monatlichen oder vierteljährlichen Reinigung.' },
  { q: 'Reinigen Sie auch Wintergärten?', a: 'Ja, Wintergartenreinigung gehört zu unseren Leistungen. Wir reinigen Glasdächer, Rahmen und alle Glasflächen Ihres Wintergartens streifenfrei und sicher – auch schwer erreichbare Bereiche.' },
  { q: 'Arbeiten Sie auch bei Unternehmen?', a: 'Ja. ReinWerk bietet Fensterreinigung für Unternehmen in ganz Sachsen – Büros, Praxen, Geschäfte und Schaufenster, einmalig oder regelmäßig, mit Rechnung für Unternehmen.' },
  { q: 'Reinigen Sie Schaufenster?', a: 'Ja, Schaufensterreinigung ist einer unserer Schwerpunkte. Wir reinigen Schaufenster, Glasfassaden und große Glasflächen für Einzelhandel, Gastronomie und Dienstleister – auf Wunsch außerhalb der Öffnungszeiten.' },
  { q: 'In welchen Städten arbeiten Sie?', a: 'Wir sind in ganz Sachsen tätig – schwerpunktmäßig Fensterreinigung in Chemnitz, Dresden, Leipzig, Zwickau und Umgebung.' },
];

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['ProfessionalService', 'LocalBusiness'],
  '@id': PAGE_URL,
  name: 'ReinWerk – Fensterreinigung Chemnitz',
  description: 'Professionelle Fensterreinigung in Chemnitz und ganz Sachsen. Glasreinigung, Wintergartenreinigung und Schaufensterreinigung für Privat- und Gewerbekunden.',
  url: PAGE_URL,
  telephone: '+491632373108',
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
    { '@type': 'State', name: 'Sachsen' },
    { '@type': 'City', name: 'Chemnitz' },
    { '@type': 'City', name: 'Dresden' },
    { '@type': 'City', name: 'Leipzig' },
    { '@type': 'City', name: 'Zwickau' },
  ],
  priceRange: '€€',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Fensterreinigung Leistungen',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fensterreinigung Chemnitz' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Glasreinigung Chemnitz' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Wintergartenreinigung' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Schaufensterreinigung Chemnitz' } },
    ],
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Fensterreinigung',
  name: 'Fensterreinigung Chemnitz – Privat & Gewerbe',
  description: 'Professionelle Fensterreinigung, Glasreinigung, Wintergartenreinigung und Schaufensterreinigung in Chemnitz und Sachsen.',
  provider: { '@type': 'LocalBusiness', name: 'ReinWerk', '@id': PAGE_URL },
  areaServed: [
    { '@type': 'City', name: 'Chemnitz' },
    { '@type': 'City', name: 'Dresden' },
    { '@type': 'City', name: 'Leipzig' },
    { '@type': 'State', name: 'Sachsen' },
  ],
  url: PAGE_URL,
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://reinwerk-service.de/' },
    { '@type': 'ListItem', position: 2, name: 'Fensterreinigung Chemnitz', item: PAGE_URL },
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


export default function Fensterreinigung() {
  const [form, setForm] = useState({ vorname: '', telefon: '', stadt: '', fensterart: '', nachricht: '' });
  const [submitting, setSubmitting] = useState(false);

  const scrollToContact = () => {
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.vorname || !form.telefon || !form.stadt || !form.fensterart) {
      toast({ title: 'Bitte füllen Sie die Pflichtfelder aus.', variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        source: 'fensterreinigung',
        vorname: form.vorname,
        telefon: form.telefon,
        stadt: form.stadt,
        fensterart: form.fensterart,
        nachricht: form.nachricht,
        page: '/fensterreinigung',
      };
      const response = await fetch('https://hook.eu1.make.com/81hzpicl2zd6d8qsoh5ki43wbw62if58', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Request failed');
      trackGoogleAdsConversion('Ty4ACPHIodscEJeK_LhD');
      toast({ title: 'Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet.' });
      setForm({ vorname: '', telefon: '', stadt: '', fensterart: '', nachricht: '' });
    } catch (err) {
      toast({
        title: 'Fehler beim Senden. Bitte versuchen Sie es erneut.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <>
      <Helmet>
        <title>Fensterreinigung Chemnitz | ReinWerk – Privat & Gewerbe</title>
        <meta name="description" content="Fensterreinigung Chemnitz von ReinWerk: streifenfreie Glasreinigung für Privat & Gewerbe in Sachsen. Wintergärten, Schaufenster & Büros. Jetzt Festpreis!" />
        <meta name="keywords" content="Fensterreinigung Chemnitz, Fensterputzer Chemnitz, Glasreinigung Chemnitz, Schaufensterreinigung Chemnitz, Fensterreinigung Sachsen, Wintergarten Reinigung, Fensterreinigung Privat, Fensterreinigung Gewerbe, ReinWerk Fensterreinigung" />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content="Fensterreinigung Chemnitz | ReinWerk – Privat & Gewerbe" />
        <meta property="og:description" content="Fensterreinigung Chemnitz von ReinWerk: streifenfreie Glasreinigung für Privat & Gewerbe in Sachsen. Wintergärten, Schaufenster & Büros." />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:image" content={OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Fensterreinigung Chemnitz | ReinWerk – Privat & Gewerbe" />
        <meta name="twitter:description" content="Fensterreinigung Chemnitz von ReinWerk: streifenfreie Glasreinigung für Privat & Gewerbe in Sachsen." />
        <meta name="twitter:image" content={OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header />

      <main>
        {/* HERO */}
        <section className="relative min-h-[100svh] md:min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden">
          {/* Mobile hero background */}
          <div
            className="absolute inset-0 md:hidden bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroMobile})` }}
            aria-hidden="true"
          />
          {/* Desktop/Tablet hero background */}
          <div
            className="absolute inset-0 hidden md:block bg-cover bg-no-repeat bg-top"
            style={{ backgroundImage: `url(${heroDesktop})` }}
            aria-label="Fensterreinigung Chemnitz – ReinWerk reinigt Fenster streifenfrei in Sachsen"
            role="img"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25 md:from-background/95 md:via-background/75 md:to-background/30" />
          <div className="container mx-auto relative z-10 px-4 pt-3 pb-6 md:py-10">
            <div className="max-w-xl md:max-w-2xl">
              <h1 className="text-4xl sm:text-4xl md:text-6xl font-extrabold md:font-bold tracking-tight leading-[1.05] md:leading-[1.1] text-left text-white md:text-foreground">
                <span className="md:hidden">
                  Professionelle
                  <br />
                  <span className="text-primary">Fensterreinigung</span>
                  <br />
                  in Sachsen
                </span>
                <span className="hidden md:inline">
                  <span className="text-primary">Fensterreinigung</span> in Chemnitz – streifenfrei &amp; professionell
                </span>
              </h1>
              <p className="mt-2 md:mt-3 text-base md:text-xl text-white md:text-foreground font-medium md:font-bold text-left max-w-[320px] sm:max-w-[380px] md:max-w-none leading-snug">
                Streifenfreie Fenster, mehr Tageslicht und ein gepflegter Eindruck – professionelle Fensterreinigung direkt bei Ihnen vor Ort in Chemnitz, Dresden, Leipzig und ganz Sachsen.
              </p>

              {/* Desktop/Tablet USP cards */}
              <div className="mt-4 hidden md:grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { title: '0 € Anfahrt', sub: 'in ausgewählten Regionen' },
                  { title: 'Festpreis möglich', sub: 'nach kurzer Einschätzung' },
                  { title: 'Privat & Gewerbe', sub: 'flexible Termine' },
                ].map((badge) => (
                  <div
                    key={badge.title}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/80 backdrop-blur-md border border-border/60 shadow-soft"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-foreground leading-tight">{badge.title}</span>
                      <span className="text-xs text-muted-foreground leading-tight">{badge.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile USP list */}
              <div className="md:hidden mt-3 space-y-0">
                {[
                  { title: '0 € Anfahrt', sub: 'in ausgewählten Regionen' },
                  { title: 'Festpreis möglich', sub: 'nach kurzer Einschätzung' },
                  { title: 'Privat & Gewerbe', sub: 'flexible Termine' },
                ].map((badge, idx) => (
                  <div
                    key={badge.title}
                    className={`flex items-center gap-3 py-2 ${idx < 2 ? 'border-b border-white/10' : ''}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-900/80 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white leading-tight">{badge.title}</span>
                      <span className="text-xs text-gray-300 leading-tight">{badge.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop CTA buttons */}
              <div className="hidden md:flex mt-5 md:mt-6 flex-row gap-3">
                <Button size="lg" className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl shadow-lg font-semibold" asChild>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Fensterreinigung Chemnitz per WhatsApp anfragen">
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp schreiben
                  </a>
                </Button>
                <Button variant="heroOutline" size="lg" onClick={scrollToContact}>
                  Kostenloses Angebot
                </Button>
              </div>

              {/* Mobile CTA buttons */}
              <div className="md:hidden mt-4 flex flex-col gap-2">
                <Button
                  size="lg"
                  onClick={scrollToContact}
                  className="w-full min-h-[3.5rem] h-auto py-3 px-4 font-semibold justify-start gap-4 rounded-xl"
                >
                  <FileText className="w-6 h-6 text-white shrink-0" />
                  <div className="flex flex-col items-start text-left">
                    <span className="text-white font-bold text-base leading-tight">Kostenloses Angebot</span>
                    <span className="text-white/80 text-xs leading-tight">Unverbindlich anfragen</span>
                  </div>
                </Button>

                <Button
                  size="lg"
                  className="w-full min-h-[3.5rem] h-auto py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white justify-start gap-4 rounded-xl shadow-lg font-semibold"
                  asChild
                >
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Fensterreinigung Chemnitz per WhatsApp anfragen"
                  >
                    <MessageCircle className="w-6 h-6 text-white shrink-0" />
                    <div className="flex flex-col items-start text-left">
                      <span className="text-white font-bold text-base leading-tight">WhatsApp schreiben</span>
                      <span className="text-white/80 text-xs leading-tight">Direkt & unkompliziert</span>
                    </div>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <GoogleReviews useMobileGoogleLogo />

        {/* SERVICES — 4 cards */}
        <section className="py-4">
          <div className="container mx-auto max-sm:px-3">
            <h2 className="hidden sm:block text-2xl md:text-4xl font-bold text-foreground tracking-tight text-center mb-5">
              Unsere Leistungen der Fensterreinigung
            </h2>
            {/* Mobile: kompakte horizontale Servicekarten */}
            <div className="flex flex-col gap-3 sm:hidden">
              {services.map((s) => (
                <div key={s.title} className="relative w-full h-[180px] rounded-[22px] overflow-hidden shadow-soft">
                  <img src={s.img} alt={s.alt} title={s.imgTitle} className="absolute inset-0 w-full h-full object-cover object-[80%_25%]" loading="lazy" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.55)_20%,rgba(0,0,0,0.4)_40%,rgba(0,0,0,0.2)_58%,transparent_75%)]" />
                  <div className="absolute top-0 left-0 right-[25%] pl-[18px] pr-[12px] pt-[12px]">
                    <h3 className="text-[20px] font-bold tracking-tight text-white leading-tight">{s.title}</h3>
                    <p className="text-[13px] text-white/90 mt-[7px] leading-snug">{s.desc}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 bg-primary text-primary-foreground font-bold text-[15px] px-[14px] py-[7px] rounded-tr-[16px] whitespace-nowrap">
                    {s.price}
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map((s) => (
                <Card key={s.title} className="overflow-hidden hover:shadow-medium transition-shadow group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={s.img} alt={s.alt} title={s.imgTitle} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-bold text-foreground">{s.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>



        {/* HOW IT WORKS */}
        <section className="py-4 bg-secondary/30">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight text-center mb-5">
              So funktioniert Ihre Fensterreinigung
            </h2>
            <div className="grid grid-cols-3 gap-3 md:gap-5 max-w-3xl mx-auto">
              {[
                { icon: Camera, step: '1', title: 'Foto senden' },
                { icon: FileText, step: '2', title: 'Preis erhalten' },
                { icon: Calendar, step: '3', title: 'Termin vereinbaren' },
              ].map((s) => (
                <div key={s.step} className="text-center">
                  <div className="relative inline-flex">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center">
                      <s.icon className="w-6 h-6 md:w-7 md:h-7" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 md:w-7 md:h-7 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center">{s.step}</span>
                  </div>
                  <h3 className="mt-2 text-sm md:text-base font-bold text-foreground">{s.title}</h3>
                </div>
              ))}
            </div>
            <div className="mt-5 flex justify-center">
              <Button size="lg" onClick={scrollToContact}>
                Jetzt kostenlose Preisanfrage senden
              </Button>
            </div>
          </div>
        </section>
        {/* FAQ */}
        <section className="py-4">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight text-center mb-5">
              Häufige Fragen zur Fensterreinigung
            </h2>
            <Accordion type="single" collapsible className="bg-background border border-border rounded-2xl px-4 md:px-6 shadow-soft">
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

        {/* PROBLEM / SOLUTION */}
        <section className="py-4 bg-secondary/30">
          <div className="container mx-auto grid md:grid-cols-2 gap-6 items-center">
            <img src={warumImg} alt="Fensterputzer Chemnitz reinigt Fenster mit Schlieren streifenfrei" title="Fensterputzer Chemnitz – ReinWerk" className="rounded-2xl shadow-soft w-full aspect-[4/3] object-cover" loading="lazy" />
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">
                Warum ReinWerk – Ihr Fensterputzer in Sachsen
              </h2>
              <ul className="mt-3 space-y-2">
                {['Schlieren und Flecken', 'Zeitaufwendiges Putzen', 'Schwer erreichbare Fenster'].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-base text-foreground">
                    <Check className="w-5 h-5 text-primary shrink-0" /> {t}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-muted-foreground">
                Als erfahrener Fensterputzer in Chemnitz übernehmen wir die Arbeit für Sie und sorgen für streifenfreie, klare Sicht – ohne Aufwand.
              </p>
            </div>
          </div>
        </section>

        {/* CONTACT FORM */}
        <section id="kontakt" className="py-4 bg-secondary/30">
          <div className="container mx-auto max-w-2xl">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight text-center mb-2">
              Kostenloses Angebot für Ihre Fensterreinigung
            </h2>
            <p className="text-center text-muted-foreground mb-5">
              Antwort meist innerhalb weniger Minuten.
            </p>
            <Card className="p-4 md:p-6 shadow-medium">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="vorname">Vorname *</Label>
                    <Input id="vorname" value={form.vorname} onChange={(e) => setForm({ ...form, vorname: e.target.value })} className="mt-1" required />
                  </div>
                  <div>
                    <Label htmlFor="telefon">Telefonnummer *</Label>
                    <Input id="telefon" type="tel" value={form.telefon} onChange={(e) => setForm({ ...form, telefon: e.target.value })} className="mt-1" required />
                  </div>
                  <div>
                    <Label htmlFor="stadt">Stadt *</Label>
                    <Input id="stadt" value={form.stadt} onChange={(e) => setForm({ ...form, stadt: e.target.value })} className="mt-1" required />
                  </div>
                  <div>
                    <Label htmlFor="fensterart">Fensterart *</Label>
                    <Input id="fensterart" placeholder="z. B. Wohnung, Büro, Wintergarten" value={form.fensterart} onChange={(e) => setForm({ ...form, fensterart: e.target.value })} className="mt-1" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="nachricht">Nachricht</Label>
                  <textarea id="nachricht" rows={3} value={form.nachricht} onChange={(e) => setForm({ ...form, nachricht: e.target.value })} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm text-input-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                </div>
                <p className="text-[13px] text-muted-foreground text-left leading-relaxed">
                  Mit dem Absenden des Formulars erkläre ich mich damit einverstanden, dass meine angegebenen Daten zum Zweck der Kontaktaufnahme und Bearbeitung meiner Anfrage verarbeitet werden. Ich kann diese Einwilligung jederzeit mit Wirkung für die Zukunft per E-Mail an{" "}
                  <a href="mailto:info@reinwerk-service.de" className="underline hover:text-foreground transition-colors">
                    info@reinwerk-service.de
                  </a>{" "}
                  widerrufen.
                </p>
                <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? 'Wird gesendet…' : 'Anfrage senden'}
                </Button>
              </form>
            </Card>
          </div>
        </section>

        {/* PRIVATE */}
        <section className="py-4 bg-secondary/30">
          <div className="container mx-auto grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">
                Fensterreinigung für Privatkunden in Chemnitz
              </h2>
              <div className="mt-3 space-y-2 text-base md:text-lg text-muted-foreground">
                <p>Sie möchten Ihre Fenster reinigen lassen – ohne Aufwand und ohne Schlieren?</p>
                <p>Wir übernehmen die Fensterreinigung Privat für Wohnungen, Einfamilienhäuser und Wintergärten in Chemnitz, Dresden, Leipzig und ganz Sachsen.</p>
                <p className="text-foreground font-medium">Streifenfreie Fenster, freundlich und zuverlässig vor Ort.</p>
              </div>
            </div>
            <img src={privatImg} alt="Fensterreinigung Privat Chemnitz – Einfamilienhaus mit sauberen Fenstern" title="Fensterreinigung Privat Chemnitz" className="rounded-2xl shadow-soft w-full aspect-[4/3] object-cover" loading="lazy" />
          </div>
        </section>

        {/* BUSINESS */}
        <section className="py-4">
          <div className="container mx-auto grid md:grid-cols-2 gap-6 items-center">
            <img src={gewerbeSectionImg} alt="Glasreinigung Büro Chemnitz – Fensterreinigung Gewerbe für Unternehmen" title="Glasreinigung Büro Chemnitz" className="rounded-2xl shadow-soft w-full aspect-[4/3] object-cover order-2 md:order-1" loading="lazy" />
            <div className="order-1 md:order-2">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">
                Fensterreinigung für Unternehmen in Sachsen
              </h2>
              <ul className="mt-3 space-y-2">
                {['Regelmäßige Reinigung', 'Flexible Termine', 'Rechnung für Unternehmen', 'Zuverlässige Durchführung'].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-base text-foreground">
                    <Check className="w-5 h-5 text-primary shrink-0" /> {t}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-muted-foreground">
                Ob Büro, Praxis, Geschäft, Schaufenster oder Glasfassade – wir bieten Fensterreinigung Gewerbe in Chemnitz und ganz Sachsen, einmalig oder regelmäßig.
              </p>
            </div>
          </div>
        </section>

        <EinsatzgebietSachsen
          description="Wir sind in ganz Sachsen für Sie unterwegs. Professionelle Fensterreinigung für Privat- und Gewerbekunden – von Chemnitz über Dresden und Leipzig bis in kleinere Städte und Gemeinden."
        />

        {/* FINAL CTA */}
        <section className="relative py-6 md:py-8 overflow-hidden">
          <div className="absolute inset-0">
            <img src={ctaImg} alt="Fensterreinigung Chemnitz – Panoramafenster mit streifenfreier Sicht" title="Fensterreinigung Chemnitz Panoramafenster" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40" />
          </div>
          <div className="container mx-auto relative z-10 text-center max-w-2xl">
            <h2 className="text-2xl md:text-5xl font-bold text-foreground tracking-tight">
              Jetzt Fensterreinigung in Chemnitz anfragen
            </h2>
            <p className="mt-2 text-base md:text-lg text-foreground/80">
              Schnelle Rückmeldung per WhatsApp.
            </p>
            <div className="mt-4 flex justify-center">
              <Button size="xl" className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl shadow-lg font-semibold" asChild>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Fensterreinigung Chemnitz per WhatsApp anfragen">
                  <MessageCircle className="w-5 h-5" />
                  Foto senden — Preis in 15 Min
                </a>
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Antwort meist innerhalb weniger Minuten.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
