import { useState } from 'react';
import { Leaf, Sparkles, Clock, Shield, ChevronDown } from 'lucide-react';
import teamMemberImage from '@/assets/team-member.png';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const benefits = [
  {
    icon: Sparkles,
    title: 'Tiefenreinigung',
    description: 'Professionelle Extraktion entfernt Schmutz, Allergene und Bakterien aus den tiefsten Fasern.',
  },
  {
    icon: Leaf,
    title: 'Umweltfreundlich',
    description: 'Wir verwenden nur biologisch abbaubare und umweltschonende Reinigungsmittel.',
  },
  {
    icon: Shield,
    title: 'Sicher für Kinder & Haustiere',
    description: 'Keine aggressiven Chemikalien – Ihre Familie und Haustiere sind bei uns in sicheren Händen.',
  },
  {
    icon: Clock,
    title: 'Schnell & Bequem',
    description: 'Reinigung direkt bei Ihnen zu Hause. Ihre Möbel sind in wenigen Stunden wieder einsatzbereit.',
  },
];

export function AboutSection() {
  // First card open by default on mobile
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const isMobile = useIsMobile();

  const handleCardClick = (index: number) => {
    if (isMobile) {
      setExpandedIndex(expandedIndex === index ? null : index);
    }
  };

  return (
    <section id="ueber-uns" className="py-16 bg-secondary/50">
      <div className="container px-3 md:px-4">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">Über uns</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ihr Partner für saubere Polster
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Mit viel Erfahrung und moderner Ausrüstung tragen wir dazu bei, dass Ihre Polstermöbel 
            wieder frisch und gepflegt wirken. Unsere gründliche Reinigung unterstützt den Erhalt Ihrer 
            Möbel und sorgt für ein angenehmes, hygienisches Wohngefühl.
          </p>
          
          {/* Team member image */}
          <div className="flex justify-center mt-8">
            <div className="relative">
              {/* Subtle glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent blur-2xl scale-110 -z-10" />
              <img 
                src={teamMemberImage} 
                alt="ReinWerk Teammitglied" 
                className="w-72 sm:w-48 md:w-56 lg:w-64 h-auto object-contain"
                style={{
                  filter: 'drop-shadow(0 8px 24px rgba(0, 0, 0, 0.12)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.08))'
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => {
            const isExpanded = expandedIndex === index;
            const showExpanded = isMobile ? isExpanded : true; // Desktop always shows full content
            
            return (
              <div
                key={benefit.title}
                onClick={() => handleCardClick(index)}
                className={cn(
                  "bg-card p-3 md:p-8 rounded-xl md:rounded-2xl border",
                  "transition-all duration-300 ease-out",
                  // Only interactive on mobile
                  isMobile && "cursor-pointer select-none active:scale-[0.98]",
                  // Expanded state styling (mobile only)
                  isMobile && isExpanded 
                    ? "col-span-2 border-primary shadow-medium bg-accent/20" 
                    : "border-border/50 shadow-soft",
                  // Hover effects only on mobile
                  isMobile && !isExpanded && "hover:shadow-medium hover:border-border"
                )}
              >
                <div className="flex flex-col">
                  <div className="w-full flex items-start justify-between mb-2 md:mb-6">
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
                    "font-semibold text-foreground mb-1 md:mb-3 leading-tight",
                    isMobile && !isExpanded ? "text-xs" : "text-sm md:text-lg"
                  )}>
                    {benefit.title}
                  </h3>
                  
                  <p className={cn(
                    "text-muted-foreground transition-all duration-300",
                    showExpanded 
                      ? "text-sm md:text-sm leading-relaxed opacity-100" 
                      : "text-[11px] leading-snug line-clamp-2"
                  )}>
                    {benefit.description}
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