import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { Building2, Heart, ClipboardList, ArrowRight, CheckCircle, Briefcase, GraduationCap, Train, Users, Compass, Clock } from 'lucide-react';
import heroImage from '@/assets/hero-london.jpg';
import { ScrollReveal } from '@/hooks/use-scroll-animation';

const quickStart = [
  { icon: ClipboardList, title: 'Plan your first 90 days', href: '/uk/plan' },
  { icon: Building2, title: 'Living essentials', href: '/uk/living-essentials' },
  { icon: Heart, title: 'Health & safety', href: '/uk/health-safety' },
];

const exploreMore = [
  { icon: Briefcase, title: 'Work, study & family', href: '/uk/work-study-family', comingSoon: true },
  { icon: Train, title: 'Mobility & logistics', href: '/uk/mobility-logistics', comingSoon: true },
  { icon: Compass, title: 'Community & lifestyle', href: '/uk/community-lifestyle', comingSoon: true },
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
            <ScrollReveal direction="right">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight mb-6">
                Your first 90 days in the <span className="text-primary">United Kingdom.</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                NewStartAbroad guides Indian students and professionals through housing, health, banking, SIM, and groceries from day one.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/uk/onboarding/persona">
                  <Button variant="coral" size="lg" className="gap-2 w-full sm:w-auto">
                    Start your New Start <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/uk/living-essentials">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">Explore essentials</Button>
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={200}>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img src={heroImage} alt="Welcome to the UK" className="w-full h-auto" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Persona section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">Built for your journey</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { title: 'I\'m a student', emoji: '🎓', icon: GraduationCap, points: ['University & college support', 'Student accommodation guides', 'Budget-friendly banking', 'Campus health services'] },
              { title: 'I\'m a working professional', emoji: '💼', icon: Briefcase, points: ['Workplace essentials', 'Rental market navigation', 'Salary accounts & transfers', 'GP registration near office'] },
            ].map((persona, i) => (
              <ScrollReveal key={persona.title} delay={i * 200} direction={i === 0 ? 'right' : 'left'}>
                <Link to="/uk/onboarding/persona" className="block p-8 rounded-2xl bg-card border border-border hover:shadow-lg hover:border-primary/20 transition-all h-full group">
                  <div className="text-4xl mb-4">{persona.emoji}</div>
                  <h3 className="text-2xl font-heading font-semibold mb-4 group-hover:text-primary transition-colors">{persona.title}</h3>
                  <ul className="space-y-3">
                    {persona.points.map(point => (
                      <li key={point} className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quick start tiles */}
      <section id="features" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">Quick start</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Jump into the essentials for your UK move</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {quickStart.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.title} delay={i * 100}>
                  <Link to={item.href} className="group p-6 rounded-2xl bg-card border border-border hover:shadow-lg hover:border-primary/20 transition-all block h-full text-center">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-heading font-semibold group-hover:text-primary transition-colors">{item.title}</h3>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal>
            <h3 className="text-xl font-heading font-semibold text-center mb-6 text-muted-foreground">Explore more</h3>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {exploreMore.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.title} delay={i * 100}>
                  <Link to={item.href} className="group p-6 rounded-2xl bg-card border border-border hover:shadow-md transition-all block h-full text-center opacity-80 hover:opacity-100">
                    <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center mb-4 mx-auto">
                      <Icon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-muted-foreground flex items-center justify-center gap-2">
                      {item.title}
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-muted text-[10px] font-medium"><Clock className="h-2.5 w-2.5 mr-0.5" />Soon</span>
                    </h3>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">How it works</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Three simple steps to feel at home in the UK</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 150}>
                <div className="text-center p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow h-full">
                  <div className="text-5xl font-heading font-bold text-primary/20 mb-4">{step.number}</div>
                  <h3 className="text-xl font-heading font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section id="about" className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8">Designed for India → UK journeys</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { stat: '5', label: 'Essential pillars' },
              { stat: '90', label: 'Day plan' },
              { stat: '10+', label: 'UK cities' },
              { stat: '∞', label: 'Peace of mind' },
            ].map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 100}>
                <div>
                  <div className="text-4xl font-heading font-bold mb-2">{item.stat}</div>
                  <div className="text-primary-foreground/70 text-sm">{item.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Ready to start your journey?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Join thousands of Indians who made their UK move stress-free.</p>
            <Link to="/uk/onboarding/persona">
              <Button variant="coral" size="lg" className="gap-2">
                Start your New Start <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
