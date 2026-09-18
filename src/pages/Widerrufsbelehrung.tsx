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
          <h1 className="text-4xl font-bold text-foreground mb-12">Widerrufsbelehrung</h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Widerrufsrecht</h2>
              <p>
                Sie haben das Recht, binnen 14 Tagen ohne Angabe von Gründen den Vertrag zu widerrufen.
              </p>
              <p>
                Die Widerrufsfrist beginnt mit dem Tag des Vertragsabschlusses.
              </p>
              <p className="mt-4 mb-4">
                Um Ihr Widerrufsrecht auszuüben, müssen Sie uns mittels einer eindeutigen Erklärung informieren:
              </p>
              <p>
                ReinWerk – Polsterreinigung<br />
                Pshenychnyi Oleh<br />
                Matthesstraße 48<br />
                09113 Chemnitz<br />
                E-Mail: <a href="mailto:info@reinwerk-service.de" className="text-primary hover:underline">info@reinwerk-service.de</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Folgen des Widerrufs</h2>
              <p>
                Wenn Sie diesen Vertrag widerrufen, erstatten wir Ihnen alle erhaltenen Zahlungen unverzüglich zurück.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Ausschluss des Widerrufs</h2>
              <p className="mb-4">Das Widerrufsrecht besteht nicht, wenn:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>die Dienstleistung bereits vollständig erbracht wurde und</li>
                <li>der Kunde ausdrücklich zugestimmt hat, dass ReinWerk vor Ablauf der Widerrufsfrist mit der Ausführung beginnt,</li>
                <li>und er bestätigt hat, dass sein Widerrufsrecht mit vollständiger Leistungserbringung erlischt.</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
