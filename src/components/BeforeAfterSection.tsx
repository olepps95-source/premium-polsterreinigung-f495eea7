import beforeAfter1 from '@/assets/before-after-1.jpg';
import beforeAfter2 from '@/assets/before-after-2.jpg';
import beforeAfterSessel from '@/assets/before-after-sessel.png';

const gallery = [
  {
    image: beforeAfter1,
    caption: 'Sofa Tiefenreinigung',
    description: 'Geruchsneutralisierung, gründliche Entfernung von Tierhaaren, Beseitigung von Farbflecken sowie eine intensive Tiefenreinigung mit Frischeeffekt für Ihr Sofa.',
  },
  {
    image: beforeAfter2,
    caption: 'Matratzenreinigung',
    description: 'Entfernung von gelben Verfärbungen sowie eine umfassende hygienische Tiefenreinigung der Matratze für spürbare Frische und Sauberkeit.',
  },
  {
    image: beforeAfterSessel,
    caption: 'Sessel Auffrischung',
    description: 'Intensive Reinigung eines hellen Sessels – Entfernung von tiefem Schmutz und Staub für ein frisches, sauberes Erscheinungsbild.',
  },
];

export function BeforeAfterSection() {
  return (
    <section id="vorher-nachher" className="py-16">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">Vorher – Nachher</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Überzeugen Sie sich selbst
          </h2>
          <p className="text-lg text-muted-foreground">
            Sehen Sie den Unterschied, den professionelle Polsterreinigung macht. 
            Diese Ergebnisse sprechen für sich.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {gallery.map((item) => (
            <div
              key={item.caption}
              className="relative rounded-2xl overflow-hidden shadow-soft"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 bg-card">
                <h3 className="font-semibold text-foreground">{item.caption}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
