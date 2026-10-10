import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Check, MapPin, MessageCircle, ChevronRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { GoogleReviews } from '@/components/GoogleReviews';
import { PricingSection } from '@/components/PricingSection';
import { CTASection, CTAFormHandle } from '@/components/CTASection';
import { StickyCtaButton } from '@/components/StickyCtaButton';
import { RegionalPage, ServiceKey, regionalPagesForService, absoluteUrl } from '@/lib/regionalPages';
import polsterImg from '@/assets/polsterreinigung.jpeg';
import fensterImg from '@/assets/fenster-hero.jpg';
import teppichImg from '@/assets/teppichbodenreinigung-hero.jpg';
import gewerbeImg from '@/assets/teppichboden-buero.jpeg';

const WHATSAPP_URL = 'https://api.whatsapp.com/send/?phone=491636986317&text&type=phone_number&app_absent=0';

const images: Record<ServiceKey, string> = {
  polster: polsterImg,
  fenster: fensterImg,
  teppich: teppichImg,
  gewerbe: gewerbeImg,
};

export default function RegionalServicePage({ page }: { page: RegionalPage }) {
  const ctaRef = useRef<CTAFormHandle>(null);
  const { service, city } = page;
  const url = absoluteUrl(page.path);
  const siblings = regionalPagesForService(service.key).filter((p) => p.path !== page.path);

  return (
    <div className="min-h-screen bg-background">
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
          serviceType: service.serviceType,
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
            { '@type': 'ListItem', position: 2, name: service.parentLabel, item: absoluteUrl(service.parentPath) },
            { '@type': 'ListItem', position: 3, name: page.h1, item: url },
          ],
        })}</script>
      </Helmet>
      <Header />
      <main className="pt-20">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="container pt-4 text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1">
            <li><Link to="/" className="hover:text-primary">Startseite</Link></li>
            <ChevronRight className="w-3 h-3" />
            <li><Link to={service.parentPath} className="hover:text-primary">{service.name}</Link></li>
            <ChevronRight className="w-3 h-3" />
            <li aria-current="page" className="text-foreground">{city.name}</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="py-8 md:py-12">
          <div className="container grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">{page.h1}</h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">{page.intro}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#1fb855] text-white">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2" /> Foto senden – Preis erhalten
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="#kontakt">Kostenloses Angebot</a>
                </Button>
              </div>
            </div>
            <img
              src={images[service.key]}
              alt={`${service.name} ${city.name} – ReinWerk`}
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-soft"
            />
          </div>
        </section>

        {/* Lokale Abschnitte */}
        <section className="py-8 md:py-10">
          <div className="container max-w-4xl grid md:grid-cols-2 gap-6">
            {page.sections.map((sec) => (
              <div key={sec.title}>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">{sec.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{sec.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Leistungsumfang */}
        <section className="py-10 md:py-12 bg-secondary/50">
          <div className="container max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
              Das umfasst unsere {service.name} in {city.name}
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {service.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 bg-card rounded-xl p-4 border border-border/50">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Ablauf */}
        <section className="py-10 md:py-12">
          <div className="container max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">So läuft es ab</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {service.steps.map((s, i) => (
                <div key={s.title} className="bg-card rounded-2xl p-6 border border-border/50 text-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mx-auto mb-3">{i + 1}</div>
                  <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Preise */}
        <section className="py-10 md:py-12 bg-secondary/50">
          <div className="container max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Preise und Leistungsumfang</h2>
            <p className="text-muted-foreground leading-relaxed">{service.priceText}</p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Die Anfahrt ist grundsätzlich kostenlos. Zusätzliche Fahrtkosten berechnen wir nur, wenn sie vor
              Auftragserteilung ausdrücklich vereinbart wurden.
            </p>
          </div>
        </section>
        {service.key === 'polster' && <PricingSection />}

        <GoogleReviews />

        {/* Einsatzgebiet */}
        <section className="py-10 md:py-12">
          <div className="container max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Unser Einsatzgebiet</h2>
            <p className="text-muted-foreground leading-relaxed mb-5">{city.regionNote}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[city.name, ...city.surroundings].map((o) => (
                <span key={o} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-card border border-border/50 text-sm text-foreground">
                  <MapPin className="w-3.5 h-3.5 text-primary" /> {o}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-10 md:py-12 bg-secondary/50">
          <div className="container max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
              Häufige Fragen zur {service.name} in {city.name}
            </h2>
            <Accordion type="single" collapsible className="bg-card rounded-2xl border border-border/50 px-4">
              {page.faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`f${i}`}>
                  <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Interne Links */}
        <section className="py-8">
          <div className="container max-w-3xl text-center text-sm">
            <p className="text-muted-foreground mb-2">Weitere Informationen:</p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
              <Link to={service.parentPath} className="text-primary font-semibold hover:underline">{service.parentLabel}</Link>
              {siblings.map((p) => (
                <Link key={p.path} to={p.path} className="text-primary font-semibold hover:underline">{p.h1}</Link>
              ))}
            </div>
          </div>
        </section>

        <CTASection
          ref={ctaRef}
          contextLabel={page.h1}
          heading={`Jetzt ${service.name} in ${city.name} anfragen`}
          ignoreSelections={service.key !== 'polster'}
        />
      </main>
      <Footer />
      <StickyCtaButton />
    </div>
  );
}
