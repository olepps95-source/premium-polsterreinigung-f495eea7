import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle, Wind, Euro, Users } from 'lucide-react';
import heroImage from '@/assets/hero-living-room.jpg';
import heroMobileImage from '@/assets/hero-mobile-new.jpg';
import { trackContact } from '@/lib/meta-pixel';
import { useIsMobile } from '@/hooks/use-mobile';

export function HeroSection() {
  const isMobile = useIsMobile();

  return (
    <section className="relative min-h-screen flex items-end md:items-center pt-32 md:pt-20 pb-safe overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {/* Mobile image */}
        <img
          src={heroMobileImage}
          alt="Professionelle Polsterreinigung mit Kärcher Gerät"
          className="w-full h-full object-cover object-center md:hidden"
        />
        {/* Desktop/Tablet image */}
        <img
          src={heroImage}
          alt="Professionell gereinigtes Sofa in modernem Wohnzimmer"
          className="hidden md:block w-full h-full object-cover"
        />
        {/* Mobile overlay: strong gradient from bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent md:hidden" />
        {/* Desktop overlay */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
      </div>

      <div className="container relative z-10 py-8 pb-12 md:py-32">
        <div className="max-w-2xl">

          <h1 className={`font-bold leading-tight mb-4 animate-fade-up ${
            isMobile 
              ? 'text-3xl text-white drop-shadow-lg' 
              : 'text-4xl md:text-5xl lg:text-6xl text-foreground'
          }`} style={{ animationDelay: '0.1s' }}>
            <span className="block md:inline">Premium</span>{' '}
            <span className={`block md:inline ${isMobile ? 'text-blue-accent' : 'text-primary'}`}>Polsterreinigung</span>{' '}
            <span className="block md:inline">direkt bei Ihnen</span>{' '}
            <span className="block md:inline">vor Ort</span>
          </h1>

          <p className={`mb-8 max-w-xl animate-fade-up ${
            isMobile 
              ? 'text-base text-white/90 leading-relaxed' 
              : 'text-lg md:text-xl text-black'
          }`} style={{ animationDelay: '0.2s' }}>
            Hygienisch sauber, schonend gereinigt und unbedenklich für Kinder & Haustiere.
            <br />
            Dank Express-Trocknung noch am selben Tag wieder nutzbar.
          </p>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-3 md:gap-8 mb-8 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                isMobile ? 'bg-white/15 backdrop-blur-sm' : 'bg-primary/10'
              }`}>
                <Wind className={`w-5 h-5 ${isMobile ? 'text-white' : 'text-primary'}`} />
              </div>
              <p className={`text-xl md:text-3xl font-bold ${isMobile ? 'text-white' : 'text-primary'}`}>Gratis</p>
              <p className={`text-xs md:text-sm leading-tight ${isMobile ? 'text-white/80' : 'text-black'}`}>Kostenlose</p>
              <p className={`text-xs md:text-sm leading-tight ${isMobile ? 'text-white/80' : 'text-black'}`}>Express-</p>
              <p className={`text-xs md:text-sm leading-tight ${isMobile ? 'text-white/80' : 'text-black'}`}>Trocknung</p>
            </div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                isMobile ? 'bg-white/15 backdrop-blur-sm' : 'bg-primary/10'
              }`}>
                <Euro className={`w-5 h-5 ${isMobile ? 'text-white' : 'text-primary'}`} />
              </div>
              <p className={`text-xl md:text-3xl font-bold ${isMobile ? 'text-white' : 'text-primary'}`}>0 €</p>
              <p className={`text-xs md:text-sm leading-tight ${isMobile ? 'text-white/80' : 'text-black'}`}>Keine</p>
              <p className={`text-xs md:text-sm leading-tight ${isMobile ? 'text-white/80' : 'text-black'}`}>versteckten</p>
              <p className={`text-xs md:text-sm leading-tight ${isMobile ? 'text-white/80' : 'text-black'}`}>Gebühren</p>
            </div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                isMobile ? 'bg-white/15 backdrop-blur-sm' : 'bg-primary/10'
              }`}>
                <Users className={`w-5 h-5 ${isMobile ? 'text-white' : 'text-primary'}`} />
              </div>
              <p className={`text-xl md:text-3xl font-bold ${isMobile ? 'text-white' : 'text-primary'}`}>500+</p>
              <p className={`text-xs md:text-sm leading-tight ${isMobile ? 'text-white/80' : 'text-black'}`}>Zufriedene</p>
              <p className={`text-xs md:text-sm leading-tight ${isMobile ? 'text-white/80' : 'text-black'}`}>Kunden</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <Button variant="hero" size="lg" asChild>
              <a href="#kontakt">
                Jetzt unverbindlich anfragen
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            {!isMobile && (
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
