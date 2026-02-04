import { useState, useEffect } from 'react';
import { Star, ChevronDown, Users } from 'lucide-react';
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

export function ReviewsSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
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

  const toggleShowAll = () => {
    setShowAllReviews(!showAllReviews);
  };

  // On mobile, show only first review initially; on desktop show all
  const visibleReviews = isMobile && !showAllReviews ? reviews.slice(0, 1) : reviews;
  const hiddenReviews = isMobile && !showAllReviews ? reviews.slice(1) : [];

  return (
    <section id="bewertungen" className="py-10 md:py-16 bg-secondary/50">
      <div className="container px-3 md:px-4">
        <div className="max-w-3xl mx-auto text-center mb-4 md:mb-8">
          <p className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wider mb-2 md:mb-4">Kundenbewertungen</p>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-foreground">
            Das sagen unsere Kunden
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 max-w-4xl mx-auto">
          {visibleReviews.map((review, index) => {
            const isExpanded = expandedIndex === index;
            const showExpanded = isMobile ? isExpanded : true;
            
            return (
              <div
                key={review.name}
                onClick={() => handleCardClick(index)}
                className={cn(
                  "bg-card p-4 md:p-6 rounded-xl md:rounded-2xl border",
                  "transition-all duration-300 ease-out",
                  // Only interactive on mobile
                  isMobile && "cursor-pointer select-none active:scale-[0.98]",
                  // Expanded state styling (mobile only)
                  isMobile && isExpanded 
                    ? "border-primary shadow-medium bg-accent/20" 
                    : "border-border/50 shadow-soft",
                  // Hover effects only on mobile
                  isMobile && !isExpanded && "hover:shadow-medium hover:border-border",
                  // One-time pulse animation (mobile only)
                  isMobile && !hasAnimated && index === 0 && "animate-[pulse_1s_ease-in-out_1]"
                )}
              >
                {/* Header: Avatar, Name, Location, Stars */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
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
                  
                  {/* Chevron indicator - only visible on mobile */}
                  {isMobile && (
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
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
                
                {/* Star Rating */}
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                
                {/* Review Text */}
                <p className={cn(
                  "text-muted-foreground leading-relaxed transition-all duration-300",
                  showExpanded 
                    ? "text-sm md:text-base" 
                    : "text-sm line-clamp-2"
                )}>
                  "{review.text}"
                </p>
              </div>
            );
          })}

          {/* Hidden reviews with animation */}
          {isMobile && showAllReviews && hiddenReviews.length === 0 && reviews.slice(1).map((review, idx) => {
            const index = idx + 1;
            const isExpanded = expandedIndex === index;
            const showExpanded = isExpanded;
            
            return (
              <div
                key={review.name}
                onClick={() => handleCardClick(index)}
                className={cn(
                  "bg-card p-4 md:p-6 rounded-xl md:rounded-2xl border",
                  "transition-all duration-300 ease-out",
                  "animate-fade-in",
                  // Only interactive on mobile
                  "cursor-pointer select-none active:scale-[0.98]",
                  // Expanded state styling
                  isExpanded 
                    ? "border-primary shadow-medium bg-accent/20" 
                    : "border-border/50 shadow-soft",
                  // Hover effects
                  !isExpanded && "hover:shadow-medium hover:border-border"
                )}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Header: Avatar, Name, Location, Stars */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 flex-shrink-0">
                      <AvatarImage src={review.avatar} alt={review.name} className="object-cover" />
                      <AvatarFallback className="bg-accent text-primary text-sm font-semibold">
                        {review.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground text-sm leading-tight">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.location}</p>
                    </div>
                  </div>
                  
                  {/* Chevron indicator */}
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                    "transition-all duration-300",
                    isExpanded ? "bg-primary/10" : "bg-muted/50"
                  )}>
                    <ChevronDown className={cn(
                      "w-4 h-4 text-muted-foreground transition-transform duration-300",
                      isExpanded && "rotate-180 text-primary"
                    )} />
                  </div>
                </div>
                
                {/* Star Rating */}
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                
                {/* Review Text */}
                <p className={cn(
                  "text-muted-foreground leading-relaxed transition-all duration-300",
                  showExpanded 
                    ? "text-sm" 
                    : "text-sm line-clamp-2"
                )}>
                  "{review.text}"
                </p>
              </div>
            );
          })}
        </div>

        {/* Show More / Show Less Button - Mobile Only */}
        {isMobile && (
          <div className="flex justify-center mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleShowAll}
              className={cn(
                "gap-2 px-6 w-fit max-w-[280px] text-xs",
                "border-primary/30 hover:bg-primary hover:text-primary-foreground",
                "transition-all duration-300"
              )}
            >
              <Users className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="whitespace-nowrap">
                {showAllReviews ? 'Weniger anzeigen' : '500+ zufriedene Kunden – Mehr lesen'}
              </span>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}