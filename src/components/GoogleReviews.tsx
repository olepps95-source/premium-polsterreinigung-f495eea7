import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const reviews = [
  {
    name: 'Robby Schlesinger',
    text: 'Super Arbeit! Netter Kontakt! Schnell und unkompliziert! Top Preis! Sehr zu empfehlen!',
  },
  {
    name: 'Uwe Fischer',
    text: 'Absprachen im Vorfeld liefen super und die Reinigung selbst ist ebenfalls top. Gern wieder!',
  },
  {
    name: 'Dagmar Espig',
    text: 'Am 27.07., pünktlich 14.00 Uhr, wie vereinbart, kam Herr Pshenychnyi um unser Sofa zu reinigen. Er hat hat zügig gearbeitet und nach 3 Stunden sieht unser Ecksofa und der dazugehörige Hocker wie neu aus. Wir sind sehr angenehm überrascht und können das Unternehmen weiterempfehlen. Wir werden die Möglichkeit weiterer Angebote nutzen. Dagmar Espig',
  },
];

interface GoogleReviewsProps {
  useMobileGoogleLogo?: boolean;
}

export function GoogleReviews({ useMobileGoogleLogo = false }: GoogleReviewsProps) {
  return (
    <section className="pt-4 md:pt-6 pb-4 md:pb-10 bg-background">
      <div className="mx-auto w-[90%] max-w-[1450px]">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-2 md:mb-4">
          <div className="flex items-center gap-2.5">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Google Logo"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-base font-semibold text-foreground">Google Bewertungen</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-base font-semibold text-foreground">5,0</span>
          </div>
        </div>

        <div className="flex md:grid md:grid-cols-3 md:items-start gap-2 md:gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0 snap-x snap-mandatory">
          {reviews.map((review) => (
            <Card
              key={review.name}
              className="min-w-[260px] md:min-w-0 snap-start p-4 md:p-5 bg-background border border-border shadow-soft"
            >
              <div className={`flex items-center mb-2 md:mb-3 ${useMobileGoogleLogo ? 'gap-2.5' : 'justify-between'}`}>
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-semibold text-foreground shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <span className={`text-sm font-semibold text-foreground ${useMobileGoogleLogo ? 'whitespace-nowrap overflow-hidden text-ellipsis' : ''}`}>
                    {review.name}
                  </span>
                </div>
                {useMobileGoogleLogo && (
                  <svg
                    className="w-5 h-5 shrink-0 md:hidden"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Google Logo"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                )}
                <span className={`text-xs text-muted-foreground ${useMobileGoogleLogo ? 'hidden md:block' : ''}`}>Google Bewertung</span>
              </div>
              <div className="flex mb-2 md:mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-md:line-clamp-6 max-md:leading-snug">{review.text}</p>
            </Card>
          ))}
        </div>

        <div className="mt-2 md:mt-[15px] text-center">
          <Button variant="outline" size="lg" className="font-semibold max-md:h-10 max-md:px-4 max-md:text-sm" asChild>
            <a href="https://maps.app.goo.gl/HeEVeeSDaEnruM2Z6" target="_blank" rel="noopener noreferrer">
              Alle Bewertungen auf Google ansehen
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
