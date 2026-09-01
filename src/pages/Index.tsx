import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  MessageCircle,
  FileText,
  Check,
  Wrench,
  UserCheck,
  Receipt,
  CalendarClock,
  Car,
  ArrowRight,
  ShieldCheck,
  Building2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HomepageInquiryModal } from '@/components/HomepageInquiryModal';
import { GoogleReviews } from '@/components/GoogleReviews';
import { EinsatzgebietSachsen } from '@/components/EinsatzgebietSachsen';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { trackContact } from '@/lib/meta-pixel';

import heroHome from '@/assets/reinwerk-hero-home.jpg';
import heroMobile from '@/assets/reinwerk-hero-mobile.jpg';
import fensterImg from '@/assets/fenster-hero.jpg';
import fensterErgebnisImg from '@/assets/fensterreinigung-ergebnis.jpg';
import polsterImg from '@/assets/polsterreinigung.jpeg';
import teppichImg from '@/assets/teppichbodenreinigung-hero.jpg';
import wintergartenImg from '@/assets/wintergartenreinigung-leipzig.jpg';
import teppichBueroAsset from '@/assets/teppichbodenreinigung-ergebnis.asset.json';
const teppichBueroImg = teppichBueroAsset.url;
import polsterProjektImg from '@/assets/polsterreinigung-ergebnis.jpg';
import rahmenImg from '@/assets/rahmen-rollladen-jalousien-neu.jpg';
import teppichGewerbeImg from '@/assets/teppichreinigung-buero.jpg';
import glasImg from '@/assets/fenster-glasreinigung-neu.jpg';

const WHATSAPP_URL = 'https://wa.me/491636986317';

const services = [
  {
    title: 'Fensterreinigung',
    text: 'Fenster, Glasflächen, Wintergärten, Rahmen, Rollläden und Außenjalousien professionell gereinigt.',
    cta: 'Zur Fensterreinigung',
    href: '/fensterreinigung',
    img: fensterImg,
  },
  {
    title: 'Polsterreinigung',
    text: 'Professionelle Tiefenreinigung für Sofas, Sessel, Stühle und weitere Polstermöbel direkt bei Ihnen vor Ort.',
    cta: 'Zur Polsterreinigung',
    href: '/polsterreinigung',
    img: polsterImg,
  },
  {
    title: 'Teppichbodenreinigung',
    text: 'Gründliche Reinigung von Teppichböden für Privathaushalte, Büros und Gewerbeobjekte.',
    cta: 'Zur Teppichbodenreinigung',
    href: '/teppichbodenreinigung',
    img: teppichImg,
  },
];

const advantages = [
  {
    icon: Wrench,
    title: 'Professionelle Technik',
    text: 'Wir setzen auf professionelle Geräte und auf die jeweilige Oberfläche abgestimmte Reinigungsverfahren.',
  },
  {
    icon: UserCheck,
    title: 'Persönlicher Service',
    text: 'Von der Anfrage bis zur Ausführung haben Sie einen direkten Ansprechpartner.',
  },
  {
    icon: Receipt,
    title: 'Transparente Angebote',
    text: 'Sie erhalten vor der Durchführung eine klare Einschätzung der Leistungen und Kosten.',
  },
  {
    icon: CalendarClock,
    title: 'Flexible Termine',
    text: 'Für Privatkunden und Gewerbe – bei Bedarf auch außerhalb regulärer Betriebszeiten.',
  },
  {
    icon: Car,
    title: 'Kostenlose Anfahrt',
    text: 'In ausgewählten Einsatzgebieten entstehen Ihnen keine zusätzlichen Anfahrtskosten.',
  },
];

const projects = [
  { title: 'Fensterreinigung', img: fensterErgebnisImg },
  { img: polsterProjektImg, title: 'Polsterreinigung' },
  { img: wintergartenImg, title: 'Wintergartenreinigung' },
  { img: teppichBueroImg, title: 'Teppichbodenreinigung' },
  { img: rahmenImg, title: 'Rahmen- & Jalousienreinigung' },
  { img: teppichGewerbeImg, title: 'Gewerbliche Teppichreinigung' },
  { img: glasImg, title: 'Glas- & Fassadenreinigung' },
];

const steps = [
  { n: '1', title: 'Anfrage senden', text: 'Schicken Sie uns Ihre Anfrage – gerne mit Fotos und kurzen Angaben zum Objekt.' },
  { n: '2', title: 'Angebot erhalten', text: 'Wir prüfen die Angaben und erstellen eine transparente Einschätzung.' },
  { n: '3', title: 'Termin vereinbaren', text: 'Sie wählen einen passenden Termin.' },
  { n: '4', title: 'Professionelle Reinigung', text: 'Wir führen die vereinbarten Arbeiten direkt bei Ihnen vor Ort durch.' },
];

const faqs = [
  {
    q: 'In welchen Städten ist ReinWerk tätig?',
    a: 'Wir sind vor allem in Chemnitz, Dresden, Leipzig und im Umland tätig. Weitere Einsatzgebiete in Sachsen sind nach Absprache möglich.',
  },
  {
    q: 'Arbeiten Sie für Privatkunden und Unternehmen?',
    a: 'Ja. Wir reinigen sowohl für Privathaushalte als auch für Gewerbeobjekte wie Büros, Praxen, Hotels und Kitas.',
  },
  {
    q: 'Wie erhalte ich ein Angebot?',
    a: 'Senden Sie uns eine kurze Anfrage per WhatsApp, E-Mail oder Telefon – gerne mit Fotos. Sie erhalten anschließend eine unverbindliche Einschätzung.',
  },
  {
    q: 'Ist die Anfahrt kostenlos?',
    a: 'In unseren ausgewählten Einsatzgebieten entstehen keine zusätzlichen Anfahrtskosten.',
  },
  {
    q: 'Welche Reinigungsverfahren verwenden Sie?',
    a: 'Wir arbeiten mit professionellen Geräten und wählen das Verfahren passend zur jeweiligen Oberfläche und Verschmutzung aus.',
  },
  {
    q: 'Muss ich während der Reinigung vor Ort sein?',
    a: 'Nicht zwingend. Wichtig ist nur, dass wir Zugang zum Objekt haben und Details vorab abgestimmt sind.',
  },
  {
    q: 'Wie kann ich einen Termin vereinbaren?',
    a: 'Nach Ihrer Anfrage stimmen wir gemeinsam einen passenden Termin ab – auf Wunsch auch außerhalb regulärer Betriebszeiten.',
  },
];

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'ReinWerk',
  url: 'https://reinwerk-service.de/',
  telephone: '+491632373108',
  email: 'info@reinwerk-service.de',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Matthesstraße 48',
    addressLocality: 'Chemnitz',
    postalCode: '09113',
    addressCountry: 'DE',
  },
  areaServed: [
    { '@type': 'State', name: 'Sachsen' },
    { '@type': 'City', name: 'Chemnitz' },
    { '@type': 'City', name: 'Dresden' },
    { '@type': 'City', name: 'Leipzig' },
  ],
  makesOffer: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Fensterreinigung' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Polsterreinigung' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Teppichbodenreinigung' } },
  ],
};

const Index = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [whyActive, setWhyActive] = useState(0);
  const whyScrollRef = useRef<HTMLDivElement>(null);
  const [projActive, setProjActive] = useState(0);
  const projScrollRef = useRef<HTMLDivElement>(null);

  const handleWhyScroll = () => {
    const el = whyScrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / advantages.length;
    const idx = Math.min(advantages.length - 1, Math.round(el.scrollLeft / cardWidth));
    setWhyActive(idx);
  };

  const handleProjScroll = () => {
    const el = projScrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / projects.length;
    const idx = Math.min(projects.length - 1, Math.round(el.scrollLeft / cardWidth));
    setProjActive(idx);
  };

  const scrollProj = (dir: 1 | -1) => {
    const el = projScrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / projects.length;
    el.scrollBy({ left: dir * cardWidth, behavior: 'smooth' });
  };

  const openContact = () => {
    trackContact();
    setContactOpen(true);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Helmet>
        <title>ReinWerk | Fenster-, Polster- &amp; Teppichreinigung in Sachsen</title>
        <meta
          name="description"
          content="Professionelle Fenster-, Polster- und Teppichbodenreinigung für Privat & Gewerbe. ReinWerk – zuverlässig in Chemnitz, Dresden, Leipzig und Umgebung."
        />
        <link rel="canonical" href="https://reinwerk-service.de/" />
        <meta property="og:title" content="ReinWerk | Fenster-, Polster- & Teppichreinigung in Sachsen" />
        <meta
          property="og:description"
          content="Professionelle Fenster-, Polster- und Teppichbodenreinigung für Privat & Gewerbe in Chemnitz, Dresden, Leipzig und Umgebung."
        />
        <meta property="og:url" content="https://reinwerk-service.de/" />
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      </Helmet>

      <Header />
      <HomepageInquiryModal open={contactOpen} onOpenChange={setContactOpen} />

      <main>
        {/* 1. HERO */}
        <section className="relative w-full min-h-[100svh] md:min-h-screen overflow-hidden flex items-center md:items-start pt-16 md:pt-32 md:pb-6">
          {/* Hero-Hintergrundbild */}
          <div
            className="absolute inset-0 bg-cover bg-no-repeat bg-[position:62%_center] md:bg-center"
            style={{ backgroundImage: `url(${heroHome})` }}
            aria-label="ReinWerk Reinigungsservice für Privat- und Gewerbekunden in Sachsen"
            role="img"
          />
          {/* Mobile: eigenes Hochformat-Hintergrundbild */}
          <div
            className="absolute inset-0 bg-cover bg-no-repeat bg-[position:center_30%] md:hidden"
            style={{ backgroundImage: `url(${heroMobile})` }}
            aria-hidden="true"
          />
          {/* Overlay: dunkler Verlauf nur links für Textlesbarkeit, rechts klar */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(8,18,28,0.82) 0%, rgba(8,18,28,0.68) 28%, rgba(8,18,28,0.30) 48%, rgba(8,18,28,0.00) 65%)',
            }}
          />
          {/* Mobile: zusätzlicher Verlauf für Lesbarkeit über dem Motiv */}
          <div
            className="absolute inset-0 md:hidden"
            style={{
              background:
                'linear-gradient(90deg, rgba(8,18,28,0.88) 0%, rgba(8,18,28,0.72) 45%, rgba(8,18,28,0.45) 75%, rgba(8,18,28,0.30) 100%)',
            }}
          />

          <div className="container mx-auto relative z-10 px-4">
            <div className="max-w-xl md:max-w-2xl w-full pt-10 md:pt-16">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05] text-left mb-4">
                <span className="text-white block">Professionelle Reinigung</span>
                <span className="text-primary block">für Privat & Gewerbe</span>
              </h1>
              <p className="text-base md:text-[23px] text-white md:leading-[1.45] leading-relaxed mb-6 max-w-md text-left font-bold">
                Fensterreinigung, Polsterreinigung und Teppichbodenreinigung – zuverlässig, gründlich
                und professionell vor Ort.
              </p>

              {/* Vorteile */}
              <ul className="flex flex-col mb-6">
                {[
                  { icon: Car, label: 'Kostenlose Anfahrt' },
                  { icon: Building2, label: 'Privat & Gewerbe' },
                  { icon: ShieldCheck, label: 'Persönlicher Service' },
                ].map(({ icon: Icon, label }, i) => (
                  <li
                    key={label}
                    className={`flex items-center gap-2 md:gap-4 text-base md:text-[21px] font-bold text-white ${
                      i > 0 ? 'pt-4 md:pt-5 border-t border-white/20' : ''
                    } ${i < 2 ? 'pb-4 md:pb-5' : ''}`}
                  >
                    <span className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-white/60 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>

              {/* Desktop/Tablet CTA-Buttons */}
              <div className="hidden md:flex flex-row gap-3 mb-6">
                <Button size="lg" onClick={openContact} className="font-semibold h-11 md:h-14">
                  Kostenloses Angebot erhalten
                </Button>
                <Button
                  size="lg"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl shadow-lg font-semibold h-11 md:h-14"
                  asChild
                >
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackContact()}>
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp schreiben
                  </a>
                </Button>
              </div>

              {/* Mobile CTA-Buttons */}
              <div className="md:hidden flex flex-col gap-2 mb-6">
                <Button
                  size="lg"
                  onClick={openContact}
                  className="w-full min-h-[4rem] h-auto py-3.5 px-4 font-semibold justify-start gap-4 rounded-xl"
                >
                  <FileText className="w-6 h-6 text-white shrink-0" />
                  <div className="flex flex-col items-start text-left">
                    <span className="text-white font-bold text-base leading-tight">Kostenloses Angebot erhalten</span>
                    <span className="text-white/80 text-xs leading-tight">Unverbindlich anfragen</span>
                  </div>
                </Button>
                <Button
                  size="lg"
                  className="w-full min-h-[4rem] h-auto py-3.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white justify-start gap-4 rounded-xl shadow-lg font-semibold"
                  asChild
                >
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackContact()}>
                    <MessageCircle className="w-6 h-6 text-white shrink-0" />
                    <div className="flex flex-col items-start text-left">
                      <span className="text-white font-bold text-base leading-tight">WhatsApp schreiben</span>
                      <span className="text-white/80 text-xs leading-tight">Direkt &amp; unkompliziert</span>
                    </div>
                  </a>
                </Button>
              </div>

            </div>
          </div>
        </section>

        {/* 2. LEISTUNGEN */}
        <section className="py-10 md:py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-2">
                Welche Reinigung benötigen Sie?
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Wählen Sie Ihre gewünschte Leistung – wir kümmern uns um den Rest.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="bg-card rounded-2xl border border-border overflow-hidden shadow-soft flex flex-col"
                >
                  <img src={s.img} alt={s.title} className="w-full h-40 md:h-48 object-cover" loading="lazy" />
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{s.text}</p>
                    <Button asChild className="w-full rounded-xl font-semibold">
                      <Link to={s.href}>
                        {s.cta}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* 4. WARUM REINWERK */}
        <section className="py-10 md:py-11" style={{ backgroundColor: '#0C1B2A' }}>
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8 md:mb-10">
              Warum ReinWerk?
            </h2>

            {/* Desktop: 5 Vorteile in einer Reihe mit Trennlinien */}
            <div className="hidden md:flex max-w-6xl mx-auto items-stretch justify-between">
              {advantages.map((a, i) => (
                <div key={a.title} className="flex items-stretch flex-1 min-w-0">
                  {i > 0 && (
                    <div className="self-center w-px h-20 shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />
                  )}
                  <div className="flex-1 px-5 text-center">
                    <a.icon className="w-12 h-12 mx-auto mb-4 text-primary" strokeWidth={1.6} />
                    <h3 className="font-bold text-white text-lg mb-2">{a.title}</h3>
                    <p className="text-[15px] leading-[1.4] text-white/60">{a.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile: swipebares Carousel mit Punkten */}
            <div className="md:hidden">
              <div
                ref={whyScrollRef}
                onScroll={handleWhyScroll}
                className="flex overflow-x-auto snap-x snap-mandatory -mx-4 px-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
              >
                {advantages.map((a) => (
                  <div
                    key={a.title}
                    className="shrink-0 snap-center text-center px-3"
                    style={{ width: '68%' }}
                  >
                    <a.icon className="w-12 h-12 mx-auto mb-4 text-primary" strokeWidth={1.6} />
                    <h3 className="font-bold text-white text-lg mb-2">{a.title}</h3>
                    <p className="text-[15px] leading-[1.4] text-white/60">{a.text}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-2 mt-5">
                {advantages.map((a, i) => (
                  <span
                    key={a.title}
                    className="w-1.5 h-1.5 rounded-full transition-colors"
                    style={{ backgroundColor: i === whyActive ? '#1598D4' : 'rgba(255,255,255,0.25)' }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. ERGEBNISSE */}
        <section className="py-8 md:py-12 bg-muted/30">
          <div className="container max-w-6xl">
            <div className="flex items-end justify-between mb-6 md:mb-8">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground">
                Ergebnisse, die man sieht
              </h2>
            </div>

            <div className="relative">
              {/* Navigationsbuttons (Desktop) */}
              <button
                onClick={() => scrollProj(-1)}
                className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-card border border-border shadow-soft items-center justify-center hover:bg-accent transition-colors"
                aria-label="Vorheriges Ergebnis"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={() => scrollProj(1)}
                className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-card border border-border shadow-soft items-center justify-center hover:bg-accent transition-colors"
                aria-label="Nächstes Ergebnis"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>

              <div
                ref={projScrollRef}
                onScroll={handleProjScroll}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
              >
                {projects.map((p) => (
                  <figure
                    key={p.title}
                    className="shrink-0 snap-center w-[86%] sm:w-[46%] md:w-[31.5%]"
                  >
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-52 md:h-60 object-cover rounded-xl"
                      loading="lazy"
                    />
                    <figcaption className="pt-2.5 px-0.5">
                      <p className="font-semibold text-foreground text-sm md:text-base">{p.title}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>

              {/* Pagination-Dots */}
              <div className="flex justify-center gap-2 mt-5">
                {projects.map((p, i) => (
                  <span
                    key={p.title}
                    className="w-1.5 h-1.5 rounded-full transition-colors"
                    style={{ backgroundColor: i === projActive ? '#1598D4' : 'rgba(0,0,0,0.15)' }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. GOOGLE BEWERTUNGEN */}
        <section className="py-8 md:py-12 bg-background">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground text-center mb-6">
            Das sagen unsere Kunden
          </h2>
          <GoogleReviews useMobileGoogleLogo />
        </section>

        {/* GEWERBE */}
        <section className="py-10 md:py-16 bg-foreground">
          <div className="container max-w-4xl text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-background mb-3">
              Professionelle Reinigung für Unternehmen
            </h2>
            <p className="text-sm md:text-base text-background/80 leading-relaxed mb-4">
              Zuverlässige Reinigungslösungen für Büros, Praxen, Hotels, Kitas und weitere
              Gewerbeobjekte.
            </p>
            <p className="text-sm md:text-base font-semibold text-background/90 mb-6">
              Büros · Arztpraxen · Hotels · Kitas · Fitnessstudios · Gewerbeflächen
            </p>
            <Button asChild size="lg" className="rounded-xl font-semibold">
              <Link to="/gewerbe">
                Reinigung für Gewerbe entdecken
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </section>

        {/* 7. EINSATZGEBIET */}
        <EinsatzgebietSachsen
          heading="Für Sie vor Ort"
          subtitle="Chemnitz · Dresden · Leipzig · Weitere Einsatzgebiete"
          description="ReinWerk bietet professionelle Reinigungsleistungen für Privat- und Gewerbekunden in Chemnitz, Dresden, Leipzig und zahlreichen weiteren Regionen an. Für größere Aufträge sind nach Absprache auch weitere Einsatzgebiete möglich."
        />

        {/* 8. ABLAUF */}
        <section className="py-10 md:py-16 bg-muted/30">
          <div className="container">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground text-center mb-8">
              So einfach funktioniert Ihre Anfrage
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
              {steps.map((s) => (
                <div key={s.n} className="bg-card p-5 rounded-2xl border border-border/60 shadow-soft">
                  <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-3">
                    {s.n}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1.5">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button onClick={openContact} size="lg" className="rounded-xl font-semibold">
                Jetzt kostenlos anfragen
              </Button>
            </div>
          </div>
        </section>

        {/* 9. FAQ */}
        <section className="py-10 md:py-16 bg-background">
          <div className="container max-w-3xl">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground text-center mb-8">Häufige Fragen</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-sm md:text-base font-semibold">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* 10. FINALER CTA */}
        <section className="py-10 md:py-16 bg-blue-soft/60">
          <div className="container max-w-3xl text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3">
              Sie möchten wissen, was Ihre Reinigung kostet?
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
              Senden Sie uns kurz Ihre Anfrage. Wir prüfen die Angaben und melden uns mit einer
              unverbindlichen Einschätzung.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-xl mx-auto">
              <Button
                onClick={openContact}
                className="w-full sm:w-auto min-h-[3.5rem] h-auto py-3 px-4 bg-primary hover:bg-primary text-primary-foreground justify-start gap-4 rounded-xl shadow-lg font-semibold"
              >
                <FileText className="w-6 h-6 shrink-0" />
                <span className="flex flex-col items-start leading-tight">
                  <span className="font-bold">Kostenloses Angebot erhalten</span>
                  <span className="text-xs font-normal opacity-90">Unverbindlich anfragen</span>
                </span>
              </Button>
              <Button
                asChild
                className="w-full sm:w-auto min-h-[3.5rem] h-auto py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white justify-start gap-4 rounded-xl shadow-lg font-semibold"
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackContact()}>
                  <MessageCircle className="w-6 h-6 shrink-0" />
                  <span className="flex flex-col items-start leading-tight">
                    <span className="font-bold">WhatsApp schreiben</span>
                    <span className="text-xs font-normal opacity-90">Direkt &amp; unkompliziert</span>
                  </span>
                </a>
              </Button>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground mt-5">
              Keine Verpflichtung · Persönliche Rückmeldung · Flexible Terminvereinbarung
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
