import { Camera, CalendarCheck, Home } from 'lucide-react';

const steps = [
  {
    icon: Camera,
    step: '1',
    title: 'Anfrage & Foto',
    description: 'Senden Sie uns eine Anfrage oder schreiben Sie uns direkt per WhatsApp. Fügen Sie ein Foto Ihres Möbelstücks bei, damit wir den Aufwand sofort einschätzen können.',
  },
  {
    icon: CalendarCheck,
    step: '2',
    title: 'Termin & Festpreis',
    description: 'Wir vereinbaren gemeinsam einen passenden Termin. Da wir mit Festpreisen arbeiten, bleibt der Preis garantiert so, wie vereinbart – ohne versteckte Kosten.',
  },
  {
    icon: Home,
    step: '3',
    title: 'Reinigung vor Ort',
    description: 'Wir kommen zum vereinbarten Zeitpunkt zu Ihnen nach Hause. Nach der professionellen Tiefenreinigung sind Ihre Möbel dank Express-Trocknung schnell wieder einsatzbereit.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-xl md:text-3xl font-bold text-foreground whitespace-nowrap">
            So einfach funktioniert es
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item) => (
              <div
                key={item.step}
                className="flex flex-col items-center text-center"
              >
                {/* Icon with step number */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-10 h-10 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-md">
                    {item.step}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xs">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
