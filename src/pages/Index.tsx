import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { Building2, Heart, Landmark, Smartphone, ShoppingCart, ArrowRight, CheckCircle } from 'lucide-react';
import heroImage from '@/assets/hero-london.jpg';

const features = [
  { icon: Building2, title: 'Housing', description: 'Find the right accommodation from student halls to shared flats.', href: '/housing' },
  { icon: Heart, title: 'Health & NHS', description: 'Navigate the NHS, register with a GP, and stay healthy.', href: '/health' },
  { icon: Landmark, title: 'Banking', description: 'Open a UK bank account even without credit history.', href: '/banking' },
  { icon: Smartphone, title: 'SIM Cards', description: 'Stay connected with the right mobile plan from day one.', href: '/sim' },
  { icon: ShoppingCart, title: 'Groceries', description: 'Find supermarkets, Indian stores, and delivery apps.', href: '/groceries' },
];

const steps = [
  { number: '01', title: 'Tell us who you are', description: 'Student or working professional – we tailor your plan.' },
  { number: '02', title: 'Get your UK-ready plan', description: 'Housing, health, banking, SIM, and groceries – all covered.' },
  { number: '03', title: 'Follow your checklist', description: 'City-specific tips and tasks for your first 90 days.' },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight mb-6">
                Your first 90 days in the UK, <span className="text-primary">made simple.</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                NewStartAbroad guides Indian students and professionals through housing, health, banking, SIM, and groceries from day one.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/onboarding/persona">
                  <Button variant="coral" size="lg" className="gap-2 w-full sm:w-auto">
                    Start your New Start <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <a href="#features">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">Explore features</Button>
                </a>
              </div>
            </div>
            <div className="animate-fade-in-up">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img src={heroImage} alt="Welcome to the UK" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">How it works</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Three simple steps to feel at home in the UK</p>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map(step => (
              <div key={step.number} className="text-center p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow">
                <div className="text-5xl font-heading font-bold text-primary/20 mb-4">{step.number}</div>
                <h3 className="text-xl font-heading font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">Everything you need</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Five essential pillars for your new life in the UK</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(feature => {
              const Icon = feature.icon;
              return (
                <Link key={feature.title} to={feature.href} className="group p-6 rounded-2xl bg-card border border-border hover:shadow-lg hover:border-primary/20 transition-all">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Persona section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">Built for your journey</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { title: 'For Students', emoji: '🎓', points: ['University & college support', 'Student accommodation guides', 'Budget-friendly banking', 'Campus health services'] },
              { title: 'For Professionals', emoji: '💼', points: ['Workplace essentials', 'Rental market navigation', 'Salary accounts & transfers', 'GP registration near office'] },
            ].map(persona => (
              <div key={persona.title} className="p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{persona.emoji}</div>
                <h3 className="text-2xl font-heading font-semibold mb-4">{persona.title}</h3>
                <ul className="space-y-3">
                  {persona.points.map(point => (
                    <li key={point} className="flex items-center gap-3 text-muted-foreground">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section id="about" className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8">Designed for India → UK journeys</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { stat: '5', label: 'Essential pillars' },
              { stat: '90', label: 'Day plan' },
              { stat: '10+', label: 'UK cities' },
              { stat: '∞', label: 'Peace of mind' },
            ].map(item => (
              <div key={item.label}>
                <div className="text-4xl font-heading font-bold mb-2">{item.stat}</div>
                <div className="text-primary-foreground/70 text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Ready to start your journey?</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Join thousands of Indians who made their UK move stress-free.</p>
          <Link to="/onboarding/persona">
            <Button variant="coral" size="lg" className="gap-2">
              Start your New Start <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;