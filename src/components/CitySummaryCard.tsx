import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';

interface CitySummaryCardProps {
  slug: string;
  name: string;
  costLevel: string;
  description: string;
}

export const CitySummaryCard = ({ slug, name, costLevel, description }: CitySummaryCardProps) => {
  return (
    <Link
      to={`/city/${slug}`}
      className="group p-6 rounded-2xl bg-card border border-border hover:shadow-lg hover:border-primary/20 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="font-heading font-semibold text-lg">{name}</h3>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
          Cost: {costLevel}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      <span className="text-sm text-primary font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
        Explore <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
};