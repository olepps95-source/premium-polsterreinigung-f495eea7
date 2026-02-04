import { Home, ShieldCheck, Sparkles, Euro, CalendarDays, HeartHandshake } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const benefits = [
  {
    icon: Euro,
    title: 'Faire Preise ohne Anfahrtkosten',
    description: 'Keine versteckten Kosten – die Anfahrt innerhalb unseres Einsatzgebietes ist für Sie kostenlos.',
  },
  {
    icon: HeartHandshake,
    title: 'Schonend & sicher',
    description: 'Wir verwenden geprüfte Reinigungsmittel, die materialschonend und unbedenklich für Kinder und Haustiere sind.',
  },
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
    icon: CalendarDays,
    title: 'Flexible Terminvergabe',
    description: 'Reinigung nach Ihrem Zeitplan – auch abends oder am Wochenende möglich.',
  },
];

export function WhyChooseUsSection() {
  const isMobile = useIsMobile();

  return (
    <section className="py-8 md:py-12 bg-background">
      <div className="container px-3 md:px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-4 md:mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
            Warum Kunden unseren Polsterservice wählen
          </h2>
        </div>

        {/* Benefits */}
        <div className="max-w-5xl mx-auto">
          {isMobile ? (
            /* Mobile: Single column vertical stack */
            <div className="flex flex-col gap-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="bg-card p-4 rounded-xl border border-border/50 shadow-soft"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-base mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground text-base leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Desktop: 3-column grid */
            <div className="grid lg:grid-cols-3 gap-6">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="bg-card p-6 rounded-2xl border border-border/50 shadow-soft flex flex-col items-center text-center"
                >
                  <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-4">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-base lg:text-lg mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
