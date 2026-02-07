import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useAppState } from '@/context/AppContext';
import { cities, indianCities, visaTypes, months } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';
import { ArrowRight, GraduationCap, Briefcase } from 'lucide-react';

const IntakeForm = () => {
  const navigate = useNavigate();
  const { state, setState } = useAppState();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: '🎉 Your UK plan is ready!', description: 'We\'ve generated a personalised checklist for your first 90 days.' });
    navigate('/plan');
  };

  const update = (partial: Partial<typeof state>) => setState(prev => ({ ...prev, ...partial }));

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-3">Tell us about your move</h1>
          <p className="text-muted-foreground">We'll use this to personalise your first 90 days plan.</p>
        </div>

        {state.persona && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            {state.persona === 'student' ? <GraduationCap className="h-4 w-4" /> : <Briefcase className="h-4 w-4" />}
            {state.persona === 'student' ? 'Student' : 'Working Professional'}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Origin city in India</Label>
              <Select value={state.originCity} onValueChange={v => update({ originCity: v })}>
                <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                <SelectContent>
                  {indianCities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Destination city in UK</Label>
              <Select value={state.city} onValueChange={v => update({ city: v })}>
                <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                <SelectContent>
                  {cities.map(c => <SelectItem key={c.slug} value={c.name}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Visa type</Label>
            <Select value={state.visaType} onValueChange={v => update({ visaType: v })}>
              <SelectTrigger><SelectValue placeholder="Select visa type" /></SelectTrigger>
              <SelectContent>
                {visaTypes.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Planned arrival month</Label>
              <Select value={state.arrivalMonth} onValueChange={v => update({ arrivalMonth: v })}>
                <SelectTrigger><SelectValue placeholder="Month" /></SelectTrigger>
                <SelectContent>
                  {months.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Planned arrival year</Label>
              <Select value={state.arrivalYear} onValueChange={v => update({ arrivalYear: v })}>
                <SelectTrigger><SelectValue placeholder="Year" /></SelectTrigger>
                <SelectContent>
                  {['2025', '2026', '2027'].map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
            <Label className="cursor-pointer">Do you already have accommodation?</Label>
            <Switch checked={state.hasAccommodation} onCheckedChange={v => update({ hasAccommodation: v })} />
          </div>

          <div className="space-y-2">
            <Label>Budget band</Label>
            <div className="flex gap-3">
              {(['low', 'medium', 'high'] as const).map(b => (
                <button
                  key={b}
                  type="button"
                  onClick={() => update({ budget: b })}
                  className={`flex-1 py-3 rounded-xl border-2 text-sm font-medium capitalize transition-all ${
                    state.budget === b ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:border-primary/30'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" variant="coral" size="lg" className="w-full gap-2">
            Generate my UK plan <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default IntakeForm;