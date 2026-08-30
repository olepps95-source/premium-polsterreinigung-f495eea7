import { useState, useEffect, useRef } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ContactModal } from "@/components/ContactModal";
import reinwerkLogo from "@/assets/reinwerk-logo.png";

type ServiceLink = { label: string; description: string; href: string };

const serviceLinks: ServiceLink[] = [
  { label: "Polsterreinigung", description: "Sofas, Sessel & Polstermöbel", href: "/polsterreinigung" },
  { label: "Teppichbodenreinigung", description: "Teppichböden für Privat & Gewerbe", href: "/teppichbodenreinigung" },
  { label: "Fensterreinigung", description: "Fenster, Glas & Wintergärten", href: "/fensterreinigung" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isTeppich = location.pathname === "/teppichbodenreinigung";
  const isFenster = location.pathname === "/fensterreinigung";
  const isHome = location.pathname === "/";
  const homeHero = isHome && !isScrolled && !isMobileMenuOpen;

  const isServiceActive = serviceLinks.some((s) => s.href === location.pathname);
  const isGewerbeActive = location.pathname === "/gewerbe";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on route change or outside click
  useEffect(() => {
    setIsServicesOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const desktopLinkClass = (active: boolean) =>
    `text-xs lg:text-sm font-bold whitespace-nowrap transition-colors ${
      active
        ? "text-primary"
        : homeHero
          ? "text-white/95 hover:text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.45)]"
          : "text-muted-foreground hover:text-foreground"
    }`;

  const mobileLinkClass = (active: boolean) =>
    `text-base font-bold transition-colors py-2 ${
      active
        ? "text-primary font-bold"
        : isTeppich && isScrolled
          ? "text-rw-dark hover:text-black focus:text-black active:text-black"
          : (isTeppich || (isFenster && !isScrolled))
            ? "text-white hover:text-white focus:text-white active:text-white"
            : "text-foreground hover:text-primary"
    }`;

  const phoneTracking = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "click_call", {
        event_category: "contact",
        event_label: "phone_click",
      });
      (window as any).gtag("event", "conversion", {
        send_to: "AW-18104648983/Y5YPCM_pwZ8cEJeK_LhD",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || (isHome && isMobileMenuOpen)
          ? "bg-background/95 backdrop-blur-md shadow-soft border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      {homeHero && (
        <div
          className="absolute inset-0 -z-10 backdrop-blur-[2px]"
          style={{
            background:
              'linear-gradient(180deg, rgba(8,18,28,0.50) 0%, rgba(8,18,28,0.25) 70%, rgba(8,18,28,0) 100%), linear-gradient(90deg, rgba(8,18,28,0.28) 0%, rgba(8,18,28,0.10) 70%, rgba(8,18,28,0) 100%)',
          }}
          aria-hidden="true"
        />
      )}
      <div className={`container mx-auto flex items-center justify-between ${isTeppich ? "py-2 md:py-4" : "py-4"}`}>
        <a href="/" onClick={handleLogoClick} className={`flex items-center cursor-pointer ${isTeppich ? "gap-2 md:gap-3" : "gap-3"}`}>
          <img
            src={reinwerkLogo}
            alt="ReinWerk Logo – Polsterreinigung Sachsen"
            className={`object-contain ${isTeppich ? "h-7 w-7 md:h-10 md:w-10" : "h-8 w-8 md:h-10 md:w-10"}`}
          />
          <span className={`font-bold tracking-tight text-2xl md:text-3xl whitespace-nowrap ${
            homeHero
              ? "text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.45)]"
              : isTeppich && isScrolled
                ? "text-black md:text-rw-dark"
                : isFenster && !isScrolled
                  ? "text-white md:text-rw-dark"
                  : "text-rw-dark"
          }`}>
            Rein<span className="text-rw-blue">Werk</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8">
          {/* Leistungen Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsServicesOpen((v) => !v)}
              aria-expanded={isServicesOpen}
              aria-haspopup="true"
              className={`${desktopLinkClass(isServiceActive)} flex items-center gap-1 py-2`}
            >
              Leistungen
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`} />
            </button>

            {isServicesOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1 animate-fade-in">
                <div className="w-72 rounded-xl bg-white/95 backdrop-blur-md shadow-medium border border-border/60 p-2">
                  {serviceLinks.map((service) => {
                    const active = location.pathname === service.href;
                    return (
                      <Link
                        key={service.href}
                        to={service.href}
                        aria-current={active ? "page" : undefined}
                        className={`block rounded-lg px-4 py-3 transition-colors ${
                          active ? "bg-accent" : "hover:bg-accent"
                        }`}
                      >
                        <span className={`block text-sm font-semibold ${active ? "text-primary" : "text-foreground"}`}>
                          {service.label}
                        </span>
                        <span className="block text-xs text-muted-foreground mt-0.5">
                          {service.description}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <Link to="/gewerbe" aria-current={isGewerbeActive ? "page" : undefined} className={desktopLinkClass(isGewerbeActive)}>
            Gewerbe
          </Link>

          <button type="button" onClick={() => setIsContactOpen(true)} className={desktopLinkClass(false)}>
            Kontakt
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="hero" size="sm" asChild>
            <a href="tel:+491632373108" onClick={phoneTracking}>
              <Phone className="w-4 h-4" />
              +49 163 2373108
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden flex items-center justify-center min-w-[44px] min-h-[44px] ${isTeppich ? "p-1.5" : "p-2"} ${
            homeHero
              ? "text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.45)]"
              : isTeppich && isScrolled
                ? "text-black"
                : isFenster && !isScrolled
                  ? "text-white md:text-foreground"
                  : "text-foreground"
          }`}
          aria-label="Menü öffnen"
        >
          {isMobileMenuOpen ? (
            <X className={isTeppich ? "w-5 h-5" : "w-6 h-6"} />
          ) : (
            <Menu className={isTeppich ? "w-5 h-5" : "w-6 h-6"} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-lg border-t border-border animate-fade-in">
          <nav className="container mx-auto py-6 flex flex-col gap-4">
            {/* Leistungen Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setIsMobileServicesOpen((v) => !v)}
                aria-expanded={isMobileServicesOpen}
                className={`${mobileLinkClass(isServiceActive)} w-full flex items-center justify-between text-left`}
              >
                Leistungen
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileServicesOpen ? "rotate-180" : ""}`} />
              </button>
              {isMobileServicesOpen && (
                <div className="flex flex-col gap-1 pl-4 mt-2 border-l-2 border-border animate-fade-in">
                  {serviceLinks.map((service) => {
                    const active = location.pathname === service.href;
                    return (
                      <Link
                        key={service.href}
                        to={service.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`${mobileLinkClass(active)} block`}
                      >
                        {service.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              to="/gewerbe"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-current={isGewerbeActive ? "page" : undefined}
              className={mobileLinkClass(isGewerbeActive)}
            >
              Gewerbe
            </Link>

            <button
              type="button"
              onClick={() => {
                setIsContactOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className={`${mobileLinkClass(false)} text-left`}
            >
              Kontakt
            </button>

            <div className="pt-4 border-t border-border flex flex-col gap-3">
              <Button variant="hero" className="w-full" asChild>
                <a
                  href="tel:+491632373108"
                  onClick={() => {
                    if (typeof window !== "undefined" && (window as any).gtag) {
                      (window as any).gtag("event", "conversion", {
                        send_to: "AW-18104648983/Y5YPCM_pwZ8cEJeK_LhD",
                      });
                    }
                  }}
                >
                  <Phone className="w-4 h-4" />
                  +49 163 2373108
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}

      {/* Contact Modal */}
      <ContactModal open={isContactOpen} onOpenChange={setIsContactOpen} />
    </header>
  );
}
