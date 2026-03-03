import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-24">
        <div className="container max-w-3xl">
          <h1 className="text-4xl font-bold text-foreground mb-12">Datenschutzerklärung</h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Verantwortlicher</h2>
              <p>
                ReinWerk – Oleh Pshenychnyi<br />
                Matthesstraße 48, 09113 Chemnitz<br />
                Telefon: 01636986317 | E-Mail:{' '}
                <a href="mailto:info@reinwerk-service.de" className="text-primary hover:underline">info@reinwerk-service.de</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Erhebung und Speicherung personenbezogener Daten</h2>
              <p className="mb-4">
                Wir verarbeiten Daten, die Sie uns über Kontaktformulare, E-Mail oder WhatsApp übermitteln.
              </p>
              <p className="mb-4">
                <strong className="text-foreground">Daten:</strong> Name, Adresse, Telefonnummer, E-Mail, Fotos der Möbel.
              </p>
              <p>
                <strong className="text-foreground">Rechtsgrundlage:</strong> Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung oder vorvertragliche Maßnahmen) sowie Art. 6 Abs. 1 lit. f DSGVO (unser berechtigtes Interesse an einer effizienten Kundenkommunikation).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Server-Logfiles & Hosting</h2>
              <p>
                Unsere Website wird bei einem externen Dienstleister gehostet. Dabei werden automatisch Daten verarbeitet (IP-Adresse, Browsertyp). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Cookies & Consent-Management</h2>
              <p>
                Wir nutzen Cookies. Für nicht notwendige Cookies holen wir Ihre Einwilligung über einen Cookie-Banner ein (Art. 6 Abs. 1 lit. a DSGVO).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Instagram & Social Media</h2>
              <p>
                Wir betreiben ein Profil auf Instagram. Bei Interaktionen verarbeitet Meta Platforms Ireland Ltd. Ihre Daten. Wir haben mit Meta eine Vereinbarung über die gemeinsame Verantwortlichkeit abgeschlossen (Art. 26 DSGVO). Details finden Sie in der Datenrichtlinie von Instagram.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. WhatsApp Business</h2>
              <p>
                Bei Kontakt via WhatsApp nutzen wir die Business-Version. Hierbei werden Daten an Meta übertragen. Mit der Nutzung willigen Sie in diese Übertragung ein (Art. 6 Abs. 1 lit. a DSGVO).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Datensicherheit</h2>
              <p>
                Diese Seite nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung. Damit sind Daten, die Sie an uns senden, für Dritte nicht mitlesbar.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Dauer der Speicherung</h2>
              <p>
                Wir speichern Daten nur so lange, wie für die Anfrage nötig, oder wie es gesetzliche Aufbewahrungsfristen (z.B. 10 Jahre für Rechnungen) vorschreiben. Fotos werden nach Auftragsabschluss zeitnah gelöscht.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Ihre Rechte</h2>
              <p>
                Sie haben nach der DSGVO das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch. Kontaktieren Sie uns dazu unter:{' '}
                <a href="mailto:info@reinwerk-service.de" className="text-primary hover:underline">info@reinwerk-service.de</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Beschwerderecht</h2>
              <p>
                Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (z.B. Sächsischer Datenschutzbeauftragter).
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
