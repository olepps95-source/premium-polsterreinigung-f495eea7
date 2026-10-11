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
import { RegionalPage, absoluteUrl } from '@/lib/regionalPages';
import heroDesktop from '@/assets/fenster-hero.jpg';
import heroMobile from '@/assets/fensterreinigung-hero-mobile.png';
import privatImg from '@/assets/fenster-privat.webp';
import gewerbeSectionImg from '@/assets/fenster-gewerbe-neu.jpg';
import ctaImg from '@/assets/fenster-cta.jpg';
import wintergartenImg from '@/assets/wintergartenreinigung-leipzig.jpg';
import warumImg from '@/assets/fenster-warum-neu.jpg';
import schaufensterImg from '@/assets/fenster-schaufenster.jpg';
import rahmenImg from '@/assets/rahmen-rollladen-jalousien-neu.jpg';
import glasreinigungImg from '@/assets/fenster-glasreinigung-neu.jpg';

/*
 * Regional window-cleaning pages: 1:1 copy of the /fensterreinigung layout
 * (same sections, order, images, classes) with city-specific texts only.
 */

const WHATSAPP_URL = 'https://api.whatsapp.com/send/?phone=491636986317&text&type=phone_number&app_absent=0';
const WEBHOOK_URL = 'https://hook.eu1.make.com/81hzpicl2zd6d8qsoh5ki43wbw62if58';

type CityTexts = {
  hero: string;
  services: [string, string, string, string];
  warumSub: string;
  warumText: string;
  privat: string[];
  gewerbe: string;
  einsatz: string;
  ctaTitle: string;
  ctaSub: string;
  extraFaqs: { q: string; a: string }[];
};

const texts: Record<string, CityTexts> = {
  Chemnitz: {
    hero: 'Fenster putzen lassen in Chemnitz – für Privat & Gewerbe, direkt von unserem Firmensitz aus. Auch in Limbach-Oberfrohna, Frankenberg, Flöha, Burgstädt und Glauchau.',
    services: [
      'Streifenfreie Glasreinigung für Wohnungen und Häuser in Chemnitz',
      'Rahmen, Rollläden und Außenjalousien in Chemnitz gründlich von Staub und Ablagerungen befreit.',
      'Wintergartenreinigung in Chemnitz – Glasflächen und Rahmen sorgfältig gereinigt',
      'Schaufenster, Büros und Praxen in Chemnitz – flexibel nach Absprache',
    ],
    warumSub: 'Ihr Partner für Fensterreinigung in Chemnitz – mit Firmensitz direkt vor Ort',
    warumText: 'Von der Matthesstraße in Chemnitz aus sind wir schnell bei Ihnen – ob Wohnung auf dem Kaßberg, Einfamilienhaus am Stadtrand oder Geschäft in der Innenstadt. Mit ReinWerk erhalten Sie saubere Glasflächen und einen verlässlichen Service.',
    privat: [
      'Sie möchten Ihre Fenster in Chemnitz putzen lassen – ohne Aufwand und ohne Schlieren?',
    ],
    gewerbe: 'Büros, Praxen, Ladengeschäfte und Schaufenster in Chemnitz reinigen wir einmalig oder regelmäßig – mit Rechnung und Terminen, die zu Ihrem Betrieb passen.',
    einsatz: '',
    ctaTitle: 'Fensterreinigung in Chemnitz anfragen & kostenloses Angebot erhalten',
    ctaSub: 'Fotos per WhatsApp senden – schnelle Rückmeldung aus Chemnitz.',
    extraFaqs: [
      { q: 'Was kostet eine Fensterreinigung in Chemnitz?', a: 'Der Preis richtet sich nach Anzahl, Größe und Zustand der Fenster sowie nach der Erreichbarkeit. Nach Ihren Fotos per WhatsApp erhalten Sie einen festen Preis.' },
    ],
  },
  Dresden: {
    hero: 'Fenster putzen lassen in Dresden – mobiler Vor-Ort-Service für Privat & Gewerbe, von Striesen und Blasewitz bis Radebeul, Freital und Pirna.',
    services: [
      'Streifenfreie Glasreinigung – auch für hohe Altbaufenster in Dresden',
      'Rahmen, Rollläden und Außenjalousien in Dresden gründlich von Staub und Ablagerungen befreit.',
      'Wintergartenreinigung in Dresden und Umgebung – Glasdach und Rahmen sorgfältig gereinigt',
      'Glasreinigung für Büros, Praxen und Geschäfte in Dresden – nach Absprache',
    ],
    warumSub: 'Ihr mobiler Partner für Fensterreinigung in Dresden',
    warumText: 'Ob Gründerzeitwohnung in Striesen, Haus in Blasewitz oder Laden in der Neustadt – wir kommen mit unserer Ausrüstung zu Ihnen. ReinWerk hat keine Niederlassung in Dresden, plant die Einsätze aber fest für Dresden und Umgebung ein.',
    privat: [
      'Hohe Fenster, Kastenfenster oder Sprossen? Lassen Sie Ihre Fenster in Dresden professionell putzen.',
    ],
    gewerbe: 'Für Unternehmen in Dresden reinigen wir Glasflächen in Büros, Praxen und Geschäften – etwa in der Neustadt, in Pieschen oder Löbtau – einmalig oder regelmäßig, mit Rechnung.',
    einsatz: '',
    ctaTitle: 'Fensterreinigung in Dresden anfragen & kostenloses Angebot erhalten',
    ctaSub: 'Fotos per WhatsApp senden – wir planen Ihren Termin in Dresden.',
    extraFaqs: [
      { q: 'Was kostet eine Fensterreinigung in Dresden?', a: 'Der Preis hängt von Glasfläche, Fensterart (z. B. Kastenfenster), Erreichbarkeit und Umfang ab. Nach Ihren Fotos nennen wir Ihnen einen festen Preis.' },
    ],
  },
  Leipzig: {
    hero: 'Fenster putzen lassen in Leipzig – mobiler Vor-Ort-Service für Privat & Gewerbe, von Gohlis und Schleußig bis Markkleeberg und Taucha.',
    services: [
      'Streifenfreie Glasreinigung für Wohnungen und Altbauten in Leipzig',
      'Rahmen, Rollläden und Außenjalousien in Leipzig gründlich von Staub und Ablagerungen befreit.',
      'Wintergartenreinigung in Leipzig und Umgebung – Glasflächen und Rahmen sorgfältig gereinigt',
      'Schaufenster und Glasfronten für Geschäfte und Büros in Leipzig – nach Absprache',
    ],
    warumSub: 'Ihr mobiler Partner für Fensterreinigung in Leipzig',
    warumText: 'Ob Altbau in der Südvorstadt, Wohnung in Reudnitz oder Laden in Plagwitz – wir kommen zu Ihnen. ReinWerk hat keine Niederlassung in Leipzig, bietet aber einen mobilen Vor-Ort-Service in Leipzig und Umgebung.',
    privat: [
      'Mehr Licht in Ihrer Leipziger Wohnung: Lassen Sie Ihre Fenster professionell putzen.',
    ],
    gewerbe: 'Für Unternehmen in Leipzig reinigen wir Glasflächen von Büros, Praxen und Läden – zum Beispiel in Plagwitz, Connewitz oder Gohlis – einmalig oder regelmäßig, mit Rechnung.',
    einsatz: '',
    ctaTitle: 'Fensterreinigung in Leipzig anfragen & kostenloses Angebot erhalten',
    ctaSub: 'Fotos per WhatsApp senden – wir planen Ihren Termin in Leipzig.',
    extraFaqs: [
      { q: 'Was kostet eine Fensterreinigung in Leipzig?', a: 'Der Preis richtet sich nach Glasfläche, Erreichbarkeit und gewünschtem Umfang. Nach Ihren Fotos per WhatsApp erhalten Sie einen festen Preis.' },
    ],
  },
};

export default function FensterRegionalPage({ page }: { page: RegionalPage }) {
  const { city } = page;
  const t = texts[city.name];
  const url = absoluteUrl(page.path);
  const faqs = [...t.extraFaqs, ...page.faqs];

  const services = [
    { title: 'Fenster- & Glasreinigung', price: 'ab 49 €', desc: t.services[0], img: glasreinigungImg, alt: `Glasreinigung ${city.name} – streifenfreie Fensterreinigung` },
    { title: 'Rahmen- Rollladen- & Jalousienreinigung', price: 'ab 29 €', desc: t.services[1], img: rahmenImg, alt: `Rahmen- und Rollladenreinigung ${city.name}` },
    { title: 'Wintergartenreinigung', price: 'ab 99 €', desc: t.services[2], img: wintergartenImg, alt: `Wintergartenreinigung ${city.name}` },
    { title: 'Glasreinigung für Gewerbe', price: 'Preis auf Anfrage', desc: t.services[3], img: schaufensterImg, alt: `Schaufensterreinigung ${city.name}` },
  ];

  const [form, setForm] = useState({ vorname: '', telefon: '', stadt: city.name, fensterart: '', nachricht: '' });
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
      const origin = `Anfrage über Seite: ${page.h1}`;
      const payload = {
        source: 'fensterreinigung',
        vorname: form.vorname,
        telefon: form.telefon,
        stadt: form.stadt,
        fensterart: form.fensterart,
        nachricht: `${form.nachricht}${form.nachricht.trim() ? '\n\n' : ''}${origin}`,
        page: page.path,
      };
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Request failed');
      trackGoogleAdsConversion('Ty4ACPHIodscEJeK_LhD');
      toast({ title: 'Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet.' });
      setForm({ vorname: '', telefon: '', stadt: city.name, fensterart: '', nachricht: '' });
    } catch {
      toast({ title: 'Fehler beim Senden. Bitte versuchen Sie es erneut.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const usps = [
    { title: '0 € Anfahrt', sub: 'im Einsatzgebiet' },
    { title: 'Festpreis möglich', sub: 'nach kurzer Einschätzung' },
    { title: 'Privat & Gewerbe', sub: 'flexible Termine' },
  ];

  return (
    <>
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content={page.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.description} />
        <meta property="og:url" content={url} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: page.service.serviceType,
          name: page.h1,
          url,
          description: page.description,
          provider: { '@id': 'https://reinwerk-service.de/#organization' },
          areaServed: [
            { '@type': 'City', name: city.name },
            ...city.surroundings.map((name) => ({ '@type': 'City', name })),
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://reinwerk-service.de/' },
            { '@type': 'ListItem', position: 2, name: page.service.parentLabel, item: absoluteUrl(page.service.parentPath) },
            { '@type': 'ListItem', position: 3, name: page.h1, item: url },
          ],
        })}</script>
      </Helmet>

      <Header />

      <main>
        {/* HERO */}
        <section className="relative min-h-[100svh] md:min-h-screen flex items-center pt-16 md:pt-20 overflow-hidden">
          <div className="absolute inset-0 md:hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroMobile})` }} aria-hidden="true" />
          <div
            className="absolute inset-0 hidden md:block bg-cover bg-no-repeat bg-top"
            style={{ backgroundImage: `url(${heroDesktop})` }}
            aria-label={`Fensterreinigung ${city.name} – ReinWerk reinigt Fenster streifenfrei`}
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
                  in {city.name}
                </span>
                <span className="hidden md:inline">
                  Professionelle <span className="text-primary">Fensterreinigung</span> in {city.name}
                </span>
              </h1>
              <p className="mt-2 md:mt-3 text-base md:text-xl text-white md:text-foreground font-medium md:font-bold text-left max-w-[320px] sm:max-w-[380px] md:max-w-none leading-snug">
                {t.hero}
              </p>

              <div className="mt-4 hidden md:grid grid-cols-1 sm:grid-cols-3 gap-3">
                {usps.map((badge) => (
                  <div key={badge.title} className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/80 backdrop-blur-md border border-border/60 shadow-soft">
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

              <div className="md:hidden mt-3 space-y-0">
                {usps.map((badge, idx) => (
                  <div key={badge.title} className={`flex items-center gap-3 py-2 ${idx < 2 ? 'border-b border-white/10' : ''}`}>
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

              <div className="hidden md:flex mt-5 md:mt-6 flex-row gap-3">
                <Button size="lg" className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl shadow-lg font-semibold" asChild>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label={`Fensterreinigung ${city.name} per WhatsApp anfragen`}>
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp schreiben
                  </a>
                </Button>
                <Button variant="heroOutline" size="lg" onClick={scrollToContact}>
                  Kostenloses Angebot
                </Button>
              </div>

              <div className="md:hidden mt-4 flex flex-col gap-2">
                <Button size="lg" onClick={scrollToContact} className="w-full min-h-[3.5rem] h-auto py-3 px-4 font-semibold justify-start gap-4 rounded-xl">
                  <FileText className="w-6 h-6 text-white shrink-0" />
                  <div className="flex flex-col items-start text-left">
                    <span className="text-white font-bold text-base leading-tight">Kostenloses Angebot</span>
                    <span className="text-white/80 text-xs leading-tight">Unverbindlich anfragen</span>
                  </div>
                </Button>
                <Button size="lg" className="w-full min-h-[3.5rem] h-auto py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white justify-start gap-4 rounded-xl shadow-lg font-semibold" asChild>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label={`Fensterreinigung ${city.name} per WhatsApp anfragen`}>
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
        <section className="pt-8 pb-6 md:pt-9 md:pb-10">
          <div className="container mx-auto max-sm:px-3">
            <h2 className="hidden sm:block text-2xl md:text-4xl font-bold text-foreground tracking-tight text-center mb-5 md:mb-8">
              Unsere Leistungen der Fensterreinigung in {city.name}
            </h2>
            <div className="flex flex-col gap-3 sm:hidden">
              {services.map((s) => (
                <div key={s.title} className="relative w-full h-[180px] rounded-[22px] overflow-hidden shadow-soft">
                  <img src={s.img} alt={s.alt} className="absolute inset-0 w-full h-full object-cover object-[80%_25%]" loading="lazy" />
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
                    <img src={s.img} alt={s.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
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
        <section className="py-6 md:py-10 bg-secondary/30">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight text-center mb-5 md:mb-8">
              So funktioniert Ihre Fensterreinigung in {city.name}
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
              <Button size="lg" onClick={scrollToContact}>Jetzt kostenlose Preisanfrage senden</Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-6 md:py-10">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight text-center mb-5 md:mb-8">
              Häufige Fragen zur Fensterreinigung in {city.name}
            </h2>
            <Accordion type="single" collapsible className="bg-background border border-border rounded-2xl px-4 md:px-6 shadow-soft">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border last:border-0">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* WARUM REINWERK */}
        <section className="py-5 max-md:py-3 md:py-10 bg-secondary/30">
          <div className="container mx-auto grid md:grid-cols-2 gap-5 items-center">
            <img src={warumImg} alt={`Fensterputzer ${city.name} – ReinWerk reinigt Fenster streifenfrei`} className="rounded-2xl shadow-soft w-full md:max-w-[84%] aspect-[4/3] object-cover" loading="lazy" />
            <div>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground max-md:text-[34px] max-md:leading-[1.1]">
                <span className="text-foreground">Warum Rein</span>
                <span className="text-primary">Werk</span>?
                <span className="block mt-2 text-[60%] font-medium leading-[1.4] text-muted-foreground max-md:mt-2 max-md:text-[20px] max-md:leading-[1.35] max-md:mb-5">
                  {t.warumSub}
                </span>
              </h2>
              <ul className="mt-4 space-y-3 max-md:mt-0 max-md:space-y-3.5">
                {[
                  { title: 'Streifenfreies Ergebnis', desc: 'Professionelle Reinigung mit hochwertigen Werkzeugen und bewährter Technik.' },
                  { title: 'Kostenlose Anfahrt', desc: `Keine zusätzlichen Anfahrtskosten in ${city.name} und Umgebung.` },
                  { title: 'Privat & Gewerbe', desc: 'Für Wohnhäuser, Büros, Praxen, Wintergärten und Schaufenster.' },
                  { title: 'Rahmen- & Falzreinigung', desc: 'Rahmen, Falze und Fensterbänke reinigen wir, wenn das im Angebot vereinbart ist.' },
                  { title: 'Flexible Termine', desc: 'Termine nach Absprache.' },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-2.5 max-md:gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5 max-md:w-[22px] max-md:h-[22px] max-md:mt-0">
                      <Check className="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                    <div>
                      <span className="font-bold text-foreground text-base max-md:text-[20px] max-md:font-semibold">{item.title}</span>
                      <p className="text-sm text-muted-foreground leading-[1.4] mt-0.5 max-md:text-base max-md:leading-[1.35]">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-4 max-w-[85%] max-md:hidden text-muted-foreground leading-relaxed">{t.warumText}</p>
            </div>
          </div>
        </section>

        {/* CONTACT FORM */}
        <section id="kontakt" className="py-6 md:py-10 bg-secondary/30">
          <div className="container mx-auto max-w-2xl">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight text-center mb-2">
              Kostenloses Angebot für Ihre Fensterreinigung in {city.name}
            </h2>
            <p className="text-center text-muted-foreground mb-5 md:mb-8">Antwort meist innerhalb weniger Minuten.</p>
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
                  Mit dem Absenden des Formulars erkläre ich mich damit einverstanden, dass meine angegebenen Daten zum Zweck der Kontaktaufnahme und Bearbeitung meiner Anfrage verarbeitet werden. Ich kann diese Einwilligung jederzeit mit Wirkung für die Zukunft per E-Mail an{' '}
                  <a href="mailto:info@reinwerk-service.de" className="underline hover:text-foreground transition-colors">info@reinwerk-service.de</a>{' '}
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
        <section className="py-6 md:py-10 bg-secondary/30">
          <div className="container mx-auto grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">Fensterreinigung für Privatkunden in {city.name}</h2>
              <div className="mt-3 space-y-2 text-base md:text-lg text-muted-foreground">
                {t.privat.map((p) => <p key={p}>{p}</p>)}
                <p>{page.intro}</p>
                <p>{page.sections[0]?.text}</p>
              </div>
            </div>
            <img src={privatImg} alt={`Fensterreinigung Privat ${city.name} – Haus mit sauberen Fenstern`} className="rounded-2xl shadow-soft w-full aspect-[4/3] object-cover" loading="lazy" />
          </div>
        </section>

        {/* BUSINESS */}
        <section className="py-6 md:py-10">
          <div className="container mx-auto grid md:grid-cols-2 gap-6 items-center">
            <img src={gewerbeSectionImg} alt={`Glasreinigung Büro ${city.name} – Fensterreinigung für Unternehmen`} className="rounded-2xl shadow-soft w-full aspect-[4/3] object-cover order-2 md:order-1" loading="lazy" />
            <div className="order-1 md:order-2">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">Fensterreinigung für Unternehmen in {city.name}</h2>
              <ul className="mt-3 space-y-2">
                {['Regelmäßige Reinigung', 'Flexible Termine', 'Rechnung für Unternehmen', 'Zuverlässige Durchführung'].map((x) => (
                  <li key={x} className="flex items-center gap-3 text-base text-foreground">
                    <Check className="w-5 h-5 text-primary shrink-0" /> {x}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-muted-foreground">{t.gewerbe}</p>
            </div>
          </div>
        </section>

        <EinsatzgebietSachsen service="fenster" currentPath={page.path} description={`${page.sections[1]?.text ?? ''} ${city.regionNote}`.trim()} />

        {/* FINAL CTA */}
        <section className="relative py-6 md:py-10 overflow-hidden">
          <div className="absolute inset-0">
            <img src={ctaImg} alt={`Fensterreinigung ${city.name} – Panoramafenster mit klarer Sicht`} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40" />
          </div>
          <div className="container mx-auto relative z-10 text-center max-w-2xl">
            <h2 className="text-2xl md:text-5xl font-bold text-foreground tracking-tight">{t.ctaTitle}</h2>
            <p className="mt-2 text-base md:text-lg text-foreground/80">{t.ctaSub}</p>
            <div className="mt-4 flex justify-center">
              <Button size="xl" className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl shadow-lg font-semibold" asChild>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label={`Fensterreinigung ${city.name} per WhatsApp anfragen`}>
                  <MessageCircle className="w-5 h-5" />
                  Foto senden — Preis in 15 Min
                </a>
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Antwort meist innerhalb weniger Minuten.</p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
