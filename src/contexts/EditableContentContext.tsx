import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { priceItemsData, PriceItem } from './SelectedServicesContext';

export interface EditablePriceItem extends PriceItem {
  // Editable fields
}

interface EditableContentContextType {
  prices: EditablePriceItem[];
  updatePrice: (id: string, price: string, numericPrice: number) => void;
  updateTitle: (id: string, title: string) => void;
  resetToDefaults: () => void;
  hasChanges: boolean;
}

const STORAGE_KEY = 'reinwerk_editable_prices';

const EditableContentContext = createContext<EditableContentContextType | undefined>(undefined);

export function EditableContentProvider({ children }: { children: ReactNode }) {
  const [prices, setPrices] = useState<EditablePriceItem[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return priceItemsData;
      }
    }
    return priceItemsData;
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prices));
    
    // Check if different from defaults
    const isChanged = JSON.stringify(prices) !== JSON.stringify(priceItemsData);
    setHasChanges(isChanged);
  }, [prices]);

  const updatePrice = (id: string, price: string, numericPrice: number) => {
    setPrices(prev => prev.map(item => 
      item.id === id ? { ...item, price, numericPrice } : item
    ));
  };

  const updateTitle = (id: string, title: string) => {
    setPrices(prev => prev.map(item => 
      item.id === id ? { ...item, title } : item
    ));
  };

  const resetToDefaults = () => {
    setPrices(priceItemsData);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <EditableContentContext.Provider value={{ prices, updatePrice, updateTitle, resetToDefaults, hasChanges }}>
      {children}
    </EditableContentContext.Provider>
  );
}

export function useEditableContent(): EditableContentContextType {
  const context = useContext(EditableContentContext);
  if (context === undefined) {
    throw new Error('useEditableContent must be used within an EditableContentProvider');
  }
  return context;
}
