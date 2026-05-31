import { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { MessageCircle, Check, Home, Building2, Sparkles, Camera, FileText, Calendar, Euro, ShieldCheck, Users, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import heroImg from '@/assets/fenster-hero.jpg';
import dirtyImg from '@/assets/fenster-dirty.jpg';
import privatImg from '@/assets/fenster-privat.jpg';
import gewerbeImg from '@/assets/fenster-gewerbe.jpg';
import technicianImg from '@/assets/fenster-technician.jpg';
import ctaImg from '@/assets/fenster-cta.jpg';
import beforeImg from '@/assets/fenster-before.jpg';
import afterImg from '@/assets/fenster-after.jpg';

const WHATSAPP_URL = 'https://api.whatsapp.com/send/?phone=491636986317&text&type=phone_number&app_absent=0';

const reviews = [
  { name: 'Anna K.', text: 'Streifenfrei und super schnell. Die Fenster sehen aus wie neu!', rating: 5 },
  { name: 'Michael R.', text: 'Sehr professionell, pünktlich und zuverlässig. Klare Empfehlung.', rating: 5 },
  { name: 'Sabine H.', text: 'Endlich klare Sicht ohne stundenlanges Putzen. Vielen Dank!', rating: 5 },
  { name: 'Tobias W.', text: 'Top Service für unser Büro – wir buchen jetzt regelmäßig.', rating: 5 },
  { name: 'Julia M.', text: 'Faire Preise, freundliches Team und perfektes Ergebnis.', rating: 5 },
  { name: 'Daniel S.', text: 'Auch die Rahmen wurden perfekt gereinigt. Sehr zufrieden.', rating: 5 },
];

const faqs = [
  { q: 'Was kostet die Fensterreinigung?', a: 'Die Kosten richten sich nach Anzahl, Größe und Zustand der Fenster. Nach kurzer Foto-Anfrage erhalten Sie einen transparenten Festpreis – ohne versteckte Gebühren.' },
  { q: 'Reinigen Sie auch Rahmen?', a: 'Ja, Rahmen und Fensterbänke werden standardmäßig mitgereinigt. Auf Wunsch reinigen wir auch Rollladenkästen und Jalousien.' },
  { q: 'Arbeiten Sie auch bei Firmen?', a: 'Ja. Wir betreuen Büros, Praxen, Geschäfte und Schaufenster – einmalig oder regelmäßig, mit Rechnung für Unternehmen.' },
  { q: 'In welchen Städten sind Sie tätig?', a: 'Wir sind in ganz Sachsen unterwegs – schwerpunktmäßig in Chemnitz, Dresden, Leipzig und Umgebung.' },
  { q: 'Muss ich etwas vorbereiten?', a: 'Nein. Räumen Sie nur empfindliche Gegenstände von den Fensterbänken. Alles Weitere erledigen wir.' },
];

function BeforeAfterSlider() {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  };

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      setFromClientX(clientX);
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl shadow-medium select-none cursor-ew-resize"
      onMouseDown={(e) => { dragging.current = true; setFromClientX(e.clientX); }}
      onTouchStart={(e) => { dragging.current = true; setFromClientX(e.touches[0].clientX); }}
    >
      <img src={afterImg} alt="Fenster nach professioneller Reinigung" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={beforeImg} alt="Fenster vor der Reinigung" className="absolute inset-0 h-full object-cover" style={{ width: `${100 / (pos / 100)}%`, maxWidth: 'none' }} loading="lazy" />
      </div>
      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-foreground">Vorher</div>
      <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">Nachher</div>
      <div className="absolute top-0 bottom-0 w-1 bg-white shadow-lg" style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
          <ArrowRight className="w-4 h-4 text-foreground -ml-1" />
          <ArrowRight className="w-4 h-4 text-foreground rotate-180 -mr-1" />
        </div>
      </div>
    </div>
  );
}

export default function Fensterreinigung() {
  const scrollToContact = () => {
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Fensterreinigung Sachsen | ReinWerk</title>
        <meta name="description" content="Professionelle Fensterreinigung für Privat- und Gewerbekunden in Sachsen. Streifenfreie Fenster, Glasflächen und Rahmen. Schnelle Terminvergabe und transparente Preise." />
        <link rel="canonical" href="https://reinwerk-service.de/fensterreinigung" />
        <meta property="og:title" content="Fensterreinigung Sachsen | ReinWerk" />
        <meta property="og:description" content="Professionelle Fensterreinigung für Privat- und Gewerbekunden in Sachsen. Streifenfreie Fenster, Glasflächen und Rahmen." />
        <meta property="og:url" content="https://reinwerk-service.de/fensterreinigung" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />

      <main className="pt-20">
        {/* HERO */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImg} alt="Vorher-Nachher: schmutziges und sauberes Fenster" className="w-full h-full object-cover" width={1920} height={1080} />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
          </div>
          <div className="container mx-auto relative z-10 py-16">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight leading-tight">
                Professionelle <span className="text-primary">Fensterreinigung</span> in Sachsen
              </h1>
              <p className="mt-4 text-xl md:text-2xl text-foreground/80 font-medium">
                Streifenfreie Fenster für Privat- und Gewerbekunden.
              </p>
              <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl">
                Wir reinigen Fenster, Rahmen und Glasflächen gründlich und professionell – direkt bei Ihnen vor Ort.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl shadow-lg font-semibold" asChild>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Anfrage
                  </a>
                </Button>
                <Button variant="heroOutline" size="lg" onClick={scrollToContact}>
                  Kostenloses Angebot
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {['0€ Anfahrt', 'Festpreis möglich', 'Privat & Gewerbe'].map((b) => (
                  <span key={b} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur border border-border text-sm font-medium text-foreground">
                    <Check className="w-4 h-4 text-primary" /> {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center">
            <img src={dirtyImg} alt="Schmutzige Fenster mit Schlieren" className="rounded-2xl shadow-soft w-full aspect-[4/3] object-cover" loading="lazy" />
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                Schmutzige Fenster wirken ungepflegt.
              </h2>
              <ul className="mt-6 space-y-3">
                {['Schlieren und Flecken', 'Zeitaufwendiges Putzen', 'Schwer erreichbare Fenster'].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-base text-foreground">
                    <Check className="w-5 h-5 text-primary shrink-0" /> {t}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-muted-foreground">
                Wir übernehmen die Arbeit für Sie und sorgen für klare Sicht ohne Aufwand.
              </p>
            </div>
          </div>
        </section>

        {/* BEFORE / AFTER */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Vorher – Nachher</h2>
              <p className="mt-3 text-muted-foreground">
                Sehen Sie selbst den Unterschied. Professionelle Reinigung sorgt für streifenfreie Ergebnisse.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <BeforeAfterSlider />
              <p className="text-center text-xs text-muted-foreground mt-3">Schieberegler ziehen zum Vergleichen</p>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight text-center mb-10">
              Unsere Leistungen
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Home, title: 'Fensterreinigung Privat', desc: 'Wohnungen, Häuser, Wintergärten' },
                { icon: Building2, title: 'Fensterreinigung Gewerbe', desc: 'Büros, Praxen, Geschäfte' },
                { icon: Sparkles, title: 'Glasflächen', desc: 'Schaufenster, Glasdächer, Glasfassaden' },
              ].map((s) => (
                <Card key={s.title} className="p-6 hover:shadow-medium transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <s.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* PRIVATE */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                Mehr Licht. Weniger Aufwand.
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Menschen möchten keine Fenster putzen. Sie möchten saubere Fenster. Genau dafür sind wir da.
              </p>
            </div>
            <img src={privatImg} alt="Helles modernes Wohnzimmer mit sauberen Fenstern" className="rounded-2xl shadow-soft w-full aspect-[4/3] object-cover" loading="lazy" />
          </div>
        </section>

        {/* BUSINESS */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center">
            <img src={gewerbeImg} alt="Modernes Büro mit sauberen Glasflächen" className="rounded-2xl shadow-soft w-full aspect-[4/3] object-cover order-2 md:order-1" loading="lazy" />
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                Ein gepflegter Eindruck beginnt mit sauberen Fenstern.
              </h2>
              <ul className="mt-6 space-y-3">
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
        <section className="py-12 md:py-16">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight text-center mb-10">
              So einfach geht's
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Camera, step: '1', title: 'Foto senden', desc: 'Schicken Sie uns ein Foto Ihrer Fenster per WhatsApp.' },
                { icon: FileText, step: '2', title: 'Angebot erhalten', desc: 'Wir senden Ihnen einen transparenten Festpreis.' },
                { icon: Calendar, step: '3', title: 'Termin vereinbaren', desc: 'Wir vereinbaren einen Termin, der zu Ihnen passt.' },
              ].map((s) => (
                <div key={s.step} className="text-center">
                  <div className="relative inline-flex">
                    <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center">
                      <s.icon className="w-7 h-7" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center">{s.step}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight text-center mb-10">
              Was unsere Kunden sagen
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((r) => (
                <Card key={r.name} className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">{r.name}</div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{r.text}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* WHY REINWERK */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center">
            <img src={technicianImg} alt="ReinWerk Mitarbeiter bei der Fensterreinigung" className="rounded-2xl shadow-soft w-full aspect-[4/3] object-cover" loading="lazy" />
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Warum ReinWerk?</h2>
              <ul className="mt-6 space-y-3">
                {[
                  { icon: Users, text: 'Persönlicher Ansprechpartner' },
                  { icon: Calendar, text: 'Schnelle Terminvergabe' },
                  { icon: Euro, text: 'Transparente Preise' },
                  { icon: ShieldCheck, text: 'Zuverlässiger Service' },
                  { icon: Building2, text: 'Privat & Gewerbe' },
                ].map((i) => (
                  <li key={i.text} className="flex items-center gap-3 text-base text-foreground">
                    <i.icon className="w-5 h-5 text-primary shrink-0" /> {i.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight text-center mb-10">
              Häufige Fragen
            </h2>
            <Accordion type="single" collapsible className="bg-background rounded-2xl px-6 shadow-soft">
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
        <section id="kontakt" className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0">
            <img src={ctaImg} alt="Panoramafenster mit klarer Sicht" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40" />
          </div>
          <div className="container mx-auto relative z-10 text-center max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
              Jetzt unverbindlich anfragen
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
              Schnelle Rückmeldung per WhatsApp oder E-Mail.
            </p>
            <div className="mt-8 flex justify-center">
              <Button variant="hero" size="xl" asChild>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Anfrage
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
