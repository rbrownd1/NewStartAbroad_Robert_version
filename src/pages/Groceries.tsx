import { Layout } from '@/components/layout/Layout';
import { HubHero } from '@/components/HubHero';
import { InfoCard } from '@/components/InfoCard';
import { AppRecommendationCard } from '@/components/AppRecommendationCard';
import { ShoppingCart } from 'lucide-react';

const supermarkets = [
  { emoji: '🛒', title: 'Tesco', description: 'UK\'s largest supermarket. Clubcard offers great savings. Wide range including international foods.' },
  { emoji: '🧡', title: 'Sainsbury\'s', description: 'Good quality own-brand products. Nectar card rewards. Wide availability across the UK.' },
  { emoji: '💚', title: 'Asda', description: 'Budget-friendly with large stores. Good for bulk buying. Owned by Walmart.' },
  { emoji: '💛', title: 'Aldi', description: 'Discount supermarket with excellent quality-to-price ratio. Limited but curated range.' },
  { emoji: '🏪', title: 'Indian/Asian Stores', description: 'Find spices, lentils, rice, and ready-made items. Search "Indian grocery" in Google Maps for nearby options.' },
];

const deliveryApps = [
  { name: 'Deliveroo', category: 'Food Delivery', description: 'Restaurant delivery with great Indian food options.', icon: '🍕' },
  { name: 'Uber Eats', category: 'Food Delivery', description: 'Wide range of restaurants and grocery delivery.', icon: '🍔' },
  { name: 'Just Eat', category: 'Food Delivery', description: 'UK\'s largest platform with budget-friendly options.', icon: '🍜' },
  { name: 'Getir', category: 'Quick Grocery', description: 'Ultra-fast grocery delivery in minutes.', icon: '⚡' },
];

const tips = [
  'Week 1: Buy basics – rice, oil, spices, bread, milk, eggs, and toiletries',
  'Learn UK unit pricing – price per 100g or per litre helps compare brands',
  'Sign up for loyalty cards (Tesco Clubcard, Nectar) on day one for savings',
  'Batch cook on weekends to save time and money during the week',
  'Check "reduced" sections for discounted items near closing time',
];

const Groceries = () => {
  return (
    <Layout>
      <HubHero icon={ShoppingCart} title="Groceries and daily essentials" subtitle="Where to shop, what to buy, and how to save in your new city." />

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h2 className="text-2xl font-heading font-bold mb-6">Where to shop</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {supermarkets.map(s => (
            <InfoCard key={s.title} emoji={s.emoji} title={s.title} description={s.description} />
          ))}
        </div>

        <h2 className="text-2xl font-heading font-bold mb-6">Apps to make life easier</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-12">
          {deliveryApps.map(app => (
            <AppRecommendationCard key={app.name} {...app} />
          ))}
        </div>

        <h2 className="text-2xl font-heading font-bold mb-6">Tips for new arrivals</h2>
        <div className="space-y-3">
          {tips.map((tip, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border border-border">
              <span className="text-lg">💡</span>
              <p className="text-foreground">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Groceries;