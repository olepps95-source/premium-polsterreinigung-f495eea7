import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  ArrowRight,
  Send,
  Sofa,
  Brush,
  Square,
  Sparkles,
  Clock,
  MapPin,
  Tag,
  ShieldCheck,
  FileText,
  Camera,
  CheckCircle2,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const services = [
  {
    icon: Brush,
    title: 'Teppich- & Teppichbodenreinigung',
    text: 'Spezialreinigung für Büros und Arztpraxen in Dresden & Leipzig. Tiefenreinigung gegen Laufspuren, hartnäckige Flecken und Laufwege.',
  },
  {
    icon: Sofa,
    title: 'Polster- & Stuhlreinigung',
    text: 'Professionelle Stuhlreinigung für Wartezimmer, Konferenzräume und Bürostühle. Inklusive Fleckenentfernung und Geruchsbeseitigung.',
  },
  {
    icon: Square,
    title: 'Hartbodenreinigung',
    text: 'Werterhalt für Ihre Böden. Professionelle Laminatreinigung für Büros in Dresden sowie gründliche Fliesenreinigung für Büros in Chemnitz und Leipzig.',
  },
  {
    icon: Sparkles,
    title: 'Fenster- & Glasreinigung',
    text: 'Streifenfreie Reinigung von Bürofenstern, Schaufenstern und Glasfassaden für einen glänzenden ersten Eindruck.',
  },
];

const benefits = [
  {
    icon: Clock,
    title: 'Flexibilität ohne Ausfallzeiten',
    text: 'Reinigung abends oder am Wochenende (Samstag & Sonntag). Dank Express-Trocknung ist alles einsatzbereit vor dem nächsten Kundentermin.',
  },
  {
    icon: MapPin,
    title: 'Ganz Sachsen im Fokus',
    text: 'Egal ob Dresden, Leipzig, Chemnitz oder kleinere Städte – wir sind flexibel vor Ort einsatzbereit.',
  },
  {
    icon: Tag,
    title: 'Transparente Festpreise',
    text: 'Sie erhalten ein klares, unverbindliches Angebot. Keine versteckten Kosten.',
  },
  {
    icon: ShieldCheck,
    title: 'Betriebshaftpflichtversicherung',
    text: 'Maximale Sicherheit für Ihre Räumlichkeiten und Ihr Inventar.',
  },
];

const steps = [
  {
    icon: FileText,
    step: '1',
    title: 'Anfrage senden',
    text: 'Formular ausfüllen oder anrufen – wir melden uns umgehend zurück.',
  },
  {
    icon: Camera,
    step: '2',
    title: 'Kostenlose Einschätzung',
    text: 'Via Fotos oder bei einem unverbindlichen Vor-Ort-Termin.',
  },
  {
    icon: CheckCircle2,
    step: '3',
    title: 'Sauberes Ergebnis',
    text: 'Reinigung zum Wunschtermin – flexibel außerhalb Ihrer Öffnungszeiten.',
  },
];

const Firmenkunden = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    company: '',
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.name.trim() || (!form.phone.trim() && !form.email.trim())) {
      setError('Bitte geben Sie Ihren Namen sowie eine Telefonnummer oder E-Mail-Adresse an.');
      return;
    }
    try {
      const response = await fetch('https://hook.eu1.make.com/6qrngo5mu6wekvqwj8eacelu9oefi9sv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: 'B2B-Anfrage Firmenkunden' }),
      });
      if (response.ok) {
        toast({
          title: 'Anfrage erfolgreich gesendet!',
          description: 'Wir melden uns schnellstmöglich mit Ihrem unverbindlichen Angebot.',
        });
        setForm({ company: '', name: '', phone: '', email: '', message: '' });
      } else {
        toast({ title: 'Fehler beim Senden', description: 'Bitte versuchen Sie es erneut.', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Fehler beim Senden', description: 'Bitte versuchen Sie es erneut.', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-br from-secondary/40 via-background to-background">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                Für Firmenkunden in Sachsen
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Professionelle Textil- & Bodenreinigung für{' '}
                <span className="text-primary">Gewerbekunden</span> in Sachsen
              </h1>
              <p className="text-base md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
                Ihr zuverlässiger Partner für Arztpraxen, Büros und Kanzleien. Wir reinigen
                Teppichböden, Hartböden, Polstermöbel und Fenster flexibel außerhalb Ihrer
                Öffnungszeiten – in Dresden, Leipzig, Chemnitz und ganz Sachsen.
              </p>
              <Button variant="cta" size="xl" asChild>
                <a href="#b2b-kontakt">
                  Jetzt unverbindliches B2B-Angebot anfordern
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 bg-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Unsere Leistungen für Gewerbekunden
              </h2>
              <p className="text-muted-foreground">
                Maßgeschneiderte Reinigungslösungen für Praxen, Büros und Geschäftsräume.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="bg-card p-6 rounded-2xl border border-border/60 shadow-soft hover:shadow-medium transition-shadow"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <s.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Warum Unternehmen ReinWerk wählen
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="bg-card p-6 rounded-2xl border border-border/60 shadow-soft flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                    <b.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow */}
        <section className="py-16 bg-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                In 3 Schritten zum sauberen Ergebnis
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {steps.map((s) => (
                <div key={s.step} className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <s.icon className="w-10 h-10 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-md">
                      {s.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="b2b-kontakt" className="py-16 bg-foreground text-primary-foreground">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Unverbindliches B2B-Angebot anfordern
                </h2>
                <p className="text-primary-foreground/80">
                  Beschreiben Sie kurz Ihr Anliegen – wir melden uns mit einem transparenten
                  Festpreisangebot.
                </p>
              </div>
              <div className="bg-background rounded-2xl p-8 md:p-10 text-left">
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {error && (
                    <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                      <p className="text-sm text-destructive font-medium">{error}</p>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-foreground font-medium">
                      Unternehmen / Praxis
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="z. B. Zahnarztpraxis Dr. Müller"
                      className="h-12 bg-card border-border/50 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground font-medium">
                      Ansprechpartner <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Ihr Name"
                      className="h-12 bg-card border-border/50 focus:border-primary"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-foreground font-medium">
                        Telefon
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="01632373108"
                        className="h-12 bg-card border-border/50 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground font-medium">
                        E-Mail
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="kontakt@firma.de"
                        className="h-12 bg-card border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground font-medium">
                      Ihr Anliegen
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Art der Räume, Fläche (m²), gewünschte Leistung, Wunschtermin …"
                      className="min-h-[140px] bg-card border-border/50 focus:border-primary resize-none"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Mit dem Absenden des Formulars erkläre ich mich damit einverstanden, dass meine
                    angegebenen Daten zum Zweck der Kontaktaufnahme und Bearbeitung meiner Anfrage
                    verarbeitet werden.
                  </p>
                  <Button type="submit" variant="cta" size="xl" className="w-full">
                    <Send className="w-5 h-5" />
                    B2B-Angebot anfordern
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Firmenkunden;
