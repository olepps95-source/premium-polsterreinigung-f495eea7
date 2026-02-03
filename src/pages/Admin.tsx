import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/hooks/useAuth';
import { useAllPrices, useUpdatePrice, Price } from '@/hooks/usePrices';
import { LogOut, Save, Check, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Admin() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { data: prices, isLoading: pricesLoading, refetch } = useAllPrices();
  const updatePrice = useUpdatePrice();
  const { toast } = useToast();
  
  // Local edit state - keyed by price id
  const [editState, setEditState] = useState<Record<string, Partial<Price>>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  // Redirect if not admin
  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, loading, navigate]);

  // Initialize edit state when prices load
  useEffect(() => {
    if (prices && Object.keys(editState).length === 0) {
      const initial: Record<string, Partial<Price>> = {};
      prices.forEach(p => {
        initial[p.id] = {
          title: p.title,
          price: p.price,
          sort_order: p.sort_order,
          is_active: p.is_active,
        };
      });
      setEditState(initial);
    }
  }, [prices, editState]);

  const handleFieldChange = (id: string, field: keyof Price, value: string | number | boolean) => {
    setEditState(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSave = async (id: string) => {
    const edited = editState[id];
    if (!edited || savingId) return;

    setSavingId(id);

    try {
      await updatePrice.mutateAsync({
        id,
        title: edited.title,
        price: edited.price,
        sort_order: edited.sort_order,
        is_active: edited.is_active,
      });
      
      setSavedId(id);
      setTimeout(() => setSavedId(null), 2000);
      
      toast({
        title: 'Gespeichert',
        description: `${edited.title} wurde aktualisiert.`,
      });
      
      // Refetch to get fresh data
      await refetch();
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: 'Fehler',
        description: 'Preis konnte nicht gespeichert werden.',
        variant: 'destructive',
      });
    } finally {
      setSavingId(null);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  // Check if a row has unsaved changes
  const hasChanges = (id: string): boolean => {
    const original = prices?.find(p => p.id === id);
    const edited = editState[id];
    if (!original || !edited) return false;
    
    return (
      edited.title !== original.title ||
      edited.price !== original.price ||
      edited.sort_order !== original.sort_order ||
      edited.is_active !== original.is_active
    );
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
        <div className="max-w-5xl mx-auto">
          <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Preisliste bearbeiten</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Änderungen werden sofort auf der Website angezeigt.
              </p>
            </div>

            {/* Table Header */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 bg-muted/50 border-b border-border text-sm font-medium text-muted-foreground">
              <div className="col-span-3">Bezeichnung</div>
              <div className="col-span-2">Preis (Anzeige)</div>
              <div className="col-span-2">Reihenfolge</div>
              <div className="col-span-2">Aktiv</div>
              <div className="col-span-3">Aktion</div>
            </div>

            <div className="divide-y divide-border">
              {prices?.map((item) => {
                const edited = editState[item.id] || {};
                const isSaving = savingId === item.id;
                const isSaved = savedId === item.id;
                const changed = hasChanges(item.id);

                return (
                  <div key={item.id} className="p-4 md:p-6 hover:bg-accent/30 transition-colors">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      {/* Title */}
                      <div className="md:col-span-3">
                        <label className="text-sm font-medium text-muted-foreground mb-1 block md:hidden">
                          Bezeichnung
                        </label>
                        <Input
                          value={edited.title ?? item.title}
                          onChange={(e) => handleFieldChange(item.id, 'title', e.target.value)}
                          disabled={isSaving}
                        />
                      </div>

                      {/* Price Display */}
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium text-muted-foreground mb-1 block md:hidden">
                          Preis (Anzeige)
                        </label>
                        <Input
                          value={edited.price ?? item.price}
                          onChange={(e) => handleFieldChange(item.id, 'price', e.target.value)}
                          placeholder="z.B. 40 €"
                          disabled={isSaving}
                        />
                      </div>

                      {/* Sort Order */}
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium text-muted-foreground mb-1 block md:hidden">
                          Reihenfolge
                        </label>
                        <Input
                          type="number"
                          value={edited.sort_order ?? item.sort_order}
                          onChange={(e) => handleFieldChange(item.id, 'sort_order', parseInt(e.target.value) || 0)}
                          disabled={isSaving}
                        />
                      </div>

                      {/* Is Active Toggle */}
                      <div className="md:col-span-2 flex items-center gap-2">
                        <label className="text-sm font-medium text-muted-foreground md:hidden">
                          Aktiv
                        </label>
                        <Switch
                          checked={edited.is_active ?? item.is_active}
                          onCheckedChange={(checked) => handleFieldChange(item.id, 'is_active', checked)}
                          disabled={isSaving}
                        />
                        <span className="text-sm text-muted-foreground">
                          {(edited.is_active ?? item.is_active) ? 'Ja' : 'Nein'}
                        </span>
                      </div>

                      {/* Save Button */}
                      <div className="md:col-span-3">
                        <Button
                          onClick={() => handleSave(item.id)}
                          disabled={!changed || isSaving}
                          className={`w-full transition-all ${
                            isSaved 
                              ? 'bg-green-500 hover:bg-green-600' 
                              : changed 
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
