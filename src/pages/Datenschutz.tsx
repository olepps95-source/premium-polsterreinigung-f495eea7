import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { openCookieSettings } from '@/lib/consent';

type Section = { title: string; paragraphs: string[] };

const sections: Section[] = [
  {
    title: '2. Allgemeines zur Datenverarbeitung',
    paragraphs: [
      'Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung dieser Website, zur Bearbeitung Ihrer Anfragen und zur Durchführung unserer Reinigungsdienstleistungen erforderlich ist oder Sie eingewilligt haben.',
      'Rechtsgrundlagen sind insbesondere Art. 6 Abs. 1 lit. a DSGVO (Einwilligung), lit. b (Vertrag und vorvertragliche Maßnahmen), lit. c (rechtliche Verpflichtung) und lit. f (berechtigte Interessen) sowie § 25 TDDDG für den Zugriff auf Informationen in Ihrem Endgerät.',
    ],
  },
  {
    title: '3. Hosting und Server-Logfiles',
    paragraphs: [
      'Diese Website wird bei der Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA, gehostet. Beim Aufruf der Website werden durch den Hoster automatisch technische Daten verarbeitet, insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite, Referrer-URL, Browsertyp und Betriebssystem (Server-Logfiles).',
      'Zweck ist die technische Bereitstellung, Stabilität und Sicherheit der Website. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Dabei kann eine Übermittlung in die USA stattfinden. Die Speicherdauer der Logfiles richtet sich nach den Vorgaben des Hosters.',
    ],
  },
  {
    title: '4. Kontakt- und Anfrageformulare',
    paragraphs: [
      'Wenn Sie uns über ein Formular auf dieser Website kontaktieren, verarbeiten wir die von Ihnen angegebenen Daten, z. B. Name, Telefonnummer und/oder E-Mail-Adresse, Ort, gewünschte Leistungen und Ihre Nachricht.',
      'Zweck ist die Bearbeitung Ihrer Anfrage und die Erstellung eines Angebots. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, im Übrigen Art. 6 Abs. 1 lit. f DSGVO (Interesse an der Beantwortung von Anfragen).',
      'Die Formulardaten werden technisch über einen Webhook der Celonis SE bzw. Make.com (Plattform „Make“, Rechenzentrumsregion EU) verarbeitet und als Nachricht über den Messenger-Dienst Telegram an uns weitergeleitet. Telegram (Telegram Messenger Inc.) hat seinen Sitz außerhalb der EU; eine Übermittlung in ein Drittland kann daher nicht ausgeschlossen werden.',
      'Wir speichern Anfragedaten, solange dies zur Bearbeitung erforderlich ist. Kommt kein Auftrag zustande, löschen wir die Daten, sobald sie nicht mehr benötigt werden, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.',
    ],
  },
  {
    title: '5. Kontakt per Telefon, E-Mail und WhatsApp',
    paragraphs: [
      'Wenn Sie uns per Telefon oder E-Mail kontaktieren, verarbeiten wir Ihre Angaben zur Bearbeitung Ihres Anliegens (Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO).',
      'Auf dieser Website befinden sich Links zu WhatsApp. Beim Anklicken wird WhatsApp bzw. die WhatsApp-Webseite geöffnet; erst dann werden Daten an WhatsApp Ireland Limited (Meta) übermittelt. Wenn Sie uns über WhatsApp schreiben, nutzen wir WhatsApp Business. Dabei verarbeitet WhatsApp Ihre Telefonnummer, Nachrichten und ggf. übermittelte Fotos. Eine Übermittlung in die USA durch Meta ist möglich. Die Nutzung von WhatsApp ist freiwillig; Sie können uns alternativ per Telefon, E-Mail oder Formular erreichen.',
    ],
  },
  {
    title: '6. Kunden- und Rechnungsdaten',
    paragraphs: [
      'Zur Durchführung beauftragter Leistungen verarbeiten wir Name, Anschrift, Kontaktdaten, Leistungs- und Zahlungsdaten (Art. 6 Abs. 1 lit. b DSGVO).',
      'Rechnungen und buchungsrelevante Unterlagen bewahren wir aufgrund gesetzlicher Pflichten (insbesondere Handels- und Steuerrecht) für die gesetzlich vorgeschriebene Dauer auf (Art. 6 Abs. 1 lit. c DSGVO).',
    ],
  },
  {
    title: '7. Cookies und Einwilligungsverwaltung',
    paragraphs: [
      'Beim ersten Besuch fragen wir über einen Cookie-Banner, ob Sie nur notwendige Funktionen oder auch Marketing-Dienste (Google Ads, Meta Pixel) zulassen. Ohne Ihre Zustimmung werden diese Dienste nicht geladen.',
      'Ihre Auswahl wird im lokalen Speicher Ihres Browsers (localStorage, Eintrag „cookie-consent“) gespeichert, damit der Banner nicht bei jedem Aufruf erneut erscheint. Rechtsgrundlage ist § 25 Abs. 2 TDDDG i. V. m. Art. 6 Abs. 1 lit. c und f DSGVO. Der Eintrag bleibt bestehen, bis Sie ihn ändern oder Ihren Browserspeicher löschen.',
      'Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen oder ändern – über die Schaltfläche „Cookie-Einstellungen ändern“ auf dieser Seite.',
    ],
  },
  {
    title: '8. Google Ads und Conversion-Tracking',
    paragraphs: [
      'Nur wenn Sie „Alle akzeptieren“ wählen, nutzen wir Google Ads mit Conversion-Tracking der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Dabei wird das Skript gtag.js geladen und es können Cookies gesetzt werden. Erfasst wird, ob Besucher nach dem Klick auf eine Anzeige bestimmte Aktionen ausführen (z. B. Absenden eines Formulars, Klick auf Telefon- oder WhatsApp-Link).',
      'Zweck ist die Erfolgsmessung unserer Werbung. Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG). Eine Übermittlung an Google LLC in den USA ist möglich. Google ist nach dem EU-US Data Privacy Framework zertifiziert. Die Speicherdauer richtet sich nach den Vorgaben von Google.',
    ],
  },
  {
    title: '9. Meta Pixel',
    paragraphs: [
      'Nur wenn Sie „Alle akzeptieren“ wählen, verwenden wir den Meta Pixel der Meta Platforms Ireland Limited, Merrion Road, Dublin 4, Irland. Damit können Seitenaufrufe sowie Kontakt- und Anfrageaktionen erfasst werden, um die Wirksamkeit von Werbeanzeigen auf Facebook und Instagram zu messen.',
      'Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG). Eine Übermittlung an Meta Platforms Inc. in den USA ist möglich. Meta ist nach dem EU-US Data Privacy Framework zertifiziert.',
    ],
  },
  {
    title: '10. Google Fonts und externe Bilder',
    paragraphs: [
      'Zur einheitlichen Darstellung der Schrift lädt diese Website Schriftarten von Google Fonts (Google Ireland Limited). Einzelne Bilder werden vom Dienst Unsplash geladen. Dabei wird Ihre IP-Adresse an den jeweiligen Anbieter übermittelt; eine Übermittlung in die USA ist möglich. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (Interesse an einer ansprechenden Darstellung).',
    ],
  },
  {
    title: '11. Links zu Instagram und Google Maps',
    paragraphs: [
      'Diese Website enthält einfache Links zu unserem Instagram-Profil und zu Google Maps. Es findet keine Einbettung statt. Daten werden erst übermittelt, wenn Sie einen Link anklicken und die jeweilige Seite aufrufen; dort gelten die Datenschutzbestimmungen des jeweiligen Anbieters.',
    ],
  },
  {
    title: '12. Datensicherheit',
    paragraphs: [
      'Diese Website nutzt eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie an „https://“ in der Adresszeile Ihres Browsers.',
    ],
  },
  {
    title: '13. Ihre Rechte',
    paragraphs: [
      'Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie das Recht, erteilte Einwilligungen jederzeit mit Wirkung für die Zukunft zu widerrufen (Art. 7 Abs. 3 DSGVO).',
      'Soweit wir Daten auf Grundlage berechtigter Interessen verarbeiten, haben Sie das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit Widerspruch einzulegen (Art. 21 DSGVO).',
      'Zur Ausübung Ihrer Rechte genügt eine Nachricht an info@reinwerk-service.de.',
    ],
  },
  {
    title: '14. Beschwerderecht',
    paragraphs: [
      'Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Zuständig für uns ist: Sächsische Datenschutz- und Transparenzbeauftragte, Devrientstraße 5, 01067 Dresden.',
    ],
  },
];

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Datenschutz | ReinWerk</title>
        <meta
          name="description"
          content="Datenschutzerklärung von ReinWerk. Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO."
        />
        <link rel="canonical" href="https://reinwerk-service.de/datenschutz" />
        <meta property="og:title" content="Datenschutz | ReinWerk" />
        <meta
          property="og:description"
          content="Datenschutzerklärung von ReinWerk. Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO."
        />
        <meta property="og:url" content="https://reinwerk-service.de/datenschutz" />
      </Helmet>
      <Header />
      <main className="pt-32 pb-24">
        <div className="container max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-10">Datenschutzerklärung</h1>

          <div className="max-w-none text-muted-foreground space-y-8 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground">1. Verantwortlicher</h2>
              <p>
                ReinWerk, Inhaber: Oleh Pshenychnyi<br />
                Matthesstraße 48, 09113 Chemnitz, Deutschland<br />
                Telefon: +49 163 6986317<br />
                E-Mail:{' '}
                <a href="mailto:info@reinwerk-service.de" className="text-primary hover:underline">info@reinwerk-service.de</a>
              </p>
            </section>

            {sections.map((s) => (
              <section key={s.title} className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold text-foreground">{s.title}</h2>
                {s.paragraphs.map((p, i) => (
                  <p key={i} className="break-words">{p}</p>
                ))}
                {s.title.startsWith('7.') && (
                  <Button variant="outline" size="sm" onClick={openCookieSettings}>
                    Cookie-Einstellungen ändern
                  </Button>
                )}
              </section>
            ))}

            <p className="text-sm">Stand: Oktober 2026</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
