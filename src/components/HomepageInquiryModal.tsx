import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface HomepageInquiryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface HomepageInquiryPayload {
  source: string;
  name: string;
  kontakt: string;
  nachricht: string;
  page: string;
  created_at: string;
}

const HOMEPAGE_WEBHOOK_URL = "https://hook.eu1.make.com/81hzpicl2zd6d8qsoh5ki43wbw62if58";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^[+()\-./\s\d]{5,}$/;

function isValidContact(value: string) {
  const v = value.trim();
  return EMAIL_REGEX.test(v) || PHONE_REGEX.test(v);
}

export function HomepageInquiryModal({ open, onOpenChange }: HomepageInquiryModalProps) {
  const [name, setName] = useState("");
  const [kontakt, setKontakt] = useState("");
  const [nachricht, setNachricht] = useState("");
  const [errors, setErrors] = useState<{ name?: string; kontakt?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const reset = () => {
    setName("");
    setKontakt("");
    setNachricht("");
    setErrors({});
    setSubmitted(false);
    setSending(false);
  };

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
    if (!next) {
      // Zustand zurücksetzen, wenn das Modal geschlossen wird
      setTimeout(reset, 200);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { name?: string; kontakt?: string } = {};
    if (!name.trim()) {
      newErrors.name = "Bitte geben Sie Ihren Namen an.";
    }
    if (!kontakt.trim()) {
      newErrors.kontakt = "Bitte geben Sie Ihre Telefonnummer oder E-Mail-Adresse an.";
    } else if (!isValidContact(kontakt)) {
      newErrors.kontakt = "Bitte geben Sie eine gültige Telefonnummer oder E-Mail-Adresse an.";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const payload: HomepageInquiryPayload = {
      source: "homepage",
      name: name.trim(),
      kontakt: kontakt.trim(),
      nachricht: nachricht.trim(),
      page: "/",
      created_at: new Date().toISOString(),
    };

    setSending(true);
    try {
      if (HOMEPAGE_WEBHOOK_URL) {
        await fetch(HOMEPAGE_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // Kein eigener Homepage-Webhook definiert – Anfrage lokal bestätigen.
        console.info("Homepage-Anfrage (Webhook noch nicht verbunden):", payload);
      }
      setSubmitted(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-[500px] bg-white rounded-[20px] shadow-2xl border-0 p-6 md:p-8 max-h-[90dvh] overflow-y-auto">
        {submitted ? (
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <DialogHeader className="items-center text-center">
              <DialogTitle className="text-xl md:text-2xl font-bold text-foreground">
                Vielen Dank für Ihre Anfrage!
              </DialogTitle>
              <DialogDescription className="text-sm md:text-base text-muted-foreground mt-2">
                Wir melden uns schnellstmöglich bei Ihnen.
              </DialogDescription>
            </DialogHeader>
            <Button
              onClick={() => handleOpenChange(false)}
              className="mt-6 rounded-xl font-semibold min-h-[48px] px-8"
            >
              Schließen
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader className="text-left">
              <DialogTitle className="text-xl md:text-2xl font-bold text-foreground">
                Kostenloses Angebot anfragen
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                Hinterlassen Sie uns Ihre Kontaktdaten – wir melden uns persönlich bei Ihnen.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4" noValidate>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="hp-name" className="text-sm font-semibold text-foreground">
                  Name *
                </Label>
                <Input
                  id="hp-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ihr Name"
                  autoComplete="name"
                  className="h-12 rounded-xl"
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="hp-kontakt" className="text-sm font-semibold text-foreground">
                  Telefonnummer (oder E-Mail) *
                </Label>
                <Input
                  id="hp-kontakt"
                  value={kontakt}
                  onChange={(e) => setKontakt(e.target.value)}
                  placeholder="Telefonnummer oder E-Mail-Adresse"
                  autoComplete="tel email"
                  className="h-12 rounded-xl"
                />
                {errors.kontakt && <p className="text-xs text-destructive">{errors.kontakt}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="hp-nachricht" className="text-sm font-semibold text-foreground">
                  Nachricht
                </Label>
                <Textarea
                  id="hp-nachricht"
                  value={nachricht}
                  onChange={(e) => setNachricht(e.target.value)}
                  placeholder="Was möchten Sie reinigen?"
                  rows={4}
                  className="rounded-xl resize-none min-h-[96px]"
                />
              </div>

              <p className="text-[11px] leading-snug text-muted-foreground">
                Mit dem Absenden des Formulars erkläre ich mich damit einverstanden, dass meine
                angegebenen Daten zum Zweck der Kontaktaufnahme und Bearbeitung meiner Anfrage
                verarbeitet werden. Ich kann diese Einwilligung jederzeit mit Wirkung für die
                Zukunft per E-Mail an{" "}
                <a
                  href="mailto:info@reinwerk-service.de"
                  className="underline underline-offset-2 hover:text-foreground"
                >
                  info@reinwerk-service.de
                </a>{" "}
                widerrufen.
              </p>

              <div className="flex flex-col items-center gap-1.5 mt-1">
                <Button
                  type="submit"
                  disabled={sending}
                  className="w-full min-h-[52px] rounded-xl font-semibold text-base"
                >
                  {sending ? "Wird gesendet…" : "Anfrage senden"}
                </Button>
                <span className="text-xs text-muted-foreground">Unverbindlich &amp; kostenlos</span>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
