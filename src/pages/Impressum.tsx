import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Impressum() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Impressum | ReinWerk</title>
        <meta
          name="description"
          content="Impressum von ReinWerk – Angaben zum Unternehmen, Anbieterkennzeichnung und Kontaktdaten."
        />
        <link rel="canonical" href="https://reinwerk-service.de/impressum" />
        <meta property="og:title" content="Impressum | ReinWerk" />
        <meta
          property="og:description"
          content="Impressum von ReinWerk – Angaben zum Unternehmen, Anbieterkennzeichnung und Kontaktdaten."
        />
        <meta property="og:url" content="https://reinwerk-service.de/impressum" />
      </Helmet>
      <Header />
      <main className="pt-32 pb-24">
        <div className="container max-w-3xl">
          <h1 className="text-4xl font-bold text-foreground mb-12">Impressum</h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Angaben gemäß § 5 DDG:</h2>
              <p className="text-lg">
                <strong className="text-foreground">ReinWerk – Oleh Pshenychnyi</strong><br />
                Matthesstraße 48<br />
                09113 Chemnitz<br />
                Deutschland
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Kontakt:</h2>
              <p>
                <strong className="text-foreground">Telefon:</strong> +491636986317<br />
                <strong className="text-foreground">E-Mail:</strong>{' '}
                <a href="mailto:info@reinwerk-service.de" className="text-primary hover:underline">
                  info@reinwerk-service.de
                </a><br />
                <strong className="text-foreground">Website:</strong>{' '}
                <a href="https://reinwerk-service.de/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  https://reinwerk-service.de/
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:</h2>
              <p>
                Oleh Pshenychnyi<br />
                Matthesstraße 48<br />
                09113 Chemnitz
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Dieses Impressum gilt auch für folgende Social-Media-Profile:</h2>
              <p>
                <strong className="text-foreground">Instagram:</strong>{' '}
                <a href="https://www.instagram.com/reinwerk.clean?igsh=MW90MGVhYm5yZzZhMA%3D%3D" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  @reinwerk.clean
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Verbraucherstreitbeilegung/Universalschlichtungsstelle:</h2>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
                vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
