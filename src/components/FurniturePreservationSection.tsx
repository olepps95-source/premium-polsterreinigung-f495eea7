import { ArrowRight } from 'lucide-react';
import sofaCleaningProcess from '@/assets/sofa-cleaning-process.png';
import { Button } from '@/components/ui/button';

export function FurniturePreservationSection() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('kontakt');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 bg-background">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          {/* Title above everything */}
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center md:text-left">
            Polstermöbel erhalten statt entsorgen
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image Column */}
            <div className="flex justify-center md:justify-start">
              <img
                src={sofaCleaningProcess}
                alt="Professionelle Polsterreinigung Gerät – Tiefenreinigung, Fleckenentfernung und Imprägnierung"
                className="w-full max-w-md md:max-w-full h-auto object-contain"
                loading="lazy"
              />
            </div>

            {/* Text Column */}
            <div className="text-center md:text-left">
              <h3 className="text-lg md:text-xl font-semibold text-primary mb-4">
                Professionelle Reinigung: Gut für Ihr Sofa, besser für Ihr Konto.
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                Wer tiefenreinigt, investiert in die Zukunft seiner Möbel. Die verbesserte 
                Haltbarkeit spart Ihnen langfristig die Kosten für einen Neukauf und sorgt 
                für ein sauberes Zuhause.
              </p>
              <Button
                onClick={scrollToContact}
                variant="hero"
                size="lg"
                className="w-full md:w-auto"
              >
                Jetzt kostenlose Preisanfrage senden
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
