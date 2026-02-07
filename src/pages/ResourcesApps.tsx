import { Layout } from '@/components/layout/Layout';
import { AppRecommendationCard } from '@/components/AppRecommendationCard';
import { apps } from '@/data/mockData';
import { Smartphone } from 'lucide-react';
import { HubHero } from '@/components/HubHero';

const categories = ['Transport', 'Banking', 'Food', 'Groceries', 'Housing', 'Health', 'Communication'];

const ResourcesApps = () => {
  return (
    <Layout>
      <HubHero icon={Smartphone} title="Essential apps for UK newcomers" subtitle="Download these apps before or right after your arrival to make life easier." />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {categories.map(cat => {
          const catApps = apps.filter(a => a.category === cat);
          if (catApps.length === 0) return null;
          return (
            <div key={cat} className="mb-10">
              <h2 className="text-xl font-heading font-bold mb-4">{cat}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {catApps.map(app => (
                  <AppRecommendationCard key={app.name} {...app} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default ResourcesApps;