import beforeAfter1 from '@/assets/before-after-1.jpg';
import beforeAfter2 from '@/assets/before-after-2.jpg';
import beforeAfterSessel from '@/assets/before-after-sessel.png';
import beforeAfter4 from '@/assets/before-after-4.png';
import beforeAfter5 from '@/assets/before-after-5.png';
import beforeAfter6 from '@/assets/before-after-6.png';
import beforeAfter7 from '@/assets/before-after-7.png';
import beforeAfter8 from '@/assets/before-after-8.png';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

const gallery = [
  { image: beforeAfter1, caption: 'Sofa Tiefenreinigung' },
  { image: beforeAfter2, caption: 'Matratzenreinigung' },
  { image: beforeAfterSessel, caption: 'Sofa Auffrischung' },
  { image: beforeAfter4, caption: 'Cord-Sofa Reinigung' },
  { image: beforeAfter5, caption: 'Stoff-Sofa Reinigung' },
  { image: beforeAfter6, caption: 'Ecksofa Tiefenreinigung' },
  { image: beforeAfter7, caption: 'Cord-Ecksofa Reinigung' },
  { image: beforeAfter8, caption: 'Dunkles Sofa Reinigung' },
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
    </div>
  );
}

export function BeforeAfterSection() {
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

        {/* Mobile Carousel */}
        <div className="md:hidden -mx-4">
          <Carousel
            opts={{
              align: 'center',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2">
              {gallery.map((item) => (
                <CarouselItem key={item.caption} className="pl-2 basis-[85%]">
                  <GalleryCard item={item} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {gallery.map((item) => (
            <GalleryCard key={item.caption} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
