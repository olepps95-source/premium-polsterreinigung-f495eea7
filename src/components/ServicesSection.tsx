import { useState, useEffect } from 'react';
import { Sofa, BedDouble, Droplets, Wind, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const services = [
  {
    icon: Sofa,
    title: 'Polsterreinigung',
    description: 'Tiefenreinigung für Sofas, Sessel und alle Polstermöbel. Entfernt hartnäckigen Schmutz, Flecken und unangenehme Gerüche.',
  },
  {
    icon: BedDouble,
    title: 'Matratzenreinigung',
    description: 'Hygienische Reinigung Ihrer Matratzen. Beseitigt Milben, Allergene und sorgt für einen gesunden Schlaf.',
  },
  {
    icon: Droplets,
    title: 'Fleckenentfernung',
    description: 'Spezialisierte Behandlung von hartnäckigen Flecken wie Kaffee, Rotwein, Tinte, Blut oder Tierurin.',
  },
  {
    icon: Wind,
    title: 'Geruchsbeseitigung',
    description: 'Professionelle Neutralisierung von unangenehmen Gerüchen – nicht nur überdecken, sondern dauerhaft entfernen.',
  },
];

export function ServicesSection() {
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
    <section id="leistungen" className="py-10 md:py-16">
      <div className="container px-3 md:px-4">
        <div className="max-w-3xl mx-auto text-center mb-4 md:mb-10">
          <p className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wider mb-2 md:mb-4">Unsere Leistungen</p>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-6">
            Was wir für Sie tun können
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground">
            Von der einfachen Auffrischung bis zur Tiefenreinigung – wir haben die passende Lösung für jedes Polsterproblem.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-8 max-w-4xl mx-auto">
        {services.map((service, index) => {
            const isExpanded = expandedIndex === index;
            const showExpanded = isMobile ? isExpanded : true; // Desktop always shows full content
            
            return (
              <div
                key={service.title}
                onClick={() => handleCardClick(index)}
                className={cn(
                  "group relative p-3 md:p-8 rounded-xl md:rounded-2xl border bg-card",
                  "transition-all duration-300 ease-out",
                  // Only interactive on mobile
                  isMobile && "cursor-pointer select-none active:scale-[0.98]",
                  // Expanded state styling (mobile only)
                  isMobile && isExpanded 
                    ? "col-span-2 border-primary shadow-medium bg-accent/20" 
                    : "border-border shadow-soft",
                  // Hover effects only on mobile
                  isMobile && !isExpanded && "hover:shadow-medium hover:border-border/80",
                  // One-time pulse animation (mobile only)
                  isMobile && !hasAnimated && index === 0 && "animate-[pulse_1s_ease-in-out_1]"
                )}
              >
                <div className="flex flex-col">
                  <div className="w-full flex items-start justify-between mb-2 md:mb-4">
                    <div className={cn(
                      "w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-2xl bg-accent flex items-center justify-center flex-shrink-0",
                      "transition-colors duration-300",
                      isMobile && isExpanded && "bg-primary/10"
                    )}>
                      <service.icon className="w-5 h-5 md:w-8 md:h-8 text-primary" />
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
                    "font-semibold text-foreground mb-1 md:mb-3 leading-tight",
                    isMobile && !isExpanded ? "text-sm" : "text-sm md:text-xl"
                  )}>
                    {service.title}
                  </h3>
                  
                  <p className={cn(
                    "text-muted-foreground transition-all duration-300",
                    showExpanded 
                      ? "text-sm md:text-base leading-relaxed opacity-100" 
                      : "text-xs leading-snug line-clamp-2"
                  )}>
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
