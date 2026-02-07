import { type LucideIcon } from 'lucide-react';

interface HubHeroProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

export const HubHero = ({ icon: Icon, title, subtitle }: HubHeroProps) => {
  return (
    <section className="bg-secondary/50 py-12 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-8 w-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">{title}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{subtitle}</p>
      </div>
    </section>
  );
};