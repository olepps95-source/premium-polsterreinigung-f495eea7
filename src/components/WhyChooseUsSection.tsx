import { CalendarDays, ShieldCheck, Award } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const benefits = [
  {
    icon: CalendarDays,
    title: 'Kostenlos vor Ort & Flexibel',
    description: '0 € Anfahrt, kein Möbeltransport und Termine nach Ihrem Zeitplan (auch abends/wochenends).',
  },
  {
    icon: ShieldCheck,
    title: 'Tiefenrein & Sicher',
    description: 'Entfernt hartnäckige Flecken und Gerüche. Geprüfte Mittel – 100% sicher für Kinder und Haustiere.',
  },
  {
    icon: Award,
    title: '100% Zufriedenheitsgarantie',
    description: 'Sollten Sie nicht begeistert sein, reinigen wir kostenfrei nach oder erstatten den Preis zurück.',
  },
];

export function WhyChooseUsSection() {
  const isMobile = useIsMobile();

  return (
    <section className="py-6 md:py-8 bg-background">
      <div className="container px-3 md:px-4">
        <div className="max-w-3xl mx-auto text-center mb-4 md:mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
            Warum Kunden unseren Polsterservice wählen
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-card p-5 md:p-6 rounded-2xl border border-border/50 shadow-soft flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-accent flex items-center justify-center mb-3 md:mb-4">
                <benefit.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
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
      </div>
    </section>
  );
}