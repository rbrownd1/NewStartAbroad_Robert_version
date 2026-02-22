import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { InfoCard } from '@/components/InfoCard';
import { Badge } from '@/components/ui/badge';
import { cities } from '@/data/mockData';
import { MapPin, Train, Building2, Landmark, Smartphone, ShoppingCart, Heart, Users, Clock, GraduationCap, Briefcase, PoundSterling } from 'lucide-react';

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
            <h1 className="text-3xl md:text-4xl font-heading font-bold">{city.name} – your first 90 days</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{city.description}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* ── Key Stats ─────────────────────────────────────── */}
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

        {/* ── Rent Ranges & Transport Cost ────────────────────── */}
        <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
          <PoundSterling className="h-6 w-6 text-primary" />
          Cost breakdown
        </h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h3 className="font-heading font-semibold">Student rent</h3>
            </div>
            <p className="text-2xl font-heading font-bold text-foreground">{city.avgRentStudent}</p>
            <p className="text-xs text-muted-foreground mt-1">Halls or shared house</p>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-3">
              <Briefcase className="h-5 w-5 text-primary" />
              <h3 className="font-heading font-semibold">Professional rent</h3>
            </div>
            <p className="text-2xl font-heading font-bold text-foreground">{city.avgRentProfessional}</p>
            <p className="text-xs text-muted-foreground mt-1">Studio or 1-bed flat</p>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-3">
              <Train className="h-5 w-5 text-primary" />
              <h3 className="font-heading font-semibold">Monthly transport</h3>
            </div>
            <p className="text-2xl font-heading font-bold text-foreground">{city.transportMonthlyCost}</p>
            <p className="text-xs text-muted-foreground mt-1">Bus/tram/metro pass</p>
          </div>
        </div>

        {/* ── Indian Community Areas ──────────────────────────── */}
        <h2 className="text-2xl font-heading font-bold mb-2 flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          Indian community areas
        </h2>
        <p className="text-muted-foreground mb-4">Areas in {city.name} with Indian grocery stores, restaurants, temples, and community centres.</p>
        <div className="flex flex-wrap gap-3 mb-12">
          {city.indianCommunityAreas.map(area => (
            <Badge key={area} variant="secondary" className="px-4 py-2 text-sm font-medium">{area}</Badge>
          ))}
        </div>

        {/* ── Living Essentials Links ─────────────────────────── */}
        <h2 className="text-2xl font-heading font-bold mb-6">Living essentials in this city</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {[
            { icon: Building2, title: 'Housing', desc: `Popular areas: ${city.neighborhoods.join(', ')}. Mix of student halls and private rentals available.`, href: '/uk/living-essentials/housing' },
            { icon: Landmark, title: 'Banking', desc: 'All major digital and traditional banks operate here. Find branches near your area.', href: '/uk/living-essentials/banking' },
            { icon: Smartphone, title: 'SIM & mobile', desc: 'Buy a SIM at the airport or any high-street carrier store on arrival.', href: '/uk/living-essentials/sim-mobile' },
            { icon: ShoppingCart, title: 'Groceries', desc: 'Major supermarkets and Indian stores available in most neighbourhoods.', href: '/uk/living-essentials/groceries' },
            { icon: Heart, title: 'Health & safety', desc: 'Register with a local GP as soon as possible after arriving.', href: '/uk/health-safety' },
          ].map(s => (
            <Link key={s.title} to={s.href} className="group">
              <InfoCard icon={s.icon} title={s.title} description={s.desc} />
            </Link>
          ))}
        </div>

        {/* ── Neighbourhoods Overview ─────────────────────────── */}
        <h2 className="text-2xl font-heading font-bold mb-4">Neighbourhoods overview</h2>
        <div className="flex flex-wrap gap-3 mb-12">
          {city.neighborhoods.map(n => (
            <span key={n} className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">{n}</span>
          ))}
        </div>

        {/* ── Community & Lifestyle (Coming Soon) ─────────────── */}
        <div className="p-6 rounded-2xl bg-muted/50 border border-border">
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-heading font-semibold text-lg">Community & lifestyle in this city</h3>
          </div>
          <p className="text-muted-foreground text-sm">City-specific community groups, events, and lifestyle guides – <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-muted text-xs font-medium"><Clock className="h-2.5 w-2.5 mr-0.5" />Coming soon</span></p>
        </div>
      </div>
    </Layout>
  );
};

export default CityDetail;
