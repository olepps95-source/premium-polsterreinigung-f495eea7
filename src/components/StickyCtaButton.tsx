import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSelectedServices } from '@/contexts/SelectedServicesContext';

// Helper to extract numeric price
const parseNumericPrice = (priceString: string): number => {
  const match = priceString.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

export function StickyCtaButton() {
  const { getTotalQuantity, getSelectedServices } = useSelectedServices();
  const hasSelectedServices = getTotalQuantity() > 0;
  const [isFormVisible, setIsFormVisible] = useState(false);

  const totalPrice = getSelectedServices().reduce((sum, service) => {
    const numericPrice = parseNumericPrice(service.price);
    return sum + (numericPrice * service.quantity);
  }, 0);

  useEffect(() => {
    const formSection = document.getElementById('kontakt');
    if (!formSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFormVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(formSection);
    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('kontakt');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const firstInput = contactSection.querySelector('input');
        if (firstInput) {
          firstInput.focus();
        }
      }, 800);
    }
  };

  if (!hasSelectedServices || isFormVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 pb-[calc(env(safe-area-inset-bottom,16px)+16px)] pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <Button
          onClick={scrollToContact}
          variant="cta"
          size="xl"
          className="w-full shadow-lg"
        >
          Weiter zur Anfrage
          {totalPrice > 0 && <span className="ml-1">– ab {totalPrice} €</span>}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
