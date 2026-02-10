import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { InfoCard } from '@/components/InfoCard';
import { cities } from '@/data/mockData';
import { MapPin, Train, Building2, Landmark, Smartphone, ShoppingCart, Heart } from 'lucide-react';

const CityDetail = () => {
  const { slug } = useParams();
  const city = cities.find(c => c.slug === slug) || cities[0];

  const costColor = city.costLevel === 'High' ? 'text-coral' : city.costLevel.includes('Low') ? 'text-primary' : 'text-foreground';

  return (
    <Layout>
      <section className="bg-secondary/50 py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="h-6 w-6 text-primary" />
            <h1 className="text-3xl md:text-4xl font-heading font-bold">Your first 90 days in {city.name}</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{city.description}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          <div className="p-6 rounded-2xl bg-card border border-border text-center">
            <p className="text-sm text-muted-foreground mb-1">Cost of Living</p>
            <p className={`text-2xl font-heading font-bold ${costColor}`}>{city.costLevel}</p>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border text-center">
            <Train className="h-5 w-5 text-primary mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-1">Transport</p>
            <p className="text-sm font-medium">{city.transport}</p>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border text-center">
            <MapPin className="h-5 w-5 text-primary mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-1">Popular Areas</p>
            <p className="text-sm font-medium">{city.neighborhoods.slice(0, 3).join(', ')}</p>
          </div>
        </div>

        <h2 className="text-2xl font-heading font-bold mb-6">City-specific guides</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {[
            { icon: Building2, title: 'Housing', desc: `Popular areas: ${city.neighborhoods.join(', ')}. Mix of student halls and private rentals available.`, href: '/uk/housing' },
            { icon: Landmark, title: 'Banking', desc: 'All major digital and traditional banks operate here. Find branches near your area.', href: '/uk/banking' },
            { icon: Smartphone, title: 'SIM Cards', desc: 'Buy a SIM at the airport or any high-street carrier store on arrival.', href: '/uk/sim' },
            { icon: ShoppingCart, title: 'Groceries', desc: 'Major supermarkets and Indian stores available in most neighbourhoods.', href: '/uk/groceries' },
            { icon: Heart, title: 'Health', desc: 'Register with a local GP as soon as possible after arriving.', href: '/uk/health' },
          ].map(s => (
            <Link key={s.title} to={s.href} className="group">
              <InfoCard icon={s.icon} title={s.title} description={s.desc} />
            </Link>
          ))}
        </div>

        <h2 className="text-2xl font-heading font-bold mb-4">Popular neighbourhoods</h2>
        <div className="flex flex-wrap gap-3">
          {city.neighborhoods.map(n => (
            <span key={n} className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">{n}</span>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CityDetail;
