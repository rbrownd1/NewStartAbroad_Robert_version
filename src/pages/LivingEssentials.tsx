import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Building2, Landmark, Smartphone, ShoppingCart, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/hooks/use-scroll-animation';

const pillars = [
  { icon: Building2, title: 'Housing', description: 'Find the right accommodation – from student halls to shared flats and mid-term rentals.', href: '/uk/living-essentials/housing' },
  { icon: Landmark, title: 'Banking & money', description: 'Open a UK bank account, set up budgeting, and handle international transfers.', href: '/uk/living-essentials/banking' },
  { icon: Smartphone, title: 'SIM & mobile', description: 'Get connected on day one with the right SIM plan and mobile setup.', href: '/uk/living-essentials/sim-mobile' },
  { icon: ShoppingCart, title: 'Groceries & daily shopping', description: 'Find supermarkets, Indian stores, delivery apps, and budget tips.', href: '/uk/living-essentials/groceries' },
];

const LivingEssentials = () => {
  return (
    <Layout>
      <section className="bg-secondary/30 py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">Living essentials</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Everything you need to set up daily life in the UK – housing, banking, mobile, and groceries.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="grid sm:grid-cols-2 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={pillar.title} delay={i * 100}>
                <Link to={pillar.href} className="group p-6 rounded-2xl bg-card border border-border hover:shadow-lg hover:border-primary/20 transition-all block h-full">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                    {pillar.title} <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-muted-foreground text-sm">{pillar.description}</p>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default LivingEssentials;
