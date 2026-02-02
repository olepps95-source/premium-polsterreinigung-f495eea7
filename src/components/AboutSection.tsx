import { Check, Heart, Leaf, Sparkles, Clock, Shield } from 'lucide-react';
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

export function AboutSection() {
  return (
    <section id="ueber-uns" className="py-16 bg-secondary/50">
      <div className="container">
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
              {/* Subtle glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent blur-2xl scale-110 -z-10" />
              <img 
                src={teamMemberImage} 
                alt="ReinWerk Teammitglied" 
                className="w-72 sm:w-48 md:w-56 lg:w-64 h-auto object-contain"
                style={{
                  filter: 'drop-shadow(0 8px 24px rgba(0, 0, 0, 0.12)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.08))'
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-card p-8 rounded-2xl shadow-soft hover:shadow-medium transition-shadow duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
