import { Home, ShieldCheck, Sparkles, Euro, CalendarDays } from 'lucide-react';

const benefits = [
  {
    icon: Home,
    title: 'Vor-Ort-Reinigung',
    description: 'Wir kommen direkt zu Ihnen nach Hause. Die Reinigung erfolgt flexibel und mobil – ohne Abtransport Ihrer Möbel.',
  },
  {
    icon: ShieldCheck,
    title: 'Zufriedenheitsgarantie',
    description: 'Sollten Sie nicht vollständig zufrieden sein, reinigen wir kostenfrei nach oder erstatten den Preis zurück.',
  },
  {
    icon: Sparkles,
    title: 'Gründliche Tiefenreinigung',
    description: 'Auch bei starken Verschmutzungen wie Gerüchen, Urin oder anderen hartnäckigen Rückständen sorgen wir für hygienische Sauberkeit.',
  },
  {
    icon: Euro,
    title: 'Faire Preise ohne Anfahrtkosten',
    description: 'Keine versteckten Kosten – die Anfahrt innerhalb unseres Einsatzgebietes ist für Sie kostenlos.',
  },
  {
    icon: CalendarDays,
    title: 'Flexible Terminvergabe',
    description: 'Reinigung nach Ihrem Zeitplan – auch abends oder am Wochenende möglich.',
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="pt-20 pb-12 bg-background">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Warum Kunden unseren Polsterservice wählen
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-card p-6 rounded-2xl shadow-soft border border-border/50 flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-4">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
