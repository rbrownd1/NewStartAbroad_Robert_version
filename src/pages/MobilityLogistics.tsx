import { Layout } from '@/components/layout/Layout';
import { Train, Car, Package, Clock } from 'lucide-react';

const sections = [
  { icon: Train, title: 'Easy transport routes & cards', description: 'Oyster cards, rail passes, and how to navigate public transport across UK cities.' },
  { icon: Car, title: 'Car rentals & driving licence', description: 'How to convert your Indian licence, rent a car, and understand UK driving rules.' },
  { icon: Package, title: 'Packers & movers', description: 'Shipping belongings, international moving services, and customs guidance.' },
];

const MobilityLogistics = () => {
  return (
    <Layout>
      <section className="bg-secondary/30 py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-xs font-medium text-muted-foreground mb-4">
            <Clock className="h-3 w-3" /> Coming soon
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">Mobility & logistics</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Transport, driving, and moving guides for your UK life – coming soon.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="grid sm:grid-cols-3 gap-6">
          {sections.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="p-6 rounded-2xl bg-card border border-border opacity-70">
                <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-heading font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.description}</p>
                <span className="inline-flex items-center mt-3 px-2 py-0.5 rounded-full bg-muted text-xs font-medium text-muted-foreground">Coming soon</span>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default MobilityLogistics;
