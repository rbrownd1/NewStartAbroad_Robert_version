import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import GlobalHome from "./pages/GlobalHome";
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
import ComingSoon from "./pages/ComingSoon";
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
            {/* Global */}
            <Route path="/" element={<GlobalHome />} />

            {/* UK microsite */}
            <Route path="/uk" element={<Index />} />
            <Route path="/uk/onboarding/persona" element={<PersonaSelection />} />
            <Route path="/uk/onboarding/intake" element={<IntakeForm />} />
            <Route path="/uk/plan" element={<Plan />} />
            <Route path="/uk/housing" element={<Housing />} />
            <Route path="/uk/banking" element={<Banking />} />
            <Route path="/uk/sim" element={<Sim />} />
            <Route path="/uk/groceries" element={<Groceries />} />
            <Route path="/uk/health" element={<Health />} />
            <Route path="/uk/city/:slug" element={<CityDetail />} />
            <Route path="/uk/resources/apps" element={<ResourcesApps />} />
            <Route path="/uk/auth/login" element={<Login />} />
            <Route path="/uk/auth/signup" element={<Signup />} />
            <Route path="/uk/profile" element={<Profile />} />

            {/* Coming soon country microsites */}
            <Route path="/ca" element={<ComingSoon />} />
            <Route path="/ca/*" element={<ComingSoon />} />
            <Route path="/de" element={<ComingSoon />} />
            <Route path="/de/*" element={<ComingSoon />} />
            <Route path="/au" element={<ComingSoon />} />
            <Route path="/au/*" element={<ComingSoon />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
