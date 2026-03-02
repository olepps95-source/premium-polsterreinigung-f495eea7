import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle, Wind, Euro, Users } from 'lucide-react';
import heroImage from '@/assets/hero-living-room.jpg';
import heroMobileImage from '@/assets/hero-mobile.png';
import { trackContact } from '@/lib/meta-pixel';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center md:items-center pt-32 md:pt-20 pb-safe overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Professionell gereinigtes Sofa in modernem Wohnzimmer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
      </div>

      <div className="container relative z-10 py-8 pt-16 md:py-32">
        <div className="max-w-2xl">

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-up" style={{ animationDelay: '0.1s', color: 'hsl(220, 25%, 12%)' }}>
            <span className="block md:inline">Premium</span>{' '}
            <span className="block md:inline" style={{ color: 'hsl(var(--primary))' }}>Polsterreinigung</span>{' '}
            <span className="block md:inline">direkt bei Ihnen</span>{' '}
            <span className="block md:inline">vor Ort</span>
          </h1>

          <p className="text-lg md:text-xl mb-10 max-w-xl animate-fade-up leading-relaxed" style={{ animationDelay: '0.2s', color: '#000000' }}>
            Hygienisch sauber, schonend gereinigt und unbedenklich für Kinder & Haustiere.
            <br />
            Dank Express-Trocknung noch am selben Tag wieder nutzbar.
          </p>

          {/* Trust Indicators */}
          <div className="flex items-stretch gap-0 mb-8 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            {/* Gratis */}
            <div className="flex items-center gap-3 pr-5 md:pr-8">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Wind className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div className="flex flex-col text-left">
                <p className="text-lg md:text-2xl font-bold text-primary leading-none">Gratis</p>
                <p className="text-xs md:text-sm text-black leading-tight mt-0.5">Kostenlose<br />Express-Trocknung</p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px self-stretch bg-border mx-1 md:mx-2" />

            {/* 0 € */}
            <div className="flex items-center gap-3 px-5 md:px-8">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Euro className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div className="flex flex-col text-left">
                <p className="text-lg md:text-2xl font-bold text-primary leading-none">0 €</p>
                <p className="text-xs md:text-sm text-black leading-tight mt-0.5">Keine versteckten<br />Gebühren</p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px self-stretch bg-border mx-1 md:mx-2" />

            {/* 500+ */}
            <div className="flex items-center gap-3 pl-5 md:pl-8">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div className="flex flex-col text-left">
                <p className="text-lg md:text-2xl font-bold text-primary leading-none">500+</p>
                <p className="text-xs md:text-sm text-black leading-tight mt-0.5">Zufriedene<br />Kunden</p>
              </div>
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
