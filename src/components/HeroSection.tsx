import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Sparkles } from 'lucide-react';
import heroImage from '@/assets/hero-living-room.jpg';
import heroMobileImage from '@/assets/hero-mobile.png';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center md:items-center pt-32 md:pt-20 pb-safe overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {/* Mobile image */}
        <img
          src={heroMobileImage}
          alt="Professionelle Polsterreinigung mit Kärcher Gerät"
          className="w-full h-full object-cover object-top md:hidden"
        />
        {/* Desktop/Tablet image */}
        <img
          src={heroImage}
          alt="Professionell gereinigtes Sofa in modernem Wohnzimmer"
          className="hidden md:block w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
      </div>

      <div className="container relative z-10 py-8 pt-16 md:py-32">
        <div className="max-w-2xl">

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Premium{' '}
            <span className="text-primary">Polsterreinigung</span>{' '}
            direkt bei Ihnen vor Ort
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Hygienisch sauber, schonend gereinigt und unbedenklich für Kinder & Haustiere.
            <br />
            Dank Express-Trocknung noch am selben Tag wieder nutzbar.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Button variant="hero" size="lg" asChild>
              <a href="#kontakt">
                Jetzt unverbindlich anfragen
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="#preise">Preise ansehen</a>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 pt-8 border-t border-border/50 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div>
              <p className="text-3xl font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground">Zufriedene Kunden</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">4.8/5</p>
              <p className="text-sm text-muted-foreground">Google Bewertung</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary whitespace-nowrap text-xl md:text-3xl">Gratis</p>
              <p className="text-sm text-muted-foreground">Kostenlose Express-Trocknung</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
