import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ServicesSection } from '@/components/ServicesSection';
import { PricingSection } from '@/components/PricingSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { FurniturePreservationSection } from '@/components/FurniturePreservationSection';
import { WhyChooseUsSection } from '@/components/WhyChooseUsSection';
import { BeforeAfterSection } from '@/components/BeforeAfterSection';
import { ReviewsSection } from '@/components/ReviewsSection';
import { ServiceAreaSection } from '@/components/ServiceAreaSection';
import { CTASection, CTAFormHandle } from '@/components/CTASection';
import { Footer } from '@/components/Footer';
import { StickyCtaButton } from '@/components/StickyCtaButton';
import { RegionalPage, absoluteUrl, regionalPagesForService } from '@/lib/regionalPages';
import { cityKeyFromPath, polsterTexts } from '@/lib/regionalDesignTexts';
import { regionalSchemas } from './regionalSchemas';

/** Same component tree as /polsterreinigung; only city texts are passed in. */
export default function PolsterRegionalPage({ page }: { page: RegionalPage }) {
  const ctaFormRef = useRef<CTAFormHandle>(null);
  const city = page.city;
  const t = polsterTexts[cityKeyFromPath(page.path)];
  const url = absoluteUrl(page.path);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content={page.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.description} />
        <meta property="og:url" content={url} />
        {regionalSchemas(page).map((sc, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(sc)}</script>
        ))}
      </Helmet>
      <Header />
      <main>
        <HeroSection
          plainTitle={page.h1}
          title={<>Professionelle <span className="text-primary inline">Polsterreinigung</span> in {city.name}</>}
          subtitle={t.hero}
        />
        <ReviewsSection />
        <WhyChooseUsSection />
        <BeforeAfterSection />
        <PricingSection />
        <HowItWorksSection />
        <FurniturePreservationSection />
        <ServicesSection heading={`Polsterreinigung in ${city.name}: Was wir für Sie tun können`} intro={`${t.services} ${page.intro}`} />
        <ServiceAreaSection
          heading={`Wir kommen zu Ihnen nach ${city.name}`}
          description={`${t.area} ${page.sections.map((s) => s.text).join(' ')}`}
          cities={['Chemnitz', 'Dresden', 'Leipzig', ...city.surroundings.slice(0, 3)]}
          cityLinks={Object.fromEntries(regionalPagesForService('polster').map((p) => [p.city.name, p.path]))}
          currentPath={page.path}
        />
        <AboutSection text={t.about} />
        <CTASection ref={ctaFormRef} contextLabel={page.h1} heading={`Jetzt Polsterreinigung in ${city.name} anfragen`} />
      </main>
      <Footer />
      <StickyCtaButton />
    </div>
  );
}
