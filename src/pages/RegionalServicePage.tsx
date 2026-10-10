import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Calendar, Camera, Check, ChevronRight, FileText, MapPin } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { GoogleReviews } from '@/components/GoogleReviews';
import { ReviewsSection } from '@/components/ReviewsSection';
import { WhyChooseUsSection } from '@/components/WhyChooseUsSection';
import { BeforeAfterSection } from '@/components/BeforeAfterSection';
import { PricingSection } from '@/components/PricingSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { CTASection, CTAFormHandle } from '@/components/CTASection';
import { StickyCtaButton } from '@/components/StickyCtaButton';
import {
  FensterRegionalHero, GewerbeRegionalHero, PolsterRegionalHero, TeppichRegionalHero,
} from '@/components/regional/RegionalHeroes';
import { RegionalPage, regionalPagesForService, absoluteUrl } from '@/lib/regionalPages';

const scrollToContact = () => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });

const H2 = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <h2 className={`text-2xl md:text-4xl font-bold tracking-tight text-center mb-5 md:mb-8 ${dark ? 'text-white' : 'text-foreground'}`}>
    {children}
  </h2>
);

export default function RegionalServicePage({ page }: { page: RegionalPage }) {
  const ctaRef = useRef<CTAFormHandle>(null);
  const { service, city } = page;
  const key = service.key;
  const url = absoluteUrl(page.path);
  const siblings = regionalPagesForService(key).filter((p) => p.path !== page.path);

  const subtitles: Record<typeof key, string> = {
    polster: `Professionelle Tiefenreinigung von Sofas, Sesseln, Stühlen und Matratzen – mobil in ${city.name} und Umgebung.`,
    fenster: `Für Privat & Gewerbe – in ${city.name} und Umgebung. Festpreis nach kurzer Foto-Anfrage.`,
    teppich: `Tiefenreinigung für verlegte Teppichböden in Wohnungen, Büros und Praxen – direkt vor Ort in ${city.name}.`,
    gewerbe: `Teppiche, Polster, Matratzen & Hartböden — professioneller Vor-Ort-Service für Unternehmen in ${city.name}.`,
  };
  const heroProps = { serviceName: service.name, cityName: city.name, subtitle: subtitles[key] };

  /* ---------- shared content blocks, styled like the original service pages ---------- */

  const intro = (
    <section className="py-8 md:py-12">
      <div className="container mx-auto max-w-5xl">
        <H2>{page.h1}</H2>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto mb-6 md:mb-10">{page.intro}</p>
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {page.sections.map((sec) => (
            <Card key={sec.title} className="p-5 md:p-6 shadow-soft rounded-2xl">
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">{sec.title}</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{sec.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );

  const includesLight = (
    <section className="py-6 md:py-10 bg-secondary/30">
      <div className="container mx-auto max-w-4xl">
        <H2>Das umfasst unsere {service.name} in {city.name}</H2>
        <ul className="grid sm:grid-cols-2 gap-3">
          {service.includes.map((item) => (
            <li key={item} className="flex items-start gap-3 px-4 py-3 rounded-xl bg-card border border-border/60 shadow-soft">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="text-foreground font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );

  const includesDark = (
    <section className="py-16 md:py-20 bg-[#0F1E36]">
      <div className="container max-w-5xl">
        <H2 dark>Das umfasst unsere {service.name} in {city.name}</H2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {service.includes.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/5 border border-white/10 p-5">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-white">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const stepIcons = [Camera, FileText, Calendar];
  const steps = (
    <section className="py-6 md:py-10">
      <div className="container mx-auto">
        <H2>So funktioniert Ihre {service.name} in {city.name}</H2>
        <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {service.steps.map((s, i) => {
            const Icon = stepIcons[i] ?? Check;
            return (
              <div key={s.title} className="text-center">
                <div className="relative inline-flex">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center">
                    <Icon className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 md:w-7 md:h-7 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center">{i + 1}</span>
                </div>
                <h3 className="mt-2 text-base font-bold text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{s.text}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex justify-center">
          <Button size="lg" onClick={scrollToContact}>Jetzt kostenlose Preisanfrage senden</Button>
        </div>
      </div>
    </section>
  );

  const prices = (
    <section className="py-6 md:py-10 bg-secondary/30">
      <div className="container mx-auto max-w-3xl">
        <Card className="p-6 md:p-8 text-center bg-gradient-to-b from-card to-blue-soft border border-border/50 shadow-soft rounded-2xl">
          <h3 className="text-sm md:text-base font-bold text-foreground uppercase tracking-wide mb-2">Preise und Leistungsumfang</h3>
          {key === 'teppich' && (
            <div className="flex items-baseline justify-center gap-1.5 mb-2">
              <span className="text-xl md:text-2xl font-semibold text-foreground">ab</span>
              <span className="text-4xl md:text-5xl font-bold text-primary">8 € / m²</span>
            </div>
          )}
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{service.priceText}</p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mt-3">
            Die Anfahrt ist grundsätzlich kostenlos. Zusätzliche Fahrtkosten berechnen wir nur, wenn sie vor
            Auftragserteilung ausdrücklich vereinbart wurden.
          </p>
          <Button size="lg" onClick={scrollToContact} className="mt-4 font-semibold">Kostenloses Angebot erhalten</Button>
        </Card>
      </div>
    </section>
  );

  const area = (
    <section className="py-6 md:py-10">
      <div className="container mx-auto max-w-3xl text-center">
        <H2>Unser Einsatzgebiet rund um {city.name}</H2>
        <p className="text-muted-foreground leading-relaxed mb-5">{city.regionNote}</p>
        <div className="flex flex-wrap justify-center gap-2">
          {[city.name, ...city.surroundings].map((o) => (
            <span key={o} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-card border border-border/60 shadow-soft text-sm text-foreground">
              <MapPin className="w-3.5 h-3.5 text-primary" /> {o}
            </span>
          ))}
        </div>
      </div>
    </section>
  );

  const faq = (
    <section className="py-6 md:py-10 bg-secondary/30">
      <div className="container mx-auto max-w-3xl">
        <H2>Häufige Fragen zur {service.name} in {city.name}</H2>
        <Accordion type="single" collapsible className="bg-background border border-border rounded-2xl px-4 md:px-6 shadow-soft">
          {page.faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`f${i}`} className="border-border last:border-0">
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );

  const links = (
    <section className="py-6">
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
  );

  const cta = (
    <CTASection
      ref={ctaRef}
      contextLabel={page.h1}
      heading={`Jetzt ${service.name} in ${city.name} anfragen`}
      ignoreSelections={key !== 'polster'}
    />
  );

  /* ---------- page layouts per service, following each original page ---------- */
  let body: React.ReactNode;
  if (key === 'polster') {
    body = (<>
      <PolsterRegionalHero {...heroProps} />
      <ReviewsSection />
      {intro}
      <WhyChooseUsSection />
      <BeforeAfterSection />
      {prices}
      <PricingSection />
      <HowItWorksSection />
      {area}
      {faq}
      {cta}
      {links}
    </>);
  } else if (key === 'fenster') {
    body = (<>
      <FensterRegionalHero {...heroProps} />
      <GoogleReviews useMobileGoogleLogo />
      {intro}
      {includesLight}
      {steps}
      {prices}
      {faq}
      {area}
      {cta}
      {links}
    </>);
  } else if (key === 'teppich') {
    body = (<>
      <TeppichRegionalHero {...heroProps} />
      <GoogleReviews />
      {prices}
      {intro}
      {includesLight}
      {steps}
      {faq}
      {area}
      {cta}
      {links}
    </>);
  } else {
    body = (<>
      <GewerbeRegionalHero {...heroProps} />
      <GoogleReviews />
      {intro}
      {includesDark}
      {steps}
      {prices}
      {faq}
      {area}
      {cta}
      {links}
    </>);
  }

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
      <main>
        {body}
        <nav aria-label="Breadcrumb" className="container pb-6 text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center justify-center gap-1">
            <li><Link to="/" className="hover:text-primary">Startseite</Link></li>
            <ChevronRight className="w-3 h-3" />
            <li><Link to={service.parentPath} className="hover:text-primary">{service.name}</Link></li>
            <ChevronRight className="w-3 h-3" />
            <li aria-current="page" className="text-foreground">{city.name}</li>
          </ol>
        </nav>
      </main>
      <Footer />
      <StickyCtaButton />
    </div>
  );
}
