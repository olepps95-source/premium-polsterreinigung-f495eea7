import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import reinwerkLogo from '@/assets/reinwerk-logo.jpg';

const navLinks = [
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Preise', href: '#preise' },
  { label: 'Vorher–Nachher', href: '#vorher-nachher' },
  { label: 'Bewertungen', href: '#bewertungen' },
  { label: 'Einsatzgebiet', href: '#einsatzgebiet' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-soft border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4">
        <a href="/" onClick={handleLogoClick} className="flex items-center gap-3 cursor-pointer">
          <img 
            src={reinwerkLogo} 
            alt="ReinWerk Logo – Polsterreinigung Sachsen" 
            className="h-8 w-8 md:h-10 md:w-10 object-contain"
          />
          <span className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
            Rein<span className="text-primary">Werk</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="hero" size="sm" asChild>
            <a
              href="tel:+491636986317"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'click_call', {
                    event_category: 'contact',
                    event_label: 'phone_click',
                  });
                  (window as any).gtag('event', 'conversion', {
                    send_to: 'AW-18104648983/Y5YPCM_pwZ8cEJeK_LhD',
                  });
                }
              }}
            >
              <Phone className="w-4 h-4" />
              +49 163 6986317
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label="Menü öffnen"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-lg border-t border-border animate-fade-in">
          <nav className="container mx-auto py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-border flex flex-col gap-3">
              <Button variant="hero" className="w-full" asChild>
                <a
                  href="tel:+491636986317"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'conversion', {
                        send_to: 'AW-18104648983/Y5YPCM_pwZ8cEJeK_LhD',
                      });
                    }
                  }}
                >
                  <Phone className="w-4 h-4" />
                  +49 163 6986317
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
