import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { trackGoogleAdsConversion } from "@/lib/google-ads";
import { trackContact } from "@/lib/meta-pixel";
import reinwerkLogo from "@/assets/reinwerk-logo.png";

type NavLink = { label: string; href: string; action?: "contact-modal" };

const navLinks: NavLink[] = [
  { label: "Polsterreinigung", href: "/" },
  { label: "Teppichbodenreinigung", href: "/teppichbodenreinigung" },
  { label: "Gewerbe", href: "/gewerbe" },
  { label: "Fensterreinigung", href: "/fensterreinigung" },
  { label: "Kontakt", href: "#", action: "contact-modal" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isTeppich = location.pathname === "/teppichbodenreinigung";
  const isFenster = location.pathname === "/fensterreinigung";

  const isActive = (link: NavLink) => !link.action && link.href === location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-soft border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className={`container mx-auto flex items-center justify-between ${isTeppich ? "py-2 md:py-4" : "py-4"}`}>
        <a href="/" onClick={handleLogoClick} className={`flex items-center cursor-pointer ${isTeppich ? "gap-2 md:gap-3" : "gap-3"}`}>
          <img
            src={reinwerkLogo}
            alt="ReinWerk Logo – Polsterreinigung Sachsen"
            className={`object-contain ${isTeppich ? "h-7 w-7 md:h-10 md:w-10" : "h-8 w-8 md:h-10 md:w-10"}`}
          />
          <span className={`font-bold tracking-tight text-2xl md:text-3xl whitespace-nowrap ${
            isTeppich && isScrolled ? "text-black md:text-rw-dark" : isFenster && !isScrolled ? "text-white md:text-rw-dark" : "text-rw-dark"
          }`}>
            Rein<span className="text-rw-blue">Werk</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8">
          {navLinks.map((link) => {
            const active = isActive(link);
            const className = `text-xs lg:text-sm font-bold whitespace-nowrap transition-colors ${
              active ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
            }`;
            if (link.action === "contact-modal") {
              return (
                <button key={link.label} type="button" onClick={() => setIsContactOpen(true)} className={className}>
                  {link.label}
                </button>
              );
            }
            return (
              <Link key={link.label} to={link.href} aria-current={active ? "page" : undefined} className={className}>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="hero" size="sm" asChild>
            <a
              href="tel:+491632373108"
              onClick={() => {
                if (typeof window !== "undefined" && (window as any).gtag) {
                  (window as any).gtag("event", "click_call", {
                    event_category: "contact",
                    event_label: "phone_click",
                  });
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden flex items-center justify-center min-w-[44px] min-h-[44px] ${isTeppich ? "p-1.5" : "p-2"} ${
            isTeppich && isScrolled ? "text-black" : isFenster && !isScrolled ? "text-white md:text-foreground" : "text-foreground"
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
            {navLinks.map((link) => {
              const active = isActive(link);
              const className = `text-base font-bold transition-colors py-2 ${
                active
                  ? "text-primary font-bold"
                  : isTeppich && isScrolled
                    ? "text-rw-dark hover:text-black focus:text-black active:text-black"
                    : (isTeppich || (isFenster && !isScrolled))
                      ? "text-white hover:text-white focus:text-white active:text-white"
                      : "text-foreground hover:text-primary"
              }`;
              if (link.action === "contact-modal") {
                return (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => {
                      setIsContactOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`${className} text-left`}
                  >
                    {link.label}
                  </button>
                );
              }
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={className}
                >
                  {link.label}
                </Link>
              );
            })}
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
      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="sm:max-w-md bg-background rounded-2xl shadow-2xl border-0 top-[10%] translate-y-0 sm:top-[15%]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">Kontakt ReinWerk</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 pt-2">
            <a
              href="tel:+491632373108"
              onClick={() => {
                trackContact();
              }}
              className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary hover:bg-secondary/50 transition-all group"
            >
              <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Telefon</span>
                <span className="text-base font-semibold text-foreground">Jetzt anrufen</span>
              </div>
            </a>

            <a
              href="mailto:info@reinwerk-service.de"
              onClick={() => {
                trackContact();
              }}
              className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary hover:bg-secondary/50 transition-all group"
            >
              <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">E-Mail</span>
                <span className="text-base font-semibold text-foreground">E-Mail senden</span>
              </div>
            </a>

            <a
              href="https://api.whatsapp.com/send/?phone=491636986317&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackContact();
              }}
              className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-[#25D366] hover:bg-secondary/50 transition-all group"
            >
              <div className="w-11 h-11 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">WhatsApp</span>
                <span className="text-base font-semibold text-foreground">WhatsApp schreiben</span>
              </div>
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
