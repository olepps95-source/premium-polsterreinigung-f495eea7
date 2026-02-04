import beforeAfter1 from '@/assets/before-after-1.jpg';
import beforeAfter2 from '@/assets/before-after-2.jpg';
import beforeAfterSessel from '@/assets/before-after-sessel.png';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const gallery = [
  {
    image: beforeAfter1,
    caption: 'Sofa Tiefenreinigung',
    description: 'Geruchsneutralisierung, gründliche Entfernung von Tierhaaren, Beseitigung von Farbflecken sowie eine intensive Tiefenreinigung mit Frischeeffekt für Ihr Sofa.',
  },
  {
    image: beforeAfter2,
    caption: 'Matratzenreinigung',
    description: 'Entfernung von gelben Verfärbungen sowie eine umfassende hygienische Tiefenreinigung der Matratze für spürbare Frische und Sauberkeit.',
  },
  {
    image: beforeAfterSessel,
    caption: 'Sofa Auffrischung',
    description: 'Entfernung von jahrelangem Schmutz, Staub sowie Fusseln und Knötchen. Der Farbton konnte nicht vollständig erhalten werden, dennoch wirkt das Sofa deutlich frischer und gepflegt.',
  },
];

function GalleryCard({ item }: { item: typeof gallery[0] }) {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-soft">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.caption}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 bg-card">
        <h3 className="font-semibold text-foreground">{item.caption}</h3>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </div>
    </div>
  );
}

function MobileCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {gallery.map((item, index) => (
            <div
              key={item.caption}
              className="flex-[0_0_100%] min-w-0 px-2"
            >
              <GalleryCard item={item} />
            </div>
          ))}
        </div>
      </div>
      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-4">
        {gallery.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === selectedIndex ? 'bg-primary' : 'bg-muted-foreground/30'
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function DesktopGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {gallery.map((item) => (
        <GalleryCard key={item.caption} item={item} />
      ))}
    </div>
  );
}

export function BeforeAfterSection() {
  const isMobile = useIsMobile();

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

        {isMobile ? <MobileCarousel /> : <DesktopGrid />}
      </div>
    </section>
  );
}
