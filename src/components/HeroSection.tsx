import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle, Wind, Euro, Users } from 'lucide-react';
import heroImage from '@/assets/hero-living-room.jpg';
import heroMobileImage from '@/assets/hero-mobile-v2.jpg';
import { trackContact } from '@/lib/meta-pixel';

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
        {/* Mobile overlay - light gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/20 md:hidden" />
        {/* Desktop overlay */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
      </div>

      <div className="container relative z-10 py-8 pt-16 md:py-32">
        <div className="max-w-2xl">

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-up text-foreground" style={{ animationDelay: '0.1s' }}>
            <span className="block md:inline">Premium</span>{' '}
            <span className="text-primary block md:inline">Polsterreinigung</span>{' '}
            <span className="block md:inline">direkt bei Ihnen</span>{' '}
            <span className="block md:inline">vor Ort</span>
          </h1>

          <p className="text-lg md:text-xl text-foreground mb-10 max-w-xl animate-fade-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Hygienisch sauber, schonend gereinigt und unbedenklich für Kinder & Haustiere.
            <br />
            Dank Express-Trocknung noch am selben Tag wieder nutzbar.
          </p>

          {/* Trust Indicators with icons and dividers */}
          <div className="grid grid-cols-3 gap-0 mb-8 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            {/* Gratis Express-Trocknung */}
            <div className="flex flex-col items-center text-center px-2 md:px-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Wind className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <p className="text-xl md:text-3xl font-bold text-primary">Gratis</p>
              <p className="text-xs md:text-sm text-foreground leading-tight mt-1">Kostenlose Express-Trocknung</p>
            </div>

            {/* 0 € - with vertical dividers */}
            <div className="relative flex flex-col items-center text-center px-2 md:px-4">
              <div className="absolute left-0 top-2 bottom-2 w-px bg-border" />
              <div className="absolute right-0 top-2 bottom-2 w-px bg-border" />
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Euro className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <p className="text-xl md:text-3xl font-bold text-primary">0 €</p>
              <p className="text-xs md:text-sm text-foreground leading-tight mt-1">Keine versteckten Gebühren</p>
            </div>

            {/* 500+ Zufriedene Kunden */}
            <div className="flex flex-col items-center text-center px-2 md:px-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Users className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <p className="text-xl md:text-3xl font-bold text-primary">500+</p>
              <p className="text-xs md:text-sm text-foreground leading-tight mt-1">Zufriedene Kunden</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <Button variant="hero" size="lg" asChild>
              <a href="#kontakt">
                Jetzt unverbindlich anfragen
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button 
              size="lg" 
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl shadow-lg font-semibold"
              asChild
            >
              <a 
                href="https://api.whatsapp.com/message/5SVXIYHUNM7LN1?autoload=1&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContact()}
              >
                <MessageCircle className="w-5 h-5" />
                24/7 WhatsApp Service nutzen
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
