import { Sofa, BedDouble, Droplets, Wind } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

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
  const isMobile = useIsMobile();

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

        {/* Mobile: Horizontal swipeable carousel */}
        {isMobile ? (
          <div className="-mx-3">
            <Carousel
              opts={{
                align: 'start',
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 pl-3">
                {services.map((service) => (
                  <CarouselItem key={service.title} className="pl-2 basis-[82%]">
                    <div className="bg-card p-4 rounded-xl border border-border/50 shadow-soft h-full">
                      <div className="flex flex-col">
                        <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-3">
                          <service.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground text-base mb-2">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        ) : (
          /* Desktop: Grid layout */
          <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-card p-8 rounded-2xl border border-border/50 shadow-soft"
              >
                <div className="flex flex-col">
                  <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-4">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-xl mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
