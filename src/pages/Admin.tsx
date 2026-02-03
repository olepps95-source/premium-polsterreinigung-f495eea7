import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { useAllPrices, useUpdatePrice } from '@/hooks/usePrices';
import { LogOut, Save, Check, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EditedPrice {
  title: string;
  price: string;
  numeric_price: number;
}

export default function Admin() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { data: prices, isLoading: pricesLoading } = useAllPrices();
  const updatePrice = useUpdatePrice();
  const { toast } = useToast();
  
  const [editedPrices, setEditedPrices] = useState<Record<string, EditedPrice>>({});
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());
  const [savingItems, setSavingItems] = useState<Set<string>>(new Set());
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, loading, navigate]);

  // Only initialize editedPrices ONCE when prices first load
  useEffect(() => {
    if (prices && prices.length > 0 && !hasInitialized.current) {
      const initial: Record<string, EditedPrice> = {};
      prices.forEach(p => {
        initial[p.id] = { title: p.title, price: p.price, numeric_price: p.numeric_price };
      });
      setEditedPrices(initial);
      hasInitialized.current = true;
    }
  }, [prices]);

  const handleSave = useCallback(async (id: string) => {
    const edited = editedPrices[id];
    if (!edited || savingItems.has(id)) return;

    setSavingItems(prev => new Set(prev).add(id));

    try {
      await updatePrice.mutateAsync({
        id,
        title: edited.title,
        price: edited.price,
        numeric_price: edited.numeric_price,
      });
      
      setSavedItems(prev => new Set(prev).add(id));
      setTimeout(() => {
        setSavedItems(prev => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }, 2000);
      
      toast({
        title: 'Gespeichert',
        description: `${edited.title} wurde aktualisiert.`,
      });
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: 'Fehler',
        description: 'Preis konnte nicht gespeichert werden.',
        variant: 'destructive',
      });
    } finally {
      setSavingItems(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  }, [editedPrices, savingItems, updatePrice, toast]);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (loading || pricesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <h1 className="text-xl font-bold text-foreground">Preisverwaltung</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user.email}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Abmelden
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Preisliste bearbeiten</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Änderungen werden sofort auf der Website angezeigt.
              </p>
            </div>

            <div className="divide-y divide-border">
              {prices?.map((item) => {
                const edited = editedPrices[item.id] || { title: item.title, price: item.price, numeric_price: item.numeric_price };
                const isSaved = savedItems.has(item.id);
                const isSaving = savingItems.has(item.id);
                const hasChanges = 
                  edited.title !== item.title || 
                  edited.price !== item.price ||
                  edited.numeric_price !== item.numeric_price;

                return (
                  <div key={item.id} className="p-4 md:p-6 hover:bg-accent/30 transition-colors">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                      {/* Title */}
                      <div className="md:col-span-4">
                        <label className="text-sm font-medium text-muted-foreground mb-1 block">
                          Bezeichnung
                        </label>
                        <Input
                          value={edited.title}
                          onChange={(e) => setEditedPrices(prev => ({
                            ...prev,
                            [item.id]: { ...prev[item.id] || edited, title: e.target.value }
                          }))}
                          disabled={isSaving}
                        />
                      </div>

                      {/* Price Display */}
                      <div className="md:col-span-3">
                        <label className="text-sm font-medium text-muted-foreground mb-1 block">
                          Preis (Anzeige)
                        </label>
                        <Input
                          value={edited.price}
                          onChange={(e) => setEditedPrices(prev => ({
                            ...prev,
                            [item.id]: { ...prev[item.id] || edited, price: e.target.value }
                          }))}
                          placeholder="z.B. 40 €"
                          disabled={isSaving}
                        />
                      </div>

                      {/* Numeric Price */}
                      <div className="md:col-span-3">
                        <label className="text-sm font-medium text-muted-foreground mb-1 block">
                          Zahlenwert (€)
                        </label>
                        <Input
                          type="number"
                          value={edited.numeric_price}
                          onChange={(e) => setEditedPrices(prev => ({
                            ...prev,
                            [item.id]: { ...prev[item.id] || edited, numeric_price: parseFloat(e.target.value) || 0 }
                          }))}
                          disabled={isSaving}
                        />
                      </div>

                      {/* Save Button */}
                      <div className="md:col-span-2">
                        <Button
                          onClick={() => handleSave(item.id)}
                          disabled={!hasChanges || isSaving}
                          className={`w-full transition-all ${
                            isSaved 
                              ? 'bg-green-500 hover:bg-green-600' 
                              : hasChanges 
                                ? 'bg-primary' 
                                : ''
                          }`}
                        >
                          {isSaved ? (
                            <>
                              <Check className="w-4 h-4 mr-1" />
                              Gespeichert
                            </>
                          ) : isSaving ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-1" />
                              Speichern
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <strong className="text-foreground">Hinweis:</strong> Alle Änderungen sind sofort auf der Website sichtbar. 
              Die Website-Besucher sehen die neuen Preise, sobald sie die Seite aktualisieren.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
