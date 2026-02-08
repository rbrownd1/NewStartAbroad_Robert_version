import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, MapPin, Building2, Target, Sparkles } from 'lucide-react';
import { useAppState } from '@/context/AppContext';
import { cities } from '@/data/mockData';
import coverSkyline from '@/assets/cover-skyline.jpg';

const purposes = [
  { value: 'student', label: 'Study' },
  { value: 'professional', label: 'Work' },
];

const Cover = () => {
  const navigate = useNavigate();
  const { setState } = useAppState();
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState('');

  const handleStartExploring = () => {
    if (selectedCity) {
      setState(prev => ({ ...prev, city: selectedCity }));
    }
    if (selectedPurpose) {
      setState(prev => ({ ...prev, persona: selectedPurpose as 'student' | 'professional' }));
    }
    navigate('/home');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${coverSkyline})` }}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/20" />

      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-2xl font-heading font-bold text-white drop-shadow-lg">
            <span className="text-white">New</span>
            <span className="text-coral">Start</span>
            <span className="text-white">Abroad</span>
          </div>
          <div className="text-white/80 text-sm font-medium hidden sm:block">EN</div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-primary text-sm font-medium mb-8 shadow-lg">
          <Sparkles className="h-4 w-4" />
          Your guide to living abroad
        </div>

        {/* Main headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-center max-w-4xl mb-6 leading-tight">
          <span className="text-white drop-shadow-lg">Plan your life in a new country</span>
          <br />
          <span className="text-coral drop-shadow-lg">in one place</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-white/90 text-center max-w-2xl mb-12 drop-shadow">
          Housing, jobs, food, culture — everything you need to feel at home,
          wherever you go. Built for students, professionals and dreamers...!
        </p>

        {/* Selection card */}
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
            {/* Destination Country */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Destination Country
              </label>
              <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/30">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground font-medium">United Kingdom</span>
              </div>
            </div>

            {/* City */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                City
              </label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="h-12 rounded-xl border-border bg-muted/30">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <SelectValue placeholder="Select city" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {cities.map(city => (
                    <SelectItem key={city.slug} value={city.name}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Purpose of Stay */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Purpose of Stay
              </label>
              <Select value={selectedPurpose} onValueChange={setSelectedPurpose}>
                <SelectTrigger className="h-12 rounded-xl border-border bg-muted/30">
                  <div className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-primary flex-shrink-0" />
                    <SelectValue placeholder="Why are you going?" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {purposes.map(purpose => (
                    <SelectItem key={purpose.value} value={purpose.value}>
                      {purpose.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Button 
              variant="coral" 
              size="lg" 
              onClick={handleStartExploring}
              className="gap-2 px-8 py-6 text-lg rounded-xl"
            >
              Start Exploring
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cover;
