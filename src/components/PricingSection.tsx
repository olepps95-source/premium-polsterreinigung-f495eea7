import { Armchair, Sofa, BedDouble, Square, LayoutGrid, Minus, Plus, Wind, Fan, Bed, MessageCircle } from 'lucide-react';
import { trackContact } from '@/lib/meta-pixel';
import { useSelectedServices, PriceItem } from '@/contexts/SelectedServicesContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ecksofaGrossIcon from '@/assets/ecksofa-gross-icon.svg';
import sofa3SitzerIcon from '@/assets/sofa-3-sitzer-icon.svg';
import autositzIcon from '@/assets/autositz-icon.svg';
import kuechenstuhlIcon from '@/assets/kuechenstuhl-icon.svg';
import buerostuhlIcon from '@/assets/buerostuhl-icon.svg';
import React from 'react';

const WHATSAPP_URL = 'https://api.whatsapp.com/message/5SVXIYHUNM7LN1?autoload=1&app_absent=0';

// --- Icon Components ---
const Sofa3SitzerIcon = ({ className }: { className?: string }) => (
  <img src={sofa3SitzerIcon} alt="Sofa 3-Sitzer" className={className} />
);
const AutositzIcon = ({ className }: { className?: string }) => (
  <img src={autositzIcon} alt="Autositz" className={className} />
);
const EcksofaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8 16 C4 16 2 18 2 22 L2 34 C2 37 4 39 7 39 L7 42" />
    <path d="M8 16 L8 10 C8 7 10 5 13 5 L62 5 C65 5 67 7 67 10 L67 16" />
    <path d="M8 39 L55 39 L55 32" />
    <path d="M26 5 L26 16" /><path d="M44 5 L44 16" />
    <path d="M8 22 L67 22" />
    <path d="M67 16 L67 22 L98 22 L98 39 C98 42 96 44 93 44 L60 44 C57 44 55 42 55 39" />
    <path d="M67 32 L93 32" />
    <circle cx="7" cy="44" r="2" fill="currentColor" />
    <circle cx="60" cy="46" r="2" fill="currentColor" />
    <circle cx="93" cy="46" r="2" fill="currentColor" />
  </svg>
);
const EcksofaGrossIcon = ({ className }: { className?: string }) => (
  <img src={ecksofaGrossIcon} alt="Ecksofa groß" className={className} />
);
const PSofaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 120 50" fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Left chaise */}
    <path d="M8 16 C4 16 2 18 2 22 L2 34 C2 37 4 39 7 39 L7 42" />
    <path d="M8 16 L8 10 C8 7 10 5 13 5 L30 5 C33 5 35 7 35 10 L35 16" />
    <path d="M8 39 L30 39 L30 32" />
    <path d="M8 22 L35 22" />
    {/* Middle 3-seater */}
    <path d="M35 16 L35 10 C35 7 37 5 40 5 L80 5 C83 5 85 7 85 10 L85 16" />
    <path d="M35 22 L85 22" />
    <path d="M50 5 L50 16" /><path d="M65 5 L65 16" />
    <path d="M30 32 L85 32" />
    {/* Right chaise */}
    <path d="M85 16 L85 22 L118 22 L118 34 C118 37 116 39 113 39 L113 42" />
    <path d="M85 32 L85 39 L113 39" />
    {/* Feet */}
    <circle cx="7" cy="44" r="2" fill="currentColor" />
    <circle cx="30" cy="46" r="2" fill="currentColor" />
    <circle cx="85" cy="46" r="2" fill="currentColor" />
    <circle cx="113" cy="44" r="2" fill="currentColor" />
  </svg>
);
const KuechenstuhlIcon = ({ className }: { className?: string }) => (
  <img src={kuechenstuhlIcon} alt="Küchenstuhl" className={className} />
);
const BuerostuhlIcon = ({ className }: { className?: string }) => (
  <img src={buerostuhlIcon} alt="Bürostuhl" className={className} />
);
const HockerKleinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8 18 C8 14 10 12 14 12 L34 12 C38 12 40 14 40 18 L40 24 C40 28 38 30 34 30 L14 30 C10 30 8 28 8 24 Z" />
    <path d="M24 12 L24 30" /><path d="M12 30 L10 40" /><path d="M36 30 L38 40" />
    <circle cx="10" cy="41" r="1.5" fill="currentColor" /><circle cx="38" cy="41" r="1.5" fill="currentColor" />
  </svg>
);
const HockerGrossIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 16 C4 12 6 10 10 10 L38 10 C42 10 44 12 44 16 L44 24 C44 28 42 30 38 30 L10 30 C6 30 4 28 4 24 Z" />
    <path d="M16 10 L16 30" /><path d="M32 10 L32 30" />
    <path d="M10 30 L8 40" /><path d="M24 30 L24 40" /><path d="M38 30 L40 40" />
    <circle cx="8" cy="41" r="1.5" fill="currentColor" /><circle cx="24" cy="41" r="1.5" fill="currentColor" /><circle cx="40" cy="41" r="1.5" fill="currentColor" />
  </svg>
);

const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number | string }>> = {
  'sessel': Armchair as React.ComponentType<{ className?: string; strokeWidth?: number | string }>,
  'sofa-2-sitzer': Sofa as React.ComponentType<{ className?: string; strokeWidth?: number | string }>,
  'sofa-3-sitzer': Sofa3SitzerIcon,
  'eckcouch': EcksofaIcon,
  'eckcouch-gross': EcksofaGrossIcon,
  'p-sofa': PSofaIcon,
  'matratze-90': BedDouble as React.ComponentType<{ className?: string; strokeWidth?: number | string }>,
  'matratze-140': BedDouble as React.ComponentType<{ className?: string; strokeWidth?: number | string }>,
  'matratze-180': BedDouble as React.ComponentType<{ className?: string; strokeWidth?: number | string }>,
  'bettrahmen': Bed as React.ComponentType<{ className?: string; strokeWidth?: number | string }>,
  'hocker-klein': HockerKleinIcon,
  'hocker-gross': HockerGrossIcon,
  'autositz': AutositzIcon,
  'kuechenstuhl': KuechenstuhlIcon,
  'buerostuhl': BuerostuhlIcon,
  'teppich-bis-10': Square as React.ComponentType<{ className?: string; strokeWidth?: number | string }>,
  'teppich-ueber-10': LayoutGrid as React.ComponentType<{ className?: string; strokeWidth?: number | string }>,
  'geruchsentfernung': Wind as React.ComponentType<{ className?: string; strokeWidth?: number | string }>,
  'trocknung': Fan as React.ComponentType<{ className?: string; strokeWidth?: number | string }>,
};

const FallbackIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
  </svg>
);

// Category definitions for mobile tabs
const POLSTER_IDS = ['sessel', 'sofa-2-sitzer', 'sofa-3-sitzer', 'eckcouch', 'eckcouch-gross', 'p-sofa'];
const MATRATZEN_IDS = ['matratze-90', 'matratze-140', 'matratze-180', 'bettrahmen'];
const SONSTIGES_IDS = ['hocker-klein', 'hocker-gross', 'autositz', 'kuechenstuhl', 'buerostuhl', 'teppich-bis-10', 'teppich-ueber-10', 'geruchsentfernung', 'trocknung'];

function getIconSizeClass(itemId: string) {
  if (itemId === 'sofa-3-sitzer') return 'w-[6.75rem] h-[6.75rem] md:w-[7.875rem] md:h-[7.875rem]';
  if (itemId === 'eckcouch-gross') return 'w-[4.5rem] h-[4.5rem] md:w-[5.25rem] md:h-[5.25rem]';
  if (itemId === 'p-sofa') return 'w-[5.5rem] h-[5.5rem] md:w-[6.5rem] md:h-[6.5rem]';
  if (['autositz', 'kuechenstuhl', 'buerostuhl'].includes(itemId)) return 'w-[4.5rem] h-[4.5rem] md:w-[5.25rem] md:h-[5.25rem]';
  return 'w-12 h-12 md:w-14 md:h-14';
}

// Helper to extract numeric price from display string
const parseNumericPrice = (priceString: string): number => {
  const match = priceString.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

function PriceCard({ item, quantity, onQuantityChange }: {
  item: PriceItem;
  quantity: number;
  onQuantityChange: (id: string, delta: number) => void;
}) {
  const isSelected = quantity > 0;
  const Icon = iconMap[item.id] || FallbackIcon;
  const numericPrice = parseNumericPrice(item.price);
  const itemTotal = numericPrice * quantity;

  const handleCardClick = () => {
    onQuantityChange(item.id, 1);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`bg-card rounded-2xl p-4 md:p-6 shadow-soft border-2 flex flex-col items-center text-center transition-all duration-200 hover:shadow-md cursor-pointer select-none ${
        isSelected
          ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
          : 'border-border/50 hover:border-primary/30'
      }`}
    >
      <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-200 ${
        isSelected ? 'bg-primary/10' : 'bg-accent/50'
      }`}>
        <Icon className={`text-primary ${getIconSizeClass(item.id)}`} strokeWidth={1.5} />
      </div>
      <h4 className="text-sm md:text-lg font-semibold text-foreground mb-2">{item.title}</h4>
      <p className="text-base md:text-xl font-bold text-primary mb-1">{item.price}</p>
      {isSelected && numericPrice > 0 && (
        <p className="text-xs md:text-sm text-muted-foreground mb-3">
          {quantity} × {numericPrice} € = <span className="font-semibold text-foreground">{itemTotal} €</span>
        </p>
      )}
      {(!isSelected || numericPrice === 0) && <div className="mb-3" />}
      <div className="flex items-center gap-3">
        <button
          onClick={(e) => { e.stopPropagation(); onQuantityChange(item.id, -1); }}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-muted border border-border hover:bg-accent hover:border-primary/30 flex items-center justify-center transition-colors duration-200"
          aria-label="Menge verringern"
        >
          <Minus className="w-4 h-4 md:w-5 md:h-5 text-foreground" strokeWidth={2.5} />
        </button>
        <span className="w-8 text-center text-lg md:text-xl font-semibold text-foreground">{quantity}</span>
        <button
          onClick={(e) => { e.stopPropagation(); onQuantityChange(item.id, 1); }}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center transition-colors duration-200"
          aria-label="Menge erhöhen"
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

function PriceGrid({ items, quantities, onQuantityChange }: {
  items: PriceItem[];
  quantities: Record<string, number>;
  onQuantityChange: (id: string, delta: number) => void;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {items.map((item) => (
        <PriceCard
          key={item.id}
          item={item}
          quantity={quantities[item.id] || 0}
          onQuantityChange={onQuantityChange}
        />
      ))}
    </div>
  );
}

export function PricingSection() {
  const { quantities, setQuantities, priceItems, getTotalQuantity, getSelectedServices } = useSelectedServices();
  const isMobile = useIsMobile();

  const handleQuantityChange = (itemId: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[itemId] || 0;
      const newValue = Math.max(0, current + delta);
      return { ...prev, [itemId]: newValue };
    });
  };

  const totalQuantity = getTotalQuantity();

  // Calculate total price from all selected services
  const totalPrice = getSelectedServices().reduce((sum, service) => {
    const numericPrice = parseNumericPrice(service.price);
    return sum + (numericPrice * service.quantity);
  }, 0);

  const filterItems = (ids: string[]) => priceItems.filter(item => ids.includes(item.id));

  const scrollToContact = () => {
    const contactSection = document.getElementById('kontakt');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const firstInput = contactSection.querySelector('input');
        if (firstInput) firstInput.focus();
      }, 800);
    }
  };

  return (
    <section id="preise" className="pt-10 pb-6 bg-secondary/30">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-6">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Preisliste</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Transparente Preise</h2>
        </div>

        {/* Price Content */}
        <div className="max-w-5xl mx-auto">
          {isMobile ? (
            <Tabs defaultValue="polster" className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-6 h-12 bg-muted/80 rounded-xl p-1">
                <TabsTrigger
                  value="polster"
                  className="rounded-lg text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-200"
                >
                  Polster
                </TabsTrigger>
                <TabsTrigger
                  value="matratzen"
                  className="rounded-lg text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-200"
                >
                  Matratzen
                </TabsTrigger>
                <TabsTrigger
                  value="sonstiges"
                  className="rounded-lg text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-200"
                >
                  Sonstiges
                </TabsTrigger>
              </TabsList>
              <TabsContent value="polster">
                <PriceGrid items={filterItems(POLSTER_IDS)} quantities={quantities} onQuantityChange={handleQuantityChange} />
              </TabsContent>
              <TabsContent value="matratzen">
                <PriceGrid items={filterItems(MATRATZEN_IDS)} quantities={quantities} onQuantityChange={handleQuantityChange} />
              </TabsContent>
              <TabsContent value="sonstiges">
                <PriceGrid items={filterItems(SONSTIGES_IDS)} quantities={quantities} onQuantityChange={handleQuantityChange} />
              </TabsContent>
            </Tabs>
          ) : (
            <PriceGrid items={priceItems} quantities={quantities} onQuantityChange={handleQuantityChange} />
          )}

          {/* WhatsApp CTA Button */}
          <div className="flex flex-col items-center mt-10 gap-2">
            <a
              href="https://api.whatsapp.com/message/5SVXIYHUNM7LN1?autoload=1&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackContact();
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'conversion', {
                    send_to: 'AW-18104648983/Y5YPCM_pwZ8cEJeK_LhD',
                  });
                }
              }}
              className="inline-flex items-center justify-center gap-3 px-6 py-4 md:px-10 md:py-5 bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.98] text-white font-bold text-lg md:text-2xl rounded-2xl shadow-2xl shadow-[#25D366]/30 transition-all duration-200 hover:shadow-[#25D366]/40 hover:-translate-y-0.5 w-full md:w-auto"
            >
              <MessageCircle className="w-6 h-6 md:w-7 md:h-7 flex-shrink-0" />
              WhatsApp schreiben
            </a>
            <p className="text-sm text-muted-foreground">Antwort meist innerhalb weniger Minuten</p>
          </div>
        </div>

        {totalQuantity > 0 && <div className="h-20" />}
      </div>
    </section>
  );
}
