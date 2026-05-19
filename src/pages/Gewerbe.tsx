import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import {
  Hotel,
  GraduationCap,
  Stethoscope,
  Building2,
  CheckCircle2,
  Sparkles,
  Sofa,
  BedDouble,
  Brush,
  Armchair,
  Package,
  Phone,
  MessageCircle,
} from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/491636986317';
const PHONE = '+49 163 698 6317';
const TEL_HREF = 'tel:+491636986317';

const clients = [
  {
    Icon: Hotel,
    title: 'Hotels & Pensionen',
    text:
      'Zimmerteppiche, Matratzen, Lobby-Sofas & Sessel — diskret und zuverlässig zwischen den Saisons.',
    badge: 'Ab 299€ pro Termin',
  },
  {
    Icon: GraduationCap,
    title: 'Kitas & Schulen',
    text:
      'Spielteppiche, Schlafmatratzen & Sitzmöbel — ideal während der Ferien ohne Betriebsunterbrechung.',
    badge: 'Ab 199€ pro Termin',
  },
  {
    Icon: Stethoscope,
    title: 'Arztpraxen & Praxen',
    text:
      'Wartezimmer-Stühle, Teppiche & Hartböden — hygienisch sauber, mit Rechnung für Ihre Buchhaltung.',
    badge: 'Ab 149€ pro Termin',
  },
  {
    Icon: Building2,
    title: 'Büros & Unternehmen',
    text:
      'Bürostühle, Konferenzräume, Teppiche & Böden — Termine abends oder am Wochenende möglich.',
    badge: 'Ab 149€ pro Termin',
  },
];

const services = [
  {
    Icon: Brush,
    title: 'Teppichreinigung',
    items: ['Büro & Hotel bis 50m² — ab 149€', 'Büro & Hotel 50-100m² — ab 249€', 'Über 100m² — auf Anfrage'],
  },
  {
    Icon: Sofa,
    title: 'Polsterreinigung',
    items: ['Bürostühle (10 Stück) — ab 149€', 'Wartezimmer-Sofas — ab 99€', 'Lobby-Sessel — ab 79€'],
  },
  {
    Icon: BedDouble,
    title: 'Matratzenreinigung',
    items: ['Hotel (10 Stück) — ab 299€', 'Kita (alle Matratzen) — ab 199€', 'Einzeln — ab 39€'],
  },
  {
    Icon: Sparkles,
    title: 'Hartbodenreinigung',
    items: ['Laminat bis 50m² — ab 79€', 'Fliesen bis 50m² — ab 89€', 'Vinyl & PVC — ab 79€'],
  },
  {
    Icon: Armchair,
    title: 'Stuhlreinigung',
    items: ['Wartezimmer-Stühle — ab 9€/Stück', 'Konferenzstühle — ab 9€/Stück', 'Mindeststückzahl: 10 Stühle'],
  },
  {
    Icon: Package,
    title: 'Kombipaket',
    items: ['Polster + Teppich + Boden', '15% Rabatt auf Gesamtpreis', 'Regelmäßiger Vertrag: -20%'],
  },
];

const benefits = [
  ['Rechnung mit MwSt-Ausweis', 'Für Ihre Buchhaltung und Steuer'],
  ['Flexible Terminplanung', 'Abends, am Wochenende, in den Ferien'],
  ['Keine Betriebsunterbrechung', 'Wir arbeiten wenn Sie geschlossen haben'],
  ['Regelmäßige Serviceverträge', 'Monatlich oder quartalsweise'],
  ['Sachsen-weit verfügbar', 'Dresden, Leipzig, Chemnitz & Umgebung'],
  ['Schnelle Reaktionszeit', 'Angebot innerhalb von 15 Minuten'],
];

const serviceOptions = [
  'Teppichreinigung',
  'Polsterreinigung',
  'Matratzenreinigung',
  'Hartbodenreinigung',
  'Stuhlreinigung',
  'Kombipaket',
];

const Gewerbe = () => {
  const [form, setForm] = useState({
    company: '',
    contact: '',
    phone: '',
    email: '',
    type: '',
    message: '',
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const toggleService = (s: string) => {
    setSelectedServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company || !form.contact || !form.phone || !form.email || !form.type) {
      toast.error('Bitte alle Pflichtfelder ausfüllen.');
      return;
    }
    setSubmitting(true);
    try {
      const text = `Neue Gewerbeanfrage:%0A%0AFirma: ${form.company}%0AAnsprechpartner: ${form.contact}%0ATelefon: ${form.phone}%0AE-Mail: ${form.email}%0AUnternehmensart: ${form.type}%0ALeistungen: ${selectedServices.join(', ')}%0ANachricht: ${form.message}`;
      window.open(`${WHATSAPP_URL}?text=${text}`, '_blank');
      toast.success('Anfrage wird über WhatsApp gesendet.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* HERO */}
        <section className="pt-28 pb-16 md:pt-32 md:pb-20 bg-gradient-to-br from-secondary via-background to-accent">
          <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                Für Unternehmen & Gewerbe
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-5">
                Professionelle <span className="text-primary">Reinigung</span> für Ihr Unternehmen
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl">
                Teppiche, Polster, Matratzen & Hartböden — direkt vor Ort in Dresden, Leipzig & Chemnitz.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  ['✅ Rechnung', 'Mit MwSt-Ausweis'],
                  ['⚡ Flexibel', 'Auch am Wochenende'],
                  ['📍 Sachsen', 'Vor-Ort Service'],
                ].map(([t, s]) => (
                  <div key={t} className="bg-card border border-border rounded-xl px-4 py-3 shadow-soft">
                    <p className="text-sm font-semibold text-foreground">{t}</p>
                    <p className="text-xs text-muted-foreground">{s}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl bg-[#25D366] text-white font-semibold shadow-medium hover:bg-[#1fb955] transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp schreiben
                </a>
                <Button variant="hero" size="lg" asChild>
                  <a href={TEL_HREF}>
                    <Phone className="w-4 h-4" />
                    {PHONE}
                  </a>
                </Button>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-accent via-secondary to-background border border-border shadow-medium flex items-center justify-center">
                <Building2 className="w-32 h-32 text-primary/40" strokeWidth={1.2} />
              </div>
            </div>
          </div>
        </section>

        {/* TARGET CLIENTS */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Wir reinigen für</h2>
              <p className="text-muted-foreground">Maßgeschneiderte Lösungen für jeden Unternehmenstyp</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {clients.map(({ Icon, title, text, badge }) => (
                <div
                  key={title}
                  className="bg-card border border-border rounded-2xl p-6 shadow-soft hover:border-primary hover:shadow-medium transition-all"
                >
                  <Icon className="w-10 h-10 text-primary mb-4" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{text}</p>
                  <span className="inline-block bg-accent text-accent-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES (dark) */}
        <section className="py-12 md:py-16 bg-[hsl(var(--anthracite))] text-white">
          <div className="container mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Unsere Leistungen für Gewerbekunden</h2>
              <p className="text-primary font-medium">Alle Reinigungsarten aus einer Hand</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map(({ Icon, title, items }) => (
                <div
                  key={title}
                  className="bg-white/5 border border-primary/30 rounded-2xl p-6 hover:border-primary transition-colors"
                >
                  <Icon className="w-10 h-10 text-primary mb-4" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold mb-3">{title}</h3>
                  <ul className="space-y-1.5">
                    {items.map((i) => (
                      <li key={i} className="text-sm text-white/80">
                        • {i}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-10">
              Warum ReinWerk für Ihr Unternehmen?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {benefits.map(([title, desc]) => (
                <div key={title} className="flex gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FORM */}
        <section className="py-12 md:py-16 bg-[hsl(var(--blue-soft))]">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Jetzt Angebot anfordern</h2>
              <p className="text-muted-foreground">Kostenlos & unverbindlich — Antwort in 15 Minuten</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-soft space-y-5">
              <div>
                <Label htmlFor="company">Firmenname*</Label>
                <Input id="company" required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="mt-1.5" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact">Ansprechpartner*</Label>
                  <Input id="contact" required value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="phone">Telefonnummer*</Label>
                  <Input id="phone" required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1.5" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">E-Mail*</Label>
                <Input id="email" required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5" />
              </div>
              <div>
                <Label>Unternehmensart*</Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Bitte auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hotel / Pension">Hotel / Pension</SelectItem>
                    <SelectItem value="Kita / Schule">Kita / Schule</SelectItem>
                    <SelectItem value="Arztpraxis / Praxis">Arztpraxis / Praxis</SelectItem>
                    <SelectItem value="Büro / Unternehmen">Büro / Unternehmen</SelectItem>
                    <SelectItem value="Sonstiges">Sonstiges</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Gewünschte Leistung*</Label>
                <div className="mt-2 grid sm:grid-cols-2 gap-2">
                  {serviceOptions.map((s) => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer text-sm text-foreground">
                      <Checkbox checked={selectedServices.includes(s)} onCheckedChange={() => toggleService(s)} />
                      {s}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="message">Nachricht</Label>
                <Textarea
                  id="message"
                  placeholder="Beschreiben Sie kurz Ihre Anfrage (Fläche, Anzahl Stühle etc.)"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-1.5"
                  rows={4}
                />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={submitting}>
                Angebot anfordern →
              </Button>

              <div className="text-center text-sm text-muted-foreground space-y-1 pt-2">
                <p>Oder direkt kontaktieren:</p>
                <p>💬 WhatsApp: {PHONE}</p>
                <p>📞 Telefon: {PHONE}</p>
              </div>
            </form>
          </div>
        </section>

        {/* FOOTER CTA */}
        <section className="py-14 md:py-20 bg-[hsl(var(--anthracite))] text-white text-center">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Bereit für saubere Geschäftsräume?</h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl bg-[#25D366] text-white font-semibold shadow-medium hover:bg-[#1fb955] transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp schreiben
              </a>
              <a
                href={TEL_HREF}
                className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-xl border-2 border-white text-white font-semibold hover:bg-white hover:text-foreground transition-colors"
              >
                <Phone className="w-5 h-5" />
                {PHONE}
              </a>
            </div>
            <p className="text-sm text-white/60 mt-8">reinwerk-service.de | Sachsen, Deutschland</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Gewerbe;
