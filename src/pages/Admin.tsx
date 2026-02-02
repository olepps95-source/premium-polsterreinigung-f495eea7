import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { useEditableContent } from '@/contexts/EditableContentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LogOut, Save, RotateCcw, Lock, AlertTriangle, Home } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (login(username, password)) {
      toast({
        title: 'Erfolgreich angemeldet',
        description: 'Willkommen im Admin-Bereich',
      });
    } else {
      setError('Ungültige Anmeldedaten');
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Melden Sie sich an, um Preise und Texte zu bearbeiten
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Benutzername</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Passwort</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <Button type="submit" className="w-full">
              Anmelden
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              className="w-full"
              onClick={() => navigate('/')}
            >
              <Home className="w-4 h-4 mr-2" />
              Zurück zur Startseite
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function AdminDashboard() {
  const { logout } = useAdmin();
  const { prices, updatePrice, updateTitle, resetToDefaults, hasChanges } = useEditableContent();
  const navigate = useNavigate();

  const handlePriceChange = (id: string, value: string) => {
    // Extract numeric value
    const numMatch = value.match(/(\d+)/);
    const numericPrice = numMatch ? parseInt(numMatch[1], 10) : 0;
    updatePrice(id, value, numericPrice);
  };

  const handleReset = () => {
    if (confirm('Möchten Sie wirklich alle Änderungen zurücksetzen?')) {
      resetToDefaults();
      toast({
        title: 'Zurückgesetzt',
        description: 'Alle Preise wurden auf die Standardwerte zurückgesetzt',
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast({
      title: 'Abgemeldet',
      description: 'Sie wurden erfolgreich abgemeldet',
    });
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">Admin-Panel</h1>
            <p className="text-sm text-muted-foreground">Preise & Texte bearbeiten</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate('/')}>
              <Home className="w-4 h-4 mr-2" />
              Vorschau
            </Button>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Abmelden
            </Button>
          </div>
        </div>
      </header>

      {/* Warning Banner */}
      <div className="bg-accent border-b border-border">
        <div className="container py-3 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-primary flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Hinweis:</strong> Änderungen werden nur in diesem Browser gespeichert. 
            Für eine dauerhafte Lösung mit Datenbank wird ein Backend benötigt.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Actions */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Preisliste</h2>
            <div className="flex items-center gap-2">
              {hasChanges && (
                <Button variant="outline" onClick={handleReset}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Zurücksetzen
                </Button>
              )}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Save className="w-4 h-4" />
                Änderungen werden automatisch gespeichert
              </div>
            </div>
          </div>

          {/* Price Items */}
          <div className="grid gap-4">
            {prices.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`title-${item.id}`}>Bezeichnung</Label>
                      <Input
                        id={`title-${item.id}`}
                        value={item.title}
                        onChange={(e) => updateTitle(item.id, e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`price-${item.id}`}>Preis</Label>
                      <Input
                        id={`price-${item.id}`}
                        value={item.price}
                        onChange={(e) => handlePriceChange(item.id, e.target.value)}
                        placeholder="z.B. 40 €"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Admin() {
  const { isAuthenticated } = useAdmin();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}
