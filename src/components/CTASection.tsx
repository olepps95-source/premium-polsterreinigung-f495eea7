import { useState, forwardRef, useImperativeHandle } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MessageCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { trackLead, trackContact } from '@/lib/meta-pixel';
import { useSelectedServices } from '@/contexts/SelectedServicesContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui/table';

export interface CTAFormHandle {
  setSelectedProduct: (product: string) => void;
}

// Helper function to parse numeric price from display string
const parseNumericPrice = (priceString: string): number => {
  // Extract first number from string like "40 €", "30 € pro m²", "+30 %"
  const match = priceString.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

export const CTASection = forwardRef<CTAFormHandle>((_, ref) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [validationError, setValidationError] = useState<string | null>(null);
  const { toast } = useToast();
  const { getSelectedServices, getTotalQuantity, clearSelections } = useSelectedServices();

  const selectedServices = getSelectedServices();
  const totalQuantity = getTotalQuantity();
  
  // Calculate total price from selected services
  const totalPrice = selectedServices.reduce((sum, service) => {
    const numericPrice = parseNumericPrice(service.price);
    return sum + (numericPrice * service.quantity);
  }, 0);

  useImperativeHandle(ref, () => ({
    setSelectedProduct: (_product: string) => {
      // Legacy method - no longer needed with new system
    },
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Generate human-readable summary of selected services
  const formatSelectedServicesText = (): string => {
    if (selectedServices.length === 0) return '';
    
    return selectedServices.map(service => {
      const numericPrice = parseNumericPrice(service.price);
      const rowTotal = service.quantity * numericPrice;
      const priceText = rowTotal > 0 ? `${rowTotal} €` : 'Preis nach Absprache';
      return `${service.title} ×${service.quantity} – ${priceText}`;
    }).join('\n');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    
    // Validate required fields: Name and Phone are required
    if (!formData.name.trim() || !formData.phone.trim()) {
      setValidationError('Bitte füllen Sie die Kontaktdaten aus, damit wir Sie erreichen können.');
      return;
    }

    // Generate human-readable selected services text
    const selectedServicesText = formatSelectedServicesText();

    // Build payload with form data and selected services
    const payload = {
      name: formData.name,
      phone: formData.phone,
      message: formData.message,
      selected_services: selectedServicesText,
      services: selectedServices.map(service => {
        const numericPrice = parseNumericPrice(service.price);
        return {
          title: service.title,
          quantity: service.quantity,
          price: service.price,
          numericPrice: numericPrice,
          rowTotal: service.quantity * numericPrice,
        };
      }),
      totalQuantity,
      totalPrice,
    };

    try {
      const response = await fetch('https://hook.eu1.make.com/6qrngo5mu6wekvqwj8eacelu9oefi9sv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast({
          title: "Anfrage erfolgreich gesendet!",
          description: "Wir melden uns schnellstmöglich bei Ihnen.",
        });

        // Track Lead event for Meta Pixel (only fires if consent granted)
        trackLead();

        // Clear form and selections
        setFormData({
          name: '',
          phone: '',
          message: '',
        });
        clearSelections();
      } else {
        toast({
          title: "Fehler beim Senden",
          description: "Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Fehler beim Senden",
        description: "Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="kontakt" className="py-16 bg-foreground text-primary-foreground">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bereit für saubere Polster?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Kontaktieren Sie uns noch heute und sichern Sie sich Ihren Wunschtermin. 
            Wir beraten Sie gerne unverbindlich.
          </p>

          {/* Contact Form */}
          <div id="kontaktformular" className="bg-background rounded-2xl p-8 md:p-10 mb-8 text-left">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Kontaktdaten
              </h3>
              <p className="text-muted-foreground">
                Füllen Sie das Formular aus und wir melden uns schnellstmöglich bei Ihnen.
              </p>
            </div>

            {/* Summary Table - only shown when services selected */}
            {selectedServices.length > 0 && (
              <div className="mb-6 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50">
                      <TableHead className="text-foreground font-semibold">Möbelstück</TableHead>
                      <TableHead className="text-foreground font-semibold text-center">Anzahl</TableHead>
                      <TableHead className="text-foreground font-semibold text-right">Einzelpreis</TableHead>
                      <TableHead className="text-foreground font-semibold text-right">Gesamtpreis</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedServices.map((service) => {
                      const numericPrice = parseNumericPrice(service.price);
                      const rowTotal = service.quantity * numericPrice;
                      return (
                        <TableRow key={service.id} className="border-border/50">
                          <TableCell className="text-foreground font-medium">{service.title}</TableCell>
                          <TableCell className="text-foreground text-center">{service.quantity}</TableCell>
                          <TableCell className="text-foreground text-right">{service.price}</TableCell>
                          <TableCell className="text-foreground text-right font-medium">
                            {rowTotal > 0 ? `ab ${rowTotal} €` : 'Nach Absprache'}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                  <TableFooter className="bg-accent/30">
                    <TableRow className="border-border/50">
                      <TableCell className="text-foreground font-bold">Gesamt</TableCell>
                      <TableCell className="text-foreground font-bold text-center">{totalQuantity}</TableCell>
                      <TableCell></TableCell>
                      <TableCell className="text-primary font-bold text-right">
                        {totalPrice > 0 ? `ab ${totalPrice} €` : 'Nach Absprache'}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>

              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Validation Error Message */}
              {validationError && (
                <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                  <p className="text-sm text-destructive font-medium">{validationError}</p>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground font-medium">
                  Name <span className="text-primary">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ihr vollständiger Name"
                  className="h-12 bg-card border-border/50 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground font-medium">
                  Telefonnummer <span className="text-primary">*</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="01636986317"
                  className="h-12 bg-card border-border/50 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-foreground font-medium">
                  Nachricht / zusätzliche Informationen
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Beschreiben Sie Ihr Anliegen oder teilen Sie uns weitere Details mit..."
                  className="min-h-[140px] bg-card border-border/50 focus:border-primary resize-none"
                />
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Mit dem Absenden des Formulars erkläre ich mich damit einverstanden, dass meine angegebenen Daten zum Zweck der Kontaktaufnahme und Bearbeitung meiner Anfrage verarbeitet werden. Ich kann diese Einwilligung jederzeit per E-Mail an{' '}
                <a href="mailto:info@reinwerk-service.de" className="text-primary hover:underline">
                  info@reinwerk-service.de
                </a>{' '}
                widerrufen.
              </p>

              <Button
                type="submit"
                variant="cta"
                size="xl"
                className="w-full"
              >
                <Send className="w-5 h-5" />
                Anfrage senden
              </Button>
            </form>
          </div>

          {/* WhatsApp Button */}
          <div className="flex justify-center mb-8">
            <Button variant="hero" size="xl" className="bg-[#25D366] text-white hover:bg-[#25D366]" asChild>
              <a 
                href="https://api.whatsapp.com/message/5SVXIYHUNM7LN1?autoload=1&app_absent=0" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => trackContact()}
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp schreiben
              </a>
            </Button>
          </div>

          <p className="text-sm text-primary-foreground/60">
            Einfach Foto per WhatsApp schicken – wir nennen Ihnen den Preis innerhalb von 5 Minuten
          </p>
        </div>
      </div>
    </section>
  );
});

CTASection.displayName = 'CTASection';
