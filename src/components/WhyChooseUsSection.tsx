import { Home, ShieldCheck, Sparkles, Euro, CalendarDays, HeartHandshake } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const benefits = [
  {
    icon: Home,
    title: 'Vor-Ort-Reinigung',
    description: 'Wir kommen direkt zu Ihnen nach Hause – ohne Abtransport.',
  },
  {
    icon: ShieldCheck,
    title: 'Zufriedenheitsgarantie',
    description: 'Nicht zufrieden? Wir reinigen nach oder erstatten.',
  },
  {
    icon: Sparkles,
    title: 'Tiefenreinigung',
    description: 'Auch bei Gerüchen, Urin und hartnäckigen Flecken.',
  },
  {
    icon: HeartHandshake,
    title: 'Schonend & sicher',
    description: 'Unbedenklich für Kinder und Haustiere.',
  },
  {
    icon: Euro,
    title: 'Faire Preise',
    description: 'Keine versteckten Kosten, keine Anfahrtkosten.',
  },
  {
    icon: CalendarDays,
    title: 'Flexible Termine',
    description: 'Auch abends oder am Wochenende möglich.',
  },
];

export function WhyChooseUsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth * 0.75;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(newIndex, benefits.length - 1));
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-10 md:py-12 bg-background">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
            Warum Kunden unseren Polsterservice wählen
          </h2>
        </div>

        {/* Mobile: Horizontal Swipeable Slider */}
        <div className="md:hidden">
          <div 
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-card p-4 rounded-xl shadow-soft border border-border/50 flex-shrink-0 w-[75%] snap-center flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-3">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {benefit.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
          {/* Dot Indicators */}
          <div className="flex justify-center gap-1.5 mt-2">
            {benefits.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-primary' : 'bg-border'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:block max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-card p-6 rounded-2xl shadow-soft border border-border/50 flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-4">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-base lg:text-lg font-semibold text-foreground mb-2">
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
