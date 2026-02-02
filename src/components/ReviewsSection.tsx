import { Star, Quote } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import avatarMaria from '@/assets/avatar-maria.jpg';
import avatarThomas from '@/assets/avatar-thomas.jpg';
import avatarAnna from '@/assets/avatar-anna.jpg';
import avatarMichael from '@/assets/avatar-michael.jpg';

const reviews = [
  {
    name: 'Maria Schmidt',
    location: 'Dresden',
    rating: 5,
    text: 'Unser Sofa sieht aus wie neu! Sehr professioneller Service, pünktlich und sauber gearbeitet. Kann ich nur weiterempfehlen!',
    avatar: avatarMaria,
  },
  {
    name: 'Thomas Müller',
    location: 'Leipzig',
    rating: 5,
    text: 'Nach der Reinigung unserer Matratze schlafe ich endlich wieder gut. Die Flecken sind komplett verschwunden. Top Arbeit!',
    avatar: avatarThomas,
  },
  {
    name: 'Anna Weber',
    location: 'Chemnitz',
    rating: 5,
    text: 'Schnell, freundlich und ein fantastisches Ergebnis. Der Kaffeefleck, den ich für unrettbar hielt, ist Geschichte.',
    avatar: avatarAnna,
  },
  {
    name: 'Michael Hoffmann',
    location: 'Zwickau',
    rating: 5,
    text: 'Super netter Kontakt über WhatsApp, faire Preise und perfektes Ergebnis. Was will man mehr?',
    avatar: avatarMichael,
  },
];

export function ReviewsSection() {
  return (
    <section id="bewertungen" className="py-16 bg-secondary/50">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">Kundenbewertungen</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Das sagen unsere Kunden
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-card p-8 rounded-2xl shadow-soft hover:shadow-medium transition-shadow duration-300 relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-accent opacity-50" />
              
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              
              <p className="text-foreground mb-6 leading-relaxed">"{review.text}"</p>
              
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={review.avatar} alt={review.name} className="object-cover" />
                  <AvatarFallback className="bg-accent text-primary text-lg font-semibold">
                    {review.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
