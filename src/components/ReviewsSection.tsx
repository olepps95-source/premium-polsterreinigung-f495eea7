import { useState, useEffect } from 'react';
import { Star, ChevronDown, Users } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import avatarMaria from '@/assets/avatar-maria.jpg';
import avatarThomas from '@/assets/avatar-thomas.jpg';
import reviewMariaResult from '@/assets/review-maria-result.png';
import reviewThomasResult from '@/assets/review-thomas-result.jpg';
import avatarAnna from '@/assets/avatar-anna.jpg';
import avatarMichael from '@/assets/avatar-michael.jpg';
import reviewAnnaResult from '@/assets/review-anna-result.jpg';
import reviewMichaelResult from '@/assets/review-michael-result.jpg';

// Unique reviews - each person appears only once
const reviews = [
  {
    id: 'maria-schmidt',
    name: 'Maria Schmidt',
    location: 'Dresden',
    rating: 5,
    text: 'Unser Sofa sieht aus wie neu! Sehr professioneller Service, pünktlich und sauber gearbeitet. Kann ich nur weiterempfehlen!',
    avatar: avatarMaria,
    resultImage: reviewMariaResult,
  },
  {
    id: 'thomas-mueller',
    name: 'Thomas Müller',
    location: 'Leipzig',
    rating: 5,
    text: 'Nach der Reinigung unserer Matratze schlafe ich endlich wieder gut. Die Flecken sind komplett verschwunden. Top Arbeit!',
    avatar: avatarThomas,
    resultImage: reviewThomasResult,
  },
  {
    id: 'anna-weber',
    name: 'Anna Weber',
    location: 'Chemnitz',
    rating: 5,
    text: 'Schnell, freundlich und ein fantastisches Ergebnis. Der unangenehme Geruch, den ich für kaum entfernbar hielt, ist komplett verschwunden.',
    avatar: avatarAnna,
    resultImage: reviewAnnaResult,
  },
  {
    id: 'michael-hoffmann',
    name: 'Michael Hoffmann',
    location: 'Zwickau',
    rating: 5,
    text: 'Sehr zufrieden! Freundlich, schnell und unkompliziert. Preis-Leistung top – gerne wieder!',
    avatar: avatarMichael,
    resultImage: reviewMichaelResult,
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

  return (
    <section id="bewertungen" className="py-6 md:py-10 bg-secondary/50">
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
            const showChevron = isMobile;
            
            return (
              <div
                key={review.id}
                onClick={() => handleCardClick(index)}
                className={cn(
                  "bg-card rounded-xl md:rounded-2xl border overflow-hidden",
                  "transition-all duration-300 ease-out",
                  isMobile && "cursor-pointer select-none active:scale-[0.98]",
                  isMobile && isExpanded 
                    ? "border-primary shadow-medium bg-accent/20" 
                    : "border-border/50 shadow-soft",
                  isMobile && !isExpanded && "hover:shadow-medium hover:border-border",
                  isMobile && !hasAnimated && index === 0 && "animate-[pulse_1s_ease-in-out_1]",
                  isMobile && showAllReviews && index > 0 && "animate-fade-in"
                )}
                style={isMobile && showAllReviews && index > 0 ? { animationDelay: `${(index - 1) * 100}ms` } : undefined}
              >
                {/* Result image above review */}
                {review.resultImage && (
                  <img
                    src={review.resultImage}
                    alt={`Reinigungsergebnis – ${review.name}`}
                    className="w-full object-contain"
                    loading="lazy"
                  />
                )}
                <div className="p-4 md:p-6">
                {/* Header: Avatar, Name, Location, Stars */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                      <AvatarImage src={review.avatar} alt={`Kundenbewertung Polsterreinigung – ${review.name} aus ${review.location}`} className="object-cover" />
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
                  {showChevron && (
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
                
                {/* Star Rating - Google style */}
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
                      <path
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                        fill={i < review.rating ? '#FBBC04' : '#E8EAED'}
                        stroke="none"
                      />
                    </svg>
                  ))}
                </div>
                
                {/* Review Text - Always show full text */}
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  "{review.text}"
                </p>
                </div>
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
                {showAllReviews ? 'Weniger anzeigen' : '⭐ 5,0 Google Bewertung – Mehr lesen'}
              </span>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}