import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { PersonaCard } from '@/components/PersonaCard';
import { Button } from '@/components/ui/button';
import { useAppState } from '@/context/AppContext';
import { ArrowRight } from 'lucide-react';

const PersonaSelection = () => {
  const navigate = useNavigate();
  const { state, setState } = useAppState();

  const selectPersona = (persona: 'student' | 'professional') => {
    setState(prev => ({ ...prev, persona }));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">Who's starting a new life abroad?</h1>
          <p className="text-muted-foreground text-lg">Choose your profile so we can personalise your UK plan.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <PersonaCard type="student" selected={state.persona === 'student'} onClick={() => selectPersona('student')} />
          <PersonaCard type="professional" selected={state.persona === 'professional'} onClick={() => selectPersona('professional')} />
        </div>
        {state.persona && (
          <div className="text-center animate-fade-in">
            <Button variant="coral" size="lg" onClick={() => navigate('/onboarding/intake')} className="gap-2">
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PersonaSelection;