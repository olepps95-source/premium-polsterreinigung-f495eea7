import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4 py-16">
      <Helmet>
        <title>Seite nicht gefunden | ReinWerk</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="text-center max-w-md w-full">
        <h1 className="mb-4 text-4xl font-bold text-foreground">Seite nicht gefunden</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Die gewünschte Seite konnte leider nicht gefunden werden.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Zur Startseite
        </a>

        <div className="mt-10 border-t border-border pt-8">
          <p className="mb-4 text-sm font-medium text-foreground">Unsere Leistungen</p>
          <ul className="space-y-2 text-base">
            <li>
              <a href="/polsterreinigung" className="text-primary hover:underline">
                Polsterreinigung
              </a>
            </li>
            <li>
              <a href="/fensterreinigung" className="text-primary hover:underline">
                Fensterreinigung
              </a>
            </li>
            <li>
              <a href="/teppichbodenreinigung" className="text-primary hover:underline">
                Teppichbodenreinigung
              </a>
            </li>
            <li>
              <a href="/gewerbe" className="text-primary hover:underline">
                Gewerbe
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
