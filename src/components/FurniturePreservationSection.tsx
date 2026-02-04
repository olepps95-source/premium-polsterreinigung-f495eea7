import sofaCleaningProcess from '@/assets/sofa-cleaning-process.png';

export function FurniturePreservationSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image Column */}
            <div className="flex justify-center md:justify-start">
              <img
                src={sofaCleaningProcess}
                alt="Professionelle Polsterreinigung - Tiefenreinigung, Fleckenentfernung, Desinfektion, Imprägnierung"
                className="w-full max-w-md md:max-w-full h-auto object-contain"
              />
            </div>

            {/* Text Column */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Polstermöbel erhalten statt entsorgen
              </h2>
              <h3 className="text-lg md:text-xl font-semibold text-primary mb-4">
                Professionelle Reinigung: Gut für Ihr Sofa, besser für Ihr Konto.
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Wer tiefenreinigt, investiert in die Zukunft seiner Möbel. Die verbesserte 
                Haltbarkeit spart Ihnen langfristig die Kosten für einen Neukauf und sorgt 
                für ein sauberes Zuhause.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
