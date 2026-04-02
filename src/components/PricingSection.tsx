import { Armchair, Sofa, BedDouble, Square, LayoutGrid, Minus, Plus, Wind, Fan, Bed } from 'lucide-react';
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
const POLSTER_IDS = ['sessel', 'sofa-2-sitzer', 'sofa-3-sitzer', 'eckcouch', 'eckcouch-gross'];
const MATRATZEN_IDS = ['matratze-90', 'matratze-140', 'matratze-180', 'bettrahmen'];
const SONSTIGES_IDS = ['hocker-klein', 'hocker-gross', 'autositz', 'kuechenstuhl', 'buerostuhl', 'teppich-bis-10', 'teppich-ueber-10', 'geruchsentfernung', 'trocknung'];

function getIconSizeClass(itemId: string) {
  if (itemId === 'sofa-3-sitzer') return 'w-[6.75rem] h-[6.75rem] md:w-[7.875rem] md:h-[7.875rem]';
  if (itemId === 'eckcouch-gross') return 'w-[4.5rem] h-[4.5rem] md:w-[5.25rem] md:h-[5.25rem]';
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

  return (
    <div
      className={`bg-card rounded-2xl p-4 md:p-6 shadow-soft border-2 flex flex-col items-center text-center transition-all duration-200 hover:shadow-md ${
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
          onClick={() => onQuantityChange(item.id, -1)}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-muted border border-border hover:bg-accent hover:border-primary/30 flex items-center justify-center transition-colors duration-200"
          aria-label="Menge verringern"
        >
          <Minus className="w-4 h-4 md:w-5 md:h-5 text-foreground" strokeWidth={2.5} />
        </button>
        <span className="w-8 text-center text-lg md:text-xl font-semibold text-foreground">{quantity}</span>
        <button
          onClick={() => onQuantityChange(item.id, 1)}
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
  const { quantities, setQuantities, priceItems, getTotalQuantity } = useSelectedServices();
  const isMobile = useIsMobile();

  const handleQuantityChange = (itemId: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[itemId] || 0;
      const newValue = Math.max(0, current + delta);
      return { ...prev, [itemId]: newValue };
    });
  };

  const handleCardClick = (itemId: string) => {
    handleQuantityChange(itemId, 1);
  };

  const totalQuantity = getTotalQuantity();

  const filterItems = (ids: string[]) => priceItems.filter(item => ids.includes(item.id));

  return (
    <section id="preise" className="pt-16 pb-10 bg-secondary/30">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-8">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">Preisliste</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Transparente Preise</h2>
          <p className="text-lg text-muted-foreground">
            Kostenlose Beratung vorab.<br />Transparenter Preis – ohne Überraschungen.
          </p>
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
                <PriceGrid items={filterItems(POLSTER_IDS)} quantities={quantities} onQuantityChange={handleQuantityChange} onClick={handleCardClick} />
              </TabsContent>
              <TabsContent value="matratzen">
                <PriceGrid items={filterItems(MATRATZEN_IDS)} quantities={quantities} onQuantityChange={handleQuantityChange} onClick={handleCardClick} />
              </TabsContent>
              <TabsContent value="sonstiges">
                <PriceGrid items={filterItems(SONSTIGES_IDS)} quantities={quantities} onQuantityChange={handleQuantityChange} onClick={handleCardClick} />
              </TabsContent>
            </Tabs>
          ) : (
            <PriceGrid items={priceItems} quantities={quantities} onQuantityChange={handleQuantityChange} onClick={handleCardClick} />
          )}

          {/* CTA Button */}
          <div className="flex justify-center mt-10">
            <button
              onClick={() => {
                trackContact();
                window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
              }}
              className="inline-flex items-center justify-center gap-3 px-6 py-4 md:px-10 md:py-5 bg-[#25D366] hover:bg-[#20BD5A] active:scale-[0.98] text-white font-bold text-base md:text-xl rounded-2xl shadow-2xl shadow-[#25D366]/30 transition-all duration-200 hover:shadow-[#25D366]/40 hover:-translate-y-0.5"
            >
              <svg className="w-6 h-6 md:w-7 md:h-7 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Kostenlose Preisanfrage
            </button>
          </div>
        </div>

        {totalQuantity > 0 && <div className="h-20" />}
      </div>
    </section>
  );
}
