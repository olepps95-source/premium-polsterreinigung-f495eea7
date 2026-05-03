import { createContext, useContext, useState, ReactNode } from 'react';
import { usePrices, Price } from '@/hooks/usePrices';

export interface PriceItem {
  id: string;
  title: string;
  price: string;
}

export interface SelectedService extends PriceItem {
  quantity: number;
}

interface SelectedServicesContextType {
  quantities: Record<string, number>;
  setQuantities: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  priceItems: PriceItem[];
  getSelectedServices: () => SelectedService[];
  getTotalQuantity: () => number;
  clearSelections: () => void;
  isLoading: boolean;
}

const SelectedServicesContext = createContext<SelectedServicesContextType | undefined>(undefined);

// Fallback data for initial render (before DB loads)
const fallbackPriceItems: PriceItem[] = [
  { id: 'sessel', title: 'Sessel', price: '40 €' },
  { id: 'sofa-2-sitzer', title: 'Sofa 2-Sitzer', price: '90 €' },
  { id: 'sofa-3-sitzer', title: 'Sofa 3-Sitzer', price: '110 €' },
  { id: 'eckcouch', title: 'Eckcouch', price: '130 €' },
  { id: 'eckcouch-gross', title: 'Eckcouch groß', price: '160 €' },
  { id: 'p-sofa', title: 'P-förmiges Sofa', price: '190 €' },
  { id: 'matratze-90', title: 'Matratze 90 cm', price: '60 €' },
  { id: 'matratze-140', title: 'Matratze 140 cm', price: '90 €' },
  { id: 'matratze-180', title: 'Matratze 180 cm', price: '120 €' },
  { id: 'bettrahmen', title: 'Bettrahmen / Bettpolster', price: '70 €' },
  { id: 'hocker-klein', title: 'Kleiner Hocker', price: '30 €' },
  { id: 'hocker-gross', title: 'Großer Hocker', price: '40 €' },
  { id: 'autositz', title: 'Autositz', price: '20 €' },
  { id: 'kuechenstuhl', title: 'Küchenstuhl', price: '15 €' },
  { id: 'buerostuhl', title: 'Bürostuhl', price: '20 €' },
  { id: 'teppich-bis-10', title: 'Teppichreinigung bis 10 m²', price: '10 € pro m²' },
  { id: 'teppich-ueber-10', title: 'Teppichreinigung über 10 m²', price: 'Preis nach Absprache' },
  { id: 'geruchsentfernung', title: 'Geruchsentfernung', price: '30 € pro m²' },
  { id: 'trocknung', title: 'Vollständige Trocknung', price: '+30 %' },
];

// Transform DB price to PriceItem format
const transformPrice = (price: Price): PriceItem => ({
  id: price.id,
  title: price.title,
  price: price.price,
});

export function SelectedServicesProvider({ children }: { children: ReactNode }) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const { data: dbPrices, isLoading } = usePrices();
  
  // Use DB prices if available, otherwise fallback
  const priceItems: PriceItem[] = dbPrices && dbPrices.length > 0
    ? dbPrices.map(transformPrice)
    : fallbackPriceItems;

  const getSelectedServices = (): SelectedService[] => {
    return priceItems
      .filter(item => (quantities[item.id] || 0) > 0)
      .map(item => ({
        ...item,
        quantity: quantities[item.id] || 0,
      }));
  };

  const getTotalQuantity = (): number => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };

  const clearSelections = () => {
    setQuantities({});
  };

  return (
    <SelectedServicesContext.Provider 
      value={{ 
        quantities, 
        setQuantities, 
        priceItems,
        getSelectedServices, 
        getTotalQuantity, 
        clearSelections,
        isLoading,
      }}
    >
      {children}
    </SelectedServicesContext.Provider>
  );
}

export function useSelectedServices(): SelectedServicesContextType {
  const context = useContext(SelectedServicesContext);
  if (context === undefined) {
    throw new Error('useSelectedServices must be used within a SelectedServicesProvider');
  }
  return context;
}
