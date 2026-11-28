// DRAFT – only mounted when GEBAEUDE_ENABLED (dev/preview). Form runs in test mode: no webhooks, no tracking.
import { useState, FormEvent, type CSSProperties } from "react";
import { Helmet } from "react-helmet-async";
import {
  Home, Building2, CalendarDays, ShieldCheck, ArrowRight, Sparkles, Check, Plus, Minus, Calendar, Brush, Droplets, Package, FileText,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import heroImg from "@/assets/gebaeudereinigung/hero_reinwerk.jpg.asset.json";
import logo from "@/assets/reinwerk-logo.png";
import fensterImg from "@/assets/fenster-hero.jpg";
import { gebaeudeServices, gebaeudeFormServices, gebaeudeFrequencies, gebaeudeFaqs, type GebaeudeService } from "@/lib/gebaeudereinigung";

const benefits = [
  { icon: Home, label: "Privathaushalte" },
  { icon: Building2, label: "Büros & Gewerbe" },
  { icon: CalendarDays, label: "Flexible Termine" },
  { icon: ShieldCheck, label: "Gründlich & schonend" },
];

const serviceIcons: Record<string, typeof Home> = {
  wohnung: Home, buero: Building2, grund: Sparkles, unterhalt: Brush, badkueche: Droplets, umzug: Package,
};

const steps = [
  { icon: FileText, title: "Anfrage senden", text: "Teilen Sie uns mit, welche Reinigung Sie benötigen." },
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

// Gallery: each entry is independent – replace `src` (and `alt`) of a single entry with an authentic ReinWerk photo import.
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
    <div className="min-h-screen bg-background" style={{ ["--gb-navy" as string]: "214 69% 14%", ["--gb-text" as string]: "215 19% 30%" } as CSSProperties}>
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
        <section className="relative flex flex-col overflow-hidden bg-accent md:block">
          <div className="absolute inset-y-0 right-[52%] hidden w-[48%] bg-accent md:block" aria-hidden />
          {/* Mobile: full-width photo band below the text so the whole scene is visible. Desktop: photo on the right, text on the left. */}
          <img src={heroImg.url} alt="ReinWerk-Reinigungskraft in Uniform saugt einen Teppich in einem hellen Wohnzimmer" className="order-2 block h-60 w-full object-cover object-center saturate-[1.08] contrast-[1.04] md:absolute md:inset-y-0 md:right-0 md:h-full md:w-[52%] md:object-[58%_center] xl:object-[46%_center]" fetchPriority="high" />
          <div className="absolute inset-y-0 left-[48%] hidden w-40 bg-gradient-to-r from-accent to-transparent md:block" aria-hidden />
          <div className="relative order-1 container mx-auto px-4 py-8 md:py-20">
            <div className="max-w-[54%] md:max-w-[44%]">
              <p className="text-[11px] md:text-sm font-bold tracking-wide text-primary mb-2 md:mb-3">IHR REINIGUNGSSERVICE IN CHEMNITZ</p>
              <h1 className="text-[1.55rem] leading-[1.08] break-words hyphens-auto sm:text-4xl lg:text-[3.4rem] font-extrabold text-[hsl(var(--gb-navy))] mb-3 md:mb-5 tracking-tight">
                Gebäudereinigung für Privat &amp; Gewerbe
              </h1>
              <p className="text-sm md:text-lg text-[hsl(var(--gb-text))] mb-5 md:mb-8 max-w-md">
                Professionelle Reinigung von Wohnungen, Häusern und Büros. Gründlich, zuverlässig und flexibel – in Chemnitz und Umgebung.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-xs sm:max-w-none">
                <Button size="lg" className="h-12 rounded-xl px-4 md:px-8 text-sm md:text-base font-semibold shadow-[var(--shadow-medium)]" onClick={() => goToForm()}>Jetzt Angebot anfragen <ArrowRight className="ml-1 h-4 w-4" /></Button>
                <Button size="lg" variant="outline" className="h-12 rounded-xl px-4 md:px-8 text-sm md:text-base font-semibold bg-background border-transparent shadow-[var(--shadow-soft)]" onClick={() => goToForm()}><Calendar className="mr-2 h-4 w-4 text-primary" />Termin vereinbaren</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-accent/60 border-y border-border">
          <ul className="container mx-auto px-2 grid grid-cols-4 divide-x divide-border py-4 md:py-6">
            {benefits.map(({ icon: Icon, label }) => (
              <li key={label} className="flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-3 text-center px-1">
                <Icon className="h-7 w-7 md:h-8 md:w-8 text-primary" strokeWidth={1.6} />
                <span className="text-[11px] md:text-sm font-semibold text-[hsl(var(--gb-navy))] leading-tight">{label}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Services */}
        <section className="py-8 md:py-14">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-[hsl(var(--gb-navy))] text-center mb-5 md:mb-10">Unsere Reinigungsleistungen</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {gebaeudeServices.map((s) => {
                const Icon = serviceIcons[s.id] ?? Sparkles;
                return (
                <button key={s.id} type="button" onClick={() => setActive(s)} className="group h-full text-left bg-card rounded-xl overflow-hidden shadow-[0_2px_10px_-4px_hsl(var(--gb-navy)/0.15)] ring-1 ring-border/60 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_-12px_hsl(var(--gb-navy)/0.28)] hover:ring-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.98]">
                  <div className="overflow-hidden"><img src={s.image} alt={s.alt} loading="lazy" className="w-full aspect-[16/9] lg:aspect-[2.3/1] object-cover transition-transform duration-500 group-hover:scale-105" /></div>
                  <div className="flex items-center gap-2.5 p-3 md:p-4 flex-1">
                    <Icon className="h-6 w-6 shrink-0 text-primary" strokeWidth={1.6} />
                    <h3 className="text-[13px] md:text-base font-bold text-[hsl(var(--gb-navy))] flex-1 leading-snug">{s.title}</h3>
                    <span className="h-7 w-7 shrink-0 rounded-full border border-primary/40 flex items-center justify-center transition-colors group-hover:bg-primary group-hover:border-primary"><ArrowRight className="h-3.5 w-3.5 text-primary transition-colors group-hover:text-primary-foreground" /></span>
                  </div>
                </button>
              );})}
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
        <section className="pb-8 md:pb-16">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-4 md:gap-6">
            {[
              { type: "privat" as const, icon: Home, title: "Für Privatkunden", lead: "Sauberkeit und mehr Zeit für Ihr Zuhause.", items: ["Wohnungen", "Einfamilienhäuser", "Badezimmer und Küchen", "Einmalige und regelmäßige Reinigung"] },
              { type: "gewerbe" as const, icon: Building2, title: "Für Gewerbekunden", lead: "Gepflegte Räumlichkeiten für Mitarbeiter und Kunden.", items: ["Büros und Arbeitsplätze", "Geschäftsräume", "Gewerbliche Innenbereiche", "Individuell abgestimmte Reinigungsintervalle"] },
            ].map(({ type, icon: Icon, title, lead, items }) => (
              <div key={type} className="rounded-2xl ring-1 ring-border/60 bg-card p-5 shadow-[0_6px_20px_-10px_hsl(var(--gb-navy)/0.2)] border-t-4 border-primary flex flex-col">
                <div className="flex items-center gap-3 mb-2">
                  <span className="h-10 w-10 rounded-full bg-accent flex items-center justify-center"><Icon className="h-5 w-5 text-primary" strokeWidth={1.8} /></span>
                  <h3 className="text-xl font-bold text-[hsl(var(--gb-navy))]">{title}</h3>
                </div>
                <p className="font-medium text-[hsl(var(--gb-text))] mb-3">{lead}</p>
                <ul className="space-y-1.5 mb-4 flex-1">
                  {items.map((i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[hsl(var(--gb-text))]"><Check className="h-4 w-4 text-primary" />{i}</li>
                  ))}
                </ul>
                <Button className="rounded-xl h-11 font-semibold shadow-[var(--shadow-medium)]" onClick={() => goToForm(undefined, type)}>Unverbindlich anfragen <ArrowRight className="ml-1 h-4 w-4" /></Button>
              </div>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="container mx-auto px-3 md:px-4 pb-8 md:pb-16">
          <div className="bg-accent rounded-2xl p-4 py-6 md:p-10">
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-[hsl(var(--gb-navy))] text-center mb-5 md:mb-8">So einfach funktioniert's</h2>
            <ol className="grid grid-cols-3 gap-2 md:gap-4">
              {steps.map(({ icon: Icon, title, text }, i) => (
                <li key={title} className="relative flex flex-col items-center text-center">
                  <div className="relative mb-3">
                    <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-background flex items-center justify-center shadow-[var(--shadow-soft)]">
                      <Icon className="h-7 w-7 text-primary" strokeWidth={1.6} />
                    </div>
                    <span className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  </div>
                  {i < steps.length - 1 && <ArrowRight className="absolute top-5 md:top-6 -right-3 md:-right-4 h-5 w-5 md:h-6 md:w-6 text-primary/60" />}
                  <h3 className="text-sm md:text-base font-bold text-[hsl(var(--gb-navy))] leading-tight mb-1">{title}</h3>
                  <p className="hidden md:block text-sm text-muted-foreground max-w-xs">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Why + reviews */}
        <section className="container mx-auto px-4 pb-8 md:pb-16 max-w-5xl grid grid-cols-[1fr_auto] md:grid-cols-[1fr_340px] gap-3 md:gap-10 items-center">
          <div>
            <h2 className="text-xl md:text-3xl font-extrabold tracking-tight text-[hsl(var(--gb-navy))] mb-3 md:mb-5">Warum ReinWerk?</h2>
            <ul className="space-y-1.5 md:space-y-3">
              {reasons.map((r) => (
                <li key={r} className="flex items-start gap-2 md:gap-3 text-[13px] md:text-base text-[hsl(var(--gb-text))]">
                  <span className="mt-0.5 h-5 w-5 rounded-full bg-primary flex items-center justify-center shrink-0"><Check className="h-3 w-3 text-primary-foreground" /></span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
          {/* Placeholder: overall rating + review count to be confirmed from the live Google profile before release */}
          <div className="w-36 md:w-auto rounded-2xl bg-card ring-1 ring-border/60 p-3 md:p-6 shadow-[var(--shadow-medium)]">
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <span className="h-8 w-8 md:h-10 md:w-10 shrink-0 rounded-full bg-accent flex items-center justify-center text-base md:text-lg font-extrabold text-primary">G</span>
              <p className="text-sm md:text-lg font-bold text-[hsl(var(--gb-navy))] leading-tight">Google Bewertungen</p>
            </div>
            {/* TODO before release: insert verified overall rating, review count and profile link from the live Google profile here */}
            <div data-google-review-slot className="rounded-lg border border-dashed border-border bg-accent/40 p-2.5 md:p-4 mb-2 md:mb-3">
              <p className={"text-xs md:text-sm " + "text-[hsl(var(--gb-text))]"}>Hier wird die tatsächliche Google-Bewertung von ReinWerk eingebunden.</p>
            </div>
            <p className="text-[10px] md:text-xs text-muted-foreground border-t border-border pt-2">Platzhalter – es werden keine Bewertungen zu anderen Leistungen als Gebäudereinigung dargestellt.</p>
          </div>
        </section>

        {/* Gallery */}
        <section className="container mx-auto px-4 pb-8 md:pb-16">
          <h2 className="text-xl md:text-3xl font-extrabold tracking-tight text-[hsl(var(--gb-navy))] mb-1 md:mb-2">Einblicke in unsere Arbeit</h2>
          <p className="text-[11px] md:text-xs text-muted-foreground mb-3 md:mb-6">Beispielbilder – werden durch eigene ReinWerk-Fotos ersetzt.</p>
          <div className="flex md:grid md:grid-cols-6 gap-2 md:gap-3 overflow-x-auto snap-x -mx-4 px-4 md:mx-0 md:px-0 pb-1">
            {gallery.map((g) => (
              <img key={g.alt} src={g.src} alt={g.alt} loading="lazy" className="w-[23%] min-w-[23%] md:w-full md:min-w-0 snap-start aspect-[4/3] object-cover rounded-lg" />
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 pb-8 md:pb-16 max-w-3xl">
          <h2 className="text-xl md:text-3xl font-extrabold tracking-tight text-[hsl(var(--gb-navy))] mb-3 md:mb-6">Häufig gestellte Fragen</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {gebaeudeFaqs.map(([q, a], i) => (
              <AccordionItem key={q} value={`f${i}`} className="bg-card ring-1 ring-border/60 border-0 rounded-lg px-4 shadow-[0_2px_8px_-4px_hsl(var(--gb-navy)/0.15)] group [&>h3>button>svg.lucide-chevron-down]:hidden">
                <AccordionTrigger className="text-left text-sm md:text-base font-bold text-[hsl(var(--gb-navy))] hover:no-underline py-3">
                  <span className="flex-1">{q}</span>
                  <Plus className="h-4 w-4 text-primary shrink-0 ml-2 group-data-[state=open]:hidden" />
                  <Minus className="h-4 w-4 text-primary shrink-0 ml-2 hidden group-data-[state=open]:block" />
                </AccordionTrigger>
                <AccordionContent className="text-[hsl(var(--gb-text))] pb-3">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Final CTA */}
        <section className="container mx-auto px-3 md:px-4 pb-8 md:pb-16">
          <div className="relative overflow-hidden bg-[linear-gradient(120deg,hsl(var(--gb-navy))_0%,hsl(var(--primary))_55%,hsl(var(--primary)/0.85)_100%)] text-primary-foreground shadow-[0_20px_40px_-20px_hsl(var(--gb-navy)/0.6)] rounded-2xl p-6 md:p-12">
            <img src={logo} alt="" aria-hidden className="absolute -right-6 -bottom-6 w-40 md:w-64 opacity-10 pointer-events-none" />
            <Sparkles className="absolute top-5 right-5 h-7 w-7 opacity-60" aria-hidden />
            <h2 className="relative text-2xl md:text-4xl font-extrabold tracking-tight mb-2 md:mb-3 pr-8">Bereit für saubere Räumlichkeiten?</h2>
            <p className="relative max-w-xl mb-5 md:mb-7 opacity-95 text-sm md:text-base">Ob Zuhause, Büro oder Gewerbe – kontaktieren Sie uns jetzt und erhalten Sie ein individuelles, unverbindliches Angebot.</p>
            <Button size="lg" variant="secondary" className="relative w-full md:w-auto md:px-10 h-12 rounded-xl text-base font-bold bg-background text-primary hover:bg-background/90 shadow-[var(--shadow-medium)]" onClick={() => goToForm()}>
              <Calendar className="mr-2 h-4 w-4 text-primary" /> Jetzt Angebot anfragen
            </Button>
          </div>
        </section>

        {/* Form */}
        <section id="anfrage" className="bg-accent py-12 md:py-16 scroll-mt-20">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--gb-navy))] text-center mb-2">Unverbindliche Anfrage</h2>
            <p className="text-center text-xs text-muted-foreground mb-6">Testmodus: Es werden keine Anfragen versendet.</p>
            <form onSubmit={onSubmit} className="bg-background rounded-2xl p-5 md:p-8 shadow-[var(--shadow-soft)] grid gap-4">
              <fieldset className="grid grid-cols-2 gap-2">
                <legend className="text-sm font-medium mb-2">Kundentyp</legend>
                {(["privat", "gewerbe"] as const).map((t) => (
                  <label key={t} className={`cursor-pointer rounded-md border px-3 py-2.5 text-sm text-center ${customerType === t ? "border-primary bg-accent font-semibold text-[hsl(var(--gb-navy))]" : "border-input"}`}>
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
