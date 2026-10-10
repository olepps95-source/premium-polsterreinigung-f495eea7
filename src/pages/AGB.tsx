import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

type Section = { title: string; paragraphs: string[]; list?: string[] };

const sections: Section[] = [
  {
    title: '§ 1 Geltungsbereich',
    paragraphs: [
      '(1) Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge über Reinigungsdienstleistungen zwischen ReinWerk und ihren Kunden, insbesondere Polster-, Matratzen-, Teppich-, Teppichboden-, Fenster- und Glasreinigung sowie gewerbliche Reinigungsleistungen.',
      '(2) Kunden im Sinne dieser AGB sind sowohl Verbraucher (§ 13 BGB) als auch Unternehmer (§ 14 BGB). Regelungen, die nur für eine dieser Gruppen gelten, sind ausdrücklich gekennzeichnet.',
      '(3) Abweichende oder ergänzende Bedingungen des Kunden werden nur Vertragsbestandteil, wenn ReinWerk ihrer Geltung ausdrücklich in Textform zustimmt. Individuelle Vereinbarungen haben stets Vorrang vor diesen AGB (§ 305b BGB).',
    ],
  },
  {
    title: '§ 2 Angebote und Vertragsabschluss',
    paragraphs: [
      '(1) Darstellungen und Preisangaben auf der Website stellen kein verbindliches Angebot dar.',
      '(2) Anfragen über das Kontaktformular, per WhatsApp, Telefon oder E-Mail sind eine Aufforderung an ReinWerk, ein Angebot abzugeben. Auf Grundlage der Angaben des Kunden (gegebenenfalls einschließlich Fotos) unterbreitet ReinWerk ein Angebot mit Leistungsumfang und Preis.',
      '(3) Der Vertrag kommt zustande, wenn der Kunde das Angebot annimmt und ReinWerk den Auftrag bzw. Termin bestätigt, zum Beispiel per WhatsApp, E-Mail oder telefonisch.',
      '(4) Wird der Vertrag mit einem Verbraucher ausschließlich über Fernkommunikationsmittel oder außerhalb von Geschäftsräumen geschlossen, steht dem Verbraucher ein gesetzliches Widerrufsrecht zu (§ 10). ReinWerk stellt dem Verbraucher die Vertragsbestätigung, diese AGB und die Widerrufsbelehrung auf einem dauerhaften Datenträger (z. B. per E-Mail) zur Verfügung.',
    ],
  },
  {
    title: '§ 3 Leistungsumfang und Durchführung',
    paragraphs: [
      '(1) Der Umfang der Leistung ergibt sich aus dem jeweiligen Angebot bzw. der Auftragsbestätigung.',
      '(2) ReinWerk führt die Arbeiten fachgerecht nach dem Stand der Technik mit geeigneten Geräten und Reinigungsmitteln aus.',
      '(3) Ein bestimmter Reinigungserfolg, etwa die vollständige Entfernung jedes Flecks, ist nur geschuldet, soweit er ausdrücklich vereinbart wurde. Das erreichbare Ergebnis hängt insbesondere von Material, Alter, Art und Einwirkzeit der Verschmutzung sowie von früheren Behandlungen ab. ReinWerk weist auf erkennbare Risiken möglichst vor Beginn der Arbeiten hin.',
      '(4) ReinWerk ist berechtigt, qualifizierte Mitarbeiter oder Subunternehmer einzusetzen. Die Verantwortung gegenüber dem Kunden verbleibt bei ReinWerk.',
    ],
  },
  {
    title: '§ 4 Preise und Zusatzleistungen',
    paragraphs: [
      '(1) Es gelten die im Angebot bzw. in der Auftragsbestätigung vereinbarten Preise. Alle Preise sind Endpreise. Gemäß § 19 UStG wird keine Umsatzsteuer berechnet und ausgewiesen.',
      '(2) Die Anfahrt ist grundsätzlich kostenlos. Zusätzliche Fahrtkosten werden nur berechnet, wenn sie vor Vertragsschluss ausdrücklich mit dem Kunden vereinbart wurden.',
      '(3) Zusätzliche Reinigungsleistungen oder Mehrkosten bedürfen einer vorherigen Vereinbarung mit dem Kunden. Stellt sich vor Ort heraus, dass Umfang oder Zustand wesentlich von den Angaben abweichen, informiert ReinWerk den Kunden vor Ausführung weiterer Arbeiten. Ohne Zustimmung des Kunden wird nur der ursprünglich vereinbarte Leistungsumfang erbracht.',
    ],
  },
  {
    title: '§ 5 Zahlung und Rechnungsstellung',
    paragraphs: [
      '(1) Die Zahlung kann in bar, per Banküberweisung oder per Kartenzahlung erfolgen.',
      '(2) Sofern nichts anderes vereinbart wurde, ist die Vergütung nach Erbringung der Dienstleistung fällig. Bei Zahlung auf Rechnung gilt das auf der Rechnung angegebene Zahlungsziel.',
      '(3) Im Übrigen gelten die gesetzlichen Vorschriften zum Zahlungsverzug.',
    ],
  },
  {
    title: '§ 6 Mitwirkungspflichten des Kunden',
    paragraphs: [
      '(1) Der Kunde ermöglicht zum vereinbarten Termin den Zugang zu den zu reinigenden Bereichen und stellt, soweit erforderlich, Strom- und Wasseranschluss zur Verfügung.',
      '(2) Der Kunde informiert ReinWerk vorab wahrheitsgemäß über Material, ihm bekannte Vorschäden, frühere Behandlungen und besondere Empfindlichkeiten (z. B. Herstellerhinweise, Echtleder, Seide, antike Stücke).',
      '(3) Zerbrechliche oder wertvolle Gegenstände sollen vor Beginn der Arbeiten aus dem Arbeitsbereich entfernt werden, sofern nichts anderes vereinbart ist.',
      '(4) Kann die Leistung aufgrund fehlender Mitwirkung des Kunden nicht erbracht werden, gelten die gesetzlichen Bestimmungen.',
    ],
  },
  {
    title: '§ 7 Haftung',
    paragraphs: [
      '(1) ReinWerk haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit, bei der Verletzung von Leben, Körper oder Gesundheit, nach den Vorschriften des Produkthaftungsgesetzes sowie im Umfang einer übernommenen Garantie.',
      '(2) Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt. Wesentliche Vertragspflichten sind solche, deren Erfüllung die ordnungsgemäße Durchführung des Vertrags überhaupt erst ermöglicht und auf deren Einhaltung der Kunde regelmäßig vertrauen darf.',
      '(3) Im Übrigen ist die Haftung für leichte Fahrlässigkeit ausgeschlossen.',
      '(4) Für Schäden, die ausschließlich auf bereits vorhandenen Material- oder Herstellungsmängeln oder auf unzutreffenden Angaben des Kunden beruhen, haftet ReinWerk nicht, soweit ReinWerk diese weder kannte noch bei fachgerechter Prüfung hätte erkennen müssen.',
      '(5) Die vorstehenden Haftungsbeschränkungen gelten auch zugunsten der Mitarbeiter und Erfüllungsgehilfen von ReinWerk.',
    ],
  },
  {
    title: '§ 8 Termine und Absagen',
    paragraphs: [
      '(1) Termine werden individuell vereinbart.',
      '(2) Vereinbarte Termine können nach gegenseitiger Absprache verschoben oder abgesagt werden. Im Falle einer Terminabsage gelten die gesetzlichen Bestimmungen. Das gesetzliche Widerrufsrecht für Verbraucher bleibt unberührt.',
      '(3) Kann ReinWerk einen Termin aus nicht zu vertretenden Gründen (z. B. Krankheit oder ungeeignete Witterung bei der Fensterreinigung) nicht wahrnehmen, informiert ReinWerk den Kunden unverzüglich und bietet einen Ersatztermin an.',
    ],
  },
  {
    title: '§ 9 Abnahme und Mängel',
    paragraphs: [
      '(1) Der Kunde soll das Ergebnis nach Abschluss der Arbeiten möglichst gemeinsam mit ReinWerk prüfen. Bei Polster-, Matratzen- und Teppichreinigung zeigt sich das endgültige Ergebnis teilweise erst nach vollständiger Trocknung.',
      '(2) Es gelten die gesetzlichen Mängelrechte. ReinWerk ist zunächst zur Nacherfüllung, etwa durch Nachreinigung, berechtigt.',
      '(3) Die gesetzlichen Verjährungsfristen für Mängelansprüche bleiben unberührt. Eine zeitnahe Mitteilung festgestellter Mängel erleichtert die Prüfung, ist für Verbraucher aber keine Voraussetzung für ihre Rechte.',
    ],
  },
  {
    title: '§ 10 Widerrufsrecht für Verbraucher',
    paragraphs: [
      'Verbrauchern steht bei Fernabsatzverträgen und außerhalb von Geschäftsräumen geschlossenen Verträgen ein gesetzliches Widerrufsrecht zu. Einzelheiten ergeben sich aus der Widerrufsbelehrung unter https://reinwerk-service.de/widerrufsbelehrung. Soll die Dienstleistung vor Ablauf der Widerrufsfrist beginnen, ist hierfür ein ausdrückliches Verlangen des Verbrauchers erforderlich.',
    ],
  },
  {
    title: '§ 11 Besondere Vereinbarungen mit Geschäftskunden',
    paragraphs: [
      '(1) Mit Unternehmern können Rahmenverträge, regelmäßige Reinigungsintervalle, abweichende Zahlungsziele und Leistungsverzeichnisse gesondert vereinbart werden. Diese gehen den vorliegenden AGB vor.',
      '(2) Leistungen außerhalb der üblichen Geschäftszeiten (z. B. abends oder am Wochenende) erfolgen nach gesonderter Vereinbarung.',
      '(3) Der Geschäftskunde benennt einen Ansprechpartner und stellt den Zugang zu den Räumlichkeiten sicher. Übergebene Schlüssel oder Zugangsmittel werden sorgfältig verwahrt und nach Abschluss der Arbeiten zurückgegeben.',
    ],
  },
  {
    title: '§ 12 Anwendbares Recht und Gerichtsstand',
    paragraphs: [
      '(1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Gegenüber Verbrauchern gilt diese Rechtswahl nur, soweit ihnen dadurch nicht der Schutz zwingender Bestimmungen des Rechts des Staates ihres gewöhnlichen Aufenthalts entzogen wird.',
      '(2) Ist der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen, ist Gerichtsstand für alle Streitigkeiten aus dem Vertragsverhältnis Chemnitz. Für Verbraucher gelten die gesetzlichen Gerichtsstände.',
    ],
  },
  {
    title: '§ 13 Schlussbestimmungen',
    paragraphs: [
      '(1) Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. An die Stelle der unwirksamen Bestimmung treten die gesetzlichen Vorschriften.',
      '(2) ReinWerk ist nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
    ],
  },
];

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
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-10 break-words">Allgemeine Geschäftsbedingungen (AGB)</h1>

          <div className="max-w-none text-muted-foreground space-y-8 leading-relaxed">
            <p className="text-lg">
              ReinWerk<br />
              Inhaber: Oleh Pshenychnyi<br />
              Matthesstraße 48<br />
              09113 Chemnitz<br />
              Deutschland<br />
              Telefon: +49 163 6986317<br />
              E-Mail:{' '}
              <a href="mailto:info@reinwerk-service.de" className="text-primary hover:underline">info@reinwerk-service.de</a><br />
              Website: https://reinwerk-service.de/
            </p>

            {sections.map((s) => (
              <section key={s.title} className="space-y-3">
                <h2 className="text-xl md:text-2xl font-semibold text-foreground">{s.title}</h2>
                {s.paragraphs.map((p, i) => (
                  <p key={i} className="break-words">{p}</p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
