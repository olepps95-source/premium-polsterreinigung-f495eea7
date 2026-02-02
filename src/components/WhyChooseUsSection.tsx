import { useState, useEffect } from 'react';
import { Home, ShieldCheck, Sparkles, Euro, CalendarDays, HeartHandshake, ChevronDown } from 'lucide-react';
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
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Trigger pulse animation once after mount (only on mobile)
    if (isMobile) {
      const timer = setTimeout(() => setHasAnimated(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  const handleCardClick = (index: number) => {
    if (isMobile) {
      setExpandedIndex(expandedIndex === index ? null : index);
    }
  };

  return (
    <section className="py-8 md:py-12 bg-background">
      <div className="container px-3 md:px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-4 md:mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
            Warum Kunden unseren Polsterservice wählen
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
            {benefits.map((benefit, index) => {
              const isExpanded = expandedIndex === index;
              const showExpanded = isMobile ? isExpanded : true; // Desktop always shows full content
              
              return (
                <div
                  key={benefit.title}
                  onClick={() => handleCardClick(index)}
                  className={cn(
                    "bg-card p-3 md:p-6 rounded-xl md:rounded-2xl border",
                    "flex flex-col items-center text-center",
                    "transition-all duration-300 ease-out",
                    // Only interactive on mobile
                    isMobile && "cursor-pointer select-none active:scale-[0.98]",
                    // Expanded state styling (mobile only)
                    isMobile && isExpanded 
                      ? "col-span-2 border-primary shadow-medium bg-accent/30" 
                      : "border-border/50 shadow-soft",
                    // Hover effects only on mobile
                    isMobile && !isExpanded && "hover:shadow-medium hover:border-border",
                    // One-time pulse animation (mobile only)
                    isMobile && !hasAnimated && index === 0 && "animate-[pulse_1s_ease-in-out_1]"
                  )}
                >
                  <div className="w-full flex items-start justify-between mb-2 md:mb-4">
                    <div className={cn(
                      "w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-accent flex items-center justify-center",
                      "transition-colors duration-300",
                      isMobile && isExpanded && "bg-primary/10"
                    )}>
                      <benefit.icon className="w-5 h-5 md:w-7 md:h-7 text-primary" />
                    </div>
                    
                    {/* Chevron indicator - only visible on mobile */}
                    {isMobile && (
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center",
                        "transition-all duration-300",
                        isExpanded ? "bg-primary/10" : "bg-muted/50"
                      )}>
                        <ChevronDown className={cn(
                          "w-4 h-4 text-muted-foreground transition-transform duration-300",
                          isExpanded && "rotate-180 text-primary"
                        )} />
                      </div>
                    )}
                  </div>
                  
                  <h3 className={cn(
                    "font-semibold text-foreground mb-1 md:mb-2 leading-tight text-left w-full",
                    isMobile && !isExpanded ? "text-xs" : "text-sm md:text-base lg:text-lg"
                  )}>
                    {benefit.title}
                  </h3>
                  
                  <p className={cn(
                    "text-muted-foreground text-left w-full transition-all duration-300",
                    showExpanded 
                      ? "text-sm md:text-sm leading-relaxed opacity-100" 
                      : "text-[11px] leading-snug line-clamp-2"
                  )}>
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
