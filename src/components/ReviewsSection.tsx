import { useState } from 'react';
import { Star, Plus, Minus } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import avatarMaria from '@/assets/avatar-maria.jpg';
import avatarThomas from '@/assets/avatar-thomas.jpg';
import avatarAnna from '@/assets/avatar-anna.jpg';
import avatarMichael from '@/assets/avatar-michael.jpg';

const reviews = [
  {
    name: 'Maria Schmidt',
    location: 'Dresden',
    rating: 5,
    text: 'Unser Sofa sieht aus wie neu! Sehr professioneller Service, pünktlich und sauber gearbeitet. Kann ich nur weiterempfehlen!',
    avatar: avatarMaria,
  },
  {
    name: 'Thomas Müller',
    location: 'Leipzig',
    rating: 5,
    text: 'Nach der Reinigung unserer Matratze schlafe ich endlich wieder gut. Die Flecken sind komplett verschwunden. Top Arbeit!',
    avatar: avatarThomas,
  },
  {
    name: 'Anna Weber',
    location: 'Chemnitz',
    rating: 5,
    text: 'Schnell, freundlich und ein fantastisches Ergebnis. Der Kaffeefleck, den ich für unrettbar hielt, ist Geschichte.',
    avatar: avatarAnna,
  },
  {
    name: 'Michael Hoffmann',
    location: 'Zwickau',
    rating: 5,
    text: 'Super netter Kontakt über WhatsApp, faire Preise und perfektes Ergebnis. Was will man mehr?',
    avatar: avatarMichael,
  },
];

function ReviewCard({ review, className }: { review: typeof reviews[0]; className?: string }) {
  return (
    <div
      className={cn(
        "bg-card p-4 md:p-6 rounded-xl md:rounded-2xl border border-border/50 shadow-soft",
        className
      )}
    >
      {/* Header: Avatar, Name, Location */}
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
          <AvatarImage src={review.avatar} alt={review.name} className="object-cover" />
          <AvatarFallback className="bg-accent text-primary text-sm font-semibold">
            {review.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="font-semibold text-foreground text-sm md:text-base leading-tight">{review.name}</p>
          <p className="text-xs text-muted-foreground">{review.location}</p>
        </div>
      </div>
      
      {/* Star Rating */}
      <div className="flex gap-0.5 mb-2">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
        ))}
      </div>
      
      {/* Review Text */}
      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
        "{review.text}"
      </p>
    </div>
  );
}

export function ReviewsSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();

  return (
    <section id="bewertungen" className="py-10 md:py-16 bg-secondary/50">
      <div className="container px-3 md:px-4">
        <div className="max-w-3xl mx-auto text-center mb-4 md:mb-8">
          <p className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wider mb-2 md:mb-4">Kundenbewertungen</p>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-foreground">
            Das sagen unsere Kunden
          </h2>
        </div>

        {/* Mobile: Stacked Cards Effect */}
        {isMobile && (
          <div className="md:hidden">
            <div className="relative">
              {/* Stacked cards container */}
              <div 
                className={cn(
                  "relative transition-all duration-500 ease-out",
                  isExpanded ? "space-y-3" : ""
                )}
              >
                {reviews.map((review, index) => {
                  // Calculate stacking styles for collapsed state
                  const isFirst = index === 0;
                  const isSecond = index === 1;
                  const isThird = index === 2;
                  const isHidden = index > 2 && !isExpanded;
                  
                  // Collapsed state transforms
                  const collapsedStyles = !isExpanded ? {
                    transform: isFirst 
                      ? 'translateY(0) scale(1)' 
                      : isSecond 
                        ? 'translateY(-85%) scale(0.95)' 
                        : isThird 
                          ? 'translateY(-170%) scale(0.9)' 
                          : 'translateY(-255%) scale(0.85)',
                    zIndex: reviews.length - index,
                    opacity: isHidden ? 0 : 1,
                    pointerEvents: isFirst ? 'auto' : 'none',
                  } : {};

                  return (
                    <div
                      key={review.name}
                      className={cn(
                        "transition-all duration-500 ease-out",
                        !isExpanded && !isFirst && "absolute top-0 left-0 right-0",
                        !isExpanded && isHidden && "invisible"
                      )}
                      style={collapsedStyles as React.CSSProperties}
                    >
                      <ReviewCard 
                        review={review} 
                        className={cn(
                          !isExpanded && !isFirst && "shadow-medium"
                        )}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Spacer for stacked cards when collapsed */}
              {!isExpanded && (
                <div className="h-10" aria-hidden="true" />
              )}
            </div>

            {/* Expand/Collapse Button */}
            <div className="flex justify-center mt-4">
              <Button
                variant="ghost"
                size="default"
                onClick={() => setIsExpanded(!isExpanded)}
                className="border border-border/50 hover:border-primary/30 hover:bg-accent/50 text-muted-foreground hover:text-foreground transition-all duration-300"
              >
                {isExpanded ? (
                  <>
                    <Minus className="w-4 h-4 mr-2" />
                    Weniger anzeigen
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    + 500 weitere Kundenstimmen
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Desktop: Multi-column Grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-3 md:gap-6 max-w-4xl mx-auto">
          {reviews.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
