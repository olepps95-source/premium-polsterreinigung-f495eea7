import { Sofa, BedDouble, Droplets, Wind } from 'lucide-react';

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
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative p-3 md:p-8 rounded-xl md:rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-medium"
            >
              <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-2 md:gap-5">
                <div className="w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-2xl bg-accent group-hover:bg-primary/10 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                  <service.icon className="w-5 h-5 md:w-8 md:h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xs md:text-xl font-semibold text-foreground mb-1 md:mb-3 leading-tight">{service.title}</h3>
                  <p className="text-[11px] md:text-base text-muted-foreground leading-snug md:leading-relaxed">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
