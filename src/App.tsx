
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index";
import EntreprisesPage from "./pages/EntreprisesPage";
import VehiclesDevicesPage from "./pages/VehiclesDevicesPage";
import SimCardsPage from "./pages/SimCardsPage";
import FotaWebPage from "./pages/FotaWebPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="/entreprises" element={<EntreprisesPage />} />
            <Route path="/vehicules-boitiers" element={<VehiclesDevicesPage />} />
            <Route path="/sim-cards" element={<SimCardsPage />} />
            <Route path="/fota-web" element={<FotaWebPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
