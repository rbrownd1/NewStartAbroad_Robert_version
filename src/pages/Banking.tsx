import { Layout } from '@/components/layout/Layout';
import { HubHero } from '@/components/HubHero';
import { InfoCard } from '@/components/InfoCard';
import { Landmark, CheckCircle, PiggyBank, ArrowLeftRight, CreditCard } from 'lucide-react';
import { banks } from '@/data/mockData';

const bankingSteps = [
  'Arrive in the UK and collect your BRP',
  'Download your chosen bank app (Monzo, Starling, Revolut)',
  'Sign up with your passport, BRP, and a selfie',
  'Verify your identity and set up your PIN',
  'Add funds via international transfer or cash deposit',
  'Start using your account for daily spending',
];

const budgetingTips = [
  { icon: PiggyBank, title: 'Track spending', description: 'Use your bank app\'s built-in analytics to see where your money goes each month.' },
  { icon: ArrowLeftRight, title: 'Set savings goals', description: 'Create savings pots for rent, groceries, and emergencies right from your app.' },
  { icon: CreditCard, title: 'Split bills with flatmates', description: 'Use bill-splitting features to share rent, utilities, and grocery costs easily.' },
];

const Banking = () => {
  return (
    <Layout>
      <HubHero icon={Landmark} title="Banking without UK credit history" subtitle="Digital and traditional banks that welcome newcomers from India." />

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h2 className="text-2xl font-heading font-bold mb-6">Digital banks</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {banks.filter(b => b.type === 'digital').map(bank => (
            <div key={bank.name} className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-lg font-heading font-semibold mb-3">{bank.name}</h3>
              <ul className="space-y-2">
                {bank.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-heading font-bold mb-6">Traditional banks</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {banks.filter(b => b.type === 'traditional').map(bank => (
            <div key={bank.name} className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-lg font-heading font-semibold mb-3">{bank.name}</h3>
              <ul className="space-y-2">
                {bank.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-heading font-bold mb-6">How to open an account</h2>
        <div className="space-y-3 mb-12">
          {bankingSteps.map((step, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-muted/50">
              <span className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">{i + 1}</span>
              <p className="text-foreground pt-1">{step}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-heading font-bold mb-6">Budgeting starter</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {budgetingTips.map(tip => (
            <InfoCard key={tip.title} icon={tip.icon} title={tip.title} description={tip.description} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Banking;