import { useLocation, Link } from 'react-router-dom';
import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { countries } from '@/data/countries';
import { ArrowLeft, Bell } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';

const ComingSoon = () => {
  const location = useLocation();
  const countryCode = location.pathname.split('/')[1];
  const country = countries.find(c => c.code === countryCode);
  const [email, setEmail] = useState('');

  if (!country) {
    return (
      <GlobalLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-heading font-bold mb-4">Country not found</h1>
          <Link to="/"><Button variant="outline">Back to home</Button></Link>
        </div>
      </GlobalLayout>
    );
  }

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: '🔔 You\'re on the list!', description: `We'll notify you when the ${country.name} microsite launches.` });
    setEmail('');
  };

  return (
    <GlobalLayout>
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <span className="text-6xl mb-6 block">{country.flag}</span>
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            NewStartAbroad: {country.name} – coming soon
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            We're working on tailored housing, banking, SIM, groceries, and health guides for Indians moving to {country.name}.
          </p>
          <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Button type="submit" variant="coral" className="gap-2 whitespace-nowrap">
              <Bell className="h-4 w-4" /> Notify me
            </Button>
          </form>
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to all countries
            </Button>
          </Link>
        </div>
      </section>
    </GlobalLayout>
  );
};

export default ComingSoon;
