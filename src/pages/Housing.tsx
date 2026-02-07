import { Layout } from '@/components/layout/Layout';
import { HubHero } from '@/components/HubHero';
import { InfoCard } from '@/components/InfoCard';
import { Building2, Shield, Globe, Search } from 'lucide-react';

const housingTypes = [
  { emoji: '🏛️', title: 'University Halls', description: 'Managed accommodation with bills included. Great for first-year students needing community and convenience.' },
  { emoji: '🏢', title: 'Private Halls', description: 'Premium student living with modern amenities. Usually en-suite rooms with communal kitchens and study spaces.' },
  { emoji: '🏠', title: 'Shared Houses', description: 'Rent a room in a shared house or flat. Budget-friendly option popular with both students and professionals.' },
  { emoji: '🏬', title: 'Studio Flats', description: 'Self-contained units with your own kitchen and bathroom. More privacy but higher cost.' },
  { emoji: '📅', title: 'Mid-term Rentals', description: 'Flexible 1–12 month stays via platforms like HousingAnywhere, Spotahome, or Flatio. No long-term commitment.' },
];

const tips = [
  { icon: Shield, title: 'Avoid Scams', description: 'Never pay before viewing. Use verified platforms. Check if deposits are protected by a government scheme.' },
  { icon: Globe, title: 'Renting from Abroad', description: 'Use mid-term rental platforms that offer virtual tours and verified listings. Book temporary stays first.' },
  { icon: Search, title: 'Documents Needed', description: 'Passport, BRP, proof of study/work, references. Some landlords may ask for a UK guarantor.' },
];

const platforms = ['HousingAnywhere', 'Spotahome', 'Nestpick', 'Flatio', 'SpareRoom', 'Rightmove', 'Zoopla', 'OpenRent'];

const Housing = () => {
  return (
    <Layout>
      <HubHero icon={Building2} title="Housing for your first months in the UK" subtitle="From student halls to private rentals – find the right home for your new start." />

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h2 className="text-2xl font-heading font-bold mb-6">Types of housing</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {housingTypes.map(h => (
            <InfoCard key={h.title} emoji={h.emoji} title={h.title} description={h.description} />
          ))}
        </div>

        <h2 className="text-2xl font-heading font-bold mb-6">Tips for finding housing</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {tips.map(t => (
            <InfoCard key={t.title} icon={t.icon} title={t.title} description={t.description} />
          ))}
        </div>

        <h2 className="text-2xl font-heading font-bold mb-4">Recommended platforms</h2>
        <p className="text-muted-foreground mb-6">Popular platforms for finding mid-term and long-term rentals in the UK.</p>
        <div className="flex flex-wrap gap-3">
          {platforms.map(p => (
            <span key={p} className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">{p}</span>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Housing;