import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { LocalBusinessSchema } from '@/components/LocalBusinessSchema';
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

const Polsterreinigung = () => {
  const ctaFormRef = useRef<CTAFormHandle>(null);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Premium Polsterreinigung Sachsen | Chemnitz, Dresden & Leipzig</title>
        <meta
          name="description"
          content="Professionelle Tiefenreinigung Ihrer Polstermöbel & Matratzen direkt vor Ort. 0€ Anfahrt, Express-Trocknung & faire Preise. Jetzt anfragen!"
        />
        <link rel="canonical" href="https://reinwerk-service.de/polsterreinigung" />
        <meta property="og:title" content="Premium Polsterreinigung Sachsen | Chemnitz, Dresden & Leipzig" />
        <meta
          property="og:description"
          content="Professionelle Tiefenreinigung Ihrer Polstermöbel & Matratzen direkt vor Ort. 0€ Anfahrt, Express-Trocknung & faire Preise."
        />
        <meta property="og:url" content="https://reinwerk-service.de/polsterreinigung" />
      </Helmet>
      <LocalBusinessSchema />
      <Header />
      <main>
        <HeroSection />
        <ReviewsSection />
        <WhyChooseUsSection />
        <BeforeAfterSection />
        <PricingSection />
        <HowItWorksSection />
        <FurniturePreservationSection />
        <ServicesSection />
        <ServiceAreaSection />
        <AboutSection />
        <CTASection ref={ctaFormRef} />
      </main>
      <Footer />
      <StickyCtaButton />
    </div>
  );
};

export default Polsterreinigung;
