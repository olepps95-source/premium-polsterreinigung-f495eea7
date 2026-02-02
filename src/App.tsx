import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Datenschutz from "./pages/Datenschutz";
import Impressum from "./pages/Impressum";
import AGB from "./pages/AGB";
import Widerrufsbelehrung from "./pages/Widerrufsbelehrung";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { CookieBanner } from "./components/CookieBanner";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { MetaPixelProvider } from "./components/MetaPixelProvider";
import { SelectedServicesProvider } from "./contexts/SelectedServicesContext";
import { AdminProvider } from "./contexts/AdminContext";
import { EditableContentProvider } from "./contexts/EditableContentContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AdminProvider>
      <EditableContentProvider>
        <SelectedServicesProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <MetaPixelProvider />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/datenschutz" element={<Datenschutz />} />
                <Route path="/impressum" element={<Impressum />} />
                <Route path="/agb" element={<AGB />} />
                <Route path="/widerrufsbelehrung" element={<Widerrufsbelehrung />} />
                <Route path="/admin" element={<Admin />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <CookieBanner />
              <FloatingWhatsApp />
            </BrowserRouter>
          </TooltipProvider>
        </SelectedServicesProvider>
      </EditableContentProvider>
    </AdminProvider>
  </QueryClientProvider>
);

export default App;
