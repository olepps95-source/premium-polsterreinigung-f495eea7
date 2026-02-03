import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/hooks/useAuth';
import { useAllPrices, useBatchUpdatePrices } from '@/hooks/usePrices';
import { LogOut, Save, Loader2, ShieldX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface EditedPrice {
  title: string;
  price: string;
  numeric_price: number;
  is_active: boolean;
}

export default function Admin() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { data: prices, isLoading: pricesLoading } = useAllPrices();
  const batchUpdate = useBatchUpdatePrices();
  const { toast } = useToast();
  
  const [editedPrices, setEditedPrices] = useState<Record<string, EditedPrice>>({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin/login');
    }
  }, [user, loading, navigate]);

  // Only initialize editedPrices once when prices first load, or after a successful save
  useEffect(() => {
    if (prices && !isSaving) {
      // Only reset if not initialized yet, or if we just finished saving
      if (!isInitialized || !hasUnsavedChanges) {
        const initial: Record<string, EditedPrice> = {};
        prices.forEach(p => {
          initial[p.id] = {
            title: p.title,
            price: p.price,
            numeric_price: p.numeric_price,
            is_active: p.is_active,
          };
        });
        setEditedPrices(initial);
        setHasUnsavedChanges(false);
        setIsInitialized(true);
      }
    }
  }, [prices, isSaving, isInitialized, hasUnsavedChanges]);

  const handleChange = (id: string, field: keyof EditedPrice, value: string | number | boolean) => {
    setEditedPrices(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
    setHasUnsavedChanges(true);
  };

  const handleSaveAll = async () => {
    if (!prices) return;
    
    setIsSaving(true);
    const updates: Array<{ 
      id: string; 
      title: string; 
      price: string;
      numeric_price: number;
      sort_order: number;
      is_active: boolean;
    }> = [];
    
    prices.forEach(item => {
      const edited = editedPrices[item.id];
      if (!edited) return;
      
      const hasChanges = 
        edited.title !== item.title || 
        edited.price !== item.price ||
        edited.numeric_price !== item.numeric_price ||
        edited.is_active !== item.is_active;
      
      if (hasChanges) {
        updates.push({
          id: item.id,
          title: edited.title,
          price: edited.price,
          numeric_price: edited.numeric_price,
          sort_order: item.sort_order,
          is_active: edited.is_active,
        });
      }
    });

    if (updates.length === 0) {
      setIsSaving(false);
      return;
    }

    try {
      await batchUpdate.mutateAsync(updates);
      
      toast({
        title: 'Gespeichert',
        description: `${updates.length} Änderung(en) wurden gespeichert.`,
      });
      setHasUnsavedChanges(false);
    } catch (error) {
      toast({
        title: 'Fehler',
        description: 'Änderungen konnten nicht gespeichert werden.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

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

  if (!user) {
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <ShieldX className="w-16 h-16 text-destructive" />
        <h1 className="text-2xl font-bold text-foreground">Zugriff verweigert</h1>
        <p className="text-muted-foreground">Sie haben keine Berechtigung, diese Seite anzuzeigen.</p>
        <Button variant="outline" onClick={() => navigate('/')}>
          Zur Startseite
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
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
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Preisliste</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Bearbeiten Sie die Preise direkt in der Tabelle.
              </p>
            </div>
            <Button 
              onClick={handleSaveAll} 
              disabled={!hasUnsavedChanges || isSaving}
              size="lg"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Änderungen speichern
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Bezeichnung</TableHead>
                <TableHead className="w-[150px]">Preis (Anzeige)</TableHead>
                <TableHead className="w-[120px]">Zahlenwert (€)</TableHead>
                <TableHead className="w-[100px]">Aktiv</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prices?.map((item) => {
                const edited = editedPrices[item.id];
                if (!edited) return null;

                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Input
                        value={edited.title}
                        onChange={(e) => handleChange(item.id, 'title', e.target.value)}
                        className="h-9"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={edited.price}
                        onChange={(e) => handleChange(item.id, 'price', e.target.value)}
                        placeholder="z.B. 40 €"
                        className="h-9"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={edited.numeric_price}
                        onChange={(e) => handleChange(item.id, 'numeric_price', parseFloat(e.target.value) || 0)}
                        className="h-9"
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={edited.is_active}
                        onCheckedChange={(checked) => handleChange(item.id, 'is_active', checked)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {hasUnsavedChanges && (
          <div className="mt-4 p-4 bg-warning/10 border border-warning/30 rounded-lg text-warning-foreground text-sm">
            Sie haben ungespeicherte Änderungen. Klicken Sie auf "Änderungen speichern", um sie zu übernehmen.
          </div>
        )}
      </main>
    </div>
  );
}
