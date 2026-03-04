import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';
import heroTeamImage from '@/assets/hero-team.png';
import { trackContact } from '@/lib/meta-pixel';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center md:justify-start md:items-center pt-0 md:pt-20 pb-safe overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0 bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 via-background to-accent/30" />
      </div>

      {/* Team image - right side */}
      <div className="absolute right-0 bottom-0 z-[1] hidden md:block">
        <img
          src={heroTeamImage}
          alt="ReinWerk Team – Professionelle Polsterreinigung Sachsen"
          className="h-[85vh] w-auto object-contain object-right-bottom"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
      </div>

      <div className="container relative z-10 py-8 md:py-32">
        <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0">

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <span className="block md:inline">Premium</span>{' '}
            <span className="text-primary block md:inline">Polsterreinigung</span>{' '}
            <span className="block md:inline">direkt bei Ihnen</span>{' '}
            <span className="block md:inline">vor Ort</span>
          </h1>

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

          {/* Mobile team image */}
          <div className="mt-8 flex justify-center md:hidden animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <img
              src={heroTeamImage}
              alt="ReinWerk Team – Professionelle Polsterreinigung Sachsen"
              className="w-72 h-auto object-contain"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
