import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import Cover from "./pages/Cover";
import Index from "./pages/Index";
import PersonaSelection from "./pages/onboarding/PersonaSelection";
import IntakeForm from "./pages/onboarding/IntakeForm";
import Plan from "./pages/Plan";
import Housing from "./pages/Housing";
import Banking from "./pages/Banking";
import Sim from "./pages/Sim";
import Groceries from "./pages/Groceries";
import Health from "./pages/Health";
import CityDetail from "./pages/CityDetail";
import ResourcesApps from "./pages/ResourcesApps";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Cover />} />
            <Route path="/home" element={<Index />} />
            <Route path="/onboarding/persona" element={<PersonaSelection />} />
            <Route path="/onboarding/intake" element={<IntakeForm />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/housing" element={<Housing />} />
            <Route path="/banking" element={<Banking />} />
            <Route path="/sim" element={<Sim />} />
            <Route path="/groceries" element={<Groceries />} />
            <Route path="/health" element={<Health />} />
            <Route path="/city/:slug" element={<CityDetail />} />
            <Route path="/resources/apps" element={<ResourcesApps />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;