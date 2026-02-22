import { Layout } from '@/components/layout/Layout';
import { HubHero } from '@/components/HubHero';
import { InfoCard } from '@/components/InfoCard';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, CheckCircle, Store, Truck, Lightbulb, MapPin, Info } from 'lucide-react';
import { groceryStores, weekOneShoppingList } from '@/data/mockData';

const priceLevelBadge: Record<string, { label: string; className: string }> = {
  budget: { label: 'Budget', className: 'bg-emerald-100 text-emerald-700' },
  mid: { label: 'Mid-range', className: 'bg-sky-100 text-sky-700' },
  premium: { label: 'Premium', className: 'bg-amber-100 text-amber-700' },
};

const indianStoresCityTips = [
  { city: 'London', tip: 'Southall, Wembley (Ealing Road), Tooting Broadway, and East Ham have the largest Indian grocery clusters. Prices comparable to India for staples.' },
  { city: 'Birmingham', tip: 'Sparkbrook, Sparkhill, and the Soho Road in Handsworth have dozens of Indian and Pakistani grocery stores.' },
  { city: 'Manchester', tip: 'Rusholme (Curry Mile) and Longsight are your go-to areas. Also check Cheetham Hill for wholesale deals.' },
  { city: 'Leicester', tip: 'Belgrave Road (the Golden Mile) is one of the largest Indian shopping areas outside London.' },
  { city: 'Leeds', tip: 'Hyde Park and Harehills have several Indian and Asian stores. The Kirkgate Market also stocks Indian staples.' },
  { city: 'Glasgow', tip: 'The Southside around Pollokshields has a strong South Asian community with multiple grocery options.' },
];

const budgetTips = [
  { title: 'Sign up for loyalty cards on day one', description: 'Tesco Clubcard, Sainsbury\'s Nectar, and Lidl Plus are free and offer significant savings. Clubcard prices can save 30-50% on popular items.' },
  { title: 'Learn UK unit pricing', description: 'Every price label shows the cost per 100g or per litre. Use this to compare brands objectively – own-brand products are often identical quality at half the price.' },
  { title: 'Check the "reduced" section', description: 'Supermarkets discount items near their use-by date by 25-75%. Best deals appear after 6pm. Yellow-sticker shopping is a UK tradition.' },
  { title: 'Batch cook on weekends', description: 'Cook dal, rice, and sabzi in bulk on Sunday. Portion into containers for the week. Saves time, money, and reduces food waste.' },
  { title: 'Try Too Good To Go', description: 'Rescue surplus food from Pret, Greggs, and supermarkets for a third of the price. Magic bags are a great way to eat well on a student budget.' },
  { title: 'Buy Indian staples in bulk', description: 'Rice, atta, oil, and lentils are much cheaper per kilo at Indian stores. Buy 5-10 kg bags of basmati rice – it works out to half the supermarket price.' },
];

const Groceries = () => {
  const supermarkets = groceryStores.filter(s => s.store_type === 'supermarket' || s.store_type === 'discount');
  const indianStores = groceryStores.filter(s => s.store_type === 'indian_asian');
  const deliveryApps = groceryStores.filter(s => s.store_type === 'delivery_app');

  return (
    <Layout>
      <HubHero
        icon={ShoppingCart}
        title="Groceries and daily essentials"
        subtitle="Where to shop, what to buy, and how to save in your new city."
      />

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* ── UK Supermarkets ──────────────────────────────────── */}
        <h2 className="text-2xl font-heading font-bold mb-2 flex items-center gap-2">
          <Store className="h-6 w-6 text-primary" />
          UK supermarkets
        </h2>
        <p className="text-muted-foreground mb-6">From budget to premium – here's where most Indians in the UK do their weekly shop.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {supermarkets.map(s => (
            <div key={s.id} className="p-5 rounded-2xl bg-card border border-border hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-semibold text-lg">{s.store_name}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${priceLevelBadge[s.price_level].className}`}>
                  {priceLevelBadge[s.price_level].label}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{s.description}</p>
              <div className="flex flex-wrap gap-2">
                {s.delivery_available && (
                  <Badge variant="secondary" className="text-xs">Delivery available</Badge>
                )}
                {s.indian_products && (
                  <Badge variant="secondary" className="text-xs">Indian products</Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Indian & Asian Grocery Stores ────────────────────── */}
        <h2 className="text-2xl font-heading font-bold mb-2 flex items-center gap-2">
          <MapPin className="h-6 w-6 text-primary" />
          Indian & Asian grocery stores
        </h2>
        <p className="text-muted-foreground mb-6">For authentic spices, atta, paneer, and staples at Indian prices – find your nearest desi store.</p>

        <div className="grid gap-4 mb-8">
          {indianStores.map(s => (
            <div key={s.id} className="p-5 rounded-2xl bg-card border border-border">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading font-semibold">{s.store_name}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${priceLevelBadge[s.price_level].className}`}>
                  {priceLevelBadge[s.price_level].label}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>

        {/* City-specific tips */}
        <h3 className="text-lg font-heading font-semibold mb-4">Where to find Indian stores by city</h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {indianStoresCityTips.map(t => (
            <div key={t.city} className="p-4 rounded-xl bg-muted/50 border border-border">
              <p className="font-semibold text-sm mb-1">{t.city}</p>
              <p className="text-sm text-muted-foreground">{t.tip}</p>
            </div>
          ))}
        </div>

        {/* ── Week-1 Shopping List ─────────────────────────────── */}
        <h2 className="text-2xl font-heading font-bold mb-2 flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-primary" />
          Week-1 shopping list
        </h2>
        <p className="text-muted-foreground mb-6">Everything you need to stock your kitchen in your first week. Print this or screenshot it before you shop.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {weekOneShoppingList.map(cat => (
            <div key={cat.category} className="p-5 rounded-2xl bg-card border border-border">
              <h3 className="font-heading font-semibold mb-3">{cat.category}</h3>
              <ul className="space-y-1.5">
                {cat.items.map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Food Delivery Apps ───────────────────────────────── */}
        <h2 className="text-2xl font-heading font-bold mb-2 flex items-center gap-2">
          <Truck className="h-6 w-6 text-primary" />
          Food delivery apps
        </h2>
        <p className="text-muted-foreground mb-6">For those days when you don't feel like cooking – or when you need groceries delivered.</p>
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {deliveryApps.map(app => (
            <div key={app.id} className="p-5 rounded-2xl bg-card border border-border hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading font-semibold">{app.store_name}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${priceLevelBadge[app.price_level].className}`}>
                  {priceLevelBadge[app.price_level].label}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{app.description}</p>
            </div>
          ))}
        </div>

        {/* ── Budget Tips ─────────────────────────────────────── */}
        <h2 className="text-2xl font-heading font-bold mb-2 flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-primary" />
          Budget tips for new arrivals
        </h2>
        <p className="text-muted-foreground mb-6">Smart shopping strategies that Indian newcomers swear by.</p>
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {budgetTips.map(tip => (
            <InfoCard key={tip.title} title={tip.title} description={tip.description} />
          ))}
        </div>

        {/* ── Pro tip alert ────────────────────────────────────── */}
        <Alert className="border-emerald-300 bg-emerald-50 mb-8">
          <Info className="h-5 w-5 text-emerald-600" />
          <AlertTitle className="text-emerald-800">Pro tip: Indian store vs supermarket price comparison</AlertTitle>
          <AlertDescription className="text-emerald-900 text-sm">
            <ul className="mt-2 space-y-1.5">
              <li><strong>Basmati rice (5 kg):</strong> Indian store ~£5–7 vs supermarket ~£10–14</li>
              <li><strong>Atta / chapati flour (5 kg):</strong> Indian store ~£3–4 vs supermarket ~£6–8</li>
              <li><strong>Spice pack (turmeric, chilli, cumin):</strong> Indian store ~£1–2 each vs supermarket ~£2–4 each</li>
              <li><strong>Paneer (400g):</strong> Indian store ~£2–3 vs supermarket ~£3.50–5</li>
              <li><strong>Toor dal (1 kg):</strong> Indian store ~£2–3 vs supermarket ~£4–5</li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* ── Last updated footer ─────────────────────────────── */}
        <p className="text-center text-xs text-muted-foreground mt-12">Last updated: February 2026</p>
      </div>
    </Layout>
  );
};

export default Groceries;
