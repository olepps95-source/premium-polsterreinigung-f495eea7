import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Widerrufsbelehrung() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Widerrufsbelehrung | ReinWerk</title>
        <meta
          name="description"
          content="Widerrufsbelehrung von ReinWerk. Ihr Widerrufsrecht, Widerrufsfrist und die Folgen des Widerrufs bei Reinigungsdienstleistungen."
        />
        <link rel="canonical" href="https://reinwerk-service.de/widerrufsbelehrung" />
        <meta property="og:title" content="Widerrufsbelehrung | ReinWerk" />
        <meta
          property="og:description"
          content="Widerrufsbelehrung von ReinWerk. Ihr Widerrufsrecht, Widerrufsfrist und die Folgen des Widerrufs bei Reinigungsdienstleistungen."
        />
        <meta property="og:url" content="https://reinwerk-service.de/widerrufsbelehrung" />
      </Helmet>
      <Header />
      <main className="pt-32 pb-24">
        <div className="container max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-10">Widerrufsbelehrung</h1>

          <div className="max-w-none text-muted-foreground space-y-8 leading-relaxed">
            <p>
              Verbraucher (§ 13 BGB), die mit ReinWerk einen Vertrag über Dienstleistungen im Fernabsatz
              (z. B. per WhatsApp, Telefon oder E-Mail) oder außerhalb von Geschäftsräumen schließen,
              haben ein Widerrufsrecht nach Maßgabe der folgenden Belehrung.
            </p>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground">Widerrufsrecht</h2>
              <p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>
              <p>Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.</p>
              <p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns</p>
              <p className="pl-4 border-l-2 border-border">
                ReinWerk<br />
                Inhaber: Oleh Pshenychnyi<br />
                Matthesstraße 48<br />
                09113 Chemnitz<br />
                Deutschland<br />
                Telefon: +49 163 6986317<br />
                E-Mail:{' '}
                <a href="mailto:info@reinwerk-service.de" className="text-primary hover:underline">info@reinwerk-service.de</a>
              </p>
              <p>
                mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine E-Mail) über
                Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte
                Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
              </p>
              <p>
                Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des
                Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground">Folgen des Widerrufs</h2>
              <p>
                Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben,
                unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über
                Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe
                Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde
                ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte
                berechnet.
              </p>
              <p>
                Haben Sie verlangt, dass die Dienstleistungen während der Widerrufsfrist beginnen sollen, so haben Sie
                uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu dem Sie uns von der
                Ausübung des Widerrufsrechts hinsichtlich dieses Vertrags unterrichten, bereits erbrachten
                Dienstleistungen im Vergleich zum Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground">Vorzeitiges Erlöschen des Widerrufsrechts</h2>
              <p>
                Das Widerrufsrecht erlischt bei einem Vertrag über die Erbringung von Dienstleistungen, wenn wir die
                Dienstleistung vollständig erbracht haben und mit der Ausführung erst begonnen haben, nachdem Sie dazu
                Ihre ausdrückliche Zustimmung gegeben haben und gleichzeitig Ihre Kenntnis davon bestätigt haben, dass
                Sie Ihr Widerrufsrecht bei vollständiger Vertragserfüllung durch uns verlieren.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground">Muster-Widerrufsformular</h2>
              <p className="italic">
                (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es
                zurück.)
              </p>
              <div className="rounded-lg border border-border bg-secondary/40 p-5 md:p-6 space-y-4 text-foreground">
                <p>
                  An:<br />
                  ReinWerk, Inhaber Oleh Pshenychnyi<br />
                  Matthesstraße 48, 09113 Chemnitz, Deutschland<br />
                  E-Mail: info@reinwerk-service.de
                </p>
                <ul className="space-y-3">
                  <li>
                    Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über die Erbringung der
                    folgenden Dienstleistung (*):
                    <span className="block mt-2 border-b border-border h-6" />
                  </li>
                  <li>Bestellt am (*) / erhalten am (*):<span className="block mt-2 border-b border-border h-6" /></li>
                  <li>Name des/der Verbraucher(s):<span className="block mt-2 border-b border-border h-6" /></li>
                  <li>Anschrift des/der Verbraucher(s):<span className="block mt-2 border-b border-border h-6" /></li>
                  <li>
                    Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier):
                    <span className="block mt-2 border-b border-border h-6" />
                  </li>
                  <li>Datum:<span className="block mt-2 border-b border-border h-6" /></li>
                </ul>
                <p className="text-sm text-muted-foreground">(*) Unzutreffendes streichen.</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
