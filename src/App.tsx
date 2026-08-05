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
import Gewerbe from "./pages/Gewerbe";
import Fensterreinigung from "./pages/Fensterreinigung";
import Teppichbodenreinigung from "./pages/Teppichbodenreinigung";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import { CookieBanner } from "./components/CookieBanner";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { MetaPixelProvider } from "./components/MetaPixelProvider";
import { SelectedServicesProvider } from "./contexts/SelectedServicesContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
            <Route path="/gewerbe" element={<Gewerbe />} />
            <Route path="/fensterreinigung" element={<Fensterreinigung />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieBanner />
          <FloatingWhatsApp />
        </BrowserRouter>
      </TooltipProvider>
    </SelectedServicesProvider>
  </QueryClientProvider>
);

export default App;
