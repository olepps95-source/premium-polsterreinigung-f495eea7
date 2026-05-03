import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useSelectedServices } from '@/contexts/SelectedServicesContext';

const parseNumericPrice = (priceString: string): number => {
  const match = priceString.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

export function StickyCtaButton() {
  const { getTotalQuantity, getSelectedServices } = useSelectedServices();
  const hasSelectedServices = getTotalQuantity() > 0;
  const totalPrice = getSelectedServices().reduce(
    (sum, s) => sum + parseNumericPrice(s.price) * s.quantity,
    0
  );
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const formSection = document.getElementById('kontakt');
    if (!formSection) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsFormVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(formSection);
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target =
      document.getElementById('kontaktformular') ||
      document.getElementById('kontakt');
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!hasSelectedServices || isFormVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 pb-[calc(env(safe-area-inset-bottom,16px)+16px)] pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <Button
          size="xl"
          onClick={handleClick}
          className="w-full shadow-lg bg-primary hover:bg-primary text-primary-foreground font-bold text-lg"
        >
          <span className="text-lg font-bold">Weiter zu Kontaktdaten ({totalPrice} €)</span>
        </Button>
      </div>
    </div>
  );
}
