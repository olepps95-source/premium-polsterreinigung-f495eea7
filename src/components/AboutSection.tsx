import { Sparkles, Clock, Shield, Leaf, CheckCircle } from 'lucide-react';
import teamMemberImage from '@/assets/team-member.png';

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

const trustBadges = [
  { icon: '🌿', text: 'Bio-Reiniger' },
  { icon: '👶', text: 'Sicher für Kinder' },
  { icon: '⚡', text: 'Express-Trocknung' },
];

export function AboutSection() {
  return (
    <>
      <section id="ueber-uns" className="py-12 md:py-16 bg-secondary/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-10">
            <p className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4">Über uns</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 md:mb-6">
              Ihr Partner für saubere Polster
            </h2>
            
            {/* Team member image */}
            <div className="flex justify-center my-6 md:my-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent blur-2xl scale-110 -z-10" />
                <img 
                  src={teamMemberImage} 
                  alt="ReinWerk Teammitglied" 
                  className="w-48 sm:w-48 md:w-56 lg:w-64 h-auto object-contain"
                  style={{
                    filter: 'drop-shadow(0 8px 24px rgba(0, 0, 0, 0.12)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.08))'
                  }}
                />
              </div>
            </div>
            
            <p className="text-base md:text-lg text-muted-foreground">
              Mit viel Erfahrung und moderner Ausrüstung tragen wir dazu bei, dass Ihre Polstermöbel 
              wieder frisch und gepflegt wirken.
            </p>
          </div>

          {/* Mobile: 2 column grid, Desktop: 4 column */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-card p-4 md:p-8 rounded-xl md:rounded-2xl shadow-soft hover:shadow-medium transition-shadow duration-300"
              >
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-accent flex items-center justify-center mb-3 md:mb-6">
                  <benefit.icon className="w-5 h-5 md:w-7 md:h-7 text-primary" />
                </div>
                <h3 className="text-sm md:text-lg font-semibold text-foreground mb-1.5 md:mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges Row */}
      <section className="py-6 md:py-8 bg-background border-y border-border/50">
        <div className="container">
          <div className="flex justify-center items-center gap-4 md:gap-8 flex-wrap">
            {trustBadges.map((badge) => (
              <div 
                key={badge.text}
                className="flex items-center gap-2 text-foreground"
              >
                <span className="text-lg md:text-xl">{badge.icon}</span>
                <span className="text-xs md:text-sm font-medium">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
