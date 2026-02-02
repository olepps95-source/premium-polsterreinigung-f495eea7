import { useState } from 'react';
import { Home, ShieldCheck, Sparkles, Euro, CalendarDays, HeartHandshake, X } from 'lucide-react';
import { cn } from '@/lib/utils';

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

  const handleCardClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
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
              
              return (
                <div
                  key={benefit.title}
                  onClick={() => handleCardClick(index)}
                  className={cn(
                    "bg-card p-3 md:p-6 rounded-xl md:rounded-2xl shadow-soft border cursor-pointer",
                    "flex flex-col items-center text-center",
                    "transition-all duration-300 ease-out",
                    isExpanded 
                      ? "col-span-2 lg:col-span-1 border-primary bg-accent/30 scale-[1.02]" 
                      : "border-border/50"
                  )}
                >
                  <div className="w-full flex items-center justify-between mb-2 md:mb-4">
                    <div className={cn(
                      "w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-accent flex items-center justify-center",
                      "transition-colors duration-300",
                      isExpanded && "bg-primary/10"
                    )}>
                      <benefit.icon className="w-5 h-5 md:w-7 md:h-7 text-primary" />
                    </div>
                    {isExpanded && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedIndex(null);
                        }}
                        className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-muted-foreground"
                        aria-label="Schließen"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <h3 className={cn(
                    "font-semibold text-foreground mb-1 md:mb-2 leading-tight text-left w-full",
                    isExpanded ? "text-sm md:text-lg" : "text-xs md:text-base lg:text-lg"
                  )}>
                    {benefit.title}
                  </h3>
                  
                  <p className={cn(
                    "text-muted-foreground text-left w-full transition-all duration-300",
                    isExpanded 
                      ? "text-sm md:text-base leading-relaxed opacity-100 max-h-40" 
                      : "text-[11px] md:text-sm leading-snug md:leading-relaxed line-clamp-2 md:line-clamp-none"
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