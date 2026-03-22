import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';
import heroImage from '@/assets/hero-living-room.jpg';
import heroMobileImage from '@/assets/hero-mobile.png';
import heroBannerMobile from '@/assets/hero-banner-mobile.jpg';
import { trackContact } from '@/lib/meta-pixel';
import { useIsMobile } from '@/hooks/use-mobile';

export function HeroSection() {
  const isMobile = useIsMobile();

  return (
    <section className="relative min-h-screen flex items-center justify-center md:justify-start md:items-center pt-0 md:pt-20 pb-safe overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Professionelle Polsterreinigung – sauberes Sofa in modernem Wohnzimmer in Sachsen"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
      </div>

      <div className="container relative z-10 py-8 md:py-32">
        <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0">

          {/* Mobile: show banner image instead of headline */}
          {isMobile ? (
            <div className="mb-6 -mx-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <img
                src={heroBannerMobile}
                alt="Professionelle Polsterreinigung Vorher Nachher Vergleich"
                className="w-screen h-auto"
                loading="eager"
              />
            </div>
          ) : (
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <span className="block md:inline">Premium</span>{' '}
              <span className="text-primary block md:inline">Polsterreinigung</span>{' '}
              <span className="block md:inline">direkt bei Ihnen</span>{' '}
              <span className="block md:inline">vor Ort</span>
            </h1>
          )}

          <p className="text-lg md:text-xl text-black mb-10 max-w-xl mx-auto md:mx-0 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Hygienisch sauber, schonend gereinigt und unbedenklich für Kinder & Haustiere.
            <br />
            Dank Express-Trocknung noch am selben Tag wieder nutzbar.
          </p>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-3 md:flex md:gap-8 mb-8 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex flex-col text-center md:text-left">
              <p className="text-2xl md:text-3xl font-bold text-primary">Gratis</p>
              <p className="text-xs md:text-sm text-black leading-tight">Kostenlose</p>
              <p className="text-xs md:text-sm text-black leading-tight">Express-</p>
              <p className="text-xs md:text-sm text-black leading-tight">Trocknung</p>
            </div>
            <div className="flex flex-col text-center md:text-left">
              <p className="text-2xl md:text-3xl font-bold text-primary">0 €</p>
              <p className="text-xs md:text-sm text-black leading-tight">Keine</p>
              <p className="text-xs md:text-sm text-black leading-tight">versteckten</p>
              <p className="text-xs md:text-sm text-black leading-tight">Gebühren</p>
            </div>
            <div className="flex flex-col text-center md:text-left">
              <p className="text-2xl md:text-3xl font-bold text-primary">500+</p>
              <p className="text-xs md:text-sm text-black leading-tight">Zufriedene</p>
              <p className="text-xs md:text-sm text-black leading-tight">Kunden</p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
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
            <Button size="lg" className="rounded-xl shadow-lg font-semibold" asChild>
              <a href="#kontakt">
                Jetzt unverbindlich anfragen
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
