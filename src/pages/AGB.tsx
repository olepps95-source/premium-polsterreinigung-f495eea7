import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function AGB() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>AGB | ReinWerk</title>
        <meta
          name="description"
          content="Allgemeine Geschäftsbedingungen von ReinWerk für Polster-, Teppich- und Matratzenreinigung. Geltungsbereich, Vertragsschluss und Leistungen."
        />
        <link rel="canonical" href="https://reinwerk-service.de/agb" />
        <meta property="og:title" content="AGB | ReinWerk" />
        <meta
          property="og:description"
          content="Allgemeine Geschäftsbedingungen von ReinWerk für Polster-, Teppich- und Matratzenreinigung. Geltungsbereich, Vertragsschluss und Leistungen."
        />
        <meta property="og:url" content="https://reinwerk-service.de/agb" />
      </Helmet>
      <Header />
      <main className="pt-32 pb-24">
        <div className="container max-w-3xl">
          <h1 className="text-4xl font-bold text-foreground mb-12">Allgemeine Geschäftsbedingungen (AGB)</h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <p className="text-lg">
              ReinWerk – Polster- & Teppichreinigung<br />
              Inhaber: Pshenychnyi Oleh<br />
              Matthesstraße 48<br />
              09113 Chemnitz
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Geltungsbereich</h2>
              <p>
                Diese Allgemeinen Geschäftsbedingungen gelten für alle Dienstleistungen der Firma ReinWerk im Bereich Polster-, Teppich- und Matratzenreinigung.
              </p>
              <p>
                Abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn, sie wurden ausdrücklich schriftlich vereinbart.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Vertragsabschluss</h2>
              <p className="mb-4">Ein Vertrag kommt zustande durch:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>schriftliche oder mündliche Vereinbarung,</li>
                <li>Bestätigung eines Termins per Telefon, WhatsApp oder E-Mail,</li>
                <li>Absenden einer Anfrage über das Kontaktformular und anschließende Bestätigung durch ReinWerk.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Leistungen</h2>
              <p className="mb-4">ReinWerk führt professionelle Reinigungsdienstleistungen durch, einschließlich:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Polsterreinigung</li>
                <li>Teppichreinigung</li>
                <li>Matratzenreinigung</li>
                <li>Fleckenbehandlung (inkl. Kaffee, Wein, Blut, Tinte, Tierflecken)</li>
              </ul>
              <p className="mt-4">
                ReinWerk schuldet keine garantierte vollständige Fleckenentfernung, da Erfolg und Ergebnis von Material, Alter und Beschaffenheit abhängen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Preise</h2>
              <p>
                Alle Preise sind Endpreise und werden vor Ort nach Begutachtung bestätigt.
              </p>
              <p>
                Preisänderungen bleiben vorbehalten.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Zahlung</h2>
              <p className="mb-4">Die Zahlung erfolgt sofort nach Durchführung der Dienstleistung:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>in bar</li>
                <li>oder per Banküberweisung (falls vereinbart)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Pflichten des Kunden</h2>
              <p className="mb-4">Der Kunde gewährleistet:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>freien Zugang zu den zu reinigenden Bereichen,</li>
                <li>Strom- und Wasseranschluss (falls notwendig),</li>
                <li>wahrheitsgemäße Angaben zum Zustand der Möbel.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Haftung</h2>
              <p>
                ReinWerk haftet nur für Schäden, die durch grobe Fahrlässigkeit oder Vorsatz verursacht wurden.
              </p>
              <p className="mb-4 mt-4">Keine Haftung besteht für:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>bereits vorhandene Materialschäden,</li>
                <li>Verfärbungen oder Schäden aufgrund versteckter Herstellungsfehler,</li>
                <li>Folgeschäden, die durch falsche Pflegeanleitungen des Herstellers entstehen.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Terminabsagen</h2>
              <p>
                Terminabsagen müssen spätestens 24 Stunden vorher erfolgen.
              </p>
              <p>
                Bei kurzfristigen Absagen kann ReinWerk eine Ausfallpauschale erheben.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Eigentumsvorbehalt</h2>
              <p>
                Bis zur vollständigen Zahlung bleibt ReinWerk berechtigt, Dienstleistungen zurückzuhalten.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Gerichtsstand</h2>
              <p>
                Es gilt deutsches Recht.
              </p>
              <p>
                Gerichtsstand ist Chemnitz.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
