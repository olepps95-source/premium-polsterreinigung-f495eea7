import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSelectedServices } from '@/contexts/SelectedServicesContext';
import { trackContact } from '@/lib/meta-pixel';
import { trackGoogleAdsConversion } from '@/lib/google-ads';

const parseNumericPrice = (priceString: string): number => {
  const match = priceString.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

export function StickyCtaButton() {
  const { getTotalQuantity, getSelectedServices } = useSelectedServices();
  const hasSelectedServices = getTotalQuantity() > 0;
  const [isFormVisible, setIsFormVisible] = useState(false);

  const selectedServices = getSelectedServices();
  const totalPrice = selectedServices.reduce((sum, service) => {
    return sum + (parseNumericPrice(service.price) * service.quantity);
  }, 0);

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

  const buildWhatsAppUrl = () => {
    const phone = '491632373108';
    let message = 'Hallo, ich möchte eine Preisbewertung für meine Polsterreinigung. Ich sende Ihnen gleich ein Foto.';

    if (selectedServices.length > 0) {
      const servicesList = selectedServices
        .map(s => `${s.title} (${s.quantity}x)`)
        .join(', ');
      message = `Hallo, ich interessiere mich für folgende Leistungen: ${servicesList}.`;
      if (totalPrice > 0) {
        message += ` Gesamtpreis: ${totalPrice} €.`;
      }
      message += ' Ich sende Ihnen gleich ein Foto.';
    }

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  if (!hasSelectedServices || isFormVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 pb-[calc(env(safe-area-inset-bottom,16px)+16px)] pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <Button
          asChild
          size="xl"
          className="w-full shadow-lg bg-[#25D366] hover:bg-[#25D366] text-white font-bold text-base"
        >
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackContact();
              trackGoogleAdsConversion();
            }}
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp schreiben
          </a>
        </Button>
      </div>
    </div>
  );
}
