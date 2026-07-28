import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import heroImage from "@/assets/hero-living-room.jpg";
import heroSofaMobile from "@/assets/hero-sofa-mobile.jpg";
import { trackContact } from "@/lib/meta-pixel";
import { trackGoogleAdsConversion } from "@/lib/google-ads";
import { useIsMobile } from "@/hooks/use-mobile";

export function HeroSection() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <section className="relative flex flex-col pt-16 pb-safe overflow-hidden bg-background">
        {/* Mobile: Image with overlaid buttons and trust indicators */}
        <div className="relative w-full">
          <img
            src={heroSofaMobile}
            alt="Professionelle Polsterreinigung Vorher Nachher Vergleich"
            className="w-full h-auto"
            loading="eager"
          />
          {/* Gradient overlay at bottom for readability */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent pt-32 pb-12 px-4">
            {/* Buttons */}
            <div
              className="flex flex-col items-center gap-3 w-full mb-4 animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              <Button
                size="lg"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl shadow-lg font-semibold w-full"
                asChild
              >
                <a
                  href="https://api.whatsapp.com/message/5SVXIYHUNM7LN1?autoload=1&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackContact();
                  }}
                >
                  <MessageCircle className="w-6 h-6" />
                  <span className="text-lg md:text-xl font-bold">WhatsApp schreiben</span>
                </a>
              </Button>
              <Button variant="hero" size="lg" className="w-full active:scale-[0.97] transition-transform" asChild>
                <a
                  href="tel:+491632373108"
                  onClick={() => {
                    if (typeof window !== "undefined" && (window as any).gtag) {
                      (window as any).gtag("event", "click_call", {
                        event_category: "contact",
                        event_label: "phone_click",
                      });
                    }
                  }}
                >
                  <Phone className="w-6 h-6" />
                  <span className="text-lg md:text-xl font-bold">+49 163 237 3108</span>
                </a>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-3 w-full animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <div className="flex flex-col text-center">
                <p className="text-2xl font-bold text-primary">Gratis</p>
                <p className="text-xs text-white leading-tight">Kostenlose</p>
                <p className="text-xs text-white leading-tight">Express-</p>
                <p className="text-xs text-white leading-tight">Trocknung</p>
              </div>
              <div className="flex flex-col text-center">
                <p className="text-2xl font-bold text-primary">0 €</p>
                <p className="text-xs text-white leading-tight">Keine</p>
                <p className="text-xs text-white leading-tight">versteckten</p>
                <p className="text-xs text-white leading-tight">Gebühren</p>
              </div>
              <div className="flex flex-col text-center">
                <p className="text-2xl font-bold text-primary">500+</p>
                <p className="text-xs text-white leading-tight">Zufriedene</p>
                <p className="text-xs text-white leading-tight">Kunden</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-start md:items-center pt-20 pb-safe overflow-hidden">
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

      <div className="container relative z-10 py-32">
        <div className="max-w-2xl text-left">
          <h1
            className="text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="inline">Premium</span> <span className="text-primary inline">Polsterreinigung</span>{" "}
            <span className="inline">direkt bei Ihnen</span> <span className="inline">vor Ort</span>
          </h1>

          <p className="text-xl text-black mb-10 max-w-xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Hygienisch sauber, schonend gereinigt und unbedenklich für Kinder & Haustiere.
            <br />
            Dank Express-Trocknung noch am selben Tag wieder nutzbar.
          </p>

          {/* Trust Indicators */}
          <div className="flex gap-8 mb-8 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex flex-col text-left">
              <p className="text-3xl font-bold text-primary">Gratis</p>
              <p className="text-sm text-black leading-tight">Kostenlose</p>
              <p className="text-sm text-black leading-tight">Express-</p>
              <p className="text-sm text-black leading-tight">Trocknung</p>
            </div>
            <div className="flex flex-col text-left">
              <p className="text-3xl font-bold text-primary">0 €</p>
              <p className="text-sm text-black leading-tight">Keine</p>
              <p className="text-sm text-black leading-tight">versteckten</p>
              <p className="text-sm text-black leading-tight">Gebühren</p>
            </div>
            <div className="flex flex-col text-left">
              <p className="text-3xl font-bold text-primary">500+</p>
              <p className="text-sm text-black leading-tight">Zufriedene</p>
              <p className="text-sm text-black leading-tight">Kunden</p>
            </div>
          </div>

          <div className="flex flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <Button
              size="lg"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl shadow-lg font-semibold"
              asChild
            >
              <a
                href="https://api.whatsapp.com/message/5SVXIYHUNM7LN1?autoload=1&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackContact();
                  trackGoogleAdsConversion();
                }}
              >
                <MessageCircle className="w-6 h-6" />
                <span className="text-lg md:text-xl font-bold">WhatsApp schreiben</span>
              </a>
            </Button>
            <Button variant="hero" size="lg" asChild>
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
