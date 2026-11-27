// DRAFT – only mounted when GEBAEUDE_ENABLED (dev/preview). Form runs in test mode: no webhooks, no tracking.
import { useState, FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import {
  Home, Building2, CalendarDays, ShieldCheck, ArrowRight, Send, Sparkles, Check, Plus, Minus, Star, Calendar,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import heroImg from "@/assets/gebaeudereinigung/hero.webp.asset.json";
import logo from "@/assets/reinwerk-logo.png";
import fensterImg from "@/assets/fenster-hero.jpg";
import { gebaeudeServices, gebaeudeFormServices, gebaeudeFrequencies, gebaeudeFaqs, type GebaeudeService } from "@/lib/gebaeudereinigung";

const benefits = [
  { icon: Home, label: "Privathaushalte" },
  { icon: Building2, label: "Büros & Gewerbe" },
  { icon: CalendarDays, label: "Flexible Termine" },
  { icon: ShieldCheck, label: "Gründlich & schonend" },
];

const steps = [
  { icon: Send, title: "Anfrage senden", text: "Teilen Sie uns mit, welche Reinigung Sie benötigen." },
  { icon: CalendarDays, title: "Termin vereinbaren", text: "Wir besprechen den Leistungsumfang und vereinbaren einen passenden Termin." },
  { icon: Sparkles, title: "Sauberkeit genießen", text: "Wir kümmern uns um die vereinbarte Reinigung Ihrer Räumlichkeiten." },
];

const reasons = [
  "Erfahrenes und zuverlässiges Team",
  "Reinigung für Privat- und Gewerbekunden",
  "Eigene, hochwertige Reinigungsmittel",
  "Individuell abgestimmte Reinigungsleistungen",
  "Flexible Termine nach Verfügbarkeit",
  "Transparente und faire Preise",
  "Regional in Chemnitz und Umgebung",
];

const gallery = [
  { src: gebaeudeServices[0].image, alt: "Beispielbild: gereinigtes Wohnzimmer" },
  { src: gebaeudeServices[2].image, alt: "Beispielbild: saubere Küche" },
  { src: gebaeudeServices[4].image, alt: "Beispielbild: gereinigtes Badezimmer" },
  { src: gebaeudeServices[1].image, alt: "Beispielbild: saubere Büroräume" },
  { src: gebaeudeServices[3].image, alt: "Beispielbild: gereinigte Oberflächen" },
  { src: fensterImg, alt: "Beispielbild: Fensterreinigung" },
];

const selectCls = "flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export default function Gebaeudereinigung() {
  const [active, setActive] = useState<GebaeudeService | null>(null);
  const [customerType, setCustomerType] = useState<"privat" | "gewerbe">("privat");
  const [service, setService] = useState("");

  const goToForm = (serviceTitle?: string, type?: "privat" | "gewerbe") => {
    if (serviceTitle) setService(serviceTitle);
    if (type) setCustomerType(type);
    setActive(null);
    setTimeout(() => document.getElementById("anfrage")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TEST MODE: intentionally no webhook, Telegram, Google Ads or Pixel call.
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    console.info("[Gebäudereinigung Testmodus] Anfrage nicht versendet:", data);
    toast.success("Testmodus: Anfrage wurde geprüft, aber nicht versendet.");
    e.currentTarget.reset();
    setService("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Gebäudereinigung Chemnitz – Privat & Gewerbe | ReinWerk</title>
        <meta name="description" content="Gebäudereinigung in Chemnitz für Privat- und Gewerbekunden. Wohnungsreinigung, Büroreinigung, Grundreinigung und Unterhaltsreinigung. Jetzt Angebot anfragen." />
        <meta name="robots" content="noindex, nofollow" />
        {/* Later canonical: https://reinwerk-service.de/gebaeudereinigung (activate on release) */}
      </Helmet>
      <Header />

      <div className="bg-muted text-foreground text-center text-xs font-medium py-1.5 mt-16 md:mt-20">
        Entwurf – nur in der Vorschau sichtbar · Formular im Testmodus
      </div>

      <main>
        {/* Hero */}
        <section className="py-8 md:py-14">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs md:text-sm font-semibold tracking-widest text-primary mb-3">IHR REINIGUNGSSERVICE IN CHEMNITZ</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent-foreground leading-tight mb-4">
                Gebäudereinigung für Privat &amp; Gewerbe
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-lg">
                Professionelle Reinigung von Wohnungen, Häusern und Büros. Gründlich, zuverlässig und flexibel – in Chemnitz und Umgebung.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" onClick={() => goToForm()}>Jetzt Angebot anfragen <ArrowRight className="ml-1 h-4 w-4" /></Button>
                <Button size="lg" variant="outline" onClick={() => goToForm()}>Termin vereinbaren</Button>
              </div>
            </div>
            <div className="relative">
              <img src={heroImg.url} alt="Freundliche Reinigungskraft mit Schürze, gelben Handschuhen und Reinigungsmitteln in einer hellen Wohnung" className="w-full aspect-[4/3] object-cover rounded-2xl shadow-[var(--shadow-medium)]" fetchPriority="high" />
              <span className="absolute bottom-2 right-2 text-[10px] bg-background/80 text-muted-foreground px-2 py-0.5 rounded">Beispielbild</span>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-accent py-6">
          <ul className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {benefits.map(({ icon: Icon, label }) => (
              <li key={label} className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
                <Icon className="h-7 w-7 text-primary" strokeWidth={1.6} />
                <span className="text-sm font-semibold text-accent-foreground">{label}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Services */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-accent-foreground text-center mb-8">Unsere Reinigungsleistungen</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {gebaeudeServices.map((s) => (
                <button key={s.id} type="button" onClick={() => setActive(s)} className="group text-left bg-card rounded-xl overflow-hidden border border-border shadow-[var(--shadow-soft)] flex flex-col">
                  <img src={s.image} alt={s.alt} loading="lazy" className="w-full aspect-[4/3] object-cover" />
                  <div className="flex items-center gap-2 p-3 md:p-4 flex-1">
                    <Sparkles className="h-5 w-5 shrink-0 text-primary hidden sm:block" strokeWidth={1.6} />
                    <h3 className="text-sm md:text-base font-semibold text-accent-foreground flex-1 leading-snug">{s.title}</h3>
                    <ArrowRight className="h-4 w-4 shrink-0 text-primary" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
          <DialogContent className="max-w-md">
            {active && (
              <>
                <img src={active.image} alt={active.alt} className="w-full aspect-[16/9] object-cover rounded-lg" />
                <DialogHeader>
                  <DialogTitle>{active.title}</DialogTitle>
                  <DialogDescription>{active.description}</DialogDescription>
                </DialogHeader>
                <Button onClick={() => goToForm(active.title)}>Angebot für diese Leistung anfragen</Button>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Privat / Gewerbe */}
        <section className="pb-12 md:pb-16">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-4 md:gap-6">
            {[
              { type: "privat" as const, icon: Home, title: "Für Privatkunden", lead: "Sauberkeit und mehr Zeit für Ihr Zuhause.", items: ["Wohnungen", "Einfamilienhäuser", "Badezimmer und Küchen", "Einmalige und regelmäßige Reinigung"] },
              { type: "gewerbe" as const, icon: Building2, title: "Für Gewerbekunden", lead: "Gepflegte Räumlichkeiten für Mitarbeiter und Kunden.", items: ["Büros und Arbeitsplätze", "Geschäftsräume", "Gewerbliche Innenbereiche", "Individuell abgestimmte Reinigungsintervalle"] },
            ].map(({ type, icon: Icon, title, lead, items }) => (
              <div key={type} className="rounded-2xl border border-border p-6 shadow-[var(--shadow-soft)] flex flex-col">
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="h-7 w-7 text-primary" strokeWidth={1.6} />
                  <h3 className="text-xl font-bold text-accent-foreground">{title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{lead}</p>
                <ul className="space-y-2 mb-5 flex-1">
                  {items.map((i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground"><Check className="h-4 w-4 text-primary" />{i}</li>
                  ))}
                </ul>
                <Button variant="outline" onClick={() => goToForm(undefined, type)}>Unverbindlich anfragen</Button>
              </div>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="container mx-auto px-4 pb-12 md:pb-16">
          <div className="bg-accent rounded-2xl p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-accent-foreground text-center mb-8">So einfach funktioniert's</h2>
            <ol className="grid md:grid-cols-3 gap-6 md:gap-4">
              {steps.map(({ icon: Icon, title, text }, i) => (
                <li key={title} className="relative flex flex-col items-center text-center">
                  <div className="relative mb-3">
                    <div className="h-16 w-16 rounded-full bg-background flex items-center justify-center shadow-[var(--shadow-soft)]">
                      <Icon className="h-7 w-7 text-primary" strokeWidth={1.6} />
                    </div>
                    <span className="absolute -top-1 -left-1 h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  </div>
                  {i < steps.length - 1 && <ArrowRight className="hidden md:block absolute top-6 -right-4 h-6 w-6 text-primary/60" />}
                  <h3 className="font-semibold text-accent-foreground mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Why + reviews */}
        <section className="container mx-auto px-4 pb-12 md:pb-16 grid md:grid-cols-2 gap-6 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-accent-foreground mb-5">Warum ReinWerk?</h2>
            <ul className="space-y-3">
              {reasons.map((r) => (
                <li key={r} className="flex items-start gap-3 text-foreground">
                  <span className="mt-0.5 h-5 w-5 rounded-full bg-primary flex items-center justify-center shrink-0"><Check className="h-3 w-3 text-primary-foreground" /></span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
          {/* Placeholder: overall rating + review count to be confirmed from the live Google profile before release */}
          <div className="rounded-2xl border border-border p-6 shadow-[var(--shadow-soft)]">
            <p className="font-semibold text-foreground mb-2">Google Bewertungen</p>
            <div className="flex gap-0.5 mb-3" aria-hidden>
              {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />)}
            </div>
            <blockquote className="text-sm text-muted-foreground italic mb-2">„Absprachen im Vorfeld liefen super und die Reinigung selbst ist ebenfalls top. Gern wieder!"</blockquote>
            <p className="text-sm font-medium text-foreground mb-3">– Uwe Fischer</p>
            <p className="text-xs text-muted-foreground border-t border-border pt-3">Platzhalter: Gesamtbewertung und Anzahl werden vor der Freigabe aus dem Google-Profil übernommen.</p>
          </div>
        </section>

        {/* Gallery */}
        <section className="container mx-auto px-4 pb-12 md:pb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-accent-foreground text-center mb-2">Einblicke in unsere Arbeit</h2>
          <p className="text-center text-xs text-muted-foreground mb-6">Beispielbilder – werden durch eigene ReinWerk-Fotos ersetzt.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {gallery.map((g) => (
              <img key={g.alt} src={g.src} alt={g.alt} loading="lazy" className="w-full aspect-[4/3] object-cover rounded-xl" />
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 pb-12 md:pb-16 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-accent-foreground text-center mb-6">Häufig gestellte Fragen</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {gebaeudeFaqs.map(([q, a], i) => (
              <AccordionItem key={q} value={`f${i}`} className="border border-border rounded-xl px-4 group [&>h3>button>svg.lucide-chevron-down]:hidden">
                <AccordionTrigger className="text-left font-semibold text-accent-foreground hover:no-underline">
                  <span className="flex-1">{q}</span>
                  <Plus className="h-4 w-4 text-primary shrink-0 ml-2 group-data-[state=open]:hidden" />
                  <Minus className="h-4 w-4 text-primary shrink-0 ml-2 hidden group-data-[state=open]:block" />
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Final CTA */}
        <section className="container mx-auto px-4 pb-12 md:pb-16">
          <div className="relative overflow-hidden bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
            <img src={logo} alt="" aria-hidden className="absolute -right-10 -bottom-10 w-64 opacity-10 pointer-events-none" />
            <h2 className="relative text-2xl md:text-3xl font-bold mb-3">Bereit für saubere Räumlichkeiten?</h2>
            <p className="relative max-w-xl mx-auto mb-6 opacity-90">Ob Zuhause, Büro oder Gewerbe – kontaktieren Sie uns jetzt und erhalten Sie ein individuelles, unverbindliches Angebot.</p>
            <Button size="lg" variant="secondary" className="relative bg-background text-primary hover:bg-background/90" onClick={() => goToForm()}>
              <Calendar className="mr-2 h-4 w-4 text-primary" /> Jetzt Angebot anfragen
            </Button>
          </div>
        </section>

        {/* Form */}
        <section id="anfrage" className="bg-accent py-12 md:py-16 scroll-mt-20">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-accent-foreground text-center mb-2">Unverbindliche Anfrage</h2>
            <p className="text-center text-xs text-muted-foreground mb-6">Testmodus: Es werden keine Anfragen versendet.</p>
            <form onSubmit={onSubmit} className="bg-background rounded-2xl p-5 md:p-8 shadow-[var(--shadow-soft)] grid gap-4">
              <fieldset className="grid grid-cols-2 gap-2">
                <legend className="text-sm font-medium mb-2">Kundentyp</legend>
                {(["privat", "gewerbe"] as const).map((t) => (
                  <label key={t} className={`cursor-pointer rounded-md border px-3 py-2.5 text-sm text-center ${customerType === t ? "border-primary bg-accent font-semibold text-accent-foreground" : "border-input"}`}>
                    <input type="radio" name="kundentyp" value={t} checked={customerType === t} onChange={() => setCustomerType(t)} className="sr-only" />
                    {t === "privat" ? "Privatkunde" : "Gewerbekunde"}
                  </label>
                ))}
              </fieldset>
              <Input name="name" required placeholder="Vor- und Nachname *" />
              {customerType === "gewerbe" && <Input name="firma" placeholder="Firmenname" />}
              <div className="grid sm:grid-cols-2 gap-4">
                <Input name="telefon" type="tel" required placeholder="Telefonnummer *" />
                <Input name="email" type="email" placeholder="E-Mail-Adresse" />
              </div>
              <Input name="ort" placeholder="Postleitzahl und Ort" />
              <select name="leistung" value={service} onChange={(e) => setService(e.target.value)} className={selectCls} aria-label="Gewünschte Reinigungsleistung">
                <option value="">Gewünschte Reinigungsleistung</option>
                {gebaeudeFormServices.map((s) => <option key={s}>{s}</option>)}
              </select>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input name="flaeche" type="number" min={0} placeholder="Ungefähre Fläche in m²" />
                <select name="haeufigkeit" defaultValue="" className={selectCls} aria-label="Reinigungshäufigkeit">
                  <option value="">Reinigungshäufigkeit</option>
                  {gebaeudeFrequencies.map((f) => <option key={f}>{f}</option>)}
                </select>
              </div>
              <label className="text-sm text-muted-foreground grid gap-1">Gewünschter Termin
                <Input name="termin" type="date" />
              </label>
              <Textarea name="nachricht" rows={4} placeholder="Nachricht" />
              <label className="flex items-start gap-2 text-xs text-muted-foreground">
                <input type="checkbox" name="datenschutz" required className="mt-0.5" />
                <span>Ich stimme der Verarbeitung meiner Daten gemäß der <a href="/datenschutz" className="underline">Datenschutzerklärung</a> zu. *</span>
              </label>
              <Button type="submit" size="lg">Anfrage senden (Test)</Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
