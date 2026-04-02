import { useState } from 'react';
import beforeAfter1 from '@/assets/before-after-1.jpg';
import beforeAfter2 from '@/assets/before-after-2.jpg';
import beforeAfterSessel from '@/assets/before-after-sessel.png';
import beforeAfter4 from '@/assets/before-after-4.png';
import beforeAfter5 from '@/assets/before-after-5.png';
import beforeAfter6 from '@/assets/before-after-6.png';
import beforeAfter7 from '@/assets/before-after-7.png';
import beforeAfter8 from '@/assets/before-after-8.png';
import beforeAfter9 from '@/assets/before-after-9.png';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

const gallery = [
  { image: beforeAfter1, alt: 'Sofa Reinigung Vorher Nachher – Tiefenreinigung Ergebnis' },
  { image: beforeAfter2, alt: 'Matratzenreinigung Vorher Nachher – professionelle Fleckenentfernung' },
  { image: beforeAfterSessel, alt: 'Sessel Polsterreinigung Vorher Nachher – Auffrischung' },
  { image: beforeAfter4, alt: 'Cord-Sofa Reinigung Vorher Nachher – Tiefenreinigung Sachsen' },
  { image: beforeAfter5, alt: 'Stoff-Sofa Polsterreinigung Vorher Nachher Ergebnis' },
  { image: beforeAfter6, alt: 'Ecksofa Tiefenreinigung Vorher Nachher – ReinWerk Chemnitz' },
  { image: beforeAfter7, alt: 'Cord-Ecksofa professionelle Reinigung Vorher Nachher' },
  { image: beforeAfter8, alt: 'Dunkles Sofa Reinigung Vorher Nachher – Fleckenentfernung' },
  { image: beforeAfter9, alt: 'Teppichreinigung Vorher Nachher – professionelle Tiefenreinigung' },
];

const DESKTOP_INITIAL_COUNT = 3;

function GalleryCard({ item }: { item: typeof gallery[0] }) {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-soft">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export function BeforeAfterSection() {
  const [showAll, setShowAll] = useState(false);

  const visibleGallery = gallery.slice(0, DESKTOP_INITIAL_COUNT);
  const hiddenGallery = gallery.slice(DESKTOP_INITIAL_COUNT);

  return (
    <section id="vorher-nachher" className="py-16">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">Vorher – Nachher</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Überzeugen Sie sich selbst
          </h2>
          <p className="text-lg text-muted-foreground">
            Sehen Sie den Unterschied, den professionelle Polsterreinigung macht. 
            Diese Ergebnisse sprechen für sich.
          </p>
        </div>

        {/* Mobile Carousel – unchanged */}
        <div className="lg:hidden -mx-4">
          <Carousel
            opts={{
              align: 'center',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2">
              {gallery.map((item) => (
                <CarouselItem key={item.alt} className="pl-2 basis-[85%]">
                  <GalleryCard item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Desktop Grid with Show More */}
        <div className="hidden md:block">
          <div className="grid md:grid-cols-3 gap-8">
            {visibleGallery.map((item) => (
              <GalleryCard key={item.alt} item={item} />
            ))}
          </div>

          {showAll && (
            <div className="grid md:grid-cols-3 gap-8 mt-8 animate-fade-in">
              {hiddenGallery.map((item) => (
                <GalleryCard key={item.alt} item={item} />
              ))}
            </div>
          )}

          {!showAll && hiddenGallery.length > 0 && (
            <div className="flex justify-center mt-10">
              <Button
                onClick={() => setShowAll(true)}
                variant="default"
                size="lg"
                className="text-base"
              >
                Mehr Ergebnisse ansehen
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}