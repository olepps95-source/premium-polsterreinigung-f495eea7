import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface PriceItem {
  id: string;
  title: string;
  price: string;
  numericPrice: number;
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
  getTotalPrice: () => number;
  clearSelections: () => void;
}

const SelectedServicesContext = createContext<SelectedServicesContextType | undefined>(undefined);

// Default price items - base values
export const priceItemsData: PriceItem[] = [
  { id: 'sessel', title: 'Sessel', price: '40 €', numericPrice: 40 },
  { id: 'sofa-2', title: 'Sofa 2-Sitzer', price: '90 €', numericPrice: 90 },
  { id: 'sofa-3', title: 'Sofa 3-Sitzer', price: '110 €', numericPrice: 110 },
  { id: 'ecksofa', title: 'ECKCOUCH', price: '130 €', numericPrice: 130 },
  { id: 'ecksofa-gross', title: 'ECKCOUCH, groß', price: '160 €', numericPrice: 160 },
  { id: 'matratze-90', title: 'Matratze 90 cm', price: '60 €', numericPrice: 60 },
  { id: 'matratze-140', title: 'Matratze 140 cm', price: '90 €', numericPrice: 90 },
  { id: 'matratze-180', title: 'Matratze 180 cm', price: '120 €', numericPrice: 120 },
  { id: 'bettrahmen', title: 'Bettrahmen / Bettpolster', price: '70 €', numericPrice: 70 },
  { id: 'hocker-klein', title: 'Kleiner Hocker', price: '30 €', numericPrice: 30 },
  { id: 'hocker-gross', title: 'Großer Hocker', price: '40 €', numericPrice: 40 },
  { id: 'autositz', title: 'Autositz', price: '20 €', numericPrice: 20 },
  { id: 'kuechenstuhl', title: 'Küchenstuhl', price: '15 €', numericPrice: 15 },
  { id: 'buerostuhl', title: 'Bürostuhl', price: '20 €', numericPrice: 20 },
  { id: 'teppich-klein', title: 'Teppich (bis 10 m²)', price: '10 € pro m²', numericPrice: 10 },
  { id: 'teppich-gross', title: 'Teppich (über 10 m²)', price: 'Preis nach Absprache', numericPrice: 0 },
  { id: 'geruchsentfernung', title: 'Geruchsentfernung', price: '30 € pro m²', numericPrice: 30 },
  { id: 'trocknung', title: 'Vollständige Trocknung', price: '+30 %', numericPrice: 0 },
];

const STORAGE_KEY = 'reinwerk_editable_prices';

export function SelectedServicesProvider({ children }: { children: ReactNode }) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [priceItems, setPriceItems] = useState<PriceItem[]>(priceItemsData);

  // Load editable prices from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPriceItems(parsed);
      } catch {
        // Use defaults
      }
    }

    // Listen for storage changes (for real-time updates from admin)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setPriceItems(JSON.parse(e.newValue));
        } catch {
          // Ignore parse errors
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Also check for updates periodically (for same-tab updates)
  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setPriceItems(parsed);
        } catch {
          // Ignore
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

  const getTotalPrice = (): number => {
    return priceItems.reduce((sum, item) => {
      const qty = quantities[item.id] || 0;
      return sum + (qty * item.numericPrice);
    }, 0);
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
        getTotalPrice,
        clearSelections,
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
