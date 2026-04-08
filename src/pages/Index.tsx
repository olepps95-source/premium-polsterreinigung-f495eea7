import { useRef } from 'react';
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

const Index = () => {
  const ctaFormRef = useRef<CTAFormHandle>(null);

  return (
    <div className="min-h-screen bg-background">
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

export default Index;
