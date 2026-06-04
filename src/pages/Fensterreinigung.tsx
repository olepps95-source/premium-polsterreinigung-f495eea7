import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MessageCircle, Check, Home, Building2, Sparkles, LayoutGrid, Camera, FileText, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { toast } from '@/hooks/use-toast';
import heroImg from '@/assets/fenster-hero.jpg';
import dirtyImg from '@/assets/fenster-dirty.jpg';
import privatImgJson from '@/assets/fenster-privat-v2.webp.asset.json';
const privatImg = privatImgJson.url;
import gewerbeImg from '@/assets/fenster-gewerbe.jpg';
import ctaImg from '@/assets/fenster-cta.jpg';
import wintergartenImgJson from '@/assets/wintergarten.webp.asset.json';
const wintergartenImg = wintergartenImgJson.url;
import warumImgJson from '@/assets/fenster-warum.webp.asset.json';
const warumImg = warumImgJson.url;

const WHATSAPP_URL = 'https://wa.me/491636986317';

const services = [
  { icon: Home, title: 'Fensterreinigung Privat', desc: 'Wohnungen, Häuser, Wintergärten', img: privatImg },
  { icon: Building2, title: 'Fensterreinigung Gewerbe', desc: 'Büros, Praxen, Geschäfte', img: gewerbeImg },
  { icon: Sparkles, title: 'Wintergartenreinigung', desc: 'Glasdächer, Rahmen und Glasflächen', img: wintergartenImg, alt: 'Wintergartenreinigung Sachsen' },
  { icon: LayoutGrid, title: 'Glas- & Schaufensterreinigung', desc: 'Schaufenster, Fassaden und große Glasflächen', img: heroImg },
];

const faqs = [
  { q: 'Was kostet eine Fensterreinigung?', a: 'Die Kosten einer Fensterreinigung richten sich nach Anzahl, Größe und Zustand der Fenster. Nach kurzer Foto-Anfrage erhalten Sie einen transparenten Festpreis – ohne versteckte Gebühren.' },
  { q: 'Reinigen Sie auch Fensterrahmen?', a: 'Ja, Fensterrahmen und Fensterbänke werden bei jeder Fensterreinigung standardmäßig mitgereinigt. Auf Wunsch reinigen wir auch Rollladenkästen und Jalousien.' },
  { q: 'Bieten Sie Fensterreinigung für Unternehmen an?', a: 'Ja. Wir bieten Fensterreinigung für Gewerbe in ganz Sachsen – Büros, Praxen, Geschäfte und Schaufenster, einmalig oder regelmäßig, mit Rechnung für Unternehmen.' },
  { q: 'In welchen Städten arbeiten Sie?', a: 'Wir sind in ganz Sachsen tätig – schwerpunktmäßig Fensterreinigung in Chemnitz, Dresden, Leipzig und Umgebung.' },
  { q: 'Reinigen Sie auch Wintergärten?', a: 'Ja, Wintergartenreinigung gehört zu unseren Leistungen. Wir reinigen Glasdächer, Rahmen und Glasflächen Ihres Wintergartens streifenfrei und sicher.' },
  { q: 'Wie schnell erhalte ich ein Angebot?', a: 'In der Regel innerhalb von 15 Minuten. Senden Sie uns einfach ein Foto per WhatsApp – wir antworten meist innerhalb weniger Minuten mit einem Festpreis.' },
];

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'ReinWerk – Fensterreinigung Sachsen',
  description: 'Professionelle Fensterreinigung für Privat- und Gewerbekunden in Sachsen. Streifenfreie Fenster, Glasreinigung, Wintergartenreinigung und Schaufensterreinigung.',
  url: 'https://reinwerk-service.de/fensterreinigung',
  telephone: '+491632373108',
  email: 'info@reinwerk-service.de',
  image: 'https://reinwerk-service.de/og-image.png',
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
  ],
  priceRange: '€€',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Fensterreinigung Leistungen',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fensterreinigung' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Glasreinigung' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Wintergartenreinigung' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Schaufensterreinigung' } },
    ],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Was kostet eine Fensterreinigung?', acceptedAnswer: { '@type': 'Answer', text: 'Die Kosten einer Fensterreinigung richten sich nach Anzahl, Größe und Zustand der Fenster. Nach kurzer Foto-Anfrage erhalten Sie einen transparenten Festpreis – ohne versteckte Gebühren.' } },
    { '@type': 'Question', name: 'Reinigen Sie auch Fensterrahmen?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, Fensterrahmen und Fensterbänke werden bei jeder Fensterreinigung standardmäßig mitgereinigt. Auf Wunsch reinigen wir auch Rollladenkästen und Jalousien.' } },
    { '@type': 'Question', name: 'Bieten Sie Fensterreinigung für Unternehmen an?', acceptedAnswer: { '@type': 'Answer', text: 'Ja. Wir bieten Fensterreinigung für Gewerbe in ganz Sachsen – Büros, Praxen, Geschäfte und Schaufenster, einmalig oder regelmäßig, mit Rechnung für Unternehmen.' } },
    { '@type': 'Question', name: 'In welchen Städten arbeiten Sie?', acceptedAnswer: { '@type': 'Answer', text: 'Wir sind in ganz Sachsen tätig – schwerpunktmäßig Fensterreinigung in Chemnitz, Dresden, Leipzig und Umgebung.' } },
    { '@type': 'Question', name: 'Reinigen Sie auch Wintergärten?', acceptedAnswer: { '@type': 'Answer', text: 'Ja, Wintergartenreinigung gehört zu unseren Leistungen. Wir reinigen Glasdächer, Rahmen und Glasflächen Ihres Wintergartens streifenfrei und sicher.' } },
    { '@type': 'Question', name: 'Wie schnell erhalte ich ein Angebot?', acceptedAnswer: { '@type': 'Answer', text: 'In der Regel innerhalb von 15 Minuten. Senden Sie uns einfach ein Foto per WhatsApp – wir antworten meist innerhalb weniger Minuten mit einem Festpreis.' } },
  ],
};


export default function Fensterreinigung() {
  const [form, setForm] = useState({ vorname: '', telefon: '', stadt: '', fensterart: '', nachricht: '' });
  const [submitting, setSubmitting] = useState(false);

  const scrollToContact = () => {
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.vorname || !form.telefon || !form.stadt || !form.fensterart) {
      toast({ title: 'Bitte füllen Sie die Pflichtfelder aus.', variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    const text = encodeURIComponent(
      `Hallo, ich interessiere mich für Fensterreinigung.\nName: ${form.vorname}\nTelefon: ${form.telefon}\nStadt: ${form.stadt}\nFensterart: ${form.fensterart}\nNachricht: ${form.nachricht}`
    );
    window.open(`https://wa.me/491636986317?text=${text}`, '_blank');
    setTimeout(() => {
      setSubmitting(false);
      toast({ title: 'Vielen Dank! Wir melden uns in Kürze.' });
      setForm({ vorname: '', telefon: '', stadt: '', fensterart: '', nachricht: '' });
    }, 600);
  };

  return (
    <>
      <Helmet>
        <title>Fensterreinigung Sachsen | Privat & Gewerbe | ReinWerk</title>
        <meta name="description" content="Professionelle Fensterreinigung in Sachsen. Streifenfreie Fenster für Privat- und Gewerbekunden. Kostenlose Anfrage per WhatsApp. ReinWerk." />
        <link rel="canonical" href="https://reinwerk-service.de/fensterreinigung" />
        <meta property="og:title" content="Fensterreinigung Sachsen | Privat & Gewerbe | ReinWerk" />
        <meta property="og:description" content="Professionelle Fensterreinigung in Sachsen. Streifenfreie Fenster für Privat- und Gewerbekunden. Kostenlose Anfrage per WhatsApp." />
        <meta property="og:url" content="https://reinwerk-service.de/fensterreinigung" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header />

      <main>
        {/* HERO */}
        <section className="relative min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImg} alt="Professionelle Fensterreinigung in Sachsen" className="w-full h-full object-cover object-top" width={1920} height={1080} />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-background/30" />
          </div>
          <div className="container mx-auto relative z-10 pt-4 pb-10 md:py-14">
            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground tracking-tight leading-[1.1]">
                Professionelle <span className="text-primary">Fensterreinigung</span> für Privat & Gewerbe in Sachsen
              </h1>
              <p className="mt-4 text-base md:text-xl text-foreground/80 font-bold">
                Streifenfreie Fenster, mehr Tageslicht und ein gepflegter Eindruck – professionell gereinigt direkt bei Ihnen vor Ort.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { title: '0 € Anfahrt', sub: 'in ausgewählten Regionen' },
                  { title: 'Festpreis möglich', sub: 'nach kurzer Einschätzung' },
                  { title: 'Privat & Gewerbe', sub: 'flexible Termine' },
                ].map((badge) => (
                  <div
                    key={badge.title}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/80 backdrop-blur-md border border-border/60 shadow-soft"
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
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl shadow-lg font-semibold" asChild>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp schreiben
                  </a>
                </Button>
                <Button variant="heroOutline" size="lg" onClick={scrollToContact}>
                  Kostenloses Angebot
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM / SOLUTION */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
            <img src={warumImg} alt="Schmutziges Fenster mit Schlieren – professionelle Fensterreinigung nötig" className="rounded-2xl shadow-soft w-full aspect-[4/3] object-cover" loading="lazy" />
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">
                Warum professionelle Fensterreinigung?
              </h2>
              <ul className="mt-5 space-y-2.5">
                {['Schlieren und Flecken', 'Zeitaufwendiges Putzen', 'Schwer erreichbare Fenster'].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-base text-foreground">
                    <Check className="w-5 h-5 text-primary shrink-0" /> {t}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-muted-foreground">
                Wir übernehmen die Arbeit für Sie und sorgen für klare Sicht – ohne Aufwand.
              </p>
            </div>
          </div>
        </section>

        {/* SERVICES — 4 cards */}
        <section className="py-12">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight text-center mb-8">
              Unsere Leistungen
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {services.map((s) => (
                <Card key={s.title} className="overflow-hidden hover:shadow-medium transition-shadow group">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={s.img} alt={(s as { alt?: string }).alt ?? `${s.title} Sachsen`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                      <s.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-foreground">{s.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1.5">{s.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* PRIVATE */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">
                Fensterreinigung für Privatkunden
              </h2>
              <div className="mt-5 space-y-3 text-base md:text-lg text-muted-foreground">
                <p>Sie möchten Ihre Fenster putzen lassen – ohne Aufwand und ohne Schlieren?</p>
                <p>Wir übernehmen die Fensterreinigung für Wohnungen, Einfamilienhäuser und Wintergärten in ganz Sachsen.</p>
                <p className="text-foreground font-medium">Streifenfreie Fenster, freundlich und zuverlässig vor Ort.</p>
              </div>
            </div>
            <img src={privatImg} alt="Fensterreinigung Einfamilienhaus Sachsen" className="rounded-2xl shadow-soft w-full aspect-[4/3] object-cover" loading="lazy" />
          </div>
        </section>

        {/* BUSINESS */}
        <section className="py-12">
          <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
            <img src={gewerbeImg} alt="Fensterreinigung Bürogebäude Sachsen" className="rounded-2xl shadow-soft w-full aspect-[4/3] object-cover order-2 md:order-1" loading="lazy" />
            <div className="order-1 md:order-2">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">
                Fensterreinigung für Unternehmen
              </h2>
              <ul className="mt-5 space-y-2.5">
                {['Regelmäßige Reinigung', 'Flexible Termine', 'Rechnung für Unternehmen', 'Zuverlässige Durchführung'].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-base text-foreground">
                    <Check className="w-5 h-5 text-primary shrink-0" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight text-center mb-8">
              So funktioniert's
            </h2>
            <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
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
                  <h3 className="mt-3 text-sm md:text-base font-bold text-foreground">{s.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LOCAL SEO */}
        <section className="py-12">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight text-center mb-6">
              Fensterreinigung in Chemnitz, Dresden, Leipzig und ganz Sachsen
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-center">
              ReinWerk bietet professionelle Fensterreinigung für Privat- und Gewerbekunden in ganz Sachsen.
              Ob <strong className="text-foreground font-semibold">Fensterreinigung Chemnitz</strong>,{' '}
              <strong className="text-foreground font-semibold">Fensterreinigung Dresden</strong>,{' '}
              <strong className="text-foreground font-semibold">Fensterreinigung Leipzig</strong> oder Umgebung – wir reinigen Fenster, Rahmen,
              Wintergärten, Schaufenster und Glasflächen zuverlässig direkt vor Ort. Auch{' '}
              <strong className="text-foreground font-semibold">Glasreinigung Büro</strong> und{' '}
              <strong className="text-foreground font-semibold">Wintergartenreinigung</strong> gehören zu unseren Leistungen.
            </p>
            <p className="text-sm text-muted-foreground text-center mt-5">
              Weitere Informationen zu unseren{' '}
              <a href="/" className="text-primary font-medium underline-offset-4 hover:underline">Gesamte Leistungen von ReinWerk</a>{' '}
              oder zur{' '}
              <a href="/gewerbe" className="text-primary font-medium underline-offset-4 hover:underline">Gewerbereinigung in Sachsen</a>.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight text-center mb-8">
              Häufige Fragen zur Fensterreinigung
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

        {/* CONTACT FORM */}
        <section id="kontakt" className="py-12 bg-secondary/30">
          <div className="container mx-auto max-w-2xl">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight text-center mb-3">
              Jetzt Angebot anfordern
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              Antwort meist innerhalb weniger Minuten.
            </p>
            <Card className="p-6 md:p-8 shadow-medium">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="vorname">Vorname *</Label>
                    <Input id="vorname" value={form.vorname} onChange={(e) => setForm({ ...form, vorname: e.target.value })} className="mt-1.5" required />
                  </div>
                  <div>
                    <Label htmlFor="telefon">Telefonnummer *</Label>
                    <Input id="telefon" type="tel" value={form.telefon} onChange={(e) => setForm({ ...form, telefon: e.target.value })} className="mt-1.5" required />
                  </div>
                  <div>
                    <Label htmlFor="stadt">Stadt *</Label>
                    <Input id="stadt" value={form.stadt} onChange={(e) => setForm({ ...form, stadt: e.target.value })} className="mt-1.5" required />
                  </div>
                  <div>
                    <Label htmlFor="fensterart">Fensterart *</Label>
                    <Input id="fensterart" placeholder="z. B. Wohnung, Büro, Wintergarten" value={form.fensterart} onChange={(e) => setForm({ ...form, fensterart: e.target.value })} className="mt-1.5" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="nachricht">Nachricht</Label>
                  <textarea id="nachricht" rows={3} value={form.nachricht} onChange={(e) => setForm({ ...form, nachricht: e.target.value })} className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm text-input-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? 'Wird gesendet…' : 'Anfrage senden'}
                </Button>
              </form>
            </Card>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0">
            <img src={ctaImg} alt="Panoramafenster mit klarer Sicht" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40" />
          </div>
          <div className="container mx-auto relative z-10 text-center max-w-2xl">
            <h2 className="text-2xl md:text-5xl font-bold text-foreground tracking-tight">
              Jetzt unverbindlich anfragen
            </h2>
            <p className="mt-3 text-base md:text-lg text-foreground/80">
              Schnelle Rückmeldung per WhatsApp.
            </p>
            <div className="mt-6 flex justify-center">
              <Button size="xl" className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl shadow-lg font-semibold" asChild>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />
                  Foto senden — Preis in 15 Min
                </a>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Antwort meist innerhalb weniger Minuten.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
