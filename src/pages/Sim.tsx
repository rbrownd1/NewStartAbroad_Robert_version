import { Layout } from '@/components/layout/Layout';
import { HubHero } from '@/components/HubHero';
import { InfoCard } from '@/components/InfoCard';
import { Smartphone, Zap, Globe, Phone } from 'lucide-react';

const simOptions = [
  { icon: Zap, title: 'Prepaid SIM', description: 'No credit check needed. Buy at the airport, supermarket, or carrier store. Top up as you go – perfect for the first few weeks.' },
  { icon: Globe, title: 'Monthly Contract', description: 'Better value for heavy data users. Requires UK bank account and address. Available after a few weeks of settling in.' },
  { icon: Phone, title: 'Budget MVNOs', description: 'Virtual network operators often offer cheaper plans using the same networks. Great for saving money on calls to India.' },
];

const checklist = [
  'Buy a UK SIM at the airport or local shop on arrival day',
  'Check international calling rates to India – consider WhatsApp calling too',
  'Set up essential apps with your UK number (bank, NHS, delivery apps)',
  'Consider a dual-SIM phone to keep your Indian number active',
  'Compare data plans – most people need at least 10GB for maps and streaming',
];

const Sim = () => {
  return (
    <Layout>
      <HubHero icon={Smartphone} title="Stay connected from day one" subtitle="Choose the right SIM and mobile plan for your new life in the UK." />

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h2 className="text-2xl font-heading font-bold mb-6">Your options</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {simOptions.map(o => (
            <InfoCard key={o.title} icon={o.icon} title={o.title} description={o.description} />
          ))}
        </div>

        <h2 className="text-2xl font-heading font-bold mb-6">Connectivity checklist</h2>
        <div className="space-y-3">
          {checklist.map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border border-border">
              <span className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">{i + 1}</span>
              <p className="text-foreground pt-1">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Sim;