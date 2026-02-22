import { Link } from 'react-router-dom';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useAppState } from '@/context/AppContext';
import { tasks } from '@/data/mockData';
import { User, MapPin, Calendar, ClipboardList, Settings, TrendingUp } from 'lucide-react';

const Profile = () => {
  const { state } = useAppState();
  const persona = state.persona || 'student';
  const relevantTasks = tasks.filter(t => t.persona === 'both' || t.persona === persona);
  const completedCount = state.completedTasks.filter(id => relevantTasks.some(t => t.id === id)).length;
  const progress = relevantTasks.length > 0 ? (completedCount / relevantTasks.length) * 100 : 0;

  return (
    <GlobalLayout>
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold">Your Profile</h1>
            <p className="text-muted-foreground">Manage your preferences and plan</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="p-4 rounded-xl bg-card border border-border flex items-center gap-4">
            <ClipboardList className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Persona</p>
              <p className="font-medium capitalize">{state.persona || 'Not selected'}</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border flex items-center gap-4">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Destination city</p>
              <p className="font-medium">{state.city || 'Not selected'}</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border flex items-center gap-4">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Planned arrival</p>
              <p className="font-medium">{state.arrivalMonth && state.arrivalYear ? `${state.arrivalMonth} ${state.arrivalYear}` : 'Not set'}</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border flex items-center gap-4">
            <Settings className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Tasks completed</p>
              <p className="font-medium">{state.completedTasks.length} tasks</p>
            </div>
          </div>
        </div>

        <Link to="/uk/plan" className="block">
          <div className="p-6 rounded-2xl bg-primary text-primary-foreground mb-8">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="h-5 w-5" />
              <h2 className="font-heading font-semibold text-lg">Your 90-Day Plan</h2>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <Progress value={progress} className="flex-1 h-3 bg-primary-foreground/20 [&>div]:bg-coral" />
              <span className="text-lg font-heading font-bold">{Math.round(progress)}%</span>
            </div>
            <p className="text-sm text-primary-foreground/70">
              {completedCount} of {relevantTasks.length} tasks completed
            </p>
          </div>
        </Link>

        <div className="p-6 rounded-2xl bg-card border border-border mb-8">
          <h2 className="font-heading font-semibold text-lg mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Email notifications</Label>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <Label>WhatsApp updates</Label>
              <Switch />
            </div>
          </div>
        </div>

        <Link to="/uk/onboarding/intake">
          <Button variant="outline" className="w-full">Edit my UK plan</Button>
        </Link>
      </div>
    </GlobalLayout>
  );
};

export default Profile;
