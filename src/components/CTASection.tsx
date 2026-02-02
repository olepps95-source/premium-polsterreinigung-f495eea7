import { useState, forwardRef, useImperativeHandle } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MessageCircle, Send, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { trackLead, trackContact } from '@/lib/meta-pixel';
import { useSelectedServices } from '@/contexts/SelectedServicesContext';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
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

const cleaningOptions = [
  { value: 'sofa', label: 'Sofa' },
  { value: 'sessel', label: 'Sessel' },
  { value: 'matratze', label: 'Matratze' },
  { value: 'teppich', label: 'Teppich' },
  { value: 'sonstiges', label: 'Sonstiges' },
];

export const CTASection = forwardRef<CTAFormHandle>((_, ref) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    cleaningType: [] as string[],
  });
  const [validationError, setValidationError] = useState<string | null>(null);
  const { toast } = useToast();
  const { getSelectedServices, getTotalQuantity, getTotalPrice, clearSelections } = useSelectedServices();

  const selectedServices = getSelectedServices();
  const totalQuantity = getTotalQuantity();
  const totalPrice = getTotalPrice();

  useImperativeHandle(ref, () => ({
    setSelectedProduct: (_product: string) => {
      // Legacy method - no longer needed with new system
    },
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCleaningTypeChange = (values: string[]) => {
    setFormData(prev => ({ ...prev, cleaningType: values }));
  };

  // Generate human-readable summary of selected services
  const formatSelectedServicesText = (): string => {
    if (selectedServices.length === 0) return '';
    
    return selectedServices.map(service => {
      const rowTotal = service.quantity * service.numericPrice;
      const priceText = rowTotal > 0 ? `${rowTotal} €` : 'Preis nach Absprache';
      return `${service.title} ×${service.quantity} – ${priceText}`;
    }).join('\n');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    
    // Validate required fields: Name is required, Email OR Phone must be filled
    if (!formData.name.trim()) {
      setValidationError('Bitte füllen Sie die Kontaktdaten aus, damit wir Sie erreichen können.');
      return;
    }
    
    if (!formData.email.trim() && !formData.phone.trim()) {
      setValidationError('Bitte füllen Sie die Kontaktdaten aus, damit wir Sie erreichen können.');
      return;
    }

    // Generate human-readable selected services text
    const selectedServicesText = formatSelectedServicesText();

    // Build payload with form data and selected services
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      cleaning_type: formData.cleaningType.join(', '),
      selected_services: selectedServicesText,
      services: selectedServices.map(service => ({
        title: service.title,
        quantity: service.quantity,
        price: service.price,
        numericPrice: service.numericPrice,
        rowTotal: service.quantity * service.numericPrice,
      })),
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
          email: '',
          phone: '',
          message: '',
          cleaningType: [],
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
    <section id="kontakt" className="py-12 md:py-16 bg-foreground text-primary-foreground">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
            Bereit für saubere Polster?
          </h2>
          <p className="text-base md:text-lg text-primary-foreground/80 mb-6 md:mb-8 max-w-xl mx-auto">
            Kontaktieren Sie uns noch heute und sichern Sie sich Ihren Wunschtermin.
          </p>

          {/* Contact Form */}
          <div id="kontaktformular" className="bg-background rounded-xl md:rounded-2xl p-6 md:p-10 mb-6 md:mb-8 text-left">
            <div className="text-center mb-6 md:mb-8">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                Kontaktdaten
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Füllen Sie das Formular aus und wir melden uns schnellstmöglich.
              </p>
            </div>

            {/* Summary Table - only shown when services selected */}
            {selectedServices.length > 0 && (
              <div className="mb-6 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50">
                      <TableHead className="text-foreground font-semibold text-xs md:text-sm">Möbelstück</TableHead>
                      <TableHead className="text-foreground font-semibold text-center text-xs md:text-sm">Anzahl</TableHead>
                      <TableHead className="text-foreground font-semibold text-right text-xs md:text-sm">Einzelpreis</TableHead>
                      <TableHead className="text-foreground font-semibold text-right text-xs md:text-sm">Gesamt</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedServices.map((service) => {
                      const rowTotal = service.quantity * service.numericPrice;
                      return (
                        <TableRow key={service.id} className="border-border/50">
                          <TableCell className="text-foreground font-medium text-xs md:text-sm">{service.title}</TableCell>
                          <TableCell className="text-foreground text-center text-xs md:text-sm">{service.quantity}</TableCell>
                          <TableCell className="text-foreground text-right text-xs md:text-sm">{service.price}</TableCell>
                          <TableCell className="text-foreground text-right font-medium text-xs md:text-sm">
                            {rowTotal > 0 ? `ab ${rowTotal} €` : 'n.A.'}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                  <TableFooter className="bg-accent/30">
                    <TableRow className="border-border/50">
                      <TableCell className="text-foreground font-bold text-xs md:text-sm">Gesamt</TableCell>
                      <TableCell className="text-foreground font-bold text-center text-xs md:text-sm">{totalQuantity}</TableCell>
                      <TableCell></TableCell>
                      <TableCell className="text-primary font-bold text-right text-xs md:text-sm">
                        {totalPrice > 0 ? `ab ${totalPrice} €` : 'n.A.'}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5" noValidate>
              {/* Validation Error Message */}
              {validationError && (
                <div className="p-3 md:p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                  <p className="text-xs md:text-sm text-destructive font-medium">{validationError}</p>
                </div>
              )}

              {/* What to clean - Toggle Group */}
              <div className="space-y-2">
                <Label className="text-foreground font-medium text-sm md:text-base">
                  Was möchten Sie reinigen?
                </Label>
                <ToggleGroup 
                  type="multiple" 
                  value={formData.cleaningType}
                  onValueChange={handleCleaningTypeChange}
                  className="flex flex-wrap gap-2 justify-start"
                >
                  {cleaningOptions.map((option) => (
                    <ToggleGroupItem
                      key={option.value}
                      value={option.value}
                      className="px-3 py-2 md:px-4 md:py-2.5 rounded-lg border border-border/50 bg-card text-foreground text-xs md:text-sm data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary hover:bg-accent transition-colors"
                    >
                      {option.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground font-medium text-sm md:text-base">
                  Name <span className="text-primary">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ihr vollständiger Name"
                  className="h-11 md:h-12 bg-card border-border/50 focus:border-primary text-sm md:text-base"
                />
              </div>

              {/* Phone field - made prominent */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground font-medium text-sm md:text-base flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  Telefonnummer <span className="text-muted-foreground text-xs">(oder E-Mail)</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="01636986317"
                  className="h-11 md:h-12 bg-card border-border/50 focus:border-primary text-sm md:text-base ring-2 ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium text-sm md:text-base">
                  E-Mail <span className="text-muted-foreground text-xs">(oder Telefon)</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ihre@email.de"
                  className="h-11 md:h-12 bg-card border-border/50 focus:border-primary text-sm md:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-foreground font-medium text-sm md:text-base">
                  Nachricht / zusätzliche Informationen
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Beschreiben Sie Ihr Anliegen..."
                  className="min-h-[100px] md:min-h-[140px] bg-card border-border/50 focus:border-primary resize-none text-sm md:text-base"
                />
              </div>

              <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed">
                Mit dem Absenden erkläre ich mich mit der Verarbeitung meiner Daten zur Kontaktaufnahme einverstanden. Widerruf per E-Mail an{' '}
                <a href="mailto:info@reinwerk-service.de" className="text-primary hover:underline">
                  info@reinwerk-service.de
                </a>
              </p>

              <Button
                type="submit"
                variant="cta"
                size="xl"
                className="w-full text-sm md:text-base"
              >
                <Send className="w-4 h-4 md:w-5 md:h-5" />
                Anfrage senden
              </Button>
            </form>
          </div>

          {/* WhatsApp Button */}
          <div className="flex justify-center mb-6 md:mb-8">
            <Button variant="hero" size="xl" className="bg-[#25D366] text-white hover:bg-[#25D366] text-sm md:text-base" asChild>
              <a 
                href="https://api.whatsapp.com/message/5SVXIYHUNM7LN1?autoload=1&app_absent=0" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => trackContact()}
              >
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                WhatsApp schreiben
              </a>
            </Button>
          </div>

          <p className="text-xs md:text-sm text-primary-foreground/60">
            Schnelle Antwort garantiert – meist innerhalb von 30 Minuten
          </p>
        </div>
      </div>
    </section>
  );
});

CTASection.displayName = 'CTASection';
