import { Leaf, Sparkles, Clock, Shield } from 'lucide-react';
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
  const isMobile = useIsMobile();

  return (
    <section id="ueber-uns" className="py-12 md:py-16 bg-secondary/50">
      <div className="container px-3 md:px-4">
        {/* Mobile: Image on top, text below, centered */}
        {isMobile ? (
          <div className="flex flex-col items-center text-center mb-8">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Über uns</p>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Ihr Partner für saubere Polster
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              Mit viel Erfahrung und moderner Ausrüstung tragen wir dazu bei, dass Ihre Polstermöbel 
              wieder frisch und gepflegt wirken. Unsere gründliche Reinigung unterstützt den Erhalt Ihrer 
              Möbel und sorgt für ein angenehmes, hygienisches Wohngefühl.
            </p>
            
            {/* Team member image below text on mobile */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent blur-2xl scale-110 -z-10" />
              <img 
                src={teamMemberImage} 
                alt="ReinWerk Teammitglied" 
                className="w-64 h-auto object-contain"
                style={{
                  filter: 'drop-shadow(0 8px 24px rgba(0, 0, 0, 0.12)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.08))'
                }}
              />
            </div>
          </div>
        ) : (
          /* Desktop: Original layout */
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
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent blur-2xl scale-110 -z-10" />
                <img 
                  src={teamMemberImage} 
                  alt="ReinWerk Teammitglied" 
                  className="w-48 md:w-56 lg:w-64 h-auto object-contain"
                  style={{
                    filter: 'drop-shadow(0 8px 24px rgba(0, 0, 0, 0.12)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.08))'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Benefits grid */}
        <div className={cn(
          "max-w-5xl mx-auto",
          isMobile ? "flex flex-col gap-3" : "grid lg:grid-cols-4 gap-8"
        )}>
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className={cn(
                "bg-card border border-border/50 shadow-soft",
                isMobile 
                  ? "p-4 rounded-xl" 
                  : "p-8 rounded-2xl text-center"
              )}
            >
              {isMobile ? (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-base mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-lg mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}