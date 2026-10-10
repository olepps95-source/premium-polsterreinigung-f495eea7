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
import FensterRegionalPage from '@/components/regional/FensterRegionalPage';
import PolsterRegionalPage from '@/components/regional/PolsterRegionalPage';
import TeppichRegionalPage from '@/components/regional/TeppichRegionalPage';
import GewerbeRegionalPage from '@/components/regional/GewerbeRegionalPage';
import { RegionalPage, regionalPagesForService, absoluteUrl } from '@/lib/regionalPages';

const scrollToContact = () => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });

const H2 = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <h2 className={`text-2xl md:text-4xl font-bold tracking-tight text-center mb-5 md:mb-8 ${dark ? 'text-white' : 'text-foreground'}`}>
    {children}
  </h2>
);

export default function RegionalServicePage({ page }: { page: RegionalPage }) {
  const k = page.service.key;
  if (k === 'fenster') return <FensterRegionalPage key={page.path} page={page} />;
  if (k === 'polster') return <PolsterRegionalPage key={page.path} page={page} />;
  if (k === 'teppich') return <TeppichRegionalPage key={page.path} page={page} />;
  return <GewerbeRegionalPage key={page.path} page={page} />;
}

