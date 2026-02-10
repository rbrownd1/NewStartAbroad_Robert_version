import { GlobalLayout } from '@/components/layout/GlobalLayout';
import { CountryCard } from '@/components/CountryCard';
import { countries, futureCountries } from '@/data/countries';
import { ScrollReveal } from '@/hooks/use-scroll-animation';
import { Globe, ArrowDown, MapPin, ClipboardList, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const steps = [
  { icon: MapPin, title: 'Select your country', description: 'Choose your destination from our supported countries.' },
  { icon: ClipboardList, title: 'Explore your microsite', description: 'Get tailored guides for housing, banking, health, SIM, and groceries.' },
  { icon: CheckCircle, title: 'Follow your 90-day plan', description: 'Use checklists and city-specific tips for a smooth start.' },
];

const GlobalHome = () => {
  return (
    <GlobalLayout>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 mb-6">
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight mb-6 max-w-4xl mx-auto">
              NewStartAbroad: Your first 90 days, <span className="text-primary">anywhere.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Choose your destination country to open a tailored microsite for housing, health, banking, SIM, and groceries.
            </p>
            <a href="#countries">
              <Button variant="coral" size="lg" className="gap-2">
                Choose your country <ArrowDown className="h-4 w-4" />
              </Button>
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Country grid */}
      <section id="countries" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">Choose your destination</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Select a country to explore its tailored microsite</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {countries.map((country, i) => (
              <ScrollReveal key={country.code} delay={i * 100}>
                <CountryCard {...country} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">How NewStartAbroad works</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Three simple steps to feel at home abroad</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <ScrollReveal key={step.title} delay={i * 150}>
                  <div className="text-center p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow h-full">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Future countries */}
      <section id="about" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">More countries coming soon</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">We're expanding to help Indians settle anywhere in the world</p>
          </ScrollReveal>
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {futureCountries.map((country, i) => (
              <ScrollReveal key={country.code} delay={i * 80}>
                <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-muted border border-border text-sm">
                  <span>{country.flag}</span>
                  <span className="text-muted-foreground font-medium">{country.name}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Ready to start your journey?</h2>
            <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">Pick your destination and get a personalised 90-day plan.</p>
            <a href="#countries">
              <Button variant="coral" size="lg" className="gap-2">
                Choose your country <ArrowDown className="h-4 w-4" />
              </Button>
            </a>
          </ScrollReveal>
        </div>
      </section>
    </GlobalLayout>
  );
};

export default GlobalHome;
