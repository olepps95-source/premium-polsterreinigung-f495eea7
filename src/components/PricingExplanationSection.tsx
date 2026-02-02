import { Sofa, Sparkles, Droplets, MapPin, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { trackContact } from '@/lib/meta-pixel';
const factors = [
  {
    icon: Sofa,
    title: 'Art und Größe der Möbel',
    text: 'Ob Sessel, 3-Sitzer Sofa oder eine große Wohnlandschaft in L-Form – die Größe bestimmt den Zeitaufwand.',
  },
  {
    icon: Sparkles,
    title: 'Materialbeschaffenheit',
    text: 'Empfindliche Naturstoffe (wie Wolle) oder spezielle Polsterarten benötigen unterschiedliche Reinigungstechniken und Pflegemittel.',
  },
  {
    icon: Droplets,
    title: 'Verschmutzungsgrad & Fleckenart',
    text: 'Handelt es sich um eine allgemeine Auffrischung oder müssen hartnäckige Flecken (Kaffee, Wein, Tierurin) und Gerüche intensiv behandelt werden?',
  },
  {
    icon: MapPin,
    title: 'Anfahrtskosten',
    text: 'Die Anfahrt innerhalb unseres Einsatzgebietes ist für Sie kostenlos.',
  },
];

const WHATSAPP_URL = 'https://api.whatsapp.com/message/5SVXIYHUNM7LN1?autoload=1&app_absent=0';

export function PricingExplanationSection() {
  const handleWhatsAppClick = () => {
    trackContact();
    window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Transparente Preisgestaltung – Fair & Nachvollziehbar
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Jedes Möbelstück ist individuell, genau wie seine Verschmutzung. Um Ihnen den fairsten Preis ohne versteckte Kosten anzubieten, berechnen wir unsere Leistungen basierend auf folgenden Faktoren:
          </p>
        </div>

        {/* Factor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-14">
          {factors.map((factor, index) => (
            <Card 
              key={index} 
              className="bg-card border-border/50 hover:border-primary/30 transition-colors duration-300"
            >
              <CardContent className="p-5 md:p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <factor.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-base md:text-lg mb-2">
                    {factor.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {factor.text}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Guarantee Box */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-primary/5 border-primary/20 overflow-hidden">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/15 flex items-center justify-center mb-5">
                  <Shield className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                  Ihre Preisgarantie
                </h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                  <span className="font-semibold text-foreground">Unser Versprechen: Festpreis-Garantie.</span>
                  <br className="hidden sm:block" />{' '}
                  Senden Sie uns einfach ein Foto Ihrer Möbel per WhatsApp. Wir analysieren den Zustand und nennen Ihnen einen verbindlichen Festpreis. So wissen Sie genau, was es kostet, bevor wir kommen – ohne böse Überraschungen!
                </p>
                <Button 
                  onClick={handleWhatsAppClick}
                  className="bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-6 py-3 h-auto text-base"
                >
                  Jetzt Foto senden & Preis erhalten
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
