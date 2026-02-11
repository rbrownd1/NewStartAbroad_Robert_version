import { Link } from 'react-router-dom';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAppState } from '@/context/AppContext';
import { User, MapPin, Calendar, ClipboardList, Settings } from 'lucide-react';

const Profile = () => {
  const { state } = useAppState();

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
