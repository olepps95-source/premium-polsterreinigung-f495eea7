import { Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-secondary/80 border-t border-border">
      <div className="container py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#" className="text-2xl font-bold text-foreground">
              Rein<span className="text-primary">Werk</span>
            </a>
            <p className="mt-4 text-muted-foreground max-w-sm">
              Professionelle Polster-, Teppich-, Fenster- und Bodenreinigung für Privat- und Gewerbekunden in Sachsen. Chemnitz · Dresden · Leipzig & Umgebung.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Kontakt</h4>
            <ul className="space-y-3">
              <li>
                <span className="flex items-center gap-3 text-muted-foreground">
                  +49 163 2373108
                </span>
              </li>
              <li>
                <a href="mailto:info@reinwerk-service.de" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                  info@reinwerk-service.de
                </a>
              </li>
              <li>
                <span className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  09113 Chemnitz, Matthesstraße 48
                </span>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Rechtliches</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/impressum" className="text-muted-foreground hover:text-primary transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link to="/datenschutz" className="text-muted-foreground hover:text-primary transition-colors">
                  Datenschutzerklärung
                </Link>
              </li>
              <li>
                <Link to="/agb" className="text-muted-foreground hover:text-primary transition-colors">
                  AGB
                </Link>
              </li>
              <li>
                <Link to="/widerrufsbelehrung" className="text-muted-foreground hover:text-primary transition-colors">
                  Widerrufsbelehrung
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container py-4">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} ReinWerk. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
